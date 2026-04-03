import type { CRDTDoc, CRDTProvider } from '../types';
export declare class YjsProvider implements CRDTProvider {
    readonly name: "yjs";
    createDoc(id: string): CRDTDoc;
}
