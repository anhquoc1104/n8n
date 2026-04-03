import type { CRDTDoc, CRDTMap } from './types';
export declare function seedValueDeep(doc: CRDTDoc, value: unknown): unknown;
export declare function toJSON(value: unknown): unknown;
export declare function getNestedValue(root: CRDTMap<unknown> | Record<string, unknown>, path: string[]): unknown;
export declare function setNestedValue(doc: CRDTDoc, root: CRDTMap<unknown>, path: string[], value: unknown): void;
