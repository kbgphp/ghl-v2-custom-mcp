import { z } from "zod";
import { ghlService } from "../../ghl/service.js";
export const readCustomFieldDefinitionsTool = {
    name: "read_custom_field_definitions",
    description: "Retrieve all custom field definitions and metadata (field names, IDs, data types, dropdown options) configured for contacts in the sub-account.",
    parameters: z.object({
        locationId: z.string().optional().describe("Sub-account location ID (optional)")
    }),
    execute: async (args) => {
        const result = await ghlService.getCustomFields(args.locationId);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        summary: `Retrieved ${result.customFields.length} custom field definitions in sub-account.`,
                        source: result.source,
                        count: result.customFields.length,
                        customFields: result.customFields
                    }, null, 2)
                }
            ]
        };
    }
};
