const require_constants = require('./constants2.cjs');
const require_metaTagConfig = require('./metaTagConfig2.cjs');
let pinia = require("pinia");
let n8n_workflow = require("n8n-workflow");
let vue = require("vue");

//#region src/useRootStore.ts
const { VUE_APP_URL_BASE_API } = {}.env;
const useRootStore = (0, pinia.defineStore)(require_constants.STORES.ROOT, () => {
	const getClientId = () => {
		const storageKey = "n8n-client-id";
		const existingId = sessionStorage.getItem(storageKey);
		if (existingId) return existingId;
		const newId = (0, n8n_workflow.randomString)(10).toLowerCase();
		sessionStorage.setItem(storageKey, newId);
		return newId;
	};
	const state = (0, vue.ref)({
		baseUrl: VUE_APP_URL_BASE_API ?? window.BASE_PATH,
		restEndpoint: require_metaTagConfig.getConfigFromMetaTag("rest-endpoint") ?? "rest",
		defaultLocale: "en",
		endpointForm: "form",
		endpointFormTest: "form-test",
		endpointFormWaiting: "form-waiting",
		endpointMcp: "mcp",
		endpointMcpTest: "mcp-test",
		endpointWebhook: "webhook",
		endpointWebhookTest: "webhook-test",
		endpointWebhookWaiting: "webhook-waiting",
		timezone: "America/New_York",
		executionTimeout: -1,
		maxExecutionTimeout: Number.MAX_SAFE_INTEGER,
		versionCli: "0.0.0",
		oauthCallbackUrls: {},
		n8nMetadata: {},
		pushRef: getClientId(),
		urlBaseWebhook: "http://localhost:5678/",
		urlBaseEditor: "http://localhost:5678",
		instanceId: "",
		binaryDataMode: "default"
	});
	const baseUrl = (0, vue.computed)(() => state.value.baseUrl);
	const formUrl = (0, vue.computed)(() => `${state.value.urlBaseWebhook}${state.value.endpointForm}`);
	const formTestUrl = (0, vue.computed)(() => `${state.value.urlBaseEditor}${state.value.endpointFormTest}`);
	const formWaitingUrl = (0, vue.computed)(() => `${state.value.urlBaseEditor}${state.value.endpointFormWaiting}`);
	const webhookUrl = (0, vue.computed)(() => `${state.value.urlBaseWebhook}${state.value.endpointWebhook}`);
	const webhookTestUrl = (0, vue.computed)(() => `${state.value.urlBaseEditor}${state.value.endpointWebhookTest}`);
	const webhookWaitingUrl = (0, vue.computed)(() => `${state.value.urlBaseEditor}${state.value.endpointWebhookWaiting}`);
	const mcpUrl = (0, vue.computed)(() => `${state.value.urlBaseWebhook}${state.value.endpointMcp}`);
	const mcpTestUrl = (0, vue.computed)(() => `${state.value.urlBaseEditor}${state.value.endpointMcpTest}`);
	const pushRef = (0, vue.computed)(() => state.value.pushRef);
	const binaryDataMode = (0, vue.computed)(() => state.value.binaryDataMode);
	const defaultLocale = (0, vue.computed)(() => state.value.defaultLocale);
	const urlBaseEditor = (0, vue.computed)(() => state.value.urlBaseEditor);
	const instanceId = (0, vue.computed)(() => state.value.instanceId);
	const versionCli = (0, vue.computed)(() => state.value.versionCli);
	const OAuthCallbackUrls = (0, vue.computed)(() => state.value.oauthCallbackUrls);
	const restUrl = (0, vue.computed)(() => `${state.value.baseUrl}${state.value.restEndpoint}`);
	const executionTimeout = (0, vue.computed)(() => state.value.executionTimeout);
	const maxExecutionTimeout = (0, vue.computed)(() => state.value.maxExecutionTimeout);
	const timezone = (0, vue.computed)(() => state.value.timezone);
	const restApiContext = (0, vue.computed)(() => ({
		baseUrl: restUrl.value,
		pushRef: state.value.pushRef
	}));
	const setUrlBaseWebhook = (value) => {
		const url = value.endsWith("/") ? value : `${value}/`;
		state.value.urlBaseWebhook = url;
	};
	const setUrlBaseEditor = (value) => {
		const url = value.endsWith("/") ? value : `${value}/`;
		state.value.urlBaseEditor = url;
	};
	const setEndpointForm = (value) => {
		state.value.endpointForm = value;
	};
	const setEndpointFormTest = (value) => {
		state.value.endpointFormTest = value;
	};
	const setEndpointFormWaiting = (value) => {
		state.value.endpointFormWaiting = value;
	};
	const setEndpointWebhook = (value) => {
		state.value.endpointWebhook = value;
	};
	const setEndpointWebhookTest = (value) => {
		state.value.endpointWebhookTest = value;
	};
	const setEndpointWebhookWaiting = (value) => {
		state.value.endpointWebhookWaiting = value;
	};
	const setEndpointMcp = (value) => {
		state.value.endpointMcp = value;
	};
	const setEndpointMcpTest = (value) => {
		state.value.endpointMcpTest = value;
	};
	const setTimezone = (value) => {
		state.value.timezone = value;
		(0, n8n_workflow.setGlobalState)({ defaultTimezone: value });
	};
	const setExecutionTimeout = (value) => {
		state.value.executionTimeout = value;
	};
	const setMaxExecutionTimeout = (value) => {
		state.value.maxExecutionTimeout = value;
	};
	const setVersionCli = (value) => {
		state.value.versionCli = value;
	};
	const setInstanceId = (value) => {
		state.value.instanceId = value;
	};
	const setOauthCallbackUrls = (value) => {
		state.value.oauthCallbackUrls = value;
	};
	const setN8nMetadata = (value) => {
		state.value.n8nMetadata = value;
	};
	const setDefaultLocale = (value) => {
		state.value.defaultLocale = value;
	};
	const setBinaryDataMode = (value) => {
		state.value.binaryDataMode = value;
	};
	return {
		baseUrl,
		formUrl,
		formTestUrl,
		formWaitingUrl,
		mcpUrl,
		mcpTestUrl,
		webhookUrl,
		webhookTestUrl,
		webhookWaitingUrl,
		restUrl,
		restApiContext,
		urlBaseEditor,
		versionCli,
		instanceId,
		pushRef,
		defaultLocale,
		binaryDataMode,
		OAuthCallbackUrls,
		executionTimeout,
		maxExecutionTimeout,
		timezone,
		setUrlBaseWebhook,
		setUrlBaseEditor,
		setEndpointForm,
		setEndpointFormTest,
		setEndpointFormWaiting,
		setEndpointWebhook,
		setEndpointWebhookTest,
		setEndpointWebhookWaiting,
		setEndpointMcp,
		setEndpointMcpTest,
		setTimezone,
		setExecutionTimeout,
		setMaxExecutionTimeout,
		setVersionCli,
		setInstanceId,
		setOauthCallbackUrls,
		setN8nMetadata,
		setDefaultLocale,
		setBinaryDataMode
	};
});

//#endregion
exports.useRootStore = useRootStore;
//# sourceMappingURL=useRootStore.cjs.map