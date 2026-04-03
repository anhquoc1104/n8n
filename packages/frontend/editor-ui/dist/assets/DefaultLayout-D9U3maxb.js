import { $ as openBlock, N as defineComponent, at as resolveComponent, j as createVNode, w as createBlock, yt as withCtx } from "./vue.runtime.esm-bundler-dg1EVmSK.js";
import "./_MapCache-B2nOWWtr.js";
import "./src-Brfg9f4I.js";
import "./sanitize-html-JHjOJhXQ.js";
import "./users.store-CMoFfg_u.js";
import "./MainSidebarHeader-BUFTp1XL.js";
import { t as BaseLayout_default } from "./BaseLayout-DL-AiNlK.js";
import "./constants-5-othRBB.js";
import "./merge-DKRB6QDO.js";
import "./_baseOrderBy-3RLTGCZ5.js";
import "./dateformat-BPRsPKQE.js";
import "./useDebounce-DQ6UcSsL.js";
import "./versions.store-DrEZgfd5.js";
import "./usePageRedirectionHelper-D3s-B4LC.js";
import "./useBugReporting-Dm-Pcbbf.js";
import "./canvas.utils-BASL3jxq.js";
import "./KeyboardShortcutTooltip-CSScyVWc.js";
import "./folders.store-SPXlJedw.js";
import "./sourceControl.eventBus-bwewiNgJ.js";
import "./useKeybindings-Bp7kkPLJ.js";
import "./useGlobalEntityCreation-DF59nWQy.js";
import "./useSettingsItems-DTRPwYXv.js";
import { t as AppSidebar_default } from "./AppSidebar-DDpkD6Xj.js";
import "./readyToRun.store-DS9CdH8s.js";
import "./resourceCenter.store-BUaJPZn4.js";
var DefaultLayout_default = /* @__PURE__ */ defineComponent({
	__name: "DefaultLayout",
	setup(__props) {
		return (_ctx, _cache) => {
			const _component_RouterView = resolveComponent("RouterView");
			return openBlock(), createBlock(BaseLayout_default, null, {
				sidebar: withCtx(() => [createVNode(AppSidebar_default)]),
				default: withCtx(() => [createVNode(_component_RouterView)]),
				_: 1
			});
		};
	}
});
export { DefaultLayout_default as default };
