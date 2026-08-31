import { z } from "zod";
import { ghlService } from "../../ghl/service.js";
export const searchContactsTool = {
    name: "search_contacts",
    description: "Search contacts in the GoHighLevel sub-account by text query (matches name, email, phone, company), email, phone, or tags.",
    parameters: z.object({
        query: z
            .string()
            .optional()
            .describe("General search term matching name, email, phone, or company"),
        email: z.string().optional().describe("Filter contacts by exact email address"),
        phone: z.string().optional().describe("Filter contacts by phone number"),
        tags: z
            .array(z.string())
            .optional()
            .describe("Filter contacts matching one or more tags (e.g. ['VIP Client', 'Hot Lead'])"),
        limit: z.number().optional().default(20).describe("Number of contacts to return (default: 20)"),
        skip: z.number().optional().default(0).describe("Pagination offset (default: 0)"),
        locationId: z.string().optional().describe("Sub-account location ID (optional)")
    }),
    execute: async (args) => {
        const result = await ghlService.searchContacts(args);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        summary: `Found ${result.total} contact(s) matching search criteria.`,
                        source: result.source,
                        total: result.total,
                        contacts: result.contacts
                    }, null, 2)
                }
            ]
        };
    }
};
export const readContactWithCustomFieldsTool = {
    name: "read_contact_with_custom_fields",
    description: "Read comprehensive contact details including all basic fields, tags, and decoded custom fields (e.g. Lead Score, Budget, Services, Notes).",
    parameters: z.object({
        contactId: z.string().optional().describe("The unique GoHighLevel contact ID (e.g. 'cnt_01J8ABCDEF1234567890')"),
        email: z.string().optional().describe("Contact email (used if contactId is not provided)"),
        phone: z.string().optional().describe("Contact phone (used if contactId is not provided)"),
        locationId: z.string().optional().describe("Sub-account location ID (optional)")
    }),
    execute: async (args) => {
        const result = await ghlService.getContactWithCustomFields(args);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        summary: `Retrieved contact '${result.contact.name || result.contact.email}' with ${Object.keys(result.contact.customFieldMap || {}).length} custom fields and ${result.contact.tags.length} tags.`,
                        source: result.source,
                        contact: result.contact,
                        customFieldsSummary: result.contact.customFieldMap,
                        customFieldDefinitions: result.customFieldDefinitions
                    }, null, 2)
                }
            ]
        };
    }
};
export const updateContactFieldsTool = {
    name: "update_contact_fields",
    description: "Update standard contact fields (firstName, lastName, email, phone, companyName, address) and/or custom fields on a GoHighLevel contact.",
    parameters: z.object({
        contactId: z.string().describe("The unique GoHighLevel contact ID to update"),
        firstName: z.string().optional().describe("Updated first name"),
        lastName: z.string().optional().describe("Updated last name"),
        name: z.string().optional().describe("Updated full name"),
        email: z.string().optional().describe("Updated email address"),
        phone: z.string().optional().describe("Updated phone number"),
        companyName: z.string().optional().describe("Updated company name"),
        address1: z.string().optional().describe("Updated street address"),
        city: z.string().optional().describe("Updated city"),
        state: z.string().optional().describe("Updated state/province"),
        postalCode: z.string().optional().describe("Updated postal code"),
        website: z.string().optional().describe("Updated website URL"),
        tags: z.array(z.string()).optional().describe("Updated list of tags"),
        customFieldMap: z
            .record(z.any())
            .optional()
            .describe("Key-value dictionary of custom fields to update (e.g. {'Lead Score': 95, 'Budget Range': '$50,000+', 'Target Start Date': '2026-10-01'})"),
        locationId: z.string().optional().describe("Sub-account location ID (optional)")
    }),
    execute: async (args) => {
        const result = await ghlService.updateContact(args);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        summary: `Successfully updated contact '${result.contact.name || result.contact.email}' (ID: ${args.contactId}).`,
                        source: result.source,
                        success: result.success,
                        contact: result.contact
                    }, null, 2)
                }
            ]
        };
    }
};
export const createContactTool = {
    name: "create_contact",
    description: "Create a new contact in the GoHighLevel sub-account with initial standard fields, custom fields, and tags.",
    parameters: z.object({
        email: z.string().describe("Contact email address (required)"),
        firstName: z.string().optional().describe("Contact first name"),
        lastName: z.string().optional().describe("Contact last name"),
        name: z.string().optional().describe("Contact full name"),
        phone: z.string().optional().describe("Contact phone number"),
        companyName: z.string().optional().describe("Contact company name"),
        address1: z.string().optional().describe("Street address"),
        city: z.string().optional().describe("City"),
        state: z.string().optional().describe("State"),
        postalCode: z.string().optional().describe("Postal code"),
        tags: z.array(z.string()).optional().describe("Initial list of tags (e.g. ['Inbound Demo', 'Hot Lead'])"),
        customFieldMap: z
            .record(z.any())
            .optional()
            .describe("Custom fields dictionary (e.g. {'Lead Score': 80, 'Budget Range': '$20,000-$50,000'})"),
        locationId: z.string().optional().describe("Sub-account location ID (optional)")
    }),
    execute: async (args) => {
        const result = await ghlService.createContact(args);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        summary: `Successfully created new contact '${result.contact.name || result.contact.email}' with ID '${result.contact.id}'.`,
                        source: result.source,
                        success: result.success,
                        contact: result.contact
                    }, null, 2)
                }
            ]
        };
    }
};
