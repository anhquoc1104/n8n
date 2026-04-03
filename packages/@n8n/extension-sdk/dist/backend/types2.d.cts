//#region src/backend/types.d.ts
type BackendExtensionContext = {
  example?: string;
};
type BackendExtensionSetupFn = (context: BackendExtension) => void;
type BackendExtension = {
  setup: BackendExtensionSetupFn;
};
//#endregion
export { BackendExtensionContext as n, BackendExtensionSetupFn as r, BackendExtension as t };
//# sourceMappingURL=types2.d.cts.map