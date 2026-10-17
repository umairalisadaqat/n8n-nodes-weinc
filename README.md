# n8n-nodes-weinc

An [n8n](https://n8n.io) community node for [WeInc](https://we.inc), the AI website builder.
It uses the public WeInc REST API (`https://my.we.inc/api/v1`).

## Installation

In n8n: Settings, Community Nodes, Install, and enter `n8n-nodes-weinc`.
See the [n8n community nodes guide](https://docs.n8n.io/integrations/community-nodes/installation/).

## Credentials

Create an organization API key in WeInc (Settings, API keys). It starts with `wk_`.
Add a **WeInc API** credential in n8n and paste the key. Leave Base URL as is unless your
agency runs WeInc on its own white-label domain.

## Operations

- **Project**: Get Many (filter by client, name, status), Get, Create (for an existing, activated client), Update (name, description, status)
- **Preview**: Get URLs (live site URL if published, editor URL, embeddable preview URL)
- **Client**: Get Many, Create

## Compatibility

Built against `n8n-workflow` 2.x. Tested with `tsc` build and the n8n community lint rules.

## Resources

- [WeInc API reference (OpenAPI)](https://my.we.inc/api/v1/docs)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)

## License

MIT
