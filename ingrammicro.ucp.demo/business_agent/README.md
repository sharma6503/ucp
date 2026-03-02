<!--
   Copyright 2026 UCP Authors

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
-->

# Business Agent

Ingram Micro B2B Retail Agent — an A2A + UCP-enabled AI shopping assistant built with Google ADK.

## Prerequisites

- Python 3.10+
- [UV](https://docs.astral.sh/uv/) package manager
- [Gemini API Key](https://aistudio.google.com/apikey)

## Key Dependencies

| Package | Version | Purpose |
|---|---|---|
| `google-adk[a2a]` | `>=1.22.0` | ADK agent framework + A2A support |
| `ucp-sdk` | `0.1.0` | UCP commerce data types |
| `pydantic[email]` | `>=2.12.3` | Data validation |
| `uvicorn` | `>=0.35.0` | ASGI web server |
| `httpx` | `>=0.28.1` | HTTP client |

## Quick Start

```bash
uv sync
cp .env.example .env   # set GOOGLE_API_KEY in .env
uv run business_agent
```

The agent starts on **port 10999**. Verify with:

- **Agent Card:** http://localhost:10999/.well-known/agent-card.json
- **UCP Profile:** http://localhost:10999/.well-known/ucp

## Source Structure

```
src/business_agent/
├── main.py                  # Uvicorn server entry point
├── agent.py                 # ADK agent definition & shopping tools
├── agent_executor.py        # A2A task executor & JSON-RPC handler
├── store.py                 # B2B retail store logic & UCP type mapping
├── ucp_profile_resolver.py  # UCP capability negotiation
├── payment_processor.py     # Payment handling
├── constants.py             # Shared constants
├── models/                  # Pydantic data models
├── helpers/                 # Utility helpers
├── a2a_extensions/          # A2A protocol extensions
└── data/                    # Product catalog & mock data (products.json)
```

## Development

```bash
# Lint
uv run ruff check src/

# Format
uv run ruff format src/
```

For full documentation see the [project README](../README.md).
