var s=Object.defineProperty;var n=(t,a)=>s(t,"name",{value:a,configurable:!0});import{_ as d,g as f,f as l,i as m}from"./iframe.2b7533fd.js";var u=d,C=f,x=l,h=m,c=C.RangeError,i=String.fromCharCode,g=String.fromCodePoint,b=x([].join),E=!!g&&g.length!=1;u({target:"String",stat:!0,forced:E},{fromCodePoint:n(function(a){for(var e=[],v=arguments.length,o=0,r;v>o;){if(r=+arguments[o++],h(r,1114111)!==r)throw c(r+" is not a valid code point");e[o]=r<65536?i(r):i(((r-=65536)>>10)+55296,r%1024+56320)}return b(e,"")},"fromCodePoint")});
//# sourceMappingURL=es.string.from-code-point.f78b7f76.js.map