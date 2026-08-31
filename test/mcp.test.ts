import { ghlService } from "../src/ghl/service.js";
import { createMCPServer } from "../src/mcp/server.js";

async function runTests() {
  console.log("==================================================");
  console.log("  Running GoHighLevel MCP Server Tool Test Suite  ");
  console.log("==================================================");

  let passed = 0;
  let total = 0;

  async function test(name: string, fn: () => Promise<void>) {
    total++;
    try {
      await fn();
      console.log(`  ✅ [PASS] ${name}`);
      passed++;
    } catch (err: any) {
      console.error(`  ❌ [FAIL] ${name}:`, err.message);
    }
  }

  // 1. Search Contacts
  await test("Tool: search_contacts", async () => {
    const res = await ghlService.searchContacts({ query: "Sarah" });
    if (!res.contacts || res.contacts.length === 0) {
      throw new Error("No contacts returned for query 'Sarah'");
    }
    if (!res.contacts[0].name?.includes("Sarah")) {
      throw new Error("Returned contact does not match query");
    }
  });

  // 2. Read Contact with Custom Fields
  await test("Tool: read_contact_with_custom_fields", async () => {
    const res = await ghlService.getContactWithCustomFields({ contactId: "cnt_01J8ABCDEF1234567890" });
    if (!res.contact || !res.contact.customFieldMap) {
      throw new Error("Contact missing or customFieldMap empty");
    }
    if (res.contact.customFieldMap["Lead Score"] === undefined) {
      throw new Error("Custom field 'Lead Score' missing in customFieldMap");
    }
  });

  // 3. Update Contact Fields
  await test("Tool: update_contact_fields", async () => {
    const res = await ghlService.updateContact({
      contactId: "cnt_01J8ABCDEF1234567890",
      companyName: "Acme Ultra Cloud Inc",
      customFieldMap: {
        "Lead Score": 98,
        "AI Deal Notes": "Automated update test successful"
      }
    });
    if (!res.success || res.contact.companyName !== "Acme Ultra Cloud Inc") {
      throw new Error("Failed to update contact fields");
    }
    if (res.contact.customFieldMap?.["Lead Score"] !== 98) {
      throw new Error("Custom field update not reflected in contact");
    }
  });

  // 4. Create Contact
  await test("Tool: create_contact", async () => {
    const email = `test.agent.${Date.now()}@example.com`;
    const res = await ghlService.createContact({
      email,
      firstName: "Test",
      lastName: "User",
      companyName: "Agentic AI Labs",
      tags: ["AI Qualified", "Test Lead"],
      customFieldMap: {
        "Lead Score": 85
      }
    });
    if (!res.success || !res.contact.id) {
      throw new Error("Failed to create new contact");
    }
    if (res.contact.email !== email) {
      throw new Error("Created contact email mismatch");
    }
  });

  // 5. Read Tags
  await test("Tool: read_tags", async () => {
    const res = await ghlService.getTags();
    if (!res.tags || res.tags.length === 0) {
      throw new Error("No tags returned");
    }
    if (!res.tags.includes("VIP Client")) {
      throw new Error("Expected tag 'VIP Client' not found");
    }
  });

  // 6. Apply Tags
  await test("Tool: apply_tags", async () => {
    const res = await ghlService.applyTags({
      contactId: "cnt_01J8ABCDEF1234567890",
      tags: ["Contract Sent", "High Priority"]
    });
    if (!res.success || !res.activeTags.includes("High Priority")) {
      throw new Error("Failed to apply tag 'High Priority'");
    }
  });

  // 7. Read Workflow Configuration
  await test("Tool: read_workflow_configuration", async () => {
    const res = await ghlService.getWorkflows({ workflowId: "wf_lead_onboarding_01" });
    if (!res.workflows || res.workflows.length === 0) {
      throw new Error("No workflows returned for ID");
    }
    const wf = res.workflows[0];
    if (!wf.triggers || wf.triggers.length === 0 || !wf.actions || wf.actions.length === 0) {
      throw new Error("Workflow missing triggers or actions");
    }
  });

  // 8. Read Calendar Configuration
  await test("Tool: read_calendar_configuration", async () => {
    const res = await ghlService.getCalendars({ calendarId: "cal_30min_strategy_01" });
    if (!res.calendars || res.calendars.length === 0) {
      throw new Error("No calendars returned for ID");
    }
    const cal = res.calendars[0];
    if (cal.slotDuration !== 30 || !cal.availability) {
      throw new Error("Calendar configuration details invalid");
    }
  });

  // 9. Read Custom Field Definitions
  await test("Tool: read_custom_field_definitions", async () => {
    const res = await ghlService.getCustomFields();
    if (!res.customFields || res.customFields.length === 0) {
      throw new Error("No custom field definitions found");
    }
  });

  // 10. McpServer Initialization & Registration
  await test("MCP Server: Tool Registration", async () => {
    const server = createMCPServer();
    if (!server) {
      throw new Error("Failed to create McpServer instance");
    }
  });

  console.log("==================================================");
  console.log(`  Tests Completed: ${passed}/${total} Passed       `);
  console.log("==================================================");

  if (passed !== total) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test execution error:", err);
  process.exit(1);
});
