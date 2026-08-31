import { z } from "zod";
export declare const readTagsTool: {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        contactId: z.ZodOptional<z.ZodString>;
        locationId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        locationId?: string | undefined;
        contactId?: string | undefined;
    }, {
        locationId?: string | undefined;
        contactId?: string | undefined;
    }>;
    execute: (args: {
        contactId?: string;
        locationId?: string;
    }) => Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
};
export declare const applyTagsTool: {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        contactId: z.ZodString;
        tags: z.ZodArray<z.ZodString, "many">;
        removeTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        locationId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        tags: string[];
        contactId: string;
        locationId?: string | undefined;
        removeTags?: string[] | undefined;
    }, {
        tags: string[];
        contactId: string;
        locationId?: string | undefined;
        removeTags?: string[] | undefined;
    }>;
    execute: (args: {
        contactId: string;
        tags: string[];
        removeTags?: string[];
        locationId?: string;
    }) => Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
};
