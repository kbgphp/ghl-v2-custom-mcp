import { z } from "zod";
export declare const readCalendarConfigurationTool: {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        calendarId: z.ZodOptional<z.ZodString>;
        locationId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        locationId?: string | undefined;
        calendarId?: string | undefined;
    }, {
        locationId?: string | undefined;
        calendarId?: string | undefined;
    }>;
    execute: (args: {
        calendarId?: string;
        locationId?: string;
    }) => Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
};
