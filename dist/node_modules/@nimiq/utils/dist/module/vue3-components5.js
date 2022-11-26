var l;
(function(s) {
  s.NIM = "nim", s.BTC = "btc", s.ETH = "eth";
})(l || (l = {}));
var f;
(function(s) {
  s.AED = "aed", s.ARS = "ars", s.AUD = "aud", s.BDT = "bdt", s.BHD = "bhd", s.BMD = "bmd", s.BRL = "brl", s.CAD = "cad", s.CHF = "chf", s.CLP = "clp", s.CNY = "cny", s.CZK = "czk", s.DKK = "dkk", s.EUR = "eur", s.GBP = "gbp", s.HKD = "hkd", s.HUF = "huf", s.IDR = "idr", s.ILS = "ils", s.INR = "inr", s.JPY = "jpy", s.KRW = "krw", s.KWD = "kwd", s.LKR = "lkr", s.MMK = "mmk", s.MXN = "mxn", s.MYR = "myr", s.NOK = "nok", s.NGN = "ngn", s.NZD = "nzd", s.PHP = "php", s.PKR = "pkr", s.PLN = "pln", s.RUB = "rub", s.SAR = "sar", s.SEK = "sek", s.SGD = "sgd", s.THB = "thb", s.TRY = "try", s.TWD = "twd", s.UAH = "uah", s.USD = "usd", s.VND = "vnd", s.ZAR = "zar";
})(f || (f = {}));
const N = "https://api.coingecko.com/api/v3", k = {
  [l.NIM]: "nimiq-2",
  [l.BTC]: "bitcoin",
  [l.ETH]: "ethereum"
};
async function B(s, m) {
  s = s.map((h) => h.toLowerCase());
  const R = s.map((h) => k[h]), D = await K(`${N}/simple/price?ids=${R.join(",")}&vs_currencies=${m.join(",")}`);
  return s.reduce((h, w) => ({
    ...h,
    [w]: D[k[w]]
  }), {});
}
async function K(s, m) {
  let R = null;
  do {
    let D = !0;
    try {
      const h = await fetch(s, m);
      if (!h.ok)
        throw h.status === 400 ? (D = !1, new Error("400 - Bad request")) : new Error(`Failed to fetch: ${h.status}. Retrying...`);
      R = await h.json();
    } catch (h) {
      if (D)
        await new Promise((w) => setTimeout(w, 15e3));
      else
        throw h;
    }
  } while (!R);
  return R;
}
export {
  l as FiatApiSupportedCryptoCurrency,
  f as FiatApiSupportedFiatCurrency,
  B as getExchangeRates
};
//# sourceMappingURL=vue3-components5.js.map
