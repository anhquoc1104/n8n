
//#region src/metaTagConfig.ts
function getTagName(configName) {
	return `n8n:config:${configName}`;
}
/**
* Utility function to read and decode base64-encoded configuration values from meta tags
*/
function getConfigFromMetaTag(configName) {
	const tagName = getTagName(configName);
	try {
		const metaTag = document.querySelector(`meta[name="${tagName}"]`);
		if (!metaTag) return null;
		const encodedContent = metaTag.getAttribute("content");
		if (!encodedContent) return null;
		return atob(encodedContent);
	} catch (error) {
		console.warn(`Failed to read n8n config for "${tagName}":`, error);
		return null;
	}
}
/**
* Utility function to read and parse configuration values from meta tags
*/
function getAndParseConfigFromMetaTag(configName) {
	const config = getConfigFromMetaTag(configName);
	if (!config) return null;
	try {
		return JSON.parse(config);
	} catch (error) {
		console.warn(`Failed to parse n8n config for "${getTagName(configName)}":`, error);
		return null;
	}
}

//#endregion
Object.defineProperty(exports, 'getAndParseConfigFromMetaTag', {
  enumerable: true,
  get: function () {
    return getAndParseConfigFromMetaTag;
  }
});
Object.defineProperty(exports, 'getConfigFromMetaTag', {
  enumerable: true,
  get: function () {
    return getConfigFromMetaTag;
  }
});
//# sourceMappingURL=metaTagConfig2.cjs.map