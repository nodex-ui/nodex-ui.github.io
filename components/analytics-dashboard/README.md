# Analytics dashboard sample

A Nodex UI dashboard for `nodexui/analytics` (`analytics-dashboard.js`/`.xml`/`.css`, shown in the site's Examples tab at `/index.html#/blocks/analytics`), with two interchangeable sample backends that receive events and serve `GET /api/stats`:

```sh
cd server-go && DEMO_SEED=1 go run .                                                         # Go 1.25+, Fiber v3
cd server-fastapi && pip install -r requirements.txt && DEMO_SEED=1 fastapi run main.py --port 8080   # Python 3.10+
```

The backends only serve the API. Run the site with `make dev` from the repo root and open http://127.0.0.1:5173/index.html#/blocks/analytics; the dashboard renders generated demo data in the `GET /api/stats` shape and calls no server. See [docs/analytics.md](../../docs/analytics.md) for the stats API and configuration. These servers keep events in memory and do not authenticate `/api/stats`, so treat them as demos only.
