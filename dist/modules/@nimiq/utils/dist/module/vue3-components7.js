class t {
  constructor(e = 0, s = e, r = 0, a = Date.now(), n = t.Easing.EASE_IN_OUT_CUBIC) {
    this.targetValue = e, this.startValue = s, this.tweenTime = r, this.startTime = a, this.easing = n;
  }
  get currentValue() {
    const e = this.easing(this.progress);
    return this.startValue + (this.targetValue - this.startValue) * e;
  }
  get progress() {
    return this.tweenTime === 0 ? 1 : Math.min(1, (Date.now() - this.startTime) / this.tweenTime);
  }
  get finished() {
    return this.progress === 1;
  }
  tweenTo(e, s = this.tweenTime) {
    e !== this.targetValue && (this.startValue = this.currentValue, this.targetValue = e, this.startTime = Date.now(), this.tweenTime = s);
  }
}
(function(i) {
  i.Easing = {
    LINEAR: (e) => e,
    EASE_IN_OUT_CUBIC: (e) => e < 0.5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1
  };
})(t || (t = {}));
var h = t;
const u = h;
export {
  u as default
};
//# sourceMappingURL=vue3-components7.js.map
