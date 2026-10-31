# Analytics dashboard sample

A Nodex UI dashboard (`dashboard/`) for `nodexui/analytics`, with two interchangeable sample backends that receive events and serve `GET /api/stats`:

```sh
cd server-go && DEMO_SEED=1 go run .                                                         # Go 1.25+, Fiber v3
cd server-fastapi && pip install -r requirements.txt && DEMO_SEED=1 fastapi run main.py --port 8080   # Python 3.10+
```

Then open http://localhost:8080/. See [docs/analytics.md](../../docs/analytics.md#sample-dashboard) for the stats API and configuration. These servers keep events in memory and do not authenticate `/api/stats`, so treat them as demos only.
