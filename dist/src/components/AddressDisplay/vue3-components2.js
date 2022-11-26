import { defineComponent as r, computed as t } from "vue";
import s from "../Copyable/vue3-components.js";
const d = r({
  name: "AddressDisplay",
  components: { Copyable: s },
  props: {
    address: {
      type: String,
      required: !0
    },
    copyable: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return { chunks: t(() => e.address ? e.address.replace(/[+ ]/g, "").match(/.{4}/g) : new Array(9).fill("-")) };
  }
});
export {
  d as default
};
//# sourceMappingURL=vue3-components2.js.map
