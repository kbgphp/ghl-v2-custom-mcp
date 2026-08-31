import { z } from "zod";
import { ghlService } from "../../ghl/service.js";
export const readWorkflowConfigurationTool = {
    name: "read_workflow_configuration",
    description: "Read automation workflow configurations in the GoHighLevel sub-account, including trigger conditions, step actions (SMS, emails, wait steps, webhooks), active statuses, and execution stats.",
    parameters: z.object({
        workflowId: z
            .string()
            .optional()
            .describe("Optional specific workflow ID (e.g. 'wf_lead_onboarding_01') to fetch deep details"),
        locationId: z.string().optional().describe("Sub-account location ID (optional)")
    }),
    execute: async (args) => {
        const result = await ghlService.getWorkflows(args);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        summary: args.workflowId
                            ? `Retrieved workflow configuration for ID '${args.workflowId}'`
                            : `Retrieved ${result.workflows.length} workflow configuration(s) in sub-account.`,
                        source: result.source,
                        count: result.workflows.length,
                        workflows: result.workflows
                    }, null, 2)
                }
            ]
        };
    }
};
