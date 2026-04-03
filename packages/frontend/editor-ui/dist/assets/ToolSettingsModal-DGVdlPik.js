import { $ as openBlock, A as createTextVNode, C as createBaseVNode, Ft as ref, N as defineComponent, Sn as toDisplayString, T as createCommentVNode, Wt as unref, _n as normalizeClass, j as createVNode, w as createBlock, yt as withCtx } from "./vue.runtime.esm-bundler-dg1EVmSK.js";
import { bt as useI18n } from "./_MapCache-B2nOWWtr.js";
import { Qi as N8nButton_default, h as N8nInlineTextEdit_default } from "./src-Brfg9f4I.js";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DltO58Gh.js";
import "./sanitize-html-JHjOJhXQ.js";
import "./date-picker-DipChrwt.js";
import { r as useUIStore } from "./users.store-CMoFfg_u.js";
import "./ParameterInputList-DjBBqcPi.js";
import "./constants-5-othRBB.js";
import "./merge-DKRB6QDO.js";
import "./_baseOrderBy-3RLTGCZ5.js";
import "./dateformat-BPRsPKQE.js";
import "./useDebounce-DQ6UcSsL.js";
import { t as Modal_default } from "./Modal-DSUic4Rm.js";
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
import "./useQuickConnect-DW9pxpip.js";
import "./CredentialIcon-DvANK-Kn.js";
import "./DropdownMenu-BQHHdEM4.js";
import "./useDynamicCredentials-CkhWwztX.js";
import "./RunDataHtml-BTVImKhi.js";
import "./Draggable-C0CKvZWB.js";
import { t as NodeIcon_default } from "./NodeIcon-3qIO_bvk.js";
import "./VirtualSchema-BF6HGyBC.js";
import "./useCalloutHelpers-C3wijIr1.js";
import "./useTelemetryContext-CxkB5VUN.js";
import "./useRunWorkflow-CyLFpzD5.js";
import "./pushConnection.store-CG9bvP4i.js";
import "./vue-json-pretty-DJRAvm8l.js";
import "./collaboration.store-CRng_rS2.js";
import "./dateFormatter-CMoUwqbk.js";
import "./useExecutionHelpers-CSoBeFxV.js";
import "./vue-K5kPXnPp.js";
import { t as ToolSettingsContent_default } from "./ToolSettingsContent-Bgav82F1.js";
var ToolSettingsModal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ToolSettingsModal",
	props: {
		modalName: {},
		data: {}
	},
	setup(__props) {
		const props = __props;
		const i18n = useI18n();
		const uiStore = useUIStore();
		const contentRef = ref(null);
		const isValid = ref(false);
		const nodeName = ref(props.data.node?.name ?? "");
		function closeDialog() {
			uiStore.closeModal(props.modalName);
		}
		function handleConfirm() {
			const currentNode = contentRef.value?.node;
			if (!currentNode) return;
			props.data.onConfirm(currentNode);
			closeDialog();
		}
		function handleCancel() {
			closeDialog();
		}
		function handleChangeName(name) {
			contentRef.value?.handleChangeName(name);
		}
		function handleValidUpdate(valid) {
			isValid.value = valid;
		}
		function handleNodeNameUpdate(name) {
			nodeName.value = name;
		}
		return (_ctx, _cache) => {
			return __props.data.node ? (openBlock(), createBlock(Modal_default, {
				key: 0,
				name: __props.modalName,
				width: "780px"
			}, {
				header: withCtx(() => [createBaseVNode("div", { class: normalizeClass(_ctx.$style.header) }, [contentRef.value?.nodeTypeDescription ? (openBlock(), createBlock(NodeIcon_default, {
					key: 0,
					"node-type": contentRef.value.nodeTypeDescription,
					size: 24,
					circle: true,
					class: normalizeClass(_ctx.$style.icon)
				}, null, 8, ["node-type", "class"])) : createCommentVNode("", true), createVNode(unref(N8nInlineTextEdit_default), {
					"model-value": nodeName.value,
					"max-width": 400,
					class: normalizeClass(_ctx.$style.title),
					"onUpdate:modelValue": handleChangeName
				}, null, 8, ["model-value", "class"])], 2)]),
				content: withCtx(() => [createBaseVNode("div", { class: normalizeClass(_ctx.$style.contentWrapper) }, [createVNode(ToolSettingsContent_default, {
					ref_key: "contentRef",
					ref: contentRef,
					"initial-node": __props.data.node,
					"existing-tool-names": __props.data.existingToolNames,
					"onUpdate:valid": handleValidUpdate,
					"onUpdate:nodeName": handleNodeNameUpdate
				}, null, 8, ["initial-node", "existing-tool-names"])], 2)]),
				footer: withCtx(() => [createBaseVNode("div", { class: normalizeClass(_ctx.$style.footer) }, [createVNode(unref(N8nButton_default), {
					variant: "subtle",
					onClick: handleCancel
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(i18n).baseText("chatHub.toolSettings.cancel")), 1)]),
					_: 1
				}), createVNode(unref(N8nButton_default), {
					variant: "solid",
					disabled: !isValid.value,
					onClick: handleConfirm
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(i18n).baseText("chatHub.toolSettings.confirm")), 1)]),
					_: 1
				}, 8, ["disabled"])], 2)]),
				_: 1
			}, 8, ["name"])) : createCommentVNode("", true);
		};
	}
});
var ToolSettingsModal_vue_vue_type_style_index_0_lang_module_default = {
	header: "_header_148s1_125",
	icon: "_icon_148s1_132",
	title: "_title_148s1_137",
	footer: "_footer_148s1_146",
	contentWrapper: "_contentWrapper_148s1_152"
};
var ToolSettingsModal_default = /* @__PURE__ */ __plugin_vue_export_helper_default(ToolSettingsModal_vue_vue_type_script_setup_true_lang_default, [["__cssModules", { "$style": ToolSettingsModal_vue_vue_type_style_index_0_lang_module_default }]]);
export { ToolSettingsModal_default as default };
