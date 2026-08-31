import { z } from "zod";
import { ghlService } from "../../ghl/service.js";

export const readCalendarConfigurationTool = {
  name: "read_calendar_configuration",
  description:
    "Read calendar and appointment configurations in the GoHighLevel sub-account, including slot duration, availability schedules, round-robin team members, and booking settings.",
  parameters: z.object({
    calendarId: z
      .string()
      .optional()
      .describe("Optional specific calendar ID (e.g. 'cal_30min_strategy_01') to fetch details"),
    locationId: z.string().optional().describe("Sub-account location ID (optional)")
  }),
  execute: async (args: { calendarId?: string; locationId?: string }) => {
    const result = await ghlService.getCalendars(args);
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              summary: args.calendarId
                ? `Retrieved calendar configuration for ID '${args.calendarId}'`
                : `Retrieved ${result.calendars.length} calendar configuration(s) in sub-account.`,
              source: result.source,
              count: result.calendars.length,
              calendars: result.calendars
            },
            null,
            2
          )
        }
      ]
    };
  }
};
