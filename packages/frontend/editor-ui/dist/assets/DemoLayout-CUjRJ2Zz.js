import { $ as openBlock, K as onBeforeMount, N as defineComponent, S as computed, T as createCommentVNode, X as onMounted, at as resolveComponent, j as createVNode, q as onBeforeUnmount, tt as provide, w as createBlock, yt as withCtx } from "./vue.runtime.esm-bundler-dg1EVmSK.js";
import "./_MapCache-B2nOWWtr.js";
import "./src-Brfg9f4I.js";
import "./sanitize-html-JHjOJhXQ.js";
import { Ot as useWorkflowState, s as useWorkflowsStore } from "./users.store-CMoFfg_u.js";
import { t as BaseLayout_default } from "./BaseLayout-DL-AiNlK.js";
import { Fc as WorkflowDocumentStoreKey, Lc as WorkflowStateKey } from "./constants-5-othRBB.js";
import "./merge-DKRB6QDO.js";
import "./_baseOrderBy-3RLTGCZ5.js";
import "./dateformat-BPRsPKQE.js";
import "./useDebounce-DQ6UcSsL.js";
import "./versions.store-DrEZgfd5.js";
import "./usePageRedirectionHelper-D3s-B4LC.js";
import "./useClipboard-CDbyDXF2.js";
import "./executions.store-CHPB7Qt8.js";
import "./assistant.store-cngxQ0XN.js";
import "./chatPanel.store-D9qmPim9.js";
import "./RunData-CD9EfWTe.js";
import "./NDVEmptyState-CyQ29VB4.js";
import "./externalSecrets.ee.store-D8NrZz4H.js";
import "./uniqBy-Crlbwdpx.js";
import "./usePinnedData-CHIf8ABu.js";
import "./nodeIcon-D1Y-PdrL.js";
import "./canvas.utils-BASL3jxq.js";
import "./canvas.eventBus-DIfL9Afg.js";
import "./useCanvasOperations-DgbZjGB7.js";
import "./setupPanel.store-CS0dmS37.js";
import "./nodeTransforms-C9biNlaW.js";
import "./templateTransforms-CS1pHcIG.js";
import "./RunDataHtml-BTVImKhi.js";
import "./NodeIcon-3qIO_bvk.js";
import "./useRunWorkflow-CyLFpzD5.js";
import "./pushConnection.store-CG9bvP4i.js";
import "./vue-json-pretty-DJRAvm8l.js";
import "./collaboration.store-CRng_rS2.js";
import "./dateFormatter-CMoUwqbk.js";
import "./useExecutionHelpers-CSoBeFxV.js";
import "./KeyboardShortcutTooltip-CSScyVWc.js";
import "./folders.store-SPXlJedw.js";
import "./useKeybindings-Bp7kkPLJ.js";
import "./chatHubPanel.store-iCM_q-DS.js";
import { t as useProvideWorkflowId } from "./useProvideWorkflowId-DhJ7JUzT.js";
import "./useLogsTreeExpand-D0JTmAB-.js";
import { n as useWorkflowInitialization, r as LogsPanel_default, t as usePostMessageHandler } from "./usePostMessageHandler-BItejtpq.js";
import "./AnimatedSpinner-CXuCLAoO.js";
import "./useResizablePanel-B-mi86S1.js";
import "./aiTemplatesStarterCollection.store-C7xGkDjK.js";
import "./readyToRunWorkflows.store-B_MziE8S.js";
import "./useExecutionDebugging-DwyRlKaO.js";
var DemoFooter_default = /* @__PURE__ */ defineComponent({
	__name: "DemoFooter",
	setup(__props) {
		const workflowsStore = useWorkflowsStore();
		const hasExecutionData = computed(() => workflowsStore.workflowExecutionData);
		return (_ctx, _cache) => {
			return hasExecutionData.value ? (openBlock(), createBlock(LogsPanel_default, {
				key: 0,
				"is-read-only": true
			})) : createCommentVNode("", true);
		};
	}
});
var DemoLayout_default = /* @__PURE__ */ defineComponent({
	__name: "DemoLayout",
	setup(__props) {
		const workflowState = useWorkflowState();
		provide(WorkflowStateKey, workflowState);
		const { initializeData, currentWorkflowDocumentStore, cleanup: cleanupInitialization } = useWorkflowInitialization(workflowState);
		useProvideWorkflowId();
		provide(WorkflowDocumentStoreKey, currentWorkflowDocumentStore);
		const { setup: setupPostMessages, cleanup: cleanupPostMessages } = usePostMessageHandler({
			workflowState,
			currentWorkflowDocumentStore
		});
		onBeforeMount(() => {
			setupPostMessages();
		});
		onMounted(async () => {
			await initializeData();
		});
		onBeforeUnmount(() => {
			cleanupPostMessages();
			cleanupInitialization();
		});
		return (_ctx, _cache) => {
			const _component_RouterView = resolveComponent("RouterView");
			return openBlock(), createBlock(BaseLayout_default, null, {
				footer: withCtx(() => [createVNode(DemoFooter_default)]),
				default: withCtx(() => [createVNode(_component_RouterView)]),
				_: 1
			});
		};
	}
});
export { DemoLayout_default as default };
