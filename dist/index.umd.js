(function(t,e){typeof exports=="object"&&typeof module<"u"?e(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],e):(t=typeof globalThis<"u"?globalThis:t||self,e(t["et-ui-sdk"]={},t.Vue))})(this,function(t,e){"use strict";class i{ping(){return console.info("ping!"),"PING!"}}const _={class:"personal-button"},r=e.defineComponent({__name:"etButton",props:{text:{}},setup(n){const o=n;return(s,c)=>(e.openBlock(),e.createElementBlock("button",_,e.toDisplayString(o.text),1))}}),f="",u=((n,o)=>{const s=n.__vccOpts||n;for(const[c,p]of o)s[c]=p;return s})(r,[["__scopeId","data-v-31987fc7"]]);t.EtButton=u,t.Sonar=i,Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})});
