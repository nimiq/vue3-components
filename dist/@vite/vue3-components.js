const i = (r, n) => {
  const e = r[n];
  return e ? typeof e == "function" ? e() : Promise.resolve(e) : new Promise((t, o) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(o.bind(null, new Error("Unknown variable dynamic import: " + n)));
  });
};
export {
  i as default
};
//# sourceMappingURL=vue3-components.js.map
