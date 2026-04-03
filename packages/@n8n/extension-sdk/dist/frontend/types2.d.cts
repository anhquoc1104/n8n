import { RouteRecordRaw } from "vue-router";
import { App, Component } from "vue";

//#region src/frontend/types.d.ts
type FrontendExtensionContext = {
  app: App;
  defineRoutes: (routes: RouteRecordRaw[]) => void;
  registerComponent: (name: string, component: Component) => void;
};
type FrontendExtensionSetupFn = (context: FrontendExtensionContext) => void;
type FrontendExtension = {
  setup: FrontendExtensionSetupFn;
};
//#endregion
export { FrontendExtensionContext as n, FrontendExtensionSetupFn as r, FrontendExtension as t };
//# sourceMappingURL=types2.d.cts.map