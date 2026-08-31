import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createMCPServer } from "./mcp/server.js";
async function main() {
    const server = createMCPServer();
    const transport = new StdioServerTransport();
    1;
    await server.connect(transport);
    console.error("GoHighLevel MCP Server running on stdio transport");
}
main().catch((err) => {
    console.error("Fatal error in GoHighLevel stdio MCP server:", err);
    process.exit(1);
});
