import { z } from "zod";

//#region src/schema.d.ts
declare const extensionManifestSchema: z.ZodObject<{
  name: z.ZodString;
  displayName: z.ZodString;
  description: z.ZodString;
  publisher: z.ZodString;
  version: z.ZodString;
  categories: z.ZodArray<z.ZodString, "many">;
  entry: z.ZodObject<{
    backend: z.ZodString;
    frontend: z.ZodString;
  }, "strip", z.ZodTypeAny, {
    backend: string;
    frontend: string;
  }, {
    backend: string;
    frontend: string;
  }>;
  minSDKVersion: z.ZodString;
  permissions: z.ZodObject<{
    frontend: z.ZodArray<z.ZodString, "many">;
    backend: z.ZodArray<z.ZodString, "many">;
  }, "strip", z.ZodTypeAny, {
    backend: string[];
    frontend: string[];
  }, {
    backend: string[];
    frontend: string[];
  }>;
  events: z.ZodArray<z.ZodString, "many">;
  extends: z.ZodObject<{
    views: z.ZodObject<{
      workflows: z.ZodObject<{
        header: z.ZodString;
      }, "strip", z.ZodTypeAny, {
        header: string;
      }, {
        header: string;
      }>;
    }, "strip", z.ZodTypeAny, {
      workflows: {
        header: string;
      };
    }, {
      workflows: {
        header: string;
      };
    }>;
  }, "strip", z.ZodTypeAny, {
    views: {
      workflows: {
        header: string;
      };
    };
  }, {
    views: {
      workflows: {
        header: string;
      };
    };
  }>;
}, "strip", z.ZodTypeAny, {
  name: string;
  displayName: string;
  description: string;
  publisher: string;
  version: string;
  categories: string[];
  entry: {
    backend: string;
    frontend: string;
  };
  minSDKVersion: string;
  permissions: {
    backend: string[];
    frontend: string[];
  };
  events: string[];
  extends: {
    views: {
      workflows: {
        header: string;
      };
    };
  };
}, {
  name: string;
  displayName: string;
  description: string;
  publisher: string;
  version: string;
  categories: string[];
  entry: {
    backend: string;
    frontend: string;
  };
  minSDKVersion: string;
  permissions: {
    backend: string[];
    frontend: string[];
  };
  events: string[];
  extends: {
    views: {
      workflows: {
        header: string;
      };
    };
  };
}>;
type ExtensionManifest = z.infer<typeof extensionManifestSchema>;
//#endregion
export { extensionManifestSchema as n, ExtensionManifest as t };
//# sourceMappingURL=schema2.d.cts.map