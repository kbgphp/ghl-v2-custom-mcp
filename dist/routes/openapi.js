export function getOpenAPISpec(baseUrl) {
    return {
        openapi: "3.1.0",
        info: {
            title: "GoHighLevel API v2 Model Context Protocol & Custom Connector",
            version: "1.0.0",
            description: "Comprehensive API and MCP tools for GoHighLevel Sub-Accounts. Exposes contact search, custom fields, tags, workflows, and calendar configuration."
        },
        servers: [
            {
                url: baseUrl,
                description: "Current GoHighLevel MCP & API Server"
            }
        ],
        paths: {
            "/api/contacts/search": {
                get: {
                    summary: "Search contacts",
                    operationId: "searchContacts",
                    parameters: [
                        { name: "query", in: "query", schema: { type: "string" }, description: "Search query" },
                        { name: "email", in: "query", schema: { type: "string" }, description: "Filter by email" },
                        { name: "phone", in: "query", schema: { type: "string" }, description: "Filter by phone" },
                        { name: "limit", in: "query", schema: { type: "integer", default: 20 } },
                        { name: "skip", in: "query", schema: { type: "integer", default: 0 } }
                    ],
                    responses: {
                        "200": { description: "Contacts search result", content: { "application/json": {} } }
                    }
                }
            },
            "/api/contacts/{contactId}": {
                get: {
                    summary: "Get contact with custom fields",
                    operationId: "getContactWithCustomFields",
                    parameters: [
                        { name: "contactId", in: "path", required: true, schema: { type: "string" } }
                    ],
                    responses: {
                        "200": { description: "Contact details with custom fields" }
                    }
                },
                put: {
                    summary: "Update contact standard & custom fields",
                    operationId: "updateContact",
                    parameters: [
                        { name: "contactId", in: "path", required: true, schema: { type: "string" } }
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        firstName: { type: "string" },
                                        lastName: { type: "string" },
                                        email: { type: "string" },
                                        phone: { type: "string" },
                                        companyName: { type: "string" },
                                        tags: { type: "array", items: { type: "string" } },
                                        customFieldMap: { type: "object", additionalProperties: true }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": { description: "Updated contact record" }
                    }
                }
            },
            "/api/tags": {
                get: {
                    summary: "Read all sub-account tags",
                    operationId: "readTags",
                    responses: {
                        "200": { description: "List of available tags" }
                    }
                }
            },
            "/api/contacts/{contactId}/tags": {
                post: {
                    summary: "Apply tags to a contact",
                    operationId: "applyTags",
                    parameters: [
                        { name: "contactId", in: "path", required: true, schema: { type: "string" } }
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["tags"],
                                    properties: {
                                        tags: { type: "array", items: { type: "string" } },
                                        removeTags: { type: "array", items: { type: "string" } }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": { description: "Tags applied result" }
                    }
                }
            },
            "/api/workflows": {
                get: {
                    summary: "Read workflow automation configurations",
                    operationId: "readWorkflows",
                    responses: {
                        "200": { description: "List of workflows and triggers" }
                    }
                }
            },
            "/api/calendars": {
                get: {
                    summary: "Read calendar configurations and appointment slots",
                    operationId: "readCalendars",
                    responses: {
                        "200": { description: "List of calendars and booking slots" }
                    }
                }
            },
            "/sse": {
                get: {
                    summary: "Model Context Protocol (MCP) Server-Sent Events (SSE) Endpoint",
                    description: "Establishes persistent SSE stream for Model Context Protocol AI clients.",
                    responses: {
                        "200": { description: "SSE Stream" }
                    }
                }
            }
        }
    };
}
export function openApiHandler(req, res) {
    const protocol = req.headers["x-forwarded-proto"] || req.protocol || "http";
    const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost:3000";
    const baseUrl = `${protocol}://${host}`;
    res.json(getOpenAPISpec(baseUrl));
}
