import { Logger } from '@n8n/backend-common';
import { GlobalConfig } from '@n8n/config';
import { WorkflowRepository } from '@n8n/db';
import type RudderStack from '@rudderstack/rudder-sdk-node';
import { ErrorReporter, InstanceSettings } from 'n8n-core';
import type { ITelemetryTrackProperties } from 'n8n-workflow';
import type { IExecutionTrackProperties } from '../interfaces';
import { License } from '../license';
import { PostHogClient } from '../posthog';
interface IExecutionTrackData {
    count: number;
    first: Date;
}
interface IExecutionsBuffer {
    [workflowId: string]: {
        manual_error?: IExecutionTrackData;
        manual_success?: IExecutionTrackData;
        prod_error?: IExecutionTrackData;
        prod_success?: IExecutionTrackData;
        manual_crashed?: IExecutionTrackData;
        prod_crashed?: IExecutionTrackData;
        user_id: string | undefined;
    };
}
interface IApiInvocationProperties {
    user_id: string;
    path: string;
    method: string;
    api_version: string;
    user_agent?: string;
}
interface IApiInvocationsBufferEntry {
    total_calls: number;
    first: Date;
    endpoints: Record<string, number>;
    user_agents: Record<string, number>;
}
interface IApiInvocationsBuffer {
    [userId: string]: IApiInvocationsBufferEntry;
}
export declare class Telemetry {
    private readonly logger;
    private readonly postHog;
    private readonly license;
    private readonly instanceSettings;
    private readonly workflowRepository;
    private readonly globalConfig;
    private readonly errorReporter;
    private rudderStack?;
    private pulseIntervalReference;
    private executionCountsBuffer;
    private apiInvocationsBuffer;
    constructor(logger: Logger, postHog: PostHogClient, license: License, instanceSettings: InstanceSettings, workflowRepository: WorkflowRepository, globalConfig: GlobalConfig, errorReporter: ErrorReporter);
    sanitizeTelemetryProperties(obj: Record<string, any>, depth?: number, maxDepth?: number): Record<string, string | number>;
    init(): Promise<void>;
    private startPulse;
    private pulse;
    trackWorkflowExecution(properties: IExecutionTrackProperties): void;
    trackApiInvocation(properties: IApiInvocationProperties): void;
    stopTracking(): Promise<void>;
    groupIdentify({ userId, traits, }: {
        userId?: string;
        traits?: Record<string, string | number>;
    }): void;
    identify(traits?: {
        [key: string]: string | number | boolean | object | undefined | null;
    }, userId?: string): void;
    track(eventName: string, properties?: ITelemetryTrackProperties): RudderStack | undefined;
    getCountsBuffer(): IExecutionsBuffer;
    getApiInvocationsBuffer(): IApiInvocationsBuffer;
}
export {};
