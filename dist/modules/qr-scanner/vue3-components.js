class s {
  constructor(e, t, i, a, n) {
    this._legacyCanvasSize = s.DEFAULT_CANVAS_SIZE, this._preferredCamera = "environment", this._maxScansPerSecond = 25, this._lastScanTimestamp = -1, this._destroyed = this._flashOn = this._paused = this._active = !1, this.$video = e, this.$canvas = document.createElement("canvas"), i && typeof i == "object" ? this._onDecode = t : (console.warn(i || a || n ? "You're using a deprecated version of the QrScanner constructor which will be removed in the future" : "Note that the type of the scan result passed to onDecode will change in the future. To already switch to the new api today, you can pass returnDetailedScanResult: true."), this._legacyOnDecode = t), t = typeof i == "object" ? i : {}, this._onDecodeError = t.onDecodeError || (typeof i == "function" ? i : this._onDecodeError), this._calculateScanRegion = t.calculateScanRegion || (typeof a == "function" ? a : this._calculateScanRegion), this._preferredCamera = t.preferredCamera || n || this._preferredCamera, this._legacyCanvasSize = typeof i == "number" ? i : typeof a == "number" ? a : this._legacyCanvasSize, this._maxScansPerSecond = t.maxScansPerSecond || this._maxScansPerSecond, this._onPlay = this._onPlay.bind(this), this._onLoadedMetaData = this._onLoadedMetaData.bind(this), this._onVisibilityChange = this._onVisibilityChange.bind(this), this._updateOverlay = this._updateOverlay.bind(this), e.disablePictureInPicture = !0, e.playsInline = !0, e.muted = !0;
    let o = !1;
    if (e.hidden && (e.hidden = !1, o = !0), document.body.contains(e) || (document.body.appendChild(e), o = !0), i = e.parentElement, t.highlightScanRegion || t.highlightCodeOutline) {
      if (a = !!t.overlay, this.$overlay = t.overlay || document.createElement("div"), n = this.$overlay.style, n.position = "absolute", n.display = "none", n.pointerEvents = "none", this.$overlay.classList.add("scan-region-highlight"), !a && t.highlightScanRegion) {
        this.$overlay.innerHTML = '<svg class="scan-region-highlight-svg" viewBox="0 0 238 238" preserveAspectRatio="none" style="position:absolute;width:100%;height:100%;left:0;top:0;fill:none;stroke:#e9b213;stroke-width:4;stroke-linecap:round;stroke-linejoin:round"><path d="M31 2H10a8 8 0 0 0-8 8v21M207 2h21a8 8 0 0 1 8 8v21m0 176v21a8 8 0 0 1-8 8h-21m-176 0H10a8 8 0 0 1-8-8v-21"/></svg>';
        try {
          this.$overlay.firstElementChild.animate({ transform: [
            "scale(.98)",
            "scale(1.01)"
          ] }, { duration: 400, iterations: 1 / 0, direction: "alternate", easing: "ease-in-out" });
        } catch {
        }
        i.insertBefore(this.$overlay, this.$video.nextSibling);
      }
      t.highlightCodeOutline && (this.$overlay.insertAdjacentHTML("beforeend", '<svg class="code-outline-highlight" preserveAspectRatio="none" style="display:none;width:100%;height:100%;fill:none;stroke:#e9b213;stroke-width:5;stroke-dasharray:25;stroke-linecap:round;stroke-linejoin:round"><polygon/></svg>'), this.$codeOutlineHighlight = this.$overlay.lastElementChild);
    }
    this._scanRegion = this._calculateScanRegion(e), requestAnimationFrame(() => {
      let l = window.getComputedStyle(e);
      l.display === "none" && (e.style.setProperty("display", "block", "important"), o = !0), l.visibility !== "visible" && (e.style.setProperty("visibility", "visible", "important"), o = !0), o && (console.warn("QrScanner has overwritten the video hiding style to avoid Safari stopping the playback."), e.style.opacity = "0", e.style.width = "0", e.style.height = "0", this.$overlay && this.$overlay.parentElement && this.$overlay.parentElement.removeChild(this.$overlay), delete this.$overlay, delete this.$codeOutlineHighlight), this.$overlay && this._updateOverlay();
    }), e.addEventListener("play", this._onPlay), e.addEventListener("loadedmetadata", this._onLoadedMetaData), document.addEventListener("visibilitychange", this._onVisibilityChange), window.addEventListener("resize", this._updateOverlay), this._qrEnginePromise = s.createQrEngine();
  }
  static set WORKER_PATH(e) {
    console.warn("Setting QrScanner.WORKER_PATH is not required and not supported anymore. Have a look at the README for new setup instructions.");
  }
  static async hasCamera() {
    try {
      return !!(await s.listCameras(!1)).length;
    } catch {
      return !1;
    }
  }
  static async listCameras(e = !1) {
    if (!navigator.mediaDevices)
      return [];
    let t = async () => (await navigator.mediaDevices.enumerateDevices()).filter((a) => a.kind === "videoinput"), i;
    try {
      e && (await t()).every((a) => !a.label) && (i = await navigator.mediaDevices.getUserMedia({ audio: !1, video: !0 }));
    } catch {
    }
    try {
      return (await t()).map((a, n) => ({ id: a.deviceId, label: a.label || (n === 0 ? "Default Camera" : `Camera ${n + 1}`) }));
    } finally {
      i && (console.warn("Call listCameras after successfully starting a QR scanner to avoid creating a temporary video stream"), s._stopVideoStream(i));
    }
  }
  async hasFlash() {
    let e;
    try {
      if (this.$video.srcObject) {
        if (!(this.$video.srcObject instanceof MediaStream))
          return !1;
        e = this.$video.srcObject;
      } else
        e = (await this._getCameraStream()).stream;
      return "torch" in e.getVideoTracks()[0].getSettings();
    } catch {
      return !1;
    } finally {
      e && e !== this.$video.srcObject && (console.warn("Call hasFlash after successfully starting the scanner to avoid creating a temporary video stream"), s._stopVideoStream(e));
    }
  }
  isFlashOn() {
    return this._flashOn;
  }
  async toggleFlash() {
    this._flashOn ? await this.turnFlashOff() : await this.turnFlashOn();
  }
  async turnFlashOn() {
    if (!this._flashOn && !this._destroyed && (this._flashOn = !0, this._active && !this._paused))
      try {
        if (!await this.hasFlash())
          throw "No flash available";
        await this.$video.srcObject.getVideoTracks()[0].applyConstraints({ advanced: [{ torch: !0 }] });
      } catch (e) {
        throw this._flashOn = !1, e;
      }
  }
  async turnFlashOff() {
    this._flashOn && (this._flashOn = !1, await this._restartVideoStream());
  }
  destroy() {
    this.$video.removeEventListener("loadedmetadata", this._onLoadedMetaData), this.$video.removeEventListener("play", this._onPlay), document.removeEventListener(
      "visibilitychange",
      this._onVisibilityChange
    ), window.removeEventListener("resize", this._updateOverlay), this._destroyed = !0, this._flashOn = !1, this.stop(), s._postWorkerMessage(this._qrEnginePromise, "close");
  }
  async start() {
    if (this._destroyed)
      throw Error("The QR scanner can not be started as it had been destroyed.");
    if ((!this._active || this._paused) && (window.location.protocol !== "https:" && console.warn("The camera stream is only accessible if the page is transferred via https."), this._active = !0, !document.hidden))
      if (this._paused = !1, this.$video.srcObject)
        await this.$video.play();
      else
        try {
          let { stream: e, facingMode: t } = await this._getCameraStream();
          !this._active || this._paused ? s._stopVideoStream(e) : (this._setVideoMirror(t), this.$video.srcObject = e, await this.$video.play(), this._flashOn && (this._flashOn = !1, this.turnFlashOn().catch(() => {
          })));
        } catch (e) {
          if (!this._paused)
            throw this._active = !1, e;
        }
  }
  stop() {
    this.pause(), this._active = !1;
  }
  async pause(e = !1) {
    if (this._paused = !0, !this._active)
      return !0;
    this.$video.pause(), this.$overlay && (this.$overlay.style.display = "none");
    let t = () => {
      this.$video.srcObject instanceof MediaStream && (s._stopVideoStream(this.$video.srcObject), this.$video.srcObject = null);
    };
    return e ? (t(), !0) : (await new Promise((i) => setTimeout(i, 300)), this._paused ? (t(), !0) : !1);
  }
  async setCamera(e) {
    e !== this._preferredCamera && (this._preferredCamera = e, await this._restartVideoStream());
  }
  static async scanImage(e, t, i, a, n = !1, o = !1) {
    let l, c = !1;
    t && ("scanRegion" in t || "qrEngine" in t || "canvas" in t || "disallowCanvasResizing" in t || "alsoTryWithoutScanRegion" in t || "returnDetailedScanResult" in t) ? (l = t.scanRegion, i = t.qrEngine, a = t.canvas, n = t.disallowCanvasResizing || !1, o = t.alsoTryWithoutScanRegion || !1, c = !0) : console.warn(t || i || a || n || o ? "You're using a deprecated api for scanImage which will be removed in the future." : "Note that the return type of scanImage will change in the future. To already switch to the new api today, you can pass returnDetailedScanResult: true."), t = !!i;
    try {
      let g, h;
      [i, g] = await Promise.all([i || s.createQrEngine(), s._loadImage(e)]), [a, h] = s._drawToCanvas(g, l, a, n);
      let m;
      if (i instanceof Worker) {
        let r = i;
        t || s._postWorkerMessageSync(r, "inversionMode", "both"), m = await new Promise((d, p) => {
          let _, y, v, w = -1;
          y = (u) => {
            u.data.id === w && (r.removeEventListener("message", y), r.removeEventListener("error", v), clearTimeout(_), u.data.data !== null ? d({ data: u.data.data, cornerPoints: s._convertPoints(u.data.cornerPoints, l) }) : p(s.NO_QR_CODE_FOUND));
          }, v = (u) => {
            r.removeEventListener("message", y), r.removeEventListener("error", v), clearTimeout(_), p("Scanner error: " + (u ? u.message || u : "Unknown Error"));
          }, r.addEventListener("message", y), r.addEventListener("error", v), _ = setTimeout(() => v("timeout"), 1e4);
          let f = h.getImageData(0, 0, a.width, a.height);
          w = s._postWorkerMessageSync(r, "decode", f, [f.data.buffer]);
        });
      } else
        m = await Promise.race([new Promise((r, d) => window.setTimeout(() => d("Scanner error: timeout"), 1e4)), (async () => {
          try {
            var [r] = await i.detect(a);
            if (!r)
              throw s.NO_QR_CODE_FOUND;
            return { data: r.rawValue, cornerPoints: s._convertPoints(r.cornerPoints, l) };
          } catch (d) {
            if (r = d.message || d, /not implemented|service unavailable/.test(r))
              return s._disableBarcodeDetector = !0, s.scanImage(e, { scanRegion: l, canvas: a, disallowCanvasResizing: n, alsoTryWithoutScanRegion: o });
            throw `Scanner error: ${r}`;
          }
        })()]);
      return c ? m : m.data;
    } catch (g) {
      if (!l || !o)
        throw g;
      let h = await s.scanImage(e, { qrEngine: i, canvas: a, disallowCanvasResizing: n });
      return c ? h : h.data;
    } finally {
      t || s._postWorkerMessage(i, "close");
    }
  }
  setGrayscaleWeights(e, t, i, a = !0) {
    s._postWorkerMessage(this._qrEnginePromise, "grayscaleWeights", {
      red: e,
      green: t,
      blue: i,
      useIntegerApproximation: a
    });
  }
  setInversionMode(e) {
    s._postWorkerMessage(this._qrEnginePromise, "inversionMode", e);
  }
  static async createQrEngine(e) {
    if (e && console.warn("Specifying a worker path is not required and not supported anymore."), e = () => import("./vue3-components2.js").then((i) => i.createWorker()), !(!s._disableBarcodeDetector && "BarcodeDetector" in window && BarcodeDetector.getSupportedFormats && (await BarcodeDetector.getSupportedFormats()).includes("qr_code")))
      return e();
    let t = navigator.userAgentData;
    return t && t.brands.some(({ brand: i }) => /Chromium/i.test(i)) && /mac ?OS/i.test(t.platform) && await t.getHighEntropyValues(["architecture", "platformVersion"]).then(({ architecture: i, platformVersion: a }) => /arm/i.test(i || "arm") && 13 <= parseInt(a || "13")).catch(() => !0) ? e() : new BarcodeDetector({ formats: ["qr_code"] });
  }
  _onPlay() {
    this._scanRegion = this._calculateScanRegion(this.$video), this._updateOverlay(), this.$overlay && (this.$overlay.style.display = ""), this._scanFrame();
  }
  _onLoadedMetaData() {
    this._scanRegion = this._calculateScanRegion(this.$video), this._updateOverlay();
  }
  _onVisibilityChange() {
    document.hidden ? this.pause() : this._active && this.start();
  }
  _calculateScanRegion(e) {
    let t = Math.round(0.6666666666666666 * Math.min(e.videoWidth, e.videoHeight));
    return { x: Math.round((e.videoWidth - t) / 2), y: Math.round((e.videoHeight - t) / 2), width: t, height: t, downScaledWidth: this._legacyCanvasSize, downScaledHeight: this._legacyCanvasSize };
  }
  _updateOverlay() {
    requestAnimationFrame(() => {
      if (this.$overlay) {
        var e = this.$video, t = e.videoWidth, i = e.videoHeight, a = e.offsetWidth, n = e.offsetHeight, o = e.offsetLeft, l = e.offsetTop, c = window.getComputedStyle(e), g = c.objectFit, h = t / i, m = a / n;
        switch (g) {
          case "none":
            var r = t, d = i;
            break;
          case "fill":
            r = a, d = n;
            break;
          default:
            (g === "cover" ? h > m : h < m) ? (d = n, r = d * h) : (r = a, d = r / h), g === "scale-down" && (r = Math.min(r, t), d = Math.min(d, i));
        }
        var [p, _] = c.objectPosition.split(" ").map((v, w) => {
          const f = parseFloat(v);
          return v.endsWith("%") ? (w ? n - d : a - r) * f / 100 : f;
        });
        c = this._scanRegion.width || t, m = this._scanRegion.height || i, g = this._scanRegion.x || 0;
        var y = this._scanRegion.y || 0;
        h = this.$overlay.style, h.width = `${c / t * r}px`, h.height = `${m / i * d}px`, h.top = `${l + _ + y / i * d}px`, i = /scaleX\(-1\)/.test(e.style.transform), h.left = `${o + (i ? a - p - r : p) + (i ? t - g - c : g) / t * r}px`, h.transform = e.style.transform;
      }
    });
  }
  static _convertPoints(e, t) {
    if (!t)
      return e;
    let i = t.x || 0, a = t.y || 0, n = t.width && t.downScaledWidth ? t.width / t.downScaledWidth : 1;
    t = t.height && t.downScaledHeight ? t.height / t.downScaledHeight : 1;
    for (let o of e)
      o.x = o.x * n + i, o.y = o.y * t + a;
    return e;
  }
  _scanFrame() {
    !this._active || this.$video.paused || this.$video.ended || ("requestVideoFrameCallback" in this.$video ? this.$video.requestVideoFrameCallback.bind(this.$video) : requestAnimationFrame)(async () => {
      if (!(1 >= this.$video.readyState)) {
        var e = Date.now() - this._lastScanTimestamp, t = 1e3 / this._maxScansPerSecond;
        e < t && await new Promise((a) => setTimeout(a, t - e)), this._lastScanTimestamp = Date.now();
        try {
          var i = await s.scanImage(this.$video, { scanRegion: this._scanRegion, qrEngine: this._qrEnginePromise, canvas: this.$canvas });
        } catch (a) {
          if (!this._active)
            return;
          this._onDecodeError(a);
        }
        !s._disableBarcodeDetector || await this._qrEnginePromise instanceof Worker || (this._qrEnginePromise = s.createQrEngine()), i ? (this._onDecode ? this._onDecode(i) : this._legacyOnDecode && this._legacyOnDecode(i.data), this.$codeOutlineHighlight && (clearTimeout(this._codeOutlineHighlightRemovalTimeout), this._codeOutlineHighlightRemovalTimeout = void 0, this.$codeOutlineHighlight.setAttribute("viewBox", `${this._scanRegion.x || 0} ${this._scanRegion.y || 0} ${this._scanRegion.width || this.$video.videoWidth} ${this._scanRegion.height || this.$video.videoHeight}`), this.$codeOutlineHighlight.firstElementChild.setAttribute(
          "points",
          i.cornerPoints.map(({ x: a, y: n }) => `${a},${n}`).join(" ")
        ), this.$codeOutlineHighlight.style.display = "")) : this.$codeOutlineHighlight && !this._codeOutlineHighlightRemovalTimeout && (this._codeOutlineHighlightRemovalTimeout = setTimeout(() => this.$codeOutlineHighlight.style.display = "none", 100));
      }
      this._scanFrame();
    });
  }
  _onDecodeError(e) {
    e !== s.NO_QR_CODE_FOUND && console.log(e);
  }
  async _getCameraStream() {
    if (!navigator.mediaDevices)
      throw "Camera not found.";
    let e = /^(environment|user)$/.test(this._preferredCamera) ? "facingMode" : "deviceId", t = [{ width: { min: 1024 } }, { width: { min: 768 } }, {}], i = t.map((a) => Object.assign({}, a, { [e]: { exact: this._preferredCamera } }));
    for (let a of [...i, ...t])
      try {
        let n = await navigator.mediaDevices.getUserMedia({ video: a, audio: !1 }), o = this._getFacingMode(n) || (a.facingMode ? this._preferredCamera : this._preferredCamera === "environment" ? "user" : "environment");
        return { stream: n, facingMode: o };
      } catch {
      }
    throw "Camera not found.";
  }
  async _restartVideoStream() {
    let e = this._paused;
    await this.pause(!0) && !e && this._active && await this.start();
  }
  static _stopVideoStream(e) {
    for (let t of e.getTracks())
      t.stop(), e.removeTrack(t);
  }
  _setVideoMirror(e) {
    this.$video.style.transform = "scaleX(" + (e === "user" ? -1 : 1) + ")";
  }
  _getFacingMode(e) {
    return (e = e.getVideoTracks()[0]) ? /rear|back|environment/i.test(e.label) ? "environment" : /front|user|face/i.test(e.label) ? "user" : null : null;
  }
  static _drawToCanvas(e, t, i, a = !1) {
    i = i || document.createElement("canvas");
    let n = t && t.x ? t.x : 0, o = t && t.y ? t.y : 0, l = t && t.width ? t.width : e.videoWidth || e.width, c = t && t.height ? t.height : e.videoHeight || e.height;
    return a || (a = t && t.downScaledWidth ? t.downScaledWidth : l, t = t && t.downScaledHeight ? t.downScaledHeight : c, i.width !== a && (i.width = a), i.height !== t && (i.height = t)), t = i.getContext("2d", { alpha: !1 }), t.imageSmoothingEnabled = !1, t.drawImage(e, n, o, l, c, 0, 0, i.width, i.height), [i, t];
  }
  static async _loadImage(e) {
    if (e instanceof Image)
      return await s._awaitImageLoad(e), e;
    if (e instanceof HTMLVideoElement || e instanceof HTMLCanvasElement || e instanceof SVGImageElement || "OffscreenCanvas" in window && e instanceof OffscreenCanvas || "ImageBitmap" in window && e instanceof ImageBitmap)
      return e;
    if (e instanceof File || e instanceof Blob || e instanceof URL || typeof e == "string") {
      let t = new Image();
      t.src = e instanceof File || e instanceof Blob ? URL.createObjectURL(e) : e.toString();
      try {
        return await s._awaitImageLoad(t), t;
      } finally {
        (e instanceof File || e instanceof Blob) && URL.revokeObjectURL(t.src);
      }
    } else
      throw "Unsupported image type.";
  }
  static async _awaitImageLoad(e) {
    e.complete && e.naturalWidth !== 0 || await new Promise((t, i) => {
      let a = (n) => {
        e.removeEventListener("load", a), e.removeEventListener("error", a), n instanceof ErrorEvent ? i("Image load error") : t();
      };
      e.addEventListener("load", a), e.addEventListener("error", a);
    });
  }
  static async _postWorkerMessage(e, t, i, a) {
    return s._postWorkerMessageSync(await e, t, i, a);
  }
  static _postWorkerMessageSync(e, t, i, a) {
    if (!(e instanceof Worker))
      return -1;
    let n = s._workerMessageId++;
    return e.postMessage({ id: n, type: t, data: i }, a), n;
  }
}
s.DEFAULT_CANVAS_SIZE = 400;
s.NO_QR_CODE_FOUND = "No QR code found";
s._disableBarcodeDetector = !1;
s._workerMessageId = 0;
const S = s;
export {
  S as default
};
//# sourceMappingURL=vue3-components.js.map
