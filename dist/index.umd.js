(function(E,g){typeof exports=="object"&&typeof module<"u"?g(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],g):(E=typeof globalThis<"u"?globalThis:E||self,g(E["et-ui-sdk"]={},E.Vue))})(this,function(E,g){"use strict";var nr=Object.defineProperty;var ar=(E,g,W)=>g in E?nr(E,g,{enumerable:!0,configurable:!0,writable:!0,value:W}):E[g]=W;var pt=(E,g,W)=>(ar(E,typeof g!="symbol"?g+"":g,W),W);class W{ping(){return"PING!"}}const er="";function pn(t,n){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);n&&(e=e.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),a.push.apply(a,e)}return a}function u(t){for(var n=1;n<arguments.length;n++){var a=arguments[n]!=null?arguments[n]:{};n%2?pn(Object(a),!0).forEach(function(e){w(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):pn(Object(a)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}function bt(t){return bt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},bt(t)}function da(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function bn(t,n){for(var a=0;a<n.length;a++){var e=n[a];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function va(t,n,a){return n&&bn(t.prototype,n),a&&bn(t,a),Object.defineProperty(t,"prototype",{writable:!1}),t}function w(t,n,a){return n in t?Object.defineProperty(t,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[n]=a,t}function Rt(t,n){return ba(t)||ha(t,n)||gn(t,n)||ka()}function rt(t){return pa(t)||ga(t)||gn(t)||ya()}function pa(t){if(Array.isArray(t))return Lt(t)}function ba(t){if(Array.isArray(t))return t}function ga(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function ha(t,n){var a=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(a!=null){var e=[],r=!0,o=!1,i,s;try{for(a=a.call(t);!(r=(i=a.next()).done)&&(e.push(i.value),!(n&&e.length===n));r=!0);}catch(f){o=!0,s=f}finally{try{!r&&a.return!=null&&a.return()}finally{if(o)throw s}}return e}}function gn(t,n){if(t){if(typeof t=="string")return Lt(t,n);var a=Object.prototype.toString.call(t).slice(8,-1);if(a==="Object"&&t.constructor&&(a=t.constructor.name),a==="Map"||a==="Set")return Array.from(t);if(a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return Lt(t,n)}}function Lt(t,n){(n==null||n>t.length)&&(n=t.length);for(var a=0,e=new Array(n);a<n;a++)e[a]=t[a];return e}function ya(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ka(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var hn=function(){},Dt={},yn={},kn=null,wn={mark:hn,measure:hn};try{typeof window<"u"&&(Dt=window),typeof document<"u"&&(yn=document),typeof MutationObserver<"u"&&(kn=MutationObserver),typeof performance<"u"&&(wn=performance)}catch{}var wa=Dt.navigator||{},xn=wa.userAgent,An=xn===void 0?"":xn,$=Dt,h=yn,_n=kn,gt=wn;$.document;var L=!!h.documentElement&&!!h.head&&typeof h.addEventListener=="function"&&typeof h.createElement=="function",En=~An.indexOf("MSIE")||~An.indexOf("Trident/"),ht,yt,kt,wt,xt,D="___FONT_AWESOME___",Ft=16,Sn="fa",Cn="svg-inline--fa",G="data-fa-i2svg",zt="data-fa-pseudo-element",xa="data-fa-pseudo-element-pending",$t="data-prefix",jt="data-icon",Pn="fontawesome-i2svg",Aa="async",_a=["HTML","HEAD","STYLE","SCRIPT"],On=function(){try{return process.env.NODE_ENV==="production"}catch{return!1}}(),y="classic",k="sharp",Yt=[y,k];function it(t){return new Proxy(t,{get:function(a,e){return e in a?a[e]:a[y]}})}var ot=it((ht={},w(ht,y,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit","fa-kit":"kit"}),w(ht,k,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light"}),ht)),st=it((yt={},w(yt,y,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),w(yt,k,{solid:"fass",regular:"fasr",light:"fasl"}),yt)),ft=it((kt={},w(kt,y,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),w(kt,k,{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light"}),kt)),Ea=it((wt={},w(wt,y,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),w(wt,k,{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl"}),wt)),Sa=/fa(s|r|l|t|d|b|k|ss|sr|sl)?[\-\ ]/,Nn="fa-layers-text",Ca=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,Pa=it((xt={},w(xt,y,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),w(xt,k,{900:"fass",400:"fasr",300:"fasl"}),xt)),Tn=[1,2,3,4,5,6,7,8,9,10],Oa=Tn.concat([11,12,13,14,15,16,17,18,19,20]),Na=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],B={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},lt=new Set;Object.keys(st[y]).map(lt.add.bind(lt)),Object.keys(st[k]).map(lt.add.bind(lt));var Ta=[].concat(Yt,rt(lt),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",B.GROUP,B.SWAP_OPACITY,B.PRIMARY,B.SECONDARY]).concat(Tn.map(function(t){return"".concat(t,"x")})).concat(Oa.map(function(t){return"w-".concat(t)})),ct=$.FontAwesomeConfig||{};function Ia(t){var n=h.querySelector("script["+t+"]");if(n)return n.getAttribute(t)}function Ma(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}if(h&&typeof h.querySelector=="function"){var Ra=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];Ra.forEach(function(t){var n=Rt(t,2),a=n[0],e=n[1],r=Ma(Ia(a));r!=null&&(ct[e]=r)})}var In={styleDefault:"solid",familyDefault:"classic",cssPrefix:Sn,replacementClass:Cn,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};ct.familyPrefix&&(ct.cssPrefix=ct.familyPrefix);var J=u(u({},In),ct);J.autoReplaceSvg||(J.observeMutations=!1);var d={};Object.keys(In).forEach(function(t){Object.defineProperty(d,t,{enumerable:!0,set:function(a){J[t]=a,ut.forEach(function(e){return e(d)})},get:function(){return J[t]}})}),Object.defineProperty(d,"familyPrefix",{enumerable:!0,set:function(n){J.cssPrefix=n,ut.forEach(function(a){return a(d)})},get:function(){return J.cssPrefix}}),$.FontAwesomeConfig=d;var ut=[];function La(t){return ut.push(t),function(){ut.splice(ut.indexOf(t),1)}}var j=Ft,I={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Da(t){if(!(!t||!L)){var n=h.createElement("style");n.setAttribute("type","text/css"),n.innerHTML=t;for(var a=h.head.childNodes,e=null,r=a.length-1;r>-1;r--){var o=a[r],i=(o.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(i)>-1&&(e=o)}return h.head.insertBefore(n,e),t}}var Fa="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function mt(){for(var t=12,n="";t-- >0;)n+=Fa[Math.random()*62|0];return n}function Z(t){for(var n=[],a=(t||[]).length>>>0;a--;)n[a]=t[a];return n}function Ut(t){return t.classList?Z(t.classList):(t.getAttribute("class")||"").split(" ").filter(function(n){return n})}function Mn(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function za(t){return Object.keys(t||{}).reduce(function(n,a){return n+"".concat(a,'="').concat(Mn(t[a]),'" ')},"").trim()}function At(t){return Object.keys(t||{}).reduce(function(n,a){return n+"".concat(a,": ").concat(t[a].trim(),";")},"")}function Ht(t){return t.size!==I.size||t.x!==I.x||t.y!==I.y||t.rotate!==I.rotate||t.flipX||t.flipY}function $a(t){var n=t.transform,a=t.containerWidth,e=t.iconWidth,r={transform:"translate(".concat(a/2," 256)")},o="translate(".concat(n.x*32,", ").concat(n.y*32,") "),i="scale(".concat(n.size/16*(n.flipX?-1:1),", ").concat(n.size/16*(n.flipY?-1:1),") "),s="rotate(".concat(n.rotate," 0 0)"),f={transform:"".concat(o," ").concat(i," ").concat(s)},c={transform:"translate(".concat(e/2*-1," -256)")};return{outer:r,inner:f,path:c}}function ja(t){var n=t.transform,a=t.width,e=a===void 0?Ft:a,r=t.height,o=r===void 0?Ft:r,i=t.startCentered,s=i===void 0?!1:i,f="";return s&&En?f+="translate(".concat(n.x/j-e/2,"em, ").concat(n.y/j-o/2,"em) "):s?f+="translate(calc(-50% + ".concat(n.x/j,"em), calc(-50% + ").concat(n.y/j,"em)) "):f+="translate(".concat(n.x/j,"em, ").concat(n.y/j,"em) "),f+="scale(".concat(n.size/j*(n.flipX?-1:1),", ").concat(n.size/j*(n.flipY?-1:1),") "),f+="rotate(".concat(n.rotate,"deg) "),f}var Ya=`:root, :host {
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
}`;function Rn(){var t=Sn,n=Cn,a=d.cssPrefix,e=d.replacementClass,r=Ya;if(a!==t||e!==n){var o=new RegExp("\\.".concat(t,"\\-"),"g"),i=new RegExp("\\--".concat(t,"\\-"),"g"),s=new RegExp("\\.".concat(n),"g");r=r.replace(o,".".concat(a,"-")).replace(i,"--".concat(a,"-")).replace(s,".".concat(e))}return r}var Ln=!1;function Wt(){d.autoAddCss&&!Ln&&(Da(Rn()),Ln=!0)}var Ua={mixout:function(){return{dom:{css:Rn,insertCss:Wt}}},hooks:function(){return{beforeDOMElementCreation:function(){Wt()},beforeI2svg:function(){Wt()}}}},F=$||{};F[D]||(F[D]={}),F[D].styles||(F[D].styles={}),F[D].hooks||(F[D].hooks={}),F[D].shims||(F[D].shims=[]);var N=F[D],Dn=[],Ha=function t(){h.removeEventListener("DOMContentLoaded",t),_t=1,Dn.map(function(n){return n()})},_t=!1;L&&(_t=(h.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(h.readyState),_t||h.addEventListener("DOMContentLoaded",Ha));function Wa(t){L&&(_t?setTimeout(t,0):Dn.push(t))}function dt(t){var n=t.tag,a=t.attributes,e=a===void 0?{}:a,r=t.children,o=r===void 0?[]:r;return typeof t=="string"?Mn(t):"<".concat(n," ").concat(za(e),">").concat(o.map(dt).join(""),"</").concat(n,">")}function Fn(t,n,a){if(t&&t[n]&&t[n][a])return{prefix:n,iconName:a,icon:t[n][a]}}var Ga=function(n,a){return function(e,r,o,i){return n.call(a,e,r,o,i)}},Gt=function(n,a,e,r){var o=Object.keys(n),i=o.length,s=r!==void 0?Ga(a,r):a,f,c,l;for(e===void 0?(f=1,l=n[o[0]]):(f=0,l=e);f<i;f++)c=o[f],l=s(l,n[c],c,n);return l};function Ba(t){for(var n=[],a=0,e=t.length;a<e;){var r=t.charCodeAt(a++);if(r>=55296&&r<=56319&&a<e){var o=t.charCodeAt(a++);(o&64512)==56320?n.push(((r&1023)<<10)+(o&1023)+65536):(n.push(r),a--)}else n.push(r)}return n}function Bt(t){var n=Ba(t);return n.length===1?n[0].toString(16):null}function Xa(t,n){var a=t.length,e=t.charCodeAt(n),r;return e>=55296&&e<=56319&&a>n+1&&(r=t.charCodeAt(n+1),r>=56320&&r<=57343)?(e-55296)*1024+r-56320+65536:e}function zn(t){return Object.keys(t).reduce(function(n,a){var e=t[a],r=!!e.icon;return r?n[e.iconName]=e.icon:n[a]=e,n},{})}function Xt(t,n){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},e=a.skipHooks,r=e===void 0?!1:e,o=zn(n);typeof N.hooks.addPack=="function"&&!r?N.hooks.addPack(t,zn(n)):N.styles[t]=u(u({},N.styles[t]||{}),o),t==="fas"&&Xt("fa",n)}var Et,St,Ct,tt=N.styles,Va=N.shims,qa=(Et={},w(Et,y,Object.values(ft[y])),w(Et,k,Object.values(ft[k])),Et),Vt=null,$n={},jn={},Yn={},Un={},Hn={},Ka=(St={},w(St,y,Object.keys(ot[y])),w(St,k,Object.keys(ot[k])),St);function Qa(t){return~Ta.indexOf(t)}function Ja(t,n){var a=n.split("-"),e=a[0],r=a.slice(1).join("-");return e===t&&r!==""&&!Qa(r)?r:null}var Wn=function(){var n=function(o){return Gt(tt,function(i,s,f){return i[f]=Gt(s,o,{}),i},{})};$n=n(function(r,o,i){if(o[3]&&(r[o[3]]=i),o[2]){var s=o[2].filter(function(f){return typeof f=="number"});s.forEach(function(f){r[f.toString(16)]=i})}return r}),jn=n(function(r,o,i){if(r[i]=i,o[2]){var s=o[2].filter(function(f){return typeof f=="string"});s.forEach(function(f){r[f]=i})}return r}),Hn=n(function(r,o,i){var s=o[2];return r[i]=i,s.forEach(function(f){r[f]=i}),r});var a="far"in tt||d.autoFetchSvg,e=Gt(Va,function(r,o){var i=o[0],s=o[1],f=o[2];return s==="far"&&!a&&(s="fas"),typeof i=="string"&&(r.names[i]={prefix:s,iconName:f}),typeof i=="number"&&(r.unicodes[i.toString(16)]={prefix:s,iconName:f}),r},{names:{},unicodes:{}});Yn=e.names,Un=e.unicodes,Vt=Pt(d.styleDefault,{family:d.familyDefault})};La(function(t){Vt=Pt(t.styleDefault,{family:d.familyDefault})}),Wn();function qt(t,n){return($n[t]||{})[n]}function Za(t,n){return(jn[t]||{})[n]}function X(t,n){return(Hn[t]||{})[n]}function Gn(t){return Yn[t]||{prefix:null,iconName:null}}function te(t){var n=Un[t],a=qt("fas",t);return n||(a?{prefix:"fas",iconName:a}:null)||{prefix:null,iconName:null}}function Y(){return Vt}var Kt=function(){return{prefix:null,iconName:null,rest:[]}};function Pt(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=n.family,e=a===void 0?y:a,r=ot[e][t],o=st[e][t]||st[e][r],i=t in N.styles?t:null;return o||i||null}var Bn=(Ct={},w(Ct,y,Object.keys(ft[y])),w(Ct,k,Object.keys(ft[k])),Ct);function Ot(t){var n,a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},e=a.skipLookups,r=e===void 0?!1:e,o=(n={},w(n,y,"".concat(d.cssPrefix,"-").concat(y)),w(n,k,"".concat(d.cssPrefix,"-").concat(k)),n),i=null,s=y;(t.includes(o[y])||t.some(function(c){return Bn[y].includes(c)}))&&(s=y),(t.includes(o[k])||t.some(function(c){return Bn[k].includes(c)}))&&(s=k);var f=t.reduce(function(c,l){var m=Ja(d.cssPrefix,l);if(tt[l]?(l=qa[s].includes(l)?Ea[s][l]:l,i=l,c.prefix=l):Ka[s].indexOf(l)>-1?(i=l,c.prefix=Pt(l,{family:s})):m?c.iconName=m:l!==d.replacementClass&&l!==o[y]&&l!==o[k]&&c.rest.push(l),!r&&c.prefix&&c.iconName){var v=i==="fa"?Gn(c.iconName):{},b=X(c.prefix,c.iconName);v.prefix&&(i=null),c.iconName=v.iconName||b||c.iconName,c.prefix=v.prefix||c.prefix,c.prefix==="far"&&!tt.far&&tt.fas&&!d.autoFetchSvg&&(c.prefix="fas")}return c},Kt());return(t.includes("fa-brands")||t.includes("fab"))&&(f.prefix="fab"),(t.includes("fa-duotone")||t.includes("fad"))&&(f.prefix="fad"),!f.prefix&&s===k&&(tt.fass||d.autoFetchSvg)&&(f.prefix="fass",f.iconName=X(f.prefix,f.iconName)||f.iconName),(f.prefix==="fa"||i==="fa")&&(f.prefix=Y()||"fas"),f}var ne=function(){function t(){da(this,t),this.definitions={}}return va(t,[{key:"add",value:function(){for(var a=this,e=arguments.length,r=new Array(e),o=0;o<e;o++)r[o]=arguments[o];var i=r.reduce(this._pullDefinitions,{});Object.keys(i).forEach(function(s){a.definitions[s]=u(u({},a.definitions[s]||{}),i[s]),Xt(s,i[s]);var f=ft[y][s];f&&Xt(f,i[s]),Wn()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(a,e){var r=e.prefix&&e.iconName&&e.icon?{0:e}:e;return Object.keys(r).map(function(o){var i=r[o],s=i.prefix,f=i.iconName,c=i.icon,l=c[2];a[s]||(a[s]={}),l.length>0&&l.forEach(function(m){typeof m=="string"&&(a[s][m]=c)}),a[s][f]=c}),a}}]),t}(),Xn=[],nt={},at={},ae=Object.keys(at);function ee(t,n){var a=n.mixoutsTo;return Xn=t,nt={},Object.keys(at).forEach(function(e){ae.indexOf(e)===-1&&delete at[e]}),Xn.forEach(function(e){var r=e.mixout?e.mixout():{};if(Object.keys(r).forEach(function(i){typeof r[i]=="function"&&(a[i]=r[i]),bt(r[i])==="object"&&Object.keys(r[i]).forEach(function(s){a[i]||(a[i]={}),a[i][s]=r[i][s]})}),e.hooks){var o=e.hooks();Object.keys(o).forEach(function(i){nt[i]||(nt[i]=[]),nt[i].push(o[i])})}e.provides&&e.provides(at)}),a}function Qt(t,n){for(var a=arguments.length,e=new Array(a>2?a-2:0),r=2;r<a;r++)e[r-2]=arguments[r];var o=nt[t]||[];return o.forEach(function(i){n=i.apply(null,[n].concat(e))}),n}function V(t){for(var n=arguments.length,a=new Array(n>1?n-1:0),e=1;e<n;e++)a[e-1]=arguments[e];var r=nt[t]||[];r.forEach(function(o){o.apply(null,a)})}function z(){var t=arguments[0],n=Array.prototype.slice.call(arguments,1);return at[t]?at[t].apply(null,n):void 0}function Jt(t){t.prefix==="fa"&&(t.prefix="fas");var n=t.iconName,a=t.prefix||Y();if(n)return n=X(a,n)||n,Fn(Vn.definitions,a,n)||Fn(N.styles,a,n)}var Vn=new ne,re=function(){d.autoReplaceSvg=!1,d.observeMutations=!1,V("noAuto")},ie={i2svg:function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return L?(V("beforeI2svg",n),z("pseudoElements2svg",n),z("i2svg",n)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=n.autoReplaceSvgRoot;d.autoReplaceSvg===!1&&(d.autoReplaceSvg=!0),d.observeMutations=!0,Wa(function(){se({autoReplaceSvgRoot:a}),V("watch",n)})}},oe={icon:function(n){if(n===null)return null;if(bt(n)==="object"&&n.prefix&&n.iconName)return{prefix:n.prefix,iconName:X(n.prefix,n.iconName)||n.iconName};if(Array.isArray(n)&&n.length===2){var a=n[1].indexOf("fa-")===0?n[1].slice(3):n[1],e=Pt(n[0]);return{prefix:e,iconName:X(e,a)||a}}if(typeof n=="string"&&(n.indexOf("".concat(d.cssPrefix,"-"))>-1||n.match(Sa))){var r=Ot(n.split(" "),{skipLookups:!0});return{prefix:r.prefix||Y(),iconName:X(r.prefix,r.iconName)||r.iconName}}if(typeof n=="string"){var o=Y();return{prefix:o,iconName:X(o,n)||n}}}},S={noAuto:re,config:d,dom:ie,parse:oe,library:Vn,findIconDefinition:Jt,toHtml:dt},se=function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=n.autoReplaceSvgRoot,e=a===void 0?h:a;(Object.keys(N.styles).length>0||d.autoFetchSvg)&&L&&d.autoReplaceSvg&&S.dom.i2svg({node:e})};function Nt(t,n){return Object.defineProperty(t,"abstract",{get:n}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(function(e){return dt(e)})}}),Object.defineProperty(t,"node",{get:function(){if(L){var e=h.createElement("div");return e.innerHTML=t.html,e.children}}}),t}function fe(t){var n=t.children,a=t.main,e=t.mask,r=t.attributes,o=t.styles,i=t.transform;if(Ht(i)&&a.found&&!e.found){var s=a.width,f=a.height,c={x:s/f/2,y:.5};r.style=At(u(u({},o),{},{"transform-origin":"".concat(c.x+i.x/16,"em ").concat(c.y+i.y/16,"em")}))}return[{tag:"svg",attributes:r,children:n}]}function le(t){var n=t.prefix,a=t.iconName,e=t.children,r=t.attributes,o=t.symbol,i=o===!0?"".concat(n,"-").concat(d.cssPrefix,"-").concat(a):o;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:u(u({},r),{},{id:i}),children:e}]}]}function Zt(t){var n=t.icons,a=n.main,e=n.mask,r=t.prefix,o=t.iconName,i=t.transform,s=t.symbol,f=t.title,c=t.maskId,l=t.titleId,m=t.extra,v=t.watchable,b=v===void 0?!1:v,A=e.found?e:a,O=A.width,T=A.height,M=r==="fak",x=[d.replacementClass,o?"".concat(d.cssPrefix,"-").concat(o):""].filter(function(H){return m.classes.indexOf(H)===-1}).filter(function(H){return H!==""||!!H}).concat(m.classes).join(" "),_={children:[],attributes:u(u({},m.attributes),{},{"data-prefix":r,"data-icon":o,class:x,role:m.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(O," ").concat(T)})},R=M&&!~m.classes.indexOf("fa-fw")?{width:"".concat(O/T*16*.0625,"em")}:{};b&&(_.attributes[G]=""),f&&(_.children.push({tag:"title",attributes:{id:_.attributes["aria-labelledby"]||"title-".concat(l||mt())},children:[f]}),delete _.attributes.title);var C=u(u({},_),{},{prefix:r,iconName:o,main:a,mask:e,maskId:c,transform:i,symbol:s,styles:u(u({},R),m.styles)}),K=e.found&&a.found?z("generateAbstractMask",C)||{children:[],attributes:{}}:z("generateAbstractIcon",C)||{children:[],attributes:{}},Q=K.children,vn=K.attributes;return C.children=Q,C.attributes=vn,s?le(C):fe(C)}function qn(t){var n=t.content,a=t.width,e=t.height,r=t.transform,o=t.title,i=t.extra,s=t.watchable,f=s===void 0?!1:s,c=u(u(u({},i.attributes),o?{title:o}:{}),{},{class:i.classes.join(" ")});f&&(c[G]="");var l=u({},i.styles);Ht(r)&&(l.transform=ja({transform:r,startCentered:!0,width:a,height:e}),l["-webkit-transform"]=l.transform);var m=At(l);m.length>0&&(c.style=m);var v=[];return v.push({tag:"span",attributes:c,children:[n]}),o&&v.push({tag:"span",attributes:{class:"sr-only"},children:[o]}),v}function ce(t){var n=t.content,a=t.title,e=t.extra,r=u(u(u({},e.attributes),a?{title:a}:{}),{},{class:e.classes.join(" ")}),o=At(e.styles);o.length>0&&(r.style=o);var i=[];return i.push({tag:"span",attributes:r,children:[n]}),a&&i.push({tag:"span",attributes:{class:"sr-only"},children:[a]}),i}var tn=N.styles;function nn(t){var n=t[0],a=t[1],e=t.slice(4),r=Rt(e,1),o=r[0],i=null;return Array.isArray(o)?i={tag:"g",attributes:{class:"".concat(d.cssPrefix,"-").concat(B.GROUP)},children:[{tag:"path",attributes:{class:"".concat(d.cssPrefix,"-").concat(B.SECONDARY),fill:"currentColor",d:o[0]}},{tag:"path",attributes:{class:"".concat(d.cssPrefix,"-").concat(B.PRIMARY),fill:"currentColor",d:o[1]}}]}:i={tag:"path",attributes:{fill:"currentColor",d:o}},{found:!0,width:n,height:a,icon:i}}var ue={found:!1,width:512,height:512};function me(t,n){!On&&!d.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(n,'" is missing.'))}function an(t,n){var a=n;return n==="fa"&&d.styleDefault!==null&&(n=Y()),new Promise(function(e,r){if(z("missingIconAbstract"),a==="fa"){var o=Gn(t)||{};t=o.iconName||t,n=o.prefix||n}if(t&&n&&tn[n]&&tn[n][t]){var i=tn[n][t];return e(nn(i))}me(t,n),e(u(u({},ue),{},{icon:d.showMissingIcons&&t?z("missingIconAbstract")||{}:{}}))})}var Kn=function(){},en=d.measurePerformance&&gt&&gt.mark&&gt.measure?gt:{mark:Kn,measure:Kn},vt='FA "6.4.0"',de=function(n){return en.mark("".concat(vt," ").concat(n," begins")),function(){return Qn(n)}},Qn=function(n){en.mark("".concat(vt," ").concat(n," ends")),en.measure("".concat(vt," ").concat(n),"".concat(vt," ").concat(n," begins"),"".concat(vt," ").concat(n," ends"))},rn={begin:de,end:Qn},Tt=function(){};function Jn(t){var n=t.getAttribute?t.getAttribute(G):null;return typeof n=="string"}function ve(t){var n=t.getAttribute?t.getAttribute($t):null,a=t.getAttribute?t.getAttribute(jt):null;return n&&a}function pe(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(d.replacementClass)}function be(){if(d.autoReplaceSvg===!0)return It.replace;var t=It[d.autoReplaceSvg];return t||It.replace}function ge(t){return h.createElementNS("http://www.w3.org/2000/svg",t)}function he(t){return h.createElement(t)}function Zn(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=n.ceFn,e=a===void 0?t.tag==="svg"?ge:he:a;if(typeof t=="string")return h.createTextNode(t);var r=e(t.tag);Object.keys(t.attributes||[]).forEach(function(i){r.setAttribute(i,t.attributes[i])});var o=t.children||[];return o.forEach(function(i){r.appendChild(Zn(i,{ceFn:e}))}),r}function ye(t){var n=" ".concat(t.outerHTML," ");return n="".concat(n,"Font Awesome fontawesome.com "),n}var It={replace:function(n){var a=n[0];if(a.parentNode)if(n[1].forEach(function(r){a.parentNode.insertBefore(Zn(r),a)}),a.getAttribute(G)===null&&d.keepOriginalSource){var e=h.createComment(ye(a));a.parentNode.replaceChild(e,a)}else a.remove()},nest:function(n){var a=n[0],e=n[1];if(~Ut(a).indexOf(d.replacementClass))return It.replace(n);var r=new RegExp("".concat(d.cssPrefix,"-.*"));if(delete e[0].attributes.id,e[0].attributes.class){var o=e[0].attributes.class.split(" ").reduce(function(s,f){return f===d.replacementClass||f.match(r)?s.toSvg.push(f):s.toNode.push(f),s},{toNode:[],toSvg:[]});e[0].attributes.class=o.toSvg.join(" "),o.toNode.length===0?a.removeAttribute("class"):a.setAttribute("class",o.toNode.join(" "))}var i=e.map(function(s){return dt(s)}).join(`
`);a.setAttribute(G,""),a.innerHTML=i}};function ta(t){t()}function na(t,n){var a=typeof n=="function"?n:Tt;if(t.length===0)a();else{var e=ta;d.mutateApproach===Aa&&(e=$.requestAnimationFrame||ta),e(function(){var r=be(),o=rn.begin("mutate");t.map(r),o(),a()})}}var on=!1;function aa(){on=!0}function sn(){on=!1}var Mt=null;function ea(t){if(_n&&d.observeMutations){var n=t.treeCallback,a=n===void 0?Tt:n,e=t.nodeCallback,r=e===void 0?Tt:e,o=t.pseudoElementsCallback,i=o===void 0?Tt:o,s=t.observeMutationsRoot,f=s===void 0?h:s;Mt=new _n(function(c){if(!on){var l=Y();Z(c).forEach(function(m){if(m.type==="childList"&&m.addedNodes.length>0&&!Jn(m.addedNodes[0])&&(d.searchPseudoElements&&i(m.target),a(m.target)),m.type==="attributes"&&m.target.parentNode&&d.searchPseudoElements&&i(m.target.parentNode),m.type==="attributes"&&Jn(m.target)&&~Na.indexOf(m.attributeName))if(m.attributeName==="class"&&ve(m.target)){var v=Ot(Ut(m.target)),b=v.prefix,A=v.iconName;m.target.setAttribute($t,b||l),A&&m.target.setAttribute(jt,A)}else pe(m.target)&&r(m.target)})}}),L&&Mt.observe(f,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function ke(){Mt&&Mt.disconnect()}function we(t){var n=t.getAttribute("style"),a=[];return n&&(a=n.split(";").reduce(function(e,r){var o=r.split(":"),i=o[0],s=o.slice(1);return i&&s.length>0&&(e[i]=s.join(":").trim()),e},{})),a}function xe(t){var n=t.getAttribute("data-prefix"),a=t.getAttribute("data-icon"),e=t.innerText!==void 0?t.innerText.trim():"",r=Ot(Ut(t));return r.prefix||(r.prefix=Y()),n&&a&&(r.prefix=n,r.iconName=a),r.iconName&&r.prefix||(r.prefix&&e.length>0&&(r.iconName=Za(r.prefix,t.innerText)||qt(r.prefix,Bt(t.innerText))),!r.iconName&&d.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=t.firstChild.data)),r}function Ae(t){var n=Z(t.attributes).reduce(function(r,o){return r.name!=="class"&&r.name!=="style"&&(r[o.name]=o.value),r},{}),a=t.getAttribute("title"),e=t.getAttribute("data-fa-title-id");return d.autoA11y&&(a?n["aria-labelledby"]="".concat(d.replacementClass,"-title-").concat(e||mt()):(n["aria-hidden"]="true",n.focusable="false")),n}function _e(){return{iconName:null,title:null,titleId:null,prefix:null,transform:I,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function ra(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},a=xe(t),e=a.iconName,r=a.prefix,o=a.rest,i=Ae(t),s=Qt("parseNodeAttributes",{},t),f=n.styleParser?we(t):[];return u({iconName:e,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:r,transform:I,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:o,styles:f,attributes:i}},s)}var Ee=N.styles;function ia(t){var n=d.autoReplaceSvg==="nest"?ra(t,{styleParser:!1}):ra(t);return~n.extra.classes.indexOf(Nn)?z("generateLayersText",t,n):z("generateSvgReplacementMutation",t,n)}var U=new Set;Yt.map(function(t){U.add("fa-".concat(t))}),Object.keys(ot[y]).map(U.add.bind(U)),Object.keys(ot[k]).map(U.add.bind(U)),U=rt(U);function oa(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!L)return Promise.resolve();var a=h.documentElement.classList,e=function(m){return a.add("".concat(Pn,"-").concat(m))},r=function(m){return a.remove("".concat(Pn,"-").concat(m))},o=d.autoFetchSvg?U:Yt.map(function(l){return"fa-".concat(l)}).concat(Object.keys(Ee));o.includes("fa")||o.push("fa");var i=[".".concat(Nn,":not([").concat(G,"])")].concat(o.map(function(l){return".".concat(l,":not([").concat(G,"])")})).join(", ");if(i.length===0)return Promise.resolve();var s=[];try{s=Z(t.querySelectorAll(i))}catch{}if(s.length>0)e("pending"),r("complete");else return Promise.resolve();var f=rn.begin("onTree"),c=s.reduce(function(l,m){try{var v=ia(m);v&&l.push(v)}catch(b){On||b.name==="MissingIcon"&&console.error(b)}return l},[]);return new Promise(function(l,m){Promise.all(c).then(function(v){na(v,function(){e("active"),e("complete"),r("pending"),typeof n=="function"&&n(),f(),l()})}).catch(function(v){f(),m(v)})})}function Se(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;ia(t).then(function(a){a&&na([a],n)})}function Ce(t){return function(n){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},e=(n||{}).icon?n:Jt(n||{}),r=a.mask;return r&&(r=(r||{}).icon?r:Jt(r||{})),t(e,u(u({},a),{},{mask:r}))}}var Pe=function(n){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},e=a.transform,r=e===void 0?I:e,o=a.symbol,i=o===void 0?!1:o,s=a.mask,f=s===void 0?null:s,c=a.maskId,l=c===void 0?null:c,m=a.title,v=m===void 0?null:m,b=a.titleId,A=b===void 0?null:b,O=a.classes,T=O===void 0?[]:O,M=a.attributes,x=M===void 0?{}:M,_=a.styles,R=_===void 0?{}:_;if(n){var C=n.prefix,K=n.iconName,Q=n.icon;return Nt(u({type:"icon"},n),function(){return V("beforeDOMElementCreation",{iconDefinition:n,params:a}),d.autoA11y&&(v?x["aria-labelledby"]="".concat(d.replacementClass,"-title-").concat(A||mt()):(x["aria-hidden"]="true",x.focusable="false")),Zt({icons:{main:nn(Q),mask:f?nn(f.icon):{found:!1,width:null,height:null,icon:{}}},prefix:C,iconName:K,transform:u(u({},I),r),symbol:i,title:v,maskId:l,titleId:A,extra:{attributes:x,styles:R,classes:T}})})}},Oe={mixout:function(){return{icon:Ce(Pe)}},hooks:function(){return{mutationObserverCallbacks:function(a){return a.treeCallback=oa,a.nodeCallback=Se,a}}},provides:function(n){n.i2svg=function(a){var e=a.node,r=e===void 0?h:e,o=a.callback,i=o===void 0?function(){}:o;return oa(r,i)},n.generateSvgReplacementMutation=function(a,e){var r=e.iconName,o=e.title,i=e.titleId,s=e.prefix,f=e.transform,c=e.symbol,l=e.mask,m=e.maskId,v=e.extra;return new Promise(function(b,A){Promise.all([an(r,s),l.iconName?an(l.iconName,l.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(O){var T=Rt(O,2),M=T[0],x=T[1];b([a,Zt({icons:{main:M,mask:x},prefix:s,iconName:r,transform:f,symbol:c,maskId:m,title:o,titleId:i,extra:v,watchable:!0})])}).catch(A)})},n.generateAbstractIcon=function(a){var e=a.children,r=a.attributes,o=a.main,i=a.transform,s=a.styles,f=At(s);f.length>0&&(r.style=f);var c;return Ht(i)&&(c=z("generateAbstractTransformGrouping",{main:o,transform:i,containerWidth:o.width,iconWidth:o.width})),e.push(c||o.icon),{children:e,attributes:r}}}},Ne={mixout:function(){return{layer:function(a){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=e.classes,o=r===void 0?[]:r;return Nt({type:"layer"},function(){V("beforeDOMElementCreation",{assembler:a,params:e});var i=[];return a(function(s){Array.isArray(s)?s.map(function(f){i=i.concat(f.abstract)}):i=i.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(d.cssPrefix,"-layers")].concat(rt(o)).join(" ")},children:i}]})}}}},Te={mixout:function(){return{counter:function(a){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=e.title,o=r===void 0?null:r,i=e.classes,s=i===void 0?[]:i,f=e.attributes,c=f===void 0?{}:f,l=e.styles,m=l===void 0?{}:l;return Nt({type:"counter",content:a},function(){return V("beforeDOMElementCreation",{content:a,params:e}),ce({content:a.toString(),title:o,extra:{attributes:c,styles:m,classes:["".concat(d.cssPrefix,"-layers-counter")].concat(rt(s))}})})}}}},Ie={mixout:function(){return{text:function(a){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=e.transform,o=r===void 0?I:r,i=e.title,s=i===void 0?null:i,f=e.classes,c=f===void 0?[]:f,l=e.attributes,m=l===void 0?{}:l,v=e.styles,b=v===void 0?{}:v;return Nt({type:"text",content:a},function(){return V("beforeDOMElementCreation",{content:a,params:e}),qn({content:a,transform:u(u({},I),o),title:s,extra:{attributes:m,styles:b,classes:["".concat(d.cssPrefix,"-layers-text")].concat(rt(c))}})})}}},provides:function(n){n.generateLayersText=function(a,e){var r=e.title,o=e.transform,i=e.extra,s=null,f=null;if(En){var c=parseInt(getComputedStyle(a).fontSize,10),l=a.getBoundingClientRect();s=l.width/c,f=l.height/c}return d.autoA11y&&!r&&(i.attributes["aria-hidden"]="true"),Promise.resolve([a,qn({content:a.innerHTML,width:s,height:f,transform:o,title:r,extra:i,watchable:!0})])}}},Me=new RegExp('"',"ug"),sa=[1105920,1112319];function Re(t){var n=t.replace(Me,""),a=Xa(n,0),e=a>=sa[0]&&a<=sa[1],r=n.length===2?n[0]===n[1]:!1;return{value:Bt(r?n[0]:n),isSecondary:e||r}}function fa(t,n){var a="".concat(xa).concat(n.replace(":","-"));return new Promise(function(e,r){if(t.getAttribute(a)!==null)return e();var o=Z(t.children),i=o.filter(function(Q){return Q.getAttribute(zt)===n})[0],s=$.getComputedStyle(t,n),f=s.getPropertyValue("font-family").match(Ca),c=s.getPropertyValue("font-weight"),l=s.getPropertyValue("content");if(i&&!f)return t.removeChild(i),e();if(f&&l!=="none"&&l!==""){var m=s.getPropertyValue("content"),v=~["Sharp"].indexOf(f[2])?k:y,b=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(f[2])?st[v][f[2].toLowerCase()]:Pa[v][c],A=Re(m),O=A.value,T=A.isSecondary,M=f[0].startsWith("FontAwesome"),x=qt(b,O),_=x;if(M){var R=te(O);R.iconName&&R.prefix&&(x=R.iconName,b=R.prefix)}if(x&&!T&&(!i||i.getAttribute($t)!==b||i.getAttribute(jt)!==_)){t.setAttribute(a,_),i&&t.removeChild(i);var C=_e(),K=C.extra;K.attributes[zt]=n,an(x,b).then(function(Q){var vn=Zt(u(u({},C),{},{icons:{main:Q,mask:Kt()},prefix:b,iconName:_,extra:K,watchable:!0})),H=h.createElement("svg");n==="::before"?t.insertBefore(H,t.firstChild):t.appendChild(H),H.outerHTML=vn.map(function(tr){return dt(tr)}).join(`
`),t.removeAttribute(a),e()}).catch(r)}else e()}else e()})}function Le(t){return Promise.all([fa(t,"::before"),fa(t,"::after")])}function De(t){return t.parentNode!==document.head&&!~_a.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(zt)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function la(t){if(L)return new Promise(function(n,a){var e=Z(t.querySelectorAll("*")).filter(De).map(Le),r=rn.begin("searchPseudoElements");aa(),Promise.all(e).then(function(){r(),sn(),n()}).catch(function(){r(),sn(),a()})})}var Fe={hooks:function(){return{mutationObserverCallbacks:function(a){return a.pseudoElementsCallback=la,a}}},provides:function(n){n.pseudoElements2svg=function(a){var e=a.node,r=e===void 0?h:e;d.searchPseudoElements&&la(r)}}},ca=!1,ze={mixout:function(){return{dom:{unwatch:function(){aa(),ca=!0}}}},hooks:function(){return{bootstrap:function(){ea(Qt("mutationObserverCallbacks",{}))},noAuto:function(){ke()},watch:function(a){var e=a.observeMutationsRoot;ca?sn():ea(Qt("mutationObserverCallbacks",{observeMutationsRoot:e}))}}}},ua=function(n){var a={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return n.toLowerCase().split(" ").reduce(function(e,r){var o=r.toLowerCase().split("-"),i=o[0],s=o.slice(1).join("-");if(i&&s==="h")return e.flipX=!0,e;if(i&&s==="v")return e.flipY=!0,e;if(s=parseFloat(s),isNaN(s))return e;switch(i){case"grow":e.size=e.size+s;break;case"shrink":e.size=e.size-s;break;case"left":e.x=e.x-s;break;case"right":e.x=e.x+s;break;case"up":e.y=e.y-s;break;case"down":e.y=e.y+s;break;case"rotate":e.rotate=e.rotate+s;break}return e},a)},$e={mixout:function(){return{parse:{transform:function(a){return ua(a)}}}},hooks:function(){return{parseNodeAttributes:function(a,e){var r=e.getAttribute("data-fa-transform");return r&&(a.transform=ua(r)),a}}},provides:function(n){n.generateAbstractTransformGrouping=function(a){var e=a.main,r=a.transform,o=a.containerWidth,i=a.iconWidth,s={transform:"translate(".concat(o/2," 256)")},f="translate(".concat(r.x*32,", ").concat(r.y*32,") "),c="scale(".concat(r.size/16*(r.flipX?-1:1),", ").concat(r.size/16*(r.flipY?-1:1),") "),l="rotate(".concat(r.rotate," 0 0)"),m={transform:"".concat(f," ").concat(c," ").concat(l)},v={transform:"translate(".concat(i/2*-1," -256)")},b={outer:s,inner:m,path:v};return{tag:"g",attributes:u({},b.outer),children:[{tag:"g",attributes:u({},b.inner),children:[{tag:e.icon.tag,children:e.icon.children,attributes:u(u({},e.icon.attributes),b.path)}]}]}}}},fn={x:0,y:0,width:"100%",height:"100%"};function ma(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||n)&&(t.attributes.fill="black"),t}function je(t){return t.tag==="g"?t.children:[t]}var Ye={hooks:function(){return{parseNodeAttributes:function(a,e){var r=e.getAttribute("data-fa-mask"),o=r?Ot(r.split(" ").map(function(i){return i.trim()})):Kt();return o.prefix||(o.prefix=Y()),a.mask=o,a.maskId=e.getAttribute("data-fa-mask-id"),a}}},provides:function(n){n.generateAbstractMask=function(a){var e=a.children,r=a.attributes,o=a.main,i=a.mask,s=a.maskId,f=a.transform,c=o.width,l=o.icon,m=i.width,v=i.icon,b=$a({transform:f,containerWidth:m,iconWidth:c}),A={tag:"rect",attributes:u(u({},fn),{},{fill:"white"})},O=l.children?{children:l.children.map(ma)}:{},T={tag:"g",attributes:u({},b.inner),children:[ma(u({tag:l.tag,attributes:u(u({},l.attributes),b.path)},O))]},M={tag:"g",attributes:u({},b.outer),children:[T]},x="mask-".concat(s||mt()),_="clip-".concat(s||mt()),R={tag:"mask",attributes:u(u({},fn),{},{id:x,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[A,M]},C={tag:"defs",children:[{tag:"clipPath",attributes:{id:_},children:je(v)},R]};return e.push(C,{tag:"rect",attributes:u({fill:"currentColor","clip-path":"url(#".concat(_,")"),mask:"url(#".concat(x,")")},fn)}),{children:e,attributes:r}}}},Ue={provides:function(n){var a=!1;$.matchMedia&&(a=$.matchMedia("(prefers-reduced-motion: reduce)").matches),n.missingIconAbstract=function(){var e=[],r={fill:"currentColor"},o={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};e.push({tag:"path",attributes:u(u({},r),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var i=u(u({},o),{},{attributeName:"opacity"}),s={tag:"circle",attributes:u(u({},r),{},{cx:"256",cy:"364",r:"28"}),children:[]};return a||s.children.push({tag:"animate",attributes:u(u({},o),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:u(u({},i),{},{values:"1;0;1;1;0;1;"})}),e.push(s),e.push({tag:"path",attributes:u(u({},r),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:a?[]:[{tag:"animate",attributes:u(u({},i),{},{values:"1;0;0;0;0;1;"})}]}),a||e.push({tag:"path",attributes:u(u({},r),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:u(u({},i),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:e}}}},He={hooks:function(){return{parseNodeAttributes:function(a,e){var r=e.getAttribute("data-fa-symbol"),o=r===null?!1:r===""?!0:r;return a.symbol=o,a}}}},We=[Ua,Oe,Ne,Te,Ie,Fe,ze,$e,Ye,Ue,He];ee(We,{mixoutsTo:S}),S.noAuto,S.config;var Ge=S.library;S.dom,S.parse,S.findIconDefinition,S.toHtml,S.icon,S.layer,S.text,S.counter;var Be={prefix:"fas",iconName:"house",icon:[576,512,[127968,63498,63500,"home","home-alt","home-lg-alt"],"f015","M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"]},q=(t=>(t.XS="xs",t.S="s",t.M="m",t.L="l",t))(q||{}),p=(t=>(t.DEFAULT="default",t.PRIMARY="primary",t.SUCCESS="success",t.DANGER="danger",t.WARNING="warning",t.PREMIUM="premium",t))(p||{});class Xe{constructor(n,a,...e){pt(this,"callback");pt(this,"args");pt(this,"wait");pt(this,"timeOutID");this.callback=n,this.wait=a,this.args=e}debounce(...n){this.timeOutID&&window.clearTimeout(this.timeOutID),this.timeOutID=window.setTimeout(()=>{this.callback.apply(null,[...this.args,...n])},this.wait)}}const ln=new Map([[p.DEFAULT,"button-type__default"],[p.PRIMARY,"button-type__primary"],[p.SUCCESS,"button-type__success"],[p.DANGER,"button-type__danger"],[p.WARNING,"button-type__warning"],[p.PREMIUM,"button-type__premium"]]),P="cursor-pointer",cn=new Map([[p.DEFAULT,`${P} button-type__default__hover`],[p.PRIMARY,`${P} button-type__primary__hover`],[p.SUCCESS,`${P} button-type__success__hover`],[p.DANGER,`${P} button-type__danger__hover`],[p.WARNING,`${P} button-type__warning__hover`],[p.PREMIUM,`${P} button-type__premium__hover`]]),un=new Map([[p.DEFAULT,`${P} button-type__default__active`],[p.PRIMARY,`${P} button-type__primary__active`],[p.SUCCESS,`${P} button-type__success__active`],[p.DANGER,`${P} button-type__danger__active`],[p.WARNING,`${P} button-type__warning__active`],[p.PREMIUM,`${P} button-type__premium__active`]]),et="cursor-not-allowed",mn=new Map([[p.DEFAULT,`${et} button-type__default__disabled`],[p.PRIMARY,`${et} button-type__primary__disabled`],[p.SUCCESS,`${et} button-type__success__disabled`],[p.DANGER,`${et} button-type__danger__disabled`],[p.WARNING,`${et} button-type__warning__disabled`],[p.PREMIUM,`${et} button-type__premium__disabled`]]),dn=new Map([[q.XS,"sizing__xs"],[q.S,"sizing__s"],[q.M,"sizing__m"],[q.L,"sizing__l"]]),Ve=t=>(ln.has(t)?ln.get(t):ln.get(p.DEFAULT))||"",qe=t=>(cn.has(t)?cn.get(t):cn.get(p.DEFAULT))||"",Ke=t=>(un.has(t)?un.get(t):un.get(p.DEFAULT))||"",Qe=t=>(mn.has(t)?mn.get(t):mn.get(p.DEFAULT))||"",Je=t=>(dn.has(t)?dn.get(t):dn.get(q.M))||"",Ze=g.defineComponent({__name:"EtButton",props:{disabled:{default:!1},readonly:{default:!1},active:{default:!1},size:{default:q.M},type:{default:p.DEFAULT}},emits:["click","focus","blur"],setup(t,{emit:n}){const a=t,e=c=>{if(a.disabled||a.readonly){c.preventDefault();return}n("click",c)},r=()=>{var c;return(c=s==null?void 0:s.value)==null?void 0:c.focus()},o=()=>{var c;return(c=s==null?void 0:s.value)==null?void 0:c.blur()},i=new Xe(e,100),s=g.ref(null),f=g.computed(()=>[Ve(a.type),Je(a.size),!a.disabled&&!a.readonly?qe(a.type):"",!a.disabled&&a.active?Ke(a.type):"",a.disabled?Qe(a.type):""].join(" "));return g.defineExpose({focus:r,blur:o}),(c,l)=>(g.openBlock(),g.createElementBlock("button",{ref_key:"elButton",ref:s,class:g.normalizeClass(["et-button border-2 rounded drop-shadow-sm whitespace-nowrap inline-block cursor-default",g.unref(f)]),onMouseup:l[0]||(l[0]=g.withModifiers(m=>g.unref(i).debounce(m),["left","stop"])),onKeyup:l[1]||(l[1]=g.withKeys(m=>g.unref(i).debounce(m),["enter"])),onFocus:l[2]||(l[2]=m=>n("focus")),onBlur:l[3]||(l[3]=m=>n("blur"))},[g.renderSlot(c.$slots,"default")],34))}});Ge.add(Be),E.EtButton=Ze,E.Sonar=W,Object.defineProperty(E,Symbol.toStringTag,{value:"Module"})});
