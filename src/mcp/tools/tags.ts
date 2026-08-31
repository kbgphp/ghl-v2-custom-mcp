import { z } from "zod";
import { ghlService } from "../../ghl/service.js";

export const readTagsTool = {
  name: "read_tags",
  description:
    "Retrieve all available tags configured across the GoHighLevel sub-account, or inspect the specific tags assigned to a contact.",
  parameters: z.object({
    contactId: z.string().optional().describe("Optional contact ID to fetch tags specifically for that contact"),
    locationId: z.string().optional().describe("Sub-account location ID (optional)")
  }),
  execute: async (args: { contactId?: string; locationId?: string }) => {
    const result = await ghlService.getTags(args);
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              summary: args.contactId
                ? `Retrieved tags for contact ID ${args.contactId}`
                : `Retrieved ${result.tags.length} available tags in sub-account.`,
              source: result.source,
              tags: result.tags,
              contactTags: result.contactTags
            },
            null,
            2
          )
        }
      ]
    };
  }
};

export const applyTagsTool = {
  name: "apply_tags",
  description:
    "Apply one or more tags to a GoHighLevel contact (e.g. 'VIP Client', 'Follow Up Required'), with optional ability to remove existing tags.",
  parameters: z.object({
    contactId: z.string().describe("The unique GoHighLevel contact ID"),
    tags: z.array(z.string()).describe("List of tags to add to the contact (e.g. ['VIP Client', 'Booked Demo'])"),
    removeTags: z
      .array(z.string())
      .optional()
      .describe("Optional list of tags to remove from the contact (e.g. ['Cold Lead'])"),
    locationId: z.string().optional().describe("Sub-account location ID (optional)")
  }),
  execute: async (args: {
    contactId: string;
    tags: string[];
    removeTags?: string[];
    locationId?: string;
  }) => {
    const result = await ghlService.applyTags(args);
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              summary: `Updated tags for contact ${args.contactId}. Added: [${args.tags.join(
                ", "
              )}]. Active tags: [${result.activeTags.join(", ")}].`,
              source: result.source,
              success: result.success,
              contactId: result.contactId,
              activeTags: result.activeTags,
              tagsAdded: result.tagsAdded,
              tagsRemoved: result.tagsRemoved
            },
            null,
            2
          )
        }
      ]
    };
  }
};
