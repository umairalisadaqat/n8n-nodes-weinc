# n8n-nodes-weinc

This is an n8n community node for [WeInc](https://we.inc) — the AI website builder. It lets you manage your agency's projects, clients, and site analytics from n8n workflows via the WeInc Agency API.

[n8n](https://n8n.io/) is a fair-code licensed workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

In n8n: **Settings → Community Nodes → Install**, then enter:

```
n8n-nodes-weinc
```

For a self-hosted npm install:

```
npm install n8n-nodes-weinc
```

## Credentials

Create a **WeInc API** credential with the API key from your WeInc agency dashboard (starts with `wk_`). The key is sent as `Authorization: Bearer wk_...` to `https://my.we.inc/api/v1`.

## Operations

### Project
- **List** — list all projects (filter by client, status; limit/offset paging)
- **Get** — get details of a project
- **Create** — create a project for a client (optionally from an org template)
- **Get Preview URLs** — get the published URL and embed preview path for a project

### Client
- **List** — list all clients of the agency

### Analytics
- **Get** — aggregated site analytics (views, unique visitors, top pages, referrers, devices), optionally filtered by project and lookback window

## Compatibility

Tested against n8n 1.x. Requires Node.js 18.10+.

## Resources

- [WeInc](https://we.inc)
- [WeInc API documentation](https://my.we.inc/api/v1/docs)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE.md)
