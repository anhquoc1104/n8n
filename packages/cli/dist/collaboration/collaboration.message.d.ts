import { z } from 'zod';
export type CollaborationMessage = WorkflowOpenedMessage | WorkflowClosedMessage | WriteAccessRequestedMessage | WriteAccessReleaseRequestedMessage | WriteAccessHeartbeatMessage;
export declare const workflowOpenedMessageSchema: z.ZodObject<{
    type: z.ZodLiteral<"workflowOpened">;
    workflowId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    workflowId: string;
    type: "workflowOpened";
}, {
    workflowId: string;
    type: "workflowOpened";
}>;
export declare const workflowClosedMessageSchema: z.ZodObject<{
    type: z.ZodLiteral<"workflowClosed">;
    workflowId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    workflowId: string;
    type: "workflowClosed";
}, {
    workflowId: string;
    type: "workflowClosed";
}>;
export declare const writeAccessRequestedMessageSchema: z.ZodObject<{
    type: z.ZodLiteral<"writeAccessRequested">;
    workflowId: z.ZodString;
    force: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    workflowId: string;
    type: "writeAccessRequested";
    force?: boolean | undefined;
}, {
    workflowId: string;
    type: "writeAccessRequested";
    force?: boolean | undefined;
}>;
export declare const writeAccessReleaseRequestedMessageSchema: z.ZodObject<{
    type: z.ZodLiteral<"writeAccessReleaseRequested">;
    workflowId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    workflowId: string;
    type: "writeAccessReleaseRequested";
}, {
    workflowId: string;
    type: "writeAccessReleaseRequested";
}>;
export declare const writeAccessHeartbeatMessageSchema: z.ZodObject<{
    type: z.ZodLiteral<"writeAccessHeartbeat">;
    workflowId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    workflowId: string;
    type: "writeAccessHeartbeat";
}, {
    workflowId: string;
    type: "writeAccessHeartbeat";
}>;
export declare const workflowMessageSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"workflowOpened">;
    workflowId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    workflowId: string;
    type: "workflowOpened";
}, {
    workflowId: string;
    type: "workflowOpened";
}>, z.ZodObject<{
    type: z.ZodLiteral<"workflowClosed">;
    workflowId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    workflowId: string;
    type: "workflowClosed";
}, {
    workflowId: string;
    type: "workflowClosed";
}>, z.ZodObject<{
    type: z.ZodLiteral<"writeAccessRequested">;
    workflowId: z.ZodString;
    force: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    workflowId: string;
    type: "writeAccessRequested";
    force?: boolean | undefined;
}, {
    workflowId: string;
    type: "writeAccessRequested";
    force?: boolean | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"writeAccessReleaseRequested">;
    workflowId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    workflowId: string;
    type: "writeAccessReleaseRequested";
}, {
    workflowId: string;
    type: "writeAccessReleaseRequested";
}>, z.ZodObject<{
    type: z.ZodLiteral<"writeAccessHeartbeat">;
    workflowId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    workflowId: string;
    type: "writeAccessHeartbeat";
}, {
    workflowId: string;
    type: "writeAccessHeartbeat";
}>]>;
export type WorkflowOpenedMessage = z.infer<typeof workflowOpenedMessageSchema>;
export type WorkflowClosedMessage = z.infer<typeof workflowClosedMessageSchema>;
export type WriteAccessRequestedMessage = z.infer<typeof writeAccessRequestedMessageSchema>;
export type WriteAccessReleaseRequestedMessage = z.infer<typeof writeAccessReleaseRequestedMessageSchema>;
export type WriteAccessHeartbeatMessage = z.infer<typeof writeAccessHeartbeatMessageSchema>;
export type WorkflowMessage = z.infer<typeof workflowMessageSchema>;
export declare const parseWorkflowMessage: (msg: unknown) => Promise<{
    workflowId: string;
    type: "workflowOpened";
} | {
    workflowId: string;
    type: "workflowClosed";
} | {
    workflowId: string;
    type: "writeAccessRequested";
    force?: boolean | undefined;
} | {
    workflowId: string;
    type: "writeAccessReleaseRequested";
} | {
    workflowId: string;
    type: "writeAccessHeartbeat";
}>;
