"""Sample analytics backend for nodexui/analytics (Python + FastAPI).

    POST /api/event   receives tracker events (text/plain JSON)
    GET  /api/stats   aggregates for the sample dashboard (?domain=&days=1..90)
    GET  /            serves ../dashboard

Events live in memory only and /api/stats has no auth: a demo, not a production store.
Run with `DEMO_SEED=1 fastapi run main.py --port 8080` to preload 30 days of synthetic traffic for demo.example.com.
"""

import hashlib
import os
import random
import secrets
import threading
from collections import Counter, deque
from dataclasses import dataclass, field
from datetime import datetime, time, timedelta, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urlsplit

from fastapi import FastAPI, Query, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field, ValidationError

MAX_RECORDS = 200_000


class Event(BaseModel):
    """Compact payload POSTed by nodexui/analytics."""

    name: str = Field(alias="n", min_length=1)
    url: str = Field(alias="u", min_length=1)
    domain: str = Field(alias="d", min_length=1)
    referrer: str | None = Field(None, alias="r")
    props: dict[str, Any] | None = Field(None, alias="p")
    revenue: dict[str, Any] | None = Field(None, alias="$")
    interactive: bool | None = Field(None, alias="i")
    hash_routing: int | None = Field(None, alias="h")
    scroll_depth: int | None = Field(None, alias="sd")
    engaged_ms: int | None = Field(None, alias="e")
    version: int = Field(alias="v")


@dataclass
class Record:
    at: datetime
    visitor: str
    event: Event


@dataclass
class Tally:
    count: int = 0
    visitors: set[str] = field(default_factory=set)


class Store:
    def __init__(self) -> None:
        self.lock = threading.Lock()
        self.records: deque[Record] = deque(maxlen=MAX_RECORDS)
        self.salt_day = ""
        self.salt = b""

    def _visitor_id(self, domain: str, ip: str, ua: str, now: datetime) -> str:
        # Cookieless daily visitor hash; the salt rotates each UTC day so IDs can't be linked across days.
        day = now.date().isoformat()
        if self.salt_day != day:
            self.salt, self.salt_day = secrets.token_bytes(16), day
        return hashlib.sha256(self.salt + f"{domain}|{ip}|{ua}".encode()).hexdigest()[:16]

    def add(self, event: Event, ip: str, ua: str) -> None:
        now = datetime.now(timezone.utc)
        with self.lock:
            self.records.append(Record(now, self._visitor_id(event.domain, ip, ua, now), event))

    def stats(self, domain: str | None, days: int, now: datetime) -> dict[str, Any]:
        with self.lock:
            records = list(self.records)

        per_domain = Counter(r.event.domain for r in records)
        domains = sorted(per_domain)
        domain = domain or min(per_domain, key=lambda d: (-per_domain[d], d), default="")  # busiest site
        start = datetime.combine(now.date() - timedelta(days=days - 1), time.min, timezone.utc)

        daily: dict[str, Tally] = {}
        pages: dict[str, Tally] = {}
        sources: dict[str, Tally] = {}
        events: dict[str, Tally] = {}
        visitors: set[str] = set()
        depth: dict[str, int] = {}  # max scroll depth per visitor + page
        pageviews = custom = engaged_ms = 0
        for r in records:
            ev = r.event
            if ev.domain != domain or r.at < start:
                continue
            path = urlsplit(ev.url).path or "/"
            if ev.name == "pageview":
                pageviews += 1
                visitors.add(r.visitor)
                bump(daily, r.at.date().isoformat(), r.visitor)
                bump(pages, path, r.visitor)
                bump(sources, source(ev.referrer, domain), r.visitor)
            elif ev.name == "engagement":
                engaged_ms += ev.engaged_ms or 0
                if ev.scroll_depth is not None:
                    key = f"{r.visitor} {path}"
                    depth[key] = max(depth.get(key, 0), ev.scroll_depth)
            else:
                custom += 1
                bump(events, ev.name, r.visitor)

        timeseries = []
        for i in range(days):
            date = (start + timedelta(days=i)).date().isoformat()
            c = daily.get(date, Tally())
            timeseries.append({"date": date, "visitors": len(c.visitors), "pageviews": c.count})
        return {
            "domain": domain,
            "domains": domains,
            "days": days,
            "totals": {
                "visitors": len(visitors),
                "pageviews": pageviews,
                "events": custom,
                "avgTimeSec": engaged_ms / 1000 / pageviews if pageviews else 0,
                "avgScrollDepth": sum(depth.values()) / len(depth) if depth else 0,
            },
            "timeseries": timeseries,
            "topPages": top(pages),
            "topSources": top(sources),
            "topEvents": top(events),
        }

    def seed(self) -> None:
        """Add 30 days of synthetic traffic for demo.example.com."""
        domain = "demo.example.com"
        rng = random.Random(42)
        paths = ["/", "/", "/", "/pricing", "/pricing", "/docs", "/docs/install", "/blog/launch", "/signup"]
        refs = [None, None, "https://www.google.com/", "https://www.google.com/", "https://github.com/",
                "https://news.ycombinator.com/", "https://t.co/x"]
        now = datetime.now(timezone.utc)
        today = datetime.combine(now.date(), time.min, timezone.utc)
        seeded = []

        def event(name: str, path: str, **extra: Any) -> Event:
            return Event.model_validate({"n": name, "u": f"https://{domain}{path}", "d": domain, "v": 36, **extra})

        for d in range(29, -1, -1):
            day = today - timedelta(days=d)
            n = 40 + rng.randrange(30) + (29 - d) * 2  # gentle upward trend
            if day.weekday() >= 5:
                n //= 2
            for v in range(n):
                visitor = f"{day.date()}-{v}"
                at = min(day + timedelta(seconds=rng.randrange(86_400)), now)
                ref = rng.choice(refs)
                for p in range(1 + rng.randrange(4)):
                    path = rng.choice(paths)
                    seeded.append(Record(at, visitor, event("pageview", path, r=ref if p == 0 else None)))
                    seeded.append(Record(at, visitor, event("engagement", path, e=2_000 + rng.randrange(120_000),
                                                            sd=20 + rng.randrange(81))))
                if rng.randrange(100) < 6:
                    seeded.append(Record(at, visitor, event("Signup", "/signup")))
                if rng.randrange(100) < 12:
                    seeded.append(Record(at, visitor, event("Outbound Link: Click", "/docs")))
        seeded.sort(key=lambda r: r.at)
        with self.lock:
            self.records.extend(seeded)


def bump(counters: dict[str, Tally], key: str, visitor: str) -> None:
    c = counters.setdefault(key, Tally())
    c.count += 1
    c.visitors.add(visitor)


def top(counters: dict[str, Tally]) -> list[dict[str, Any]]:
    """The 10 keys with the most hits."""
    rows = sorted(counters.items(), key=lambda kv: (-kv[1].count, kv[0]))[:10]
    return [{"name": k, "visitors": len(c.visitors), "count": c.count} for k, c in rows]


def source(referrer: str | None, domain: str) -> str:
    """The referrer's host, or "Direct / None" for no referrer or an internal one."""
    host = urlsplit(referrer).hostname if referrer else None
    if not host or host == domain:
        return "Direct / None"
    return host.removeprefix("www.")


store = Store()
if os.environ.get("DEMO_SEED") == "1":
    store.seed()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("ALLOWED_ORIGINS", "*").split(","),
    allow_methods=["GET", "POST"],
)


@app.post("/api/event", status_code=202)
async def collect(request: Request) -> Response:
    # Body is text/plain, so parse the raw bytes instead of declaring `event: Event` as a parameter.
    body = await request.body()
    if len(body) > 16 * 1024:
        return Response(status_code=413)
    try:
        event = Event.model_validate_json(body)
    except ValidationError:
        return Response(status_code=400)
    store.add(event, request.client.host if request.client else "", request.headers.get("user-agent", ""))
    return Response(status_code=202)


@app.get("/api/stats")
def stats(domain: str | None = None, days: int = Query(7, ge=1, le=90)) -> dict[str, Any]:
    return store.stats(domain, days, datetime.now(timezone.utc))


dashboard_dir = Path(os.environ.get("DASHBOARD_DIR", Path(__file__).parent.parent / "dashboard"))
app.mount("/", StaticFiles(directory=dashboard_dir, html=True), name="dashboard")
