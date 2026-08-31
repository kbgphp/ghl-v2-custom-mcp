import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  searchContactsTool,
  readContactWithCustomFieldsTool,
  updateContactFieldsTool,
  createContactTool
} from "./tools/contacts.js";
import { readTagsTool, applyTagsTool } from "./tools/tags.js";
import { readWorkflowConfigurationTool } from "./tools/workflows.js";
import { readCalendarConfigurationTool } from "./tools/calendars.js";
import { readCustomFieldDefinitionsTool } from "./tools/customFields.js";

export function createMCPServer(): McpServer {
  const server = new McpServer({
    name: "gohighlevel-mcp-server",
    version: "1.0.0"
  });

  // 1. Search Contacts
  server.tool(
    searchContactsTool.name,
    searchContactsTool.description,
    {
      query: z.string().optional().describe("General search query matching name, email, phone, company"),
      email: z.string().optional().describe("Filter by exact email"),
      phone: z.string().optional().describe("Filter by phone number"),
      tags: z.array(z.string()).optional().describe("Filter contacts with any of these tags (e.g. ['VIP Client'])"),
      limit: z.number().optional().default(20).describe("Max contacts to return"),
      skip: z.number().optional().default(0).describe("Pagination offset"),
      locationId: z.string().optional().describe("Optional sub-account location ID")
    },
    async (args) => {
      try {
        return await searchContactsTool.execute(args);
      } catch (err: any) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error searching contacts: ${err.message}` }]
        };
      }
    }
  );

  // 2. Read Contact with Custom Fields
  server.tool(
    readContactWithCustomFieldsTool.name,
    readContactWithCustomFieldsTool.description,
    {
      contactId: z.string().optional().describe("GoHighLevel contact ID (e.g. 'cnt_01J8ABCDEF1234567890')"),
      email: z.string().optional().describe("Lookup contact by email address"),
      phone: z.string().optional().describe("Lookup contact by phone number"),
      locationId: z.string().optional().describe("Optional sub-account location ID")
    },
    async (args) => {
      try {
        return await readContactWithCustomFieldsTool.execute(args);
      } catch (err: any) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error reading contact with custom fields: ${err.message}` }]
        };
      }
    }
  );

  // 3. Update Contact Fields
  server.tool(
    updateContactFieldsTool.name,
    updateContactFieldsTool.description,
    {
      contactId: z.string().describe("GoHighLevel contact ID to update"),
      firstName: z.string().optional().describe("Updated first name"),
      lastName: z.string().optional().describe("Updated last name"),
      name: z.string().optional().describe("Updated full name"),
      email: z.string().optional().describe("Updated email address"),
      phone: z.string().optional().describe("Updated phone number"),
      companyName: z.string().optional().describe("Updated company name"),
      address1: z.string().optional().describe("Updated street address"),
      city: z.string().optional().describe("Updated city"),
      state: z.string().optional().describe("Updated state"),
      postalCode: z.string().optional().describe("Updated postal code"),
      website: z.string().optional().describe("Updated website URL"),
      tags: z.array(z.string()).optional().describe("Updated array of tags"),
      customFieldMap: z
        .record(z.any())
        .optional()
        .describe("Key-value map of custom fields (e.g. {'Lead Score': 95, 'Budget Range': '$50,000+'})"),
      locationId: z.string().optional().describe("Optional sub-account location ID")
    },
    async (args) => {
      try {
        return await updateContactFieldsTool.execute(args);
      } catch (err: any) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error updating contact fields: ${err.message}` }]
        };
      }
    }
  );

  // 4. Create Contact
  server.tool(
    createContactTool.name,
    createContactTool.description,
    {
      email: z.string().describe("Contact email address (required)"),
      firstName: z.string().optional().describe("Contact first name"),
      lastName: z.string().optional().describe("Contact last name"),
      name: z.string().optional().describe("Contact full name"),
      phone: z.string().optional().describe("Contact phone number"),
      companyName: z.string().optional().describe("Company name"),
      address1: z.string().optional().describe("Street address"),
      city: z.string().optional().describe("City"),
      state: z.string().optional().describe("State"),
      postalCode: z.string().optional().describe("Postal code"),
      tags: z.array(z.string()).optional().describe("Initial list of tags"),
      customFieldMap: z.record(z.any()).optional().describe("Key-value map of custom fields"),
      locationId: z.string().optional().describe("Optional sub-account location ID")
    },
    async (args) => {
      try {
        return await createContactTool.execute(args);
      } catch (err: any) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error creating contact: ${err.message}` }]
        };
      }
    }
  );

  // 5. Read Tags
  server.tool(
    readTagsTool.name,
    readTagsTool.description,
    {
      contactId: z.string().optional().describe("Optional contact ID to fetch tags specifically for that contact"),
      locationId: z.string().optional().describe("Optional sub-account location ID")
    },
    async (args) => {
      try {
        return await readTagsTool.execute(args);
      } catch (err: any) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error reading tags: ${err.message}` }]
        };
      }
    }
  );

  // 6. Apply Tags
  server.tool(
    applyTagsTool.name,
    applyTagsTool.description,
    {
      contactId: z.string().describe("GoHighLevel contact ID"),
      tags: z.array(z.string()).describe("Array of tags to add to contact (e.g. ['VIP Client', 'Inbound Demo'])"),
      removeTags: z.array(z.string()).optional().describe("Optional array of tags to remove from contact"),
      locationId: z.string().optional().describe("Optional sub-account location ID")
    },
    async (args) => {
      try {
        return await applyTagsTool.execute(args);
      } catch (err: any) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error applying tags: ${err.message}` }]
        };
      }
    }
  );

  // 7. Read Workflow Configuration
  server.tool(
    readWorkflowConfigurationTool.name,
    readWorkflowConfigurationTool.description,
    {
      workflowId: z.string().optional().describe("Optional specific workflow ID to inspect deep steps and triggers"),
      locationId: z.string().optional().describe("Optional sub-account location ID")
    },
    async (args) => {
      try {
        return await readWorkflowConfigurationTool.execute(args);
      } catch (err: any) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error reading workflow configuration: ${err.message}` }]
        };
      }
    }
  );

  // 8. Read Calendar Configuration
  server.tool(
    readCalendarConfigurationTool.name,
    readCalendarConfigurationTool.description,
    {
      calendarId: z.string().optional().describe("Optional specific calendar ID to inspect appointment slots"),
      locationId: z.string().optional().describe("Optional sub-account location ID")
    },
    async (args) => {
      try {
        return await readCalendarConfigurationTool.execute(args);
      } catch (err: any) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error reading calendar configuration: ${err.message}` }]
        };
      }
    }
  );

  // 9. Read Custom Field Definitions
  server.tool(
    readCustomFieldDefinitionsTool.name,
    readCustomFieldDefinitionsTool.description,
    {
      locationId: z.string().optional().describe("Optional sub-account location ID")
    },
    async (args) => {
      try {
        return await readCustomFieldDefinitionsTool.execute(args);
      } catch (err: any) {
        return {
          isError: true,
          content: [{ type: "text", text: `Error reading custom field definitions: ${err.message}` }]
        };
      }
    }
  );

  return server;
}
