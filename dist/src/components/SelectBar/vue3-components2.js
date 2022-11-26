import { defineComponent as c, computed as a, ref as v, watch as m } from "vue";
var o = /* @__PURE__ */ ((t) => (t.CHANGED = "changed", t))(o || {});
const f = c({
  name: "SelectBar",
  emits: Object.values(o),
  props: {
    name: {
      type: String,
      required: !0
    },
    options: {
      type: Array,
      required: !0
    },
    selectedValue: Number
  },
  setup(t, u) {
    const l = a(() => {
      var e;
      return (e = n.value) == null ? void 0 : e.value;
    }), r = a(() => t.options.sort((e, d) => e.index - d.index)), n = v(t.selectedValue ? r.value.find((e) => e.value === t.selectedValue) : r.value[0]);
    function i(e) {
      return e.index <= n.value.index ? n.value.color : "nq-highlight-bg";
    }
    m(n, s);
    function s(e) {
      u.emit("changed", e.value);
    }
    return u.expose({ value: l }), {
      sortedOptions: r,
      selectedOption: n,
      getColor: i
    };
  }
});
export {
  o as SelectBarEvent,
  f as default
};
//# sourceMappingURL=vue3-components2.js.map
