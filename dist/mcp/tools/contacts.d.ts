import { z } from "zod";
export declare const searchContactsTool: {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        query: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        skip: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        locationId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        skip: number;
        query?: string | undefined;
        locationId?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        tags?: string[] | undefined;
    }, {
        query?: string | undefined;
        locationId?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        tags?: string[] | undefined;
        limit?: number | undefined;
        skip?: number | undefined;
    }>;
    execute: (args: {
        query?: string;
        email?: string;
        phone?: string;
        tags?: string[];
        limit?: number;
        skip?: number;
        locationId?: string;
    }) => Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
};
export declare const readContactWithCustomFieldsTool: {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        contactId: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        locationId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        locationId?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        contactId?: string | undefined;
    }, {
        locationId?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        contactId?: string | undefined;
    }>;
    execute: (args: {
        contactId?: string;
        email?: string;
        phone?: string;
        locationId?: string;
    }) => Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
};
export declare const updateContactFieldsTool: {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        contactId: z.ZodString;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        companyName: z.ZodOptional<z.ZodString>;
        address1: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
        website: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        customFieldMap: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        locationId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        contactId: string;
        locationId?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        companyName?: string | undefined;
        address1?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        postalCode?: string | undefined;
        website?: string | undefined;
        tags?: string[] | undefined;
        customFieldMap?: Record<string, any> | undefined;
    }, {
        contactId: string;
        locationId?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        companyName?: string | undefined;
        address1?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        postalCode?: string | undefined;
        website?: string | undefined;
        tags?: string[] | undefined;
        customFieldMap?: Record<string, any> | undefined;
    }>;
    execute: (args: {
        contactId: string;
        firstName?: string;
        lastName?: string;
        name?: string;
        email?: string;
        phone?: string;
        companyName?: string;
        address1?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        website?: string;
        tags?: string[];
        customFieldMap?: Record<string, any>;
        locationId?: string;
    }) => Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
};
export declare const createContactTool: {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        email: z.ZodString;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        companyName: z.ZodOptional<z.ZodString>;
        address1: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        customFieldMap: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        locationId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        locationId?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        name?: string | undefined;
        phone?: string | undefined;
        companyName?: string | undefined;
        address1?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        postalCode?: string | undefined;
        tags?: string[] | undefined;
        customFieldMap?: Record<string, any> | undefined;
    }, {
        email: string;
        locationId?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        name?: string | undefined;
        phone?: string | undefined;
        companyName?: string | undefined;
        address1?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        postalCode?: string | undefined;
        tags?: string[] | undefined;
        customFieldMap?: Record<string, any> | undefined;
    }>;
    execute: (args: {
        email: string;
        firstName?: string;
        lastName?: string;
        name?: string;
        phone?: string;
        companyName?: string;
        address1?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        tags?: string[];
        customFieldMap?: Record<string, any>;
        locationId?: string;
    }) => Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
};
