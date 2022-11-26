import { defineComponent as e } from "vue";
import o from "../Identicon/vue3-components.js";
const a = e({
  name: "AccountRing",
  components: { Identicon: o },
  props: {
    addresses: {
      type: Array,
      default: () => []
    },
    animate: {
      type: Boolean,
      default: !1
    }
  }
});
export {
  a as default
};
//# sourceMappingURL=vue3-components2.js.map
