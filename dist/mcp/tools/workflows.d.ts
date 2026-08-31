import { z } from "zod";
export declare const readWorkflowConfigurationTool: {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        workflowId: z.ZodOptional<z.ZodString>;
        locationId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        locationId?: string | undefined;
        workflowId?: string | undefined;
    }, {
        locationId?: string | undefined;
        workflowId?: string | undefined;
    }>;
    execute: (args: {
        workflowId?: string;
        locationId?: string;
    }) => Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
};
