import { z } from "zod";
export declare const readCustomFieldDefinitionsTool: {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        locationId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        locationId?: string | undefined;
    }, {
        locationId?: string | undefined;
    }>;
    execute: (args: {
        locationId?: string;
    }) => Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
};
