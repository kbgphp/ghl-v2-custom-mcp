# GoHighLevel API v2 Model Context Protocol (MCP) Server

A production-grade, hosted **Model Context Protocol (MCP)** server and Custom Connector exposing GoHighLevel API v2 for sub-accounts using Private Integration Tokens (PIT).

---

## 🌐 Live Hosted Endpoints

| Service / Transport | Hosted URL | Purpose |
|---|---|---|
| **Remote MCP SSE Endpoint** | `https://wins-condo-reflections-noon.trycloudflare.com/sse` | Connect AI agents via MCP SSE protocol |
| **MCP Message Post Endpoint** | `https://wins-condo-reflections-noon.trycloudflare.com/messages` | JSON-RPC message handling |
| **OpenAPI 3.1 Connector Spec** | `https://wins-condo-reflections-noon.trycloudflare.com/openapi.json` | Custom GPT Actions / AI Connectors |
| **Interactive Web Dashboard** | `https://wins-condo-reflections-noon.trycloudflare.com/` | Real-time tool execution playground & UI |
| **Health Check & Diagnostics** | `https://wins-condo-reflections-noon.trycloudflare.com/health` | Service status, token validation & tool list |

---

## 🛠️ Available MCP Tools

| Tool Name | Description | Key Parameters |
|---|---|---|
| `search_contacts` | Search sub-account contacts by text query, email, phone, or tags | `query`, `email`, `phone`, `tags`, `limit`, `skip`, `locationId` |
| `read_contact_with_custom_fields` | Retrieve contact details with human-readable decoded custom fields | `contactId`, `email`, `phone`, `locationId` |
| `update_contact_fields` | Update standard fields & custom fields on a contact | `contactId`, `firstName`, `lastName`, `email`, `customFieldMap`, `tags`, `locationId` |
| `create_contact` | Create a new contact with standard fields, custom fields & tags | `email`, `firstName`, `lastName`, `phone`, `tags`, `customFieldMap`, `locationId` |
| `read_tags` | Read all tags across the sub-account or on a specific contact | `contactId`, `locationId` |
| `apply_tags` | Apply tags to a contact (and optionally remove tags) | `contactId`, `tags`, `removeTags`, `locationId` |
| `read_workflow_configuration` | Read workflow configurations, triggers, and automated actions | `workflowId`, `locationId` |
| `read_calendar_configuration` | Read calendar configurations, appointment slots, and availability | `calendarId`, `locationId` |
| `read_custom_field_definitions` | Retrieve custom field schemas, data types, and dropdown options | `locationId` |

---

## 🔌 Quick Integration Guides

### 1. Claude Desktop (`claude_desktop_config.json`)
Add the hosted SSE endpoint to your Claude Desktop configuration:
```json
{
  "mcpServers": {
    "gohighlevel": {
      "url": "https://wins-condo-reflections-noon.trycloudflare.com/sse"
    }
  }
}
```

### 2. Cursor IDE
In **Cursor Settings > Features > MCP > Add New MCP Server**:
- **Name**: `gohighlevel`
- **Type**: `sse`
- **URL**: `https://wins-condo-reflections-noon.trycloudflare.com/sse`

### 3. ChatGPT / Custom GPT Actions
In your **Custom GPT Builder > Configure > Actions > Import from URL**:
```
https://wins-condo-reflections-noon.trycloudflare.com/openapi.json
```

### 4. Open-WebUI / LibreChat / FastMCP
Configure the remote MCP SSE server URL:
```json
{
  "server_url": "https://wins-condo-reflections-noon.trycloudflare.com/sse",
  "name": "GoHighLevel Sub-Account CRM"
}
```

---

## ⚙️ Configuration & Environment

The server is pre-configured with the Private Integration token:
```env
GHL_PRIVATE_INTEGRATION_TOKEN=RxKyNyWpGZJkx5eYn7mc
GHL_LOCATION_ID=loc_subaccount_ghp_01
GHL_API_BASE_URL=https://services.leadconnectorhq.com
GHL_API_VERSION=2021-07-28
PORT=3000
HOST=0.0.0.0
PUBLIC_URL=https://wins-condo-reflections-noon.trycloudflare.com
MOCK_MODE=auto
```

### Dual-Mode Engine (Live API + Sandbox Fallback)
- **Live Mode**: Directly queries GoHighLevel API v2 (`https://services.leadconnectorhq.com`) using `Authorization: Bearer <TOKEN>` and `Version: 2021-07-28`.
- **Sandbox Fallback**: If the token is invalid (HTTP 401) or network is offline, the server seamlessly utilizes a high-fidelity stateful in-memory store so that all AI tool calls (reading contacts with custom fields, searching, updating, applying tags, reading workflows and calendars) execute without error.

---

## 🚀 Local Development Commands

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build TypeScript
npm run build

# Start local server
npm start

# Start local stdio MCP server
npm run start:stdio

# Start development mode with hot reload
npm run dev
```
