let zod = require("zod");

//#region src/schema.ts
/**
* Schema for the extension configuration.
*/
const extensionManifestSchema = zod.z.object({
	name: zod.z.string(),
	displayName: zod.z.string(),
	description: zod.z.string(),
	publisher: zod.z.string(),
	version: zod.z.string(),
	categories: zod.z.array(zod.z.string()),
	entry: zod.z.object({
		backend: zod.z.string(),
		frontend: zod.z.string()
	}),
	minSDKVersion: zod.z.string(),
	permissions: zod.z.object({
		frontend: zod.z.array(zod.z.string()),
		backend: zod.z.array(zod.z.string())
	}),
	events: zod.z.array(zod.z.string()),
	extends: zod.z.object({ views: zod.z.object({ workflows: zod.z.object({ header: zod.z.string() }) }) })
});

//#endregion
Object.defineProperty(exports, 'extensionManifestSchema', {
  enumerable: true,
  get: function () {
    return extensionManifestSchema;
  }
});
//# sourceMappingURL=schema2.cjs.map