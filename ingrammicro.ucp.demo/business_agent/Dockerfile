# Copyright 2026 UCP Authors
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

FROM python:3.12-slim AS builder

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /usr/local/bin/

WORKDIR /app

# Copy dependency files + README (required by hatchling) for better layer caching
COPY pyproject.toml uv.lock README.md ./

# Install only dependencies (not the project itself) into .venv
RUN uv sync --frozen --no-dev --no-install-project

# Copy source code and install the project as a regular wheel (not editable)
COPY src/ ./src/
RUN uv sync --frozen --no-dev --no-editable

# ---- Runtime stage ----
FROM python:3.12-slim

WORKDIR /app

# Copy the virtual environment from builder
COPY --from=builder /app/.venv /app/.venv

# Copy the source code (needed for data files like agent_card.json, images, ucp.json)
COPY --from=builder /app/src /app/src

# Make venv binaries available
ENV PATH="/app/.venv/bin:$PATH"
ENV PYTHONPATH="/app/src"

# Cloud Run injects PORT=8080 at runtime; expose that port.
# The CMD reads $PORT so it works both locally and on Cloud Run.
EXPOSE 8080

# Use Cloud Run's PORT env var (defaults to 8080). Bind to 0.0.0.0 for container networking.
CMD ["sh", "-c", "business_agent --host 0.0.0.0 --port ${PORT:-8080}"]
