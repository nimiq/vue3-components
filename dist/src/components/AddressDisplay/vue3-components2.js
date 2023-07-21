import { defineComponent as i, computed as r } from "vue";
import s from "../Copyable/vue3-components.js";
const c = i({
  name: "AddressDisplay",
  components: { Copyable: s },
  props: {
    address: {
      type: String,
      required: !0
    },
    format: {
      type: String,
      default: "nimiq"
    },
    copyable: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = r(() => {
      switch (e.format) {
        case "nimiq":
          return e.address ? e.address.replace(/[+ ]/g, "").match(/.{4}/g) : new Array(9).fill("-");
        case "ethereum":
          return e.address ? e.address.replace(/[+ ]/g, "").match(/.{14}/g) : new Array(3).fill("-");
        default:
          return [e.address];
      }
    }), a = r(() => {
      switch (e.format) {
        case "nimiq":
          return t.value.join(" ").toUpperCase();
        default:
          return t.value.join("");
      }
    }), n = r(() => e.format === "nimiq");
    return { chunks: t, text: a, chunkTrailingSpaces: n };
  }
});
export {
  c as default
};
//# sourceMappingURL=vue3-components2.js.map
