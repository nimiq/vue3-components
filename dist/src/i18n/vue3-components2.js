import { defineComponent as r, h as s } from "vue";
import { loadI18n as o } from "./vue3-components.js";
const m = r({
  name: "I18n",
  props: {
    path: {
      type: String,
      required: !0
    },
    componentName: {
      type: String,
      required: !0
    },
    tag: {
      type: String,
      default: "span"
    }
  },
  render() {
    if (!Object.keys(this.$slots).length)
      throw new Error(
        "I18n: the component must contain at least 1 template slot, otherwise simply use the $t function."
      );
    const n = o(this.$props.componentName)(this.$props.path.replace(/\\n/g, `
`)).split(/({\w+})/g).map((t) => {
      const e = t.match(/^{(\w+)}$/);
      return e && this.$slots[e[1]]() || t;
    });
    return s(this.$props.tag, {}, n);
  }
});
export {
  m as default
};
//# sourceMappingURL=vue3-components2.js.map
