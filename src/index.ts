import express, { Request, Response } from "express";
import cors from "cors";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { CONFIG } from "./config.js";
import { createMCPServer } from "./mcp/server.js";
import { ghlService } from "./ghl/service.js";
import { openApiHandler } from "./routes/openapi.js";
import { renderDashboard } from "./routes/dashboard.js";

const app = express();
app.use(cors());
app.use(express.json());

// State for active SSE transports
const sseTransports = new Map<string, SSEServerTransport>();

// Global variable to store active public tunnel URL
export let publicTunnelUrl: string = process.env.PUBLIC_URL || `http://localhost:${CONFIG.port}`;

export function setPublicTunnelUrl(url: string) {
  publicTunnelUrl = url;
}

// 1. Health & Status
app.get("/health", async (_req: Request, res: Response) => {
  const liveStatus = await ghlService.checkLiveStatus();
  res.json({
    status: "healthy",
    server: "GoHighLevel API v2 MCP Server",
    version: "1.0.0",
    publicUrl: publicTunnelUrl,
    mode: CONFIG.mockMode,
    liveStatus,
    locationId: CONFIG.ghlLocationId,
    tools: [
      "search_contacts",
      "read_contact_with_custom_fields",
      "update_contact_fields",
      "create_contact",
      "read_tags",
      "apply_tags",
      "read_workflow_configuration",
      "read_calendar_configuration",
      "read_custom_field_definitions"
    ]
  });
});

// 2. OpenAPI Specification
app.get("/openapi.json", openApiHandler);

// 3. MCP SSE Transport Endpoints
app.get("/sse", async (req: Request, res: Response) => {
  console.log("Incoming MCP SSE Connection established from:", req.ip);
  const mcpServer = createMCPServer();
  const transport = new SSEServerTransport("/messages", res);

  sseTransports.set(transport.sessionId, transport);

  req.on("close", () => {
    console.log(`MCP SSE Connection closed for session: ${transport.sessionId}`);
    sseTransports.delete(transport.sessionId);
  });

  try {
    await mcpServer.connect(transport);
  } catch (err: any) {
    console.error("Error connecting MCP Server to SSE transport:", err);
    res.status(500).send("Failed to initialize MCP SSE session");
  }
});

app.post("/messages", async (req: Request, res: Response) => {
  const sessionId = req.query.sessionId as string;
  if (!sessionId) {
    res.status(400).json({ error: "Missing sessionId in query parameter" });
    return;
  }

  const transport = sseTransports.get(sessionId);
  if (!transport) {
    res.status(404).json({ error: `No active SSE transport found for sessionId: ${sessionId}` });
    return;
  }

  await transport.handlePostMessage(req, res);
});

// 4. Interactive Test Tool Route (For UI Dashboard)
app.post("/api/test-tool", async (req: Request, res: Response) => {
  const { tool, args } = req.body;
  try {
    let result: any;
    switch (tool) {
      case "search_contacts":
        result = await ghlService.searchContacts(args || {});
        break;
      case "read_contact_with_custom_fields":
        result = await ghlService.getContactWithCustomFields(args || {});
        break;
      case "update_contact_fields":
        result = await ghlService.updateContact(args || {});
        break;
      case "create_contact":
        result = await ghlService.createContact(args || {});
        break;
      case "read_tags":
        result = await ghlService.getTags(args || {});
        break;
      case "apply_tags":
        result = await ghlService.applyTags(args || {});
        break;
      case "read_workflow_configuration":
        result = await ghlService.getWorkflows(args || {});
        break;
      case "read_calendar_configuration":
        result = await ghlService.getCalendars(args || {});
        break;
      case "read_custom_field_definitions":
        result = await ghlService.getCustomFields(args?.locationId);
        break;
      default:
        res.status(400).json({ error: `Unknown tool name: ${tool}` });
        return;
    }
    res.json({ success: true, tool, result });
  } catch (err: any) {
    res.status(500).json({ success: false, tool, error: err.message });
  }
});

// 5. Direct REST Endpoints (for custom HTTP connectors)
app.get("/api/contacts/search", async (req: Request, res: Response) => {
  try {
    const data = await ghlService.searchContacts({
      query: req.query.query as string,
      email: req.query.email as string,
      phone: req.query.phone as string,
      limit: req.query.limit ? parseInt(req.query.limit as string, 10) : undefined,
      skip: req.query.skip ? parseInt(req.query.skip as string, 10) : undefined,
      locationId: req.query.locationId as string
    });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/contacts/:contactId", async (req: Request, res: Response) => {
  try {
    const data = await ghlService.getContactWithCustomFields({
      contactId: req.params.contactId,
      locationId: req.query.locationId as string
    });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/contacts/:contactId", async (req: Request, res: Response) => {
  try {
    const data = await ghlService.updateContact({
      contactId: req.params.contactId,
      ...req.body,
      locationId: req.query.locationId as string
    });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/tags", async (req: Request, res: Response) => {
  try {
    const data = await ghlService.getTags({
      locationId: req.query.locationId as string,
      contactId: req.query.contactId as string
    });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/contacts/:contactId/tags", async (req: Request, res: Response) => {
  try {
    const data = await ghlService.applyTags({
      contactId: req.params.contactId,
      tags: req.body.tags || [],
      removeTags: req.body.removeTags,
      locationId: req.query.locationId as string
    });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/workflows", async (req: Request, res: Response) => {
  try {
    const data = await ghlService.getWorkflows({
      locationId: req.query.locationId as string,
      workflowId: req.query.workflowId as string
    });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/calendars", async (req: Request, res: Response) => {
  try {
    const data = await ghlService.getCalendars({
      locationId: req.query.locationId as string,
      calendarId: req.query.calendarId as string
    });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Interactive Web Dashboard
app.get("/", (_req: Request, res: Response) => {
  res.send(renderDashboard(publicTunnelUrl));
});

// Start Server
const server = app.listen(CONFIG.port, CONFIG.host, () => {
  console.log(`=======================================================`);
  console.log(`  GoHighLevel API v2 Model Context Protocol Server     `);
  console.log(`  Local Dashboard:    http://localhost:${CONFIG.port} `);
  console.log(`  MCP SSE Endpoint:   http://localhost:${CONFIG.port}/sse `);
  console.log(`  OpenAPI Schema:     http://localhost:${CONFIG.port}/openapi.json `);
  console.log(`  Health Status:      http://localhost:${CONFIG.port}/health `);
  console.log(`=======================================================`);
});

export default app;
