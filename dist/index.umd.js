(function(E,k){typeof exports=="object"&&typeof module<"u"?k(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],k):(E=typeof globalThis<"u"?globalThis:E||self,k(E["et-ui-sdk"]={},E.Vue))})(this,function(E,k){"use strict";var rr=Object.defineProperty;var ir=(E,k,B)=>k in E?rr(E,k,{enumerable:!0,configurable:!0,writable:!0,value:B}):E[k]=B;var pt=(E,k,B)=>(ir(E,typeof k!="symbol"?k+"":k,B),B);class B{ping(){return"PING!"}}const or="";function pn(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);n&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),e.push.apply(e,a)}return e}function c(t){for(var n=1;n<arguments.length;n++){var e=arguments[n]!=null?arguments[n]:{};n%2?pn(Object(e),!0).forEach(function(a){w(t,a,e[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):pn(Object(e)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(e,a))})}return t}function bt(t){return bt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},bt(t)}function de(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function bn(t,n){for(var e=0;e<n.length;e++){var a=n[e];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function ve(t,n,e){return n&&bn(t.prototype,n),e&&bn(t,e),Object.defineProperty(t,"prototype",{writable:!1}),t}function w(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function Rt(t,n){return be(t)||he(t,n)||gn(t,n)||ke()}function rt(t){return pe(t)||ge(t)||gn(t)||ye()}function pe(t){if(Array.isArray(t))return Lt(t)}function be(t){if(Array.isArray(t))return t}function ge(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function he(t,n){var e=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(e!=null){var a=[],r=!0,o=!1,i,s;try{for(e=e.call(t);!(r=(i=e.next()).done)&&(a.push(i.value),!(n&&a.length===n));r=!0);}catch(f){o=!0,s=f}finally{try{!r&&e.return!=null&&e.return()}finally{if(o)throw s}}return a}}function gn(t,n){if(t){if(typeof t=="string")return Lt(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);if(e==="Object"&&t.constructor&&(e=t.constructor.name),e==="Map"||e==="Set")return Array.from(t);if(e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return Lt(t,n)}}function Lt(t,n){(n==null||n>t.length)&&(n=t.length);for(var e=0,a=new Array(n);e<n;e++)a[e]=t[e];return a}function ye(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ke(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var hn=function(){},Dt={},yn={},kn=null,wn={mark:hn,measure:hn};try{typeof window<"u"&&(Dt=window),typeof document<"u"&&(yn=document),typeof MutationObserver<"u"&&(kn=MutationObserver),typeof performance<"u"&&(wn=performance)}catch{}var we=Dt.navigator||{},xn=we.userAgent,An=xn===void 0?"":xn,$=Dt,g=yn,_n=kn,gt=wn;$.document;var L=!!g.documentElement&&!!g.head&&typeof g.addEventListener=="function"&&typeof g.createElement=="function",En=~An.indexOf("MSIE")||~An.indexOf("Trident/"),ht,yt,kt,wt,xt,D="___FONT_AWESOME___",Ft=16,Sn="fa",Cn="svg-inline--fa",W="data-fa-i2svg",zt="data-fa-pseudo-element",xe="data-fa-pseudo-element-pending",$t="data-prefix",jt="data-icon",On="fontawesome-i2svg",Ae="async",_e=["HTML","HEAD","STYLE","SCRIPT"],Pn=function(){try{return process.env.NODE_ENV==="production"}catch{return!1}}(),h="classic",y="sharp",Yt=[h,y];function it(t){return new Proxy(t,{get:function(e,a){return a in e?e[a]:e[h]}})}var ot=it((ht={},w(ht,h,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit","fa-kit":"kit"}),w(ht,y,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light"}),ht)),st=it((yt={},w(yt,h,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),w(yt,y,{solid:"fass",regular:"fasr",light:"fasl"}),yt)),ft=it((kt={},w(kt,h,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),w(kt,y,{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light"}),kt)),Ee=it((wt={},w(wt,h,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),w(wt,y,{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl"}),wt)),Se=/fa(s|r|l|t|d|b|k|ss|sr|sl)?[\-\ ]/,Nn="fa-layers-text",Ce=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,Oe=it((xt={},w(xt,h,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),w(xt,y,{900:"fass",400:"fasr",300:"fasl"}),xt)),Tn=[1,2,3,4,5,6,7,8,9,10],Pe=Tn.concat([11,12,13,14,15,16,17,18,19,20]),Ne=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],G={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},lt=new Set;Object.keys(st[h]).map(lt.add.bind(lt)),Object.keys(st[y]).map(lt.add.bind(lt));var Te=[].concat(Yt,rt(lt),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",G.GROUP,G.SWAP_OPACITY,G.PRIMARY,G.SECONDARY]).concat(Tn.map(function(t){return"".concat(t,"x")})).concat(Pe.map(function(t){return"w-".concat(t)})),ct=$.FontAwesomeConfig||{};function Ie(t){var n=g.querySelector("script["+t+"]");if(n)return n.getAttribute(t)}function Me(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}if(g&&typeof g.querySelector=="function"){var Re=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];Re.forEach(function(t){var n=Rt(t,2),e=n[0],a=n[1],r=Me(Ie(e));r!=null&&(ct[a]=r)})}var In={styleDefault:"solid",familyDefault:"classic",cssPrefix:Sn,replacementClass:Cn,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};ct.familyPrefix&&(ct.cssPrefix=ct.familyPrefix);var J=c(c({},In),ct);J.autoReplaceSvg||(J.observeMutations=!1);var m={};Object.keys(In).forEach(function(t){Object.defineProperty(m,t,{enumerable:!0,set:function(e){J[t]=e,ut.forEach(function(a){return a(m)})},get:function(){return J[t]}})}),Object.defineProperty(m,"familyPrefix",{enumerable:!0,set:function(n){J.cssPrefix=n,ut.forEach(function(e){return e(m)})},get:function(){return J.cssPrefix}}),$.FontAwesomeConfig=m;var ut=[];function Le(t){return ut.push(t),function(){ut.splice(ut.indexOf(t),1)}}var j=Ft,I={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function De(t){if(!(!t||!L)){var n=g.createElement("style");n.setAttribute("type","text/css"),n.innerHTML=t;for(var e=g.head.childNodes,a=null,r=e.length-1;r>-1;r--){var o=e[r],i=(o.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(i)>-1&&(a=o)}return g.head.insertBefore(n,a),t}}var Fe="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function mt(){for(var t=12,n="";t-- >0;)n+=Fe[Math.random()*62|0];return n}function Z(t){for(var n=[],e=(t||[]).length>>>0;e--;)n[e]=t[e];return n}function Ut(t){return t.classList?Z(t.classList):(t.getAttribute("class")||"").split(" ").filter(function(n){return n})}function Mn(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ze(t){return Object.keys(t||{}).reduce(function(n,e){return n+"".concat(e,'="').concat(Mn(t[e]),'" ')},"").trim()}function At(t){return Object.keys(t||{}).reduce(function(n,e){return n+"".concat(e,": ").concat(t[e].trim(),";")},"")}function Ht(t){return t.size!==I.size||t.x!==I.x||t.y!==I.y||t.rotate!==I.rotate||t.flipX||t.flipY}function $e(t){var n=t.transform,e=t.containerWidth,a=t.iconWidth,r={transform:"translate(".concat(e/2," 256)")},o="translate(".concat(n.x*32,", ").concat(n.y*32,") "),i="scale(".concat(n.size/16*(n.flipX?-1:1),", ").concat(n.size/16*(n.flipY?-1:1),") "),s="rotate(".concat(n.rotate," 0 0)"),f={transform:"".concat(o," ").concat(i," ").concat(s)},u={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:f,path:u}}function je(t){var n=t.transform,e=t.width,a=e===void 0?Ft:e,r=t.height,o=r===void 0?Ft:r,i=t.startCentered,s=i===void 0?!1:i,f="";return s&&En?f+="translate(".concat(n.x/j-a/2,"em, ").concat(n.y/j-o/2,"em) "):s?f+="translate(calc(-50% + ".concat(n.x/j,"em), calc(-50% + ").concat(n.y/j,"em)) "):f+="translate(".concat(n.x/j,"em, ").concat(n.y/j,"em) "),f+="scale(".concat(n.size/j*(n.flipX?-1:1),", ").concat(n.size/j*(n.flipY?-1:1),") "),f+="rotate(".concat(n.rotate,"deg) "),f}var Ye=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function Rn(){var t=Sn,n=Cn,e=m.cssPrefix,a=m.replacementClass,r=Ye;if(e!==t||a!==n){var o=new RegExp("\\.".concat(t,"\\-"),"g"),i=new RegExp("\\--".concat(t,"\\-"),"g"),s=new RegExp("\\.".concat(n),"g");r=r.replace(o,".".concat(e,"-")).replace(i,"--".concat(e,"-")).replace(s,".".concat(a))}return r}var Ln=!1;function Bt(){m.autoAddCss&&!Ln&&(De(Rn()),Ln=!0)}var Ue={mixout:function(){return{dom:{css:Rn,insertCss:Bt}}},hooks:function(){return{beforeDOMElementCreation:function(){Bt()},beforeI2svg:function(){Bt()}}}},F=$||{};F[D]||(F[D]={}),F[D].styles||(F[D].styles={}),F[D].hooks||(F[D].hooks={}),F[D].shims||(F[D].shims=[]);var N=F[D],Dn=[],He=function t(){g.removeEventListener("DOMContentLoaded",t),_t=1,Dn.map(function(n){return n()})},_t=!1;L&&(_t=(g.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(g.readyState),_t||g.addEventListener("DOMContentLoaded",He));function Be(t){L&&(_t?setTimeout(t,0):Dn.push(t))}function dt(t){var n=t.tag,e=t.attributes,a=e===void 0?{}:e,r=t.children,o=r===void 0?[]:r;return typeof t=="string"?Mn(t):"<".concat(n," ").concat(ze(a),">").concat(o.map(dt).join(""),"</").concat(n,">")}function Fn(t,n,e){if(t&&t[n]&&t[n][e])return{prefix:n,iconName:e,icon:t[n][e]}}var We=function(n,e){return function(a,r,o,i){return n.call(e,a,r,o,i)}},Wt=function(n,e,a,r){var o=Object.keys(n),i=o.length,s=r!==void 0?We(e,r):e,f,u,l;for(a===void 0?(f=1,l=n[o[0]]):(f=0,l=a);f<i;f++)u=o[f],l=s(l,n[u],u,n);return l};function Ge(t){for(var n=[],e=0,a=t.length;e<a;){var r=t.charCodeAt(e++);if(r>=55296&&r<=56319&&e<a){var o=t.charCodeAt(e++);(o&64512)==56320?n.push(((r&1023)<<10)+(o&1023)+65536):(n.push(r),e--)}else n.push(r)}return n}function Gt(t){var n=Ge(t);return n.length===1?n[0].toString(16):null}function Xe(t,n){var e=t.length,a=t.charCodeAt(n),r;return a>=55296&&a<=56319&&e>n+1&&(r=t.charCodeAt(n+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function zn(t){return Object.keys(t).reduce(function(n,e){var a=t[e],r=!!a.icon;return r?n[a.iconName]=a.icon:n[e]=a,n},{})}function Xt(t,n){var e=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},a=e.skipHooks,r=a===void 0?!1:a,o=zn(n);typeof N.hooks.addPack=="function"&&!r?N.hooks.addPack(t,zn(n)):N.styles[t]=c(c({},N.styles[t]||{}),o),t==="fas"&&Xt("fa",n)}var Et,St,Ct,tt=N.styles,Ve=N.shims,qe=(Et={},w(Et,h,Object.values(ft[h])),w(Et,y,Object.values(ft[y])),Et),Vt=null,$n={},jn={},Yn={},Un={},Hn={},Ke=(St={},w(St,h,Object.keys(ot[h])),w(St,y,Object.keys(ot[y])),St);function Qe(t){return~Te.indexOf(t)}function Je(t,n){var e=n.split("-"),a=e[0],r=e.slice(1).join("-");return a===t&&r!==""&&!Qe(r)?r:null}var Bn=function(){var n=function(o){return Wt(tt,function(i,s,f){return i[f]=Wt(s,o,{}),i},{})};$n=n(function(r,o,i){if(o[3]&&(r[o[3]]=i),o[2]){var s=o[2].filter(function(f){return typeof f=="number"});s.forEach(function(f){r[f.toString(16)]=i})}return r}),jn=n(function(r,o,i){if(r[i]=i,o[2]){var s=o[2].filter(function(f){return typeof f=="string"});s.forEach(function(f){r[f]=i})}return r}),Hn=n(function(r,o,i){var s=o[2];return r[i]=i,s.forEach(function(f){r[f]=i}),r});var e="far"in tt||m.autoFetchSvg,a=Wt(Ve,function(r,o){var i=o[0],s=o[1],f=o[2];return s==="far"&&!e&&(s="fas"),typeof i=="string"&&(r.names[i]={prefix:s,iconName:f}),typeof i=="number"&&(r.unicodes[i.toString(16)]={prefix:s,iconName:f}),r},{names:{},unicodes:{}});Yn=a.names,Un=a.unicodes,Vt=Ot(m.styleDefault,{family:m.familyDefault})};Le(function(t){Vt=Ot(t.styleDefault,{family:m.familyDefault})}),Bn();function qt(t,n){return($n[t]||{})[n]}function Ze(t,n){return(jn[t]||{})[n]}function X(t,n){return(Hn[t]||{})[n]}function Wn(t){return Yn[t]||{prefix:null,iconName:null}}function ta(t){var n=Un[t],e=qt("fas",t);return n||(e?{prefix:"fas",iconName:e}:null)||{prefix:null,iconName:null}}function Y(){return Vt}var Kt=function(){return{prefix:null,iconName:null,rest:[]}};function Ot(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},e=n.family,a=e===void 0?h:e,r=ot[a][t],o=st[a][t]||st[a][r],i=t in N.styles?t:null;return o||i||null}var Gn=(Ct={},w(Ct,h,Object.keys(ft[h])),w(Ct,y,Object.keys(ft[y])),Ct);function Pt(t){var n,e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=e.skipLookups,r=a===void 0?!1:a,o=(n={},w(n,h,"".concat(m.cssPrefix,"-").concat(h)),w(n,y,"".concat(m.cssPrefix,"-").concat(y)),n),i=null,s=h;(t.includes(o[h])||t.some(function(u){return Gn[h].includes(u)}))&&(s=h),(t.includes(o[y])||t.some(function(u){return Gn[y].includes(u)}))&&(s=y);var f=t.reduce(function(u,l){var d=Je(m.cssPrefix,l);if(tt[l]?(l=qe[s].includes(l)?Ee[s][l]:l,i=l,u.prefix=l):Ke[s].indexOf(l)>-1?(i=l,u.prefix=Ot(l,{family:s})):d?u.iconName=d:l!==m.replacementClass&&l!==o[h]&&l!==o[y]&&u.rest.push(l),!r&&u.prefix&&u.iconName){var v=i==="fa"?Wn(u.iconName):{},b=X(u.prefix,u.iconName);v.prefix&&(i=null),u.iconName=v.iconName||b||u.iconName,u.prefix=v.prefix||u.prefix,u.prefix==="far"&&!tt.far&&tt.fas&&!m.autoFetchSvg&&(u.prefix="fas")}return u},Kt());return(t.includes("fa-brands")||t.includes("fab"))&&(f.prefix="fab"),(t.includes("fa-duotone")||t.includes("fad"))&&(f.prefix="fad"),!f.prefix&&s===y&&(tt.fass||m.autoFetchSvg)&&(f.prefix="fass",f.iconName=X(f.prefix,f.iconName)||f.iconName),(f.prefix==="fa"||i==="fa")&&(f.prefix=Y()||"fas"),f}var na=function(){function t(){de(this,t),this.definitions={}}return ve(t,[{key:"add",value:function(){for(var e=this,a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];var i=r.reduce(this._pullDefinitions,{});Object.keys(i).forEach(function(s){e.definitions[s]=c(c({},e.definitions[s]||{}),i[s]),Xt(s,i[s]);var f=ft[h][s];f&&Xt(f,i[s]),Bn()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(e,a){var r=a.prefix&&a.iconName&&a.icon?{0:a}:a;return Object.keys(r).map(function(o){var i=r[o],s=i.prefix,f=i.iconName,u=i.icon,l=u[2];e[s]||(e[s]={}),l.length>0&&l.forEach(function(d){typeof d=="string"&&(e[s][d]=u)}),e[s][f]=u}),e}}]),t}(),Xn=[],nt={},et={},ea=Object.keys(et);function aa(t,n){var e=n.mixoutsTo;return Xn=t,nt={},Object.keys(et).forEach(function(a){ea.indexOf(a)===-1&&delete et[a]}),Xn.forEach(function(a){var r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(function(i){typeof r[i]=="function"&&(e[i]=r[i]),bt(r[i])==="object"&&Object.keys(r[i]).forEach(function(s){e[i]||(e[i]={}),e[i][s]=r[i][s]})}),a.hooks){var o=a.hooks();Object.keys(o).forEach(function(i){nt[i]||(nt[i]=[]),nt[i].push(o[i])})}a.provides&&a.provides(et)}),e}function Qt(t,n){for(var e=arguments.length,a=new Array(e>2?e-2:0),r=2;r<e;r++)a[r-2]=arguments[r];var o=nt[t]||[];return o.forEach(function(i){n=i.apply(null,[n].concat(a))}),n}function V(t){for(var n=arguments.length,e=new Array(n>1?n-1:0),a=1;a<n;a++)e[a-1]=arguments[a];var r=nt[t]||[];r.forEach(function(o){o.apply(null,e)})}function z(){var t=arguments[0],n=Array.prototype.slice.call(arguments,1);return et[t]?et[t].apply(null,n):void 0}function Jt(t){t.prefix==="fa"&&(t.prefix="fas");var n=t.iconName,e=t.prefix||Y();if(n)return n=X(e,n)||n,Fn(Vn.definitions,e,n)||Fn(N.styles,e,n)}var Vn=new na,ra=function(){m.autoReplaceSvg=!1,m.observeMutations=!1,V("noAuto")},ia={i2svg:function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return L?(V("beforeI2svg",n),z("pseudoElements2svg",n),z("i2svg",n)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=n.autoReplaceSvgRoot;m.autoReplaceSvg===!1&&(m.autoReplaceSvg=!0),m.observeMutations=!0,Be(function(){sa({autoReplaceSvgRoot:e}),V("watch",n)})}},oa={icon:function(n){if(n===null)return null;if(bt(n)==="object"&&n.prefix&&n.iconName)return{prefix:n.prefix,iconName:X(n.prefix,n.iconName)||n.iconName};if(Array.isArray(n)&&n.length===2){var e=n[1].indexOf("fa-")===0?n[1].slice(3):n[1],a=Ot(n[0]);return{prefix:a,iconName:X(a,e)||e}}if(typeof n=="string"&&(n.indexOf("".concat(m.cssPrefix,"-"))>-1||n.match(Se))){var r=Pt(n.split(" "),{skipLookups:!0});return{prefix:r.prefix||Y(),iconName:X(r.prefix,r.iconName)||r.iconName}}if(typeof n=="string"){var o=Y();return{prefix:o,iconName:X(o,n)||n}}}},S={noAuto:ra,config:m,dom:ia,parse:oa,library:Vn,findIconDefinition:Jt,toHtml:dt},sa=function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=n.autoReplaceSvgRoot,a=e===void 0?g:e;(Object.keys(N.styles).length>0||m.autoFetchSvg)&&L&&m.autoReplaceSvg&&S.dom.i2svg({node:a})};function Nt(t,n){return Object.defineProperty(t,"abstract",{get:n}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(function(a){return dt(a)})}}),Object.defineProperty(t,"node",{get:function(){if(L){var a=g.createElement("div");return a.innerHTML=t.html,a.children}}}),t}function fa(t){var n=t.children,e=t.main,a=t.mask,r=t.attributes,o=t.styles,i=t.transform;if(Ht(i)&&e.found&&!a.found){var s=e.width,f=e.height,u={x:s/f/2,y:.5};r.style=At(c(c({},o),{},{"transform-origin":"".concat(u.x+i.x/16,"em ").concat(u.y+i.y/16,"em")}))}return[{tag:"svg",attributes:r,children:n}]}function la(t){var n=t.prefix,e=t.iconName,a=t.children,r=t.attributes,o=t.symbol,i=o===!0?"".concat(n,"-").concat(m.cssPrefix,"-").concat(e):o;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:c(c({},r),{},{id:i}),children:a}]}]}function Zt(t){var n=t.icons,e=n.main,a=n.mask,r=t.prefix,o=t.iconName,i=t.transform,s=t.symbol,f=t.title,u=t.maskId,l=t.titleId,d=t.extra,v=t.watchable,b=v===void 0?!1:v,A=a.found?a:e,P=A.width,T=A.height,M=r==="fak",x=[m.replacementClass,o?"".concat(m.cssPrefix,"-").concat(o):""].filter(function(H){return d.classes.indexOf(H)===-1}).filter(function(H){return H!==""||!!H}).concat(d.classes).join(" "),_={children:[],attributes:c(c({},d.attributes),{},{"data-prefix":r,"data-icon":o,class:x,role:d.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(P," ").concat(T)})},R=M&&!~d.classes.indexOf("fa-fw")?{width:"".concat(P/T*16*.0625,"em")}:{};b&&(_.attributes[W]=""),f&&(_.children.push({tag:"title",attributes:{id:_.attributes["aria-labelledby"]||"title-".concat(l||mt())},children:[f]}),delete _.attributes.title);var C=c(c({},_),{},{prefix:r,iconName:o,main:e,mask:a,maskId:u,transform:i,symbol:s,styles:c(c({},R),d.styles)}),K=a.found&&e.found?z("generateAbstractMask",C)||{children:[],attributes:{}}:z("generateAbstractIcon",C)||{children:[],attributes:{}},Q=K.children,vn=K.attributes;return C.children=Q,C.attributes=vn,s?la(C):fa(C)}function qn(t){var n=t.content,e=t.width,a=t.height,r=t.transform,o=t.title,i=t.extra,s=t.watchable,f=s===void 0?!1:s,u=c(c(c({},i.attributes),o?{title:o}:{}),{},{class:i.classes.join(" ")});f&&(u[W]="");var l=c({},i.styles);Ht(r)&&(l.transform=je({transform:r,startCentered:!0,width:e,height:a}),l["-webkit-transform"]=l.transform);var d=At(l);d.length>0&&(u.style=d);var v=[];return v.push({tag:"span",attributes:u,children:[n]}),o&&v.push({tag:"span",attributes:{class:"sr-only"},children:[o]}),v}function ca(t){var n=t.content,e=t.title,a=t.extra,r=c(c(c({},a.attributes),e?{title:e}:{}),{},{class:a.classes.join(" ")}),o=At(a.styles);o.length>0&&(r.style=o);var i=[];return i.push({tag:"span",attributes:r,children:[n]}),e&&i.push({tag:"span",attributes:{class:"sr-only"},children:[e]}),i}var tn=N.styles;function nn(t){var n=t[0],e=t[1],a=t.slice(4),r=Rt(a,1),o=r[0],i=null;return Array.isArray(o)?i={tag:"g",attributes:{class:"".concat(m.cssPrefix,"-").concat(G.GROUP)},children:[{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(G.SECONDARY),fill:"currentColor",d:o[0]}},{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(G.PRIMARY),fill:"currentColor",d:o[1]}}]}:i={tag:"path",attributes:{fill:"currentColor",d:o}},{found:!0,width:n,height:e,icon:i}}var ua={found:!1,width:512,height:512};function ma(t,n){!Pn&&!m.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(n,'" is missing.'))}function en(t,n){var e=n;return n==="fa"&&m.styleDefault!==null&&(n=Y()),new Promise(function(a,r){if(z("missingIconAbstract"),e==="fa"){var o=Wn(t)||{};t=o.iconName||t,n=o.prefix||n}if(t&&n&&tn[n]&&tn[n][t]){var i=tn[n][t];return a(nn(i))}ma(t,n),a(c(c({},ua),{},{icon:m.showMissingIcons&&t?z("missingIconAbstract")||{}:{}}))})}var Kn=function(){},an=m.measurePerformance&&gt&&gt.mark&&gt.measure?gt:{mark:Kn,measure:Kn},vt='FA "6.4.0"',da=function(n){return an.mark("".concat(vt," ").concat(n," begins")),function(){return Qn(n)}},Qn=function(n){an.mark("".concat(vt," ").concat(n," ends")),an.measure("".concat(vt," ").concat(n),"".concat(vt," ").concat(n," begins"),"".concat(vt," ").concat(n," ends"))},rn={begin:da,end:Qn},Tt=function(){};function Jn(t){var n=t.getAttribute?t.getAttribute(W):null;return typeof n=="string"}function va(t){var n=t.getAttribute?t.getAttribute($t):null,e=t.getAttribute?t.getAttribute(jt):null;return n&&e}function pa(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(m.replacementClass)}function ba(){if(m.autoReplaceSvg===!0)return It.replace;var t=It[m.autoReplaceSvg];return t||It.replace}function ga(t){return g.createElementNS("http://www.w3.org/2000/svg",t)}function ha(t){return g.createElement(t)}function Zn(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},e=n.ceFn,a=e===void 0?t.tag==="svg"?ga:ha:e;if(typeof t=="string")return g.createTextNode(t);var r=a(t.tag);Object.keys(t.attributes||[]).forEach(function(i){r.setAttribute(i,t.attributes[i])});var o=t.children||[];return o.forEach(function(i){r.appendChild(Zn(i,{ceFn:a}))}),r}function ya(t){var n=" ".concat(t.outerHTML," ");return n="".concat(n,"Font Awesome fontawesome.com "),n}var It={replace:function(n){var e=n[0];if(e.parentNode)if(n[1].forEach(function(r){e.parentNode.insertBefore(Zn(r),e)}),e.getAttribute(W)===null&&m.keepOriginalSource){var a=g.createComment(ya(e));e.parentNode.replaceChild(a,e)}else e.remove()},nest:function(n){var e=n[0],a=n[1];if(~Ut(e).indexOf(m.replacementClass))return It.replace(n);var r=new RegExp("".concat(m.cssPrefix,"-.*"));if(delete a[0].attributes.id,a[0].attributes.class){var o=a[0].attributes.class.split(" ").reduce(function(s,f){return f===m.replacementClass||f.match(r)?s.toSvg.push(f):s.toNode.push(f),s},{toNode:[],toSvg:[]});a[0].attributes.class=o.toSvg.join(" "),o.toNode.length===0?e.removeAttribute("class"):e.setAttribute("class",o.toNode.join(" "))}var i=a.map(function(s){return dt(s)}).join(`
`);e.setAttribute(W,""),e.innerHTML=i}};function te(t){t()}function ne(t,n){var e=typeof n=="function"?n:Tt;if(t.length===0)e();else{var a=te;m.mutateApproach===Ae&&(a=$.requestAnimationFrame||te),a(function(){var r=ba(),o=rn.begin("mutate");t.map(r),o(),e()})}}var on=!1;function ee(){on=!0}function sn(){on=!1}var Mt=null;function ae(t){if(_n&&m.observeMutations){var n=t.treeCallback,e=n===void 0?Tt:n,a=t.nodeCallback,r=a===void 0?Tt:a,o=t.pseudoElementsCallback,i=o===void 0?Tt:o,s=t.observeMutationsRoot,f=s===void 0?g:s;Mt=new _n(function(u){if(!on){var l=Y();Z(u).forEach(function(d){if(d.type==="childList"&&d.addedNodes.length>0&&!Jn(d.addedNodes[0])&&(m.searchPseudoElements&&i(d.target),e(d.target)),d.type==="attributes"&&d.target.parentNode&&m.searchPseudoElements&&i(d.target.parentNode),d.type==="attributes"&&Jn(d.target)&&~Ne.indexOf(d.attributeName))if(d.attributeName==="class"&&va(d.target)){var v=Pt(Ut(d.target)),b=v.prefix,A=v.iconName;d.target.setAttribute($t,b||l),A&&d.target.setAttribute(jt,A)}else pa(d.target)&&r(d.target)})}}),L&&Mt.observe(f,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function ka(){Mt&&Mt.disconnect()}function wa(t){var n=t.getAttribute("style"),e=[];return n&&(e=n.split(";").reduce(function(a,r){var o=r.split(":"),i=o[0],s=o.slice(1);return i&&s.length>0&&(a[i]=s.join(":").trim()),a},{})),e}function xa(t){var n=t.getAttribute("data-prefix"),e=t.getAttribute("data-icon"),a=t.innerText!==void 0?t.innerText.trim():"",r=Pt(Ut(t));return r.prefix||(r.prefix=Y()),n&&e&&(r.prefix=n,r.iconName=e),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=Ze(r.prefix,t.innerText)||qt(r.prefix,Gt(t.innerText))),!r.iconName&&m.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=t.firstChild.data)),r}function Aa(t){var n=Z(t.attributes).reduce(function(r,o){return r.name!=="class"&&r.name!=="style"&&(r[o.name]=o.value),r},{}),e=t.getAttribute("title"),a=t.getAttribute("data-fa-title-id");return m.autoA11y&&(e?n["aria-labelledby"]="".concat(m.replacementClass,"-title-").concat(a||mt()):(n["aria-hidden"]="true",n.focusable="false")),n}function _a(){return{iconName:null,title:null,titleId:null,prefix:null,transform:I,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function re(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},e=xa(t),a=e.iconName,r=e.prefix,o=e.rest,i=Aa(t),s=Qt("parseNodeAttributes",{},t),f=n.styleParser?wa(t):[];return c({iconName:a,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:r,transform:I,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:o,styles:f,attributes:i}},s)}var Ea=N.styles;function ie(t){var n=m.autoReplaceSvg==="nest"?re(t,{styleParser:!1}):re(t);return~n.extra.classes.indexOf(Nn)?z("generateLayersText",t,n):z("generateSvgReplacementMutation",t,n)}var U=new Set;Yt.map(function(t){U.add("fa-".concat(t))}),Object.keys(ot[h]).map(U.add.bind(U)),Object.keys(ot[y]).map(U.add.bind(U)),U=rt(U);function oe(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!L)return Promise.resolve();var e=g.documentElement.classList,a=function(d){return e.add("".concat(On,"-").concat(d))},r=function(d){return e.remove("".concat(On,"-").concat(d))},o=m.autoFetchSvg?U:Yt.map(function(l){return"fa-".concat(l)}).concat(Object.keys(Ea));o.includes("fa")||o.push("fa");var i=[".".concat(Nn,":not([").concat(W,"])")].concat(o.map(function(l){return".".concat(l,":not([").concat(W,"])")})).join(", ");if(i.length===0)return Promise.resolve();var s=[];try{s=Z(t.querySelectorAll(i))}catch{}if(s.length>0)a("pending"),r("complete");else return Promise.resolve();var f=rn.begin("onTree"),u=s.reduce(function(l,d){try{var v=ie(d);v&&l.push(v)}catch(b){Pn||b.name==="MissingIcon"&&console.error(b)}return l},[]);return new Promise(function(l,d){Promise.all(u).then(function(v){ne(v,function(){a("active"),a("complete"),r("pending"),typeof n=="function"&&n(),f(),l()})}).catch(function(v){f(),d(v)})})}function Sa(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;ie(t).then(function(e){e&&ne([e],n)})}function Ca(t){return function(n){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=(n||{}).icon?n:Jt(n||{}),r=e.mask;return r&&(r=(r||{}).icon?r:Jt(r||{})),t(a,c(c({},e),{},{mask:r}))}}var Oa=function(n){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=e.transform,r=a===void 0?I:a,o=e.symbol,i=o===void 0?!1:o,s=e.mask,f=s===void 0?null:s,u=e.maskId,l=u===void 0?null:u,d=e.title,v=d===void 0?null:d,b=e.titleId,A=b===void 0?null:b,P=e.classes,T=P===void 0?[]:P,M=e.attributes,x=M===void 0?{}:M,_=e.styles,R=_===void 0?{}:_;if(n){var C=n.prefix,K=n.iconName,Q=n.icon;return Nt(c({type:"icon"},n),function(){return V("beforeDOMElementCreation",{iconDefinition:n,params:e}),m.autoA11y&&(v?x["aria-labelledby"]="".concat(m.replacementClass,"-title-").concat(A||mt()):(x["aria-hidden"]="true",x.focusable="false")),Zt({icons:{main:nn(Q),mask:f?nn(f.icon):{found:!1,width:null,height:null,icon:{}}},prefix:C,iconName:K,transform:c(c({},I),r),symbol:i,title:v,maskId:l,titleId:A,extra:{attributes:x,styles:R,classes:T}})})}},Pa={mixout:function(){return{icon:Ca(Oa)}},hooks:function(){return{mutationObserverCallbacks:function(e){return e.treeCallback=oe,e.nodeCallback=Sa,e}}},provides:function(n){n.i2svg=function(e){var a=e.node,r=a===void 0?g:a,o=e.callback,i=o===void 0?function(){}:o;return oe(r,i)},n.generateSvgReplacementMutation=function(e,a){var r=a.iconName,o=a.title,i=a.titleId,s=a.prefix,f=a.transform,u=a.symbol,l=a.mask,d=a.maskId,v=a.extra;return new Promise(function(b,A){Promise.all([en(r,s),l.iconName?en(l.iconName,l.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(P){var T=Rt(P,2),M=T[0],x=T[1];b([e,Zt({icons:{main:M,mask:x},prefix:s,iconName:r,transform:f,symbol:u,maskId:d,title:o,titleId:i,extra:v,watchable:!0})])}).catch(A)})},n.generateAbstractIcon=function(e){var a=e.children,r=e.attributes,o=e.main,i=e.transform,s=e.styles,f=At(s);f.length>0&&(r.style=f);var u;return Ht(i)&&(u=z("generateAbstractTransformGrouping",{main:o,transform:i,containerWidth:o.width,iconWidth:o.width})),a.push(u||o.icon),{children:a,attributes:r}}}},Na={mixout:function(){return{layer:function(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.classes,o=r===void 0?[]:r;return Nt({type:"layer"},function(){V("beforeDOMElementCreation",{assembler:e,params:a});var i=[];return e(function(s){Array.isArray(s)?s.map(function(f){i=i.concat(f.abstract)}):i=i.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(m.cssPrefix,"-layers")].concat(rt(o)).join(" ")},children:i}]})}}}},Ta={mixout:function(){return{counter:function(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.title,o=r===void 0?null:r,i=a.classes,s=i===void 0?[]:i,f=a.attributes,u=f===void 0?{}:f,l=a.styles,d=l===void 0?{}:l;return Nt({type:"counter",content:e},function(){return V("beforeDOMElementCreation",{content:e,params:a}),ca({content:e.toString(),title:o,extra:{attributes:u,styles:d,classes:["".concat(m.cssPrefix,"-layers-counter")].concat(rt(s))}})})}}}},Ia={mixout:function(){return{text:function(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.transform,o=r===void 0?I:r,i=a.title,s=i===void 0?null:i,f=a.classes,u=f===void 0?[]:f,l=a.attributes,d=l===void 0?{}:l,v=a.styles,b=v===void 0?{}:v;return Nt({type:"text",content:e},function(){return V("beforeDOMElementCreation",{content:e,params:a}),qn({content:e,transform:c(c({},I),o),title:s,extra:{attributes:d,styles:b,classes:["".concat(m.cssPrefix,"-layers-text")].concat(rt(u))}})})}}},provides:function(n){n.generateLayersText=function(e,a){var r=a.title,o=a.transform,i=a.extra,s=null,f=null;if(En){var u=parseInt(getComputedStyle(e).fontSize,10),l=e.getBoundingClientRect();s=l.width/u,f=l.height/u}return m.autoA11y&&!r&&(i.attributes["aria-hidden"]="true"),Promise.resolve([e,qn({content:e.innerHTML,width:s,height:f,transform:o,title:r,extra:i,watchable:!0})])}}},Ma=new RegExp('"',"ug"),se=[1105920,1112319];function Ra(t){var n=t.replace(Ma,""),e=Xe(n,0),a=e>=se[0]&&e<=se[1],r=n.length===2?n[0]===n[1]:!1;return{value:Gt(r?n[0]:n),isSecondary:a||r}}function fe(t,n){var e="".concat(xe).concat(n.replace(":","-"));return new Promise(function(a,r){if(t.getAttribute(e)!==null)return a();var o=Z(t.children),i=o.filter(function(Q){return Q.getAttribute(zt)===n})[0],s=$.getComputedStyle(t,n),f=s.getPropertyValue("font-family").match(Ce),u=s.getPropertyValue("font-weight"),l=s.getPropertyValue("content");if(i&&!f)return t.removeChild(i),a();if(f&&l!=="none"&&l!==""){var d=s.getPropertyValue("content"),v=~["Sharp"].indexOf(f[2])?y:h,b=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(f[2])?st[v][f[2].toLowerCase()]:Oe[v][u],A=Ra(d),P=A.value,T=A.isSecondary,M=f[0].startsWith("FontAwesome"),x=qt(b,P),_=x;if(M){var R=ta(P);R.iconName&&R.prefix&&(x=R.iconName,b=R.prefix)}if(x&&!T&&(!i||i.getAttribute($t)!==b||i.getAttribute(jt)!==_)){t.setAttribute(e,_),i&&t.removeChild(i);var C=_a(),K=C.extra;K.attributes[zt]=n,en(x,b).then(function(Q){var vn=Zt(c(c({},C),{},{icons:{main:Q,mask:Kt()},prefix:b,iconName:_,extra:K,watchable:!0})),H=g.createElement("svg");n==="::before"?t.insertBefore(H,t.firstChild):t.appendChild(H),H.outerHTML=vn.map(function(ar){return dt(ar)}).join(`
`),t.removeAttribute(e),a()}).catch(r)}else a()}else a()})}function La(t){return Promise.all([fe(t,"::before"),fe(t,"::after")])}function Da(t){return t.parentNode!==document.head&&!~_e.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(zt)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function le(t){if(L)return new Promise(function(n,e){var a=Z(t.querySelectorAll("*")).filter(Da).map(La),r=rn.begin("searchPseudoElements");ee(),Promise.all(a).then(function(){r(),sn(),n()}).catch(function(){r(),sn(),e()})})}var Fa={hooks:function(){return{mutationObserverCallbacks:function(e){return e.pseudoElementsCallback=le,e}}},provides:function(n){n.pseudoElements2svg=function(e){var a=e.node,r=a===void 0?g:a;m.searchPseudoElements&&le(r)}}},ce=!1,za={mixout:function(){return{dom:{unwatch:function(){ee(),ce=!0}}}},hooks:function(){return{bootstrap:function(){ae(Qt("mutationObserverCallbacks",{}))},noAuto:function(){ka()},watch:function(e){var a=e.observeMutationsRoot;ce?sn():ae(Qt("mutationObserverCallbacks",{observeMutationsRoot:a}))}}}},ue=function(n){var e={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return n.toLowerCase().split(" ").reduce(function(a,r){var o=r.toLowerCase().split("-"),i=o[0],s=o.slice(1).join("-");if(i&&s==="h")return a.flipX=!0,a;if(i&&s==="v")return a.flipY=!0,a;if(s=parseFloat(s),isNaN(s))return a;switch(i){case"grow":a.size=a.size+s;break;case"shrink":a.size=a.size-s;break;case"left":a.x=a.x-s;break;case"right":a.x=a.x+s;break;case"up":a.y=a.y-s;break;case"down":a.y=a.y+s;break;case"rotate":a.rotate=a.rotate+s;break}return a},e)},$a={mixout:function(){return{parse:{transform:function(e){return ue(e)}}}},hooks:function(){return{parseNodeAttributes:function(e,a){var r=a.getAttribute("data-fa-transform");return r&&(e.transform=ue(r)),e}}},provides:function(n){n.generateAbstractTransformGrouping=function(e){var a=e.main,r=e.transform,o=e.containerWidth,i=e.iconWidth,s={transform:"translate(".concat(o/2," 256)")},f="translate(".concat(r.x*32,", ").concat(r.y*32,") "),u="scale(".concat(r.size/16*(r.flipX?-1:1),", ").concat(r.size/16*(r.flipY?-1:1),") "),l="rotate(".concat(r.rotate," 0 0)"),d={transform:"".concat(f," ").concat(u," ").concat(l)},v={transform:"translate(".concat(i/2*-1," -256)")},b={outer:s,inner:d,path:v};return{tag:"g",attributes:c({},b.outer),children:[{tag:"g",attributes:c({},b.inner),children:[{tag:a.icon.tag,children:a.icon.children,attributes:c(c({},a.icon.attributes),b.path)}]}]}}}},fn={x:0,y:0,width:"100%",height:"100%"};function me(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||n)&&(t.attributes.fill="black"),t}function ja(t){return t.tag==="g"?t.children:[t]}var Ya={hooks:function(){return{parseNodeAttributes:function(e,a){var r=a.getAttribute("data-fa-mask"),o=r?Pt(r.split(" ").map(function(i){return i.trim()})):Kt();return o.prefix||(o.prefix=Y()),e.mask=o,e.maskId=a.getAttribute("data-fa-mask-id"),e}}},provides:function(n){n.generateAbstractMask=function(e){var a=e.children,r=e.attributes,o=e.main,i=e.mask,s=e.maskId,f=e.transform,u=o.width,l=o.icon,d=i.width,v=i.icon,b=$e({transform:f,containerWidth:d,iconWidth:u}),A={tag:"rect",attributes:c(c({},fn),{},{fill:"white"})},P=l.children?{children:l.children.map(me)}:{},T={tag:"g",attributes:c({},b.inner),children:[me(c({tag:l.tag,attributes:c(c({},l.attributes),b.path)},P))]},M={tag:"g",attributes:c({},b.outer),children:[T]},x="mask-".concat(s||mt()),_="clip-".concat(s||mt()),R={tag:"mask",attributes:c(c({},fn),{},{id:x,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[A,M]},C={tag:"defs",children:[{tag:"clipPath",attributes:{id:_},children:ja(v)},R]};return a.push(C,{tag:"rect",attributes:c({fill:"currentColor","clip-path":"url(#".concat(_,")"),mask:"url(#".concat(x,")")},fn)}),{children:a,attributes:r}}}},Ua={provides:function(n){var e=!1;$.matchMedia&&(e=$.matchMedia("(prefers-reduced-motion: reduce)").matches),n.missingIconAbstract=function(){var a=[],r={fill:"currentColor"},o={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};a.push({tag:"path",attributes:c(c({},r),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var i=c(c({},o),{},{attributeName:"opacity"}),s={tag:"circle",attributes:c(c({},r),{},{cx:"256",cy:"364",r:"28"}),children:[]};return e||s.children.push({tag:"animate",attributes:c(c({},o),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:c(c({},i),{},{values:"1;0;1;1;0;1;"})}),a.push(s),a.push({tag:"path",attributes:c(c({},r),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:e?[]:[{tag:"animate",attributes:c(c({},i),{},{values:"1;0;0;0;0;1;"})}]}),e||a.push({tag:"path",attributes:c(c({},r),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:c(c({},i),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:a}}}},Ha={hooks:function(){return{parseNodeAttributes:function(e,a){var r=a.getAttribute("data-fa-symbol"),o=r===null?!1:r===""?!0:r;return e.symbol=o,e}}}},Ba=[Ue,Pa,Na,Ta,Ia,Fa,za,$a,Ya,Ua,Ha];aa(Ba,{mixoutsTo:S}),S.noAuto,S.config;var Wa=S.library;S.dom,S.parse,S.findIconDefinition,S.toHtml,S.icon,S.layer,S.text,S.counter;var Ga={prefix:"fas",iconName:"house",icon:[576,512,[127968,63498,63500,"home","home-alt","home-lg-alt"],"f015","M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"]},q=(t=>(t.XS="xs",t.S="s",t.M="m",t.L="l",t))(q||{}),p=(t=>(t.DEFAULT="default",t.PRIMARY="primary",t.SUCCESS="success",t.DANGER="danger",t.WARNING="warning",t.PREMIUM="premium",t))(p||{});class Xa{constructor(n,e,...a){pt(this,"callback");pt(this,"args");pt(this,"wait");pt(this,"timeOutID");this.callback=n,this.wait=e,this.args=a}debounce(...n){this.timeOutID&&window.clearTimeout(this.timeOutID),this.timeOutID=window.setTimeout(()=>{this.callback.apply(null,[...this.args,...n])},this.wait)}}const ln=new Map([[p.DEFAULT,"button-type__default"],[p.PRIMARY,"button-type__primary"],[p.SUCCESS,"button-type__success"],[p.DANGER,"button-type__danger"],[p.WARNING,"button-type__warning"],[p.PREMIUM,"button-type__premium"]]),O="cursor-pointer",cn=new Map([[p.DEFAULT,`${O} button-type__default__hover`],[p.PRIMARY,`${O} button-type__primary__hover`],[p.SUCCESS,`${O} button-type__success__hover`],[p.DANGER,`${O} button-type__danger__hover`],[p.WARNING,`${O} button-type__warning__hover`],[p.PREMIUM,`${O} button-type__premium__hover`]]),un=new Map([[p.DEFAULT,`${O} button-type__default__active`],[p.PRIMARY,`${O} button-type__primary__active`],[p.SUCCESS,`${O} button-type__success__active`],[p.DANGER,`${O} button-type__danger__active`],[p.WARNING,`${O} button-type__warning__active`],[p.PREMIUM,`${O} button-type__premium__active`]]),at="cursor-not-allowed",mn=new Map([[p.DEFAULT,`${at} button-type__default__disabled`],[p.PRIMARY,`${at} button-type__primary__disabled`],[p.SUCCESS,`${at} button-type__success__disabled`],[p.DANGER,`${at} button-type__danger__disabled`],[p.WARNING,`${at} button-type__warning__disabled`],[p.PREMIUM,`${at} button-type__premium__disabled`]]),dn=new Map([[q.XS,"sizing__xs"],[q.S,"sizing__s"],[q.M,"sizing__m"],[q.L,"sizing__l"]]),Va=t=>(ln.has(t)?ln.get(t):ln.get(p.DEFAULT))||"",qa=t=>(cn.has(t)?cn.get(t):cn.get(p.DEFAULT))||"",Ka=t=>(un.has(t)?un.get(t):un.get(p.DEFAULT))||"",Qa=t=>(mn.has(t)?mn.get(t):mn.get(p.DEFAULT))||"",Ja=t=>(dn.has(t)?dn.get(t):dn.get(q.M))||"",Za=k.defineComponent({props:{disabled:{required:!1,type:Boolean,default:!1},readonly:{required:!1,type:Boolean,default:!1},active:{required:!1,type:Boolean,default:!1},size:{required:!1,type:String,default:q.M},type:{required:!1,type:String,default:p.DEFAULT}},data(){return{clickDebounce:new Xa(this.onClick,100)}},computed:{computedClasses(){const t=[Va(this.type),Ja(this.size)];return!this.disabled&&!this.readonly&&t.push(qa(this.type)),!this.disabled&&this.active&&t.push(Ka(this.type)),this.disabled&&t.push(Qa(this.type)),t.join(" ")}},methods:{onClick(t){if(this.disabled||this.readonly){t.preventDefault();return}this.$emit("click",t)},focus(){this.$refs.elButton.focus()},blur(){this.$refs.elButton.blur()}},expose:["focus","blur"],emits:{click:t=>!0,focus:()=>!0,blur:()=>!0}}),tr=(t,n)=>{const e=t.__vccOpts||t;for(const[a,r]of n)e[a]=r;return e};function nr(t,n,e,a,r,o){return k.openBlock(),k.createElementBlock("button",{ref:"elButton",class:k.normalizeClass(["et-button border-2 rounded drop-shadow-sm whitespace-nowrap inline-block cursor-default",t.computedClasses]),onMouseup:n[0]||(n[0]=k.withModifiers(i=>t.clickDebounce.debounce(i),["left","stop"])),onKeyup:n[1]||(n[1]=k.withKeys(i=>t.clickDebounce.debounce(i),["enter"])),onFocus:n[2]||(n[2]=i=>t.$emit("focus")),onBlur:n[3]||(n[3]=i=>t.$emit("blur"))},[k.renderSlot(t.$slots,"default")],34)}const er=tr(Za,[["render",nr]]);Wa.add(Ga),E.EtButton=er,E.Sonar=B,Object.defineProperty(E,Symbol.toStringTag,{value:"Module"})});
