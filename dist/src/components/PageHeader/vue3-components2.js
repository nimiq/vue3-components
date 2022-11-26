import { defineComponent as s, computed as p } from "vue";
import { loadI18n as a } from "../../i18n/vue3-components.js";
import { ArrowLeftIcon as n } from "../../icons/vue3-components.js";
var o = /* @__PURE__ */ ((e) => (e.BACK = "back", e))(o || {});
const l = s({
  name: "PageHeader",
  props: {
    backArrow: {
      type: Boolean,
      default: !1
    },
    progressIndicator: {
      type: Boolean,
      default: !1
    },
    numberSteps: {
      type: Number,
      default: 6
    },
    step: {
      type: Number,
      default: 1
    }
  },
  methods: { $t: a("PageHeader") },
  setup(e) {
    return {
      progressSteps: p(() => {
        const r = [];
        for (let t = 1; t <= e.numberSteps; t++)
          r.push(t);
        return r;
      }),
      PageHeaderEvent: o
    };
  },
  components: { ArrowLeftIcon: n }
});
export {
  o as PageHeaderEvent,
  l as default
};
//# sourceMappingURL=vue3-components2.js.map
