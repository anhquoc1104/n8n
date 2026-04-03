import { z } from "zod";

//#region src/schema.ts
/**
* Schema for the extension configuration.
*/
const extensionManifestSchema = z.object({
	name: z.string(),
	displayName: z.string(),
	description: z.string(),
	publisher: z.string(),
	version: z.string(),
	categories: z.array(z.string()),
	entry: z.object({
		backend: z.string(),
		frontend: z.string()
	}),
	minSDKVersion: z.string(),
	permissions: z.object({
		frontend: z.array(z.string()),
		backend: z.array(z.string())
	}),
	events: z.array(z.string()),
	extends: z.object({ views: z.object({ workflows: z.object({ header: z.string() }) }) })
});

//#endregion
export { extensionManifestSchema as t };
//# sourceMappingURL=schema2.mjs.map