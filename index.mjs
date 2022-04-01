// Copyright (c) 2022 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import e from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-nonenumerable-read-only-property@esm/index.mjs";import t from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-function@esm/index.mjs";import r from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-collection@esm/index.mjs";import n from"https://cdn.jsdelivr.net/gh/stdlib-js/string-format@esm/index.mjs";import i from"https://cdn.jsdelivr.net/gh/stdlib-js/constants-float64-pinf@esm/index.mjs";import o from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-plain-object@esm/index.mjs";import s from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-has-own-property@esm/index.mjs";import l from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-boolean@esm/index.mjs";import u from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-positive-integer@esm/index.mjs";function a(e){if(e.__esModule)return e;var t=Object.defineProperty({},"__esModule",{value:!0});return Object.keys(e).forEach((function(r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})})),t}var c=o,m=s,f=l.isPrimitive,d=u.isPrimitive,h=n;var p=function(e,t){return c(t)?(m(t,"thisArg")&&(e.thisArg=t.thisArg),m(t,"series")&&(e.series=t.series,!f(e.series))?new TypeError(h("invalid option. `%s` option must be a boolean. Option: `%s`.","series",e.series)):m(t,"limit")&&(e.limit=t.limit,!d(e.limit))?new TypeError(h("invalid option. `%s` option must be a positive integer. Option: `%s`.","limit",e.limit)):null):new TypeError(h("invalid argument. Options argument must be an object. Value: `%s`.",t))},g="undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{};function v(){throw new Error("setTimeout has not been defined")}function w(){throw new Error("clearTimeout has not been defined")}var b=v,j=w;function y(e){if(b===setTimeout)return setTimeout(e,0);if((b===v||!b)&&setTimeout)return b=setTimeout,setTimeout(e,0);try{return b(e,0)}catch(t){try{return b.call(null,e,0)}catch(t){return b.call(this,e,0)}}}"function"==typeof g.setTimeout&&(b=setTimeout),"function"==typeof g.clearTimeout&&(j=clearTimeout);var T,x=[],E=!1,O=-1;function A(){E&&T&&(E=!1,T.length?x=T.concat(x):O=-1,x.length&&_())}function _(){if(!E){var e=y(A);E=!0;for(var t=x.length;t;){for(T=x,x=[];++O<t;)T&&T[O].run();O=-1,t=x.length}T=null,E=!1,function(e){if(j===clearTimeout)return clearTimeout(e);if((j===w||!j)&&clearTimeout)return j=clearTimeout,clearTimeout(e);try{j(e)}catch(t){try{return j.call(null,e)}catch(t){return j.call(this,e)}}}(e)}}function N(e,t){this.fun=e,this.array=t}N.prototype.run=function(){this.fun.apply(null,this.array)};function P(){}var L=P,k=P,D=P,M=P,V=P,C=P,F=P;var q=g.performance||{},z=q.now||q.mozNow||q.msNow||q.oNow||q.webkitNow||function(){return(new Date).getTime()};var J=new Date;var S={nextTick:function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];x.push(new N(e,t)),1!==x.length||E||y(_)},title:"browser",browser:!0,env:{},argv:[],version:"",versions:{},on:L,addListener:k,once:D,off:M,removeListener:V,removeAllListeners:C,emit:F,binding:function(e){throw new Error("process.binding is not supported")},cwd:function(){return"/"},chdir:function(e){throw new Error("process.chdir is not supported")},umask:function(){return 0},hrtime:function(e){var t=.001*z.call(q),r=Math.floor(t),n=Math.floor(t%1*1e9);return e&&(r-=e[0],(n-=e[1])<0&&(r--,n+=1e9)),[r,n]},platform:"browser",release:{},config:{},uptime:function(){return(new Date-J)/1e3}};module.exports=void 0!==S&&"renderer"===S.type?require("./browser.js"):require("./node.js");var B=a(Object.freeze({__proto__:null}))("for-each-right-async:limit");var G=t,H=r,I=n,K=i,Q=p,R=function(e,t,r,n){var i,o,s,l,u,a;if(l=e.length,B("Collection length: %d",l),0===l)return B("Finished processing a collection."),n();for(s=l<t.limit?l:t.limit,B("Concurrency limit: %d",s),B("Number of arguments: %d",r.length),i=0,u=l,a=0;a<s;a++)u>0&&c();function c(){B("Collection element %d: %s.",u-=1,JSON.stringify(e[u])),2===r.length?r.call(t.thisArg,e[u],m):3===r.length?r.call(t.thisArg,e[u],u,m):r.call(t.thisArg,e[u],u,e,m)}function m(e){if(!o)return e?(o=!0,B("Encountered an error: %s",e.message),n(e)):(B("Processed %d of %d collection elements.",i+=1,l),u>0?c():i===l?(B("Finished processing a collection."),n()):void 0)}};var U=function(e,t){var r,n,i;if(r={},arguments.length>1){if(n=Q(r,e))throw n;i=t}else i=e;if(!G(i))throw new TypeError(I("invalid argument. Last argument must be a function. Value: `%s`.",i));return r.series?r.limit=1:r.limit||(r.limit=K),o;function o(e,t){if(!H(e))throw new TypeError(I("invalid argument. First argument must be a collection. Value: `%s`.",e));if(!G(t))throw new TypeError(I("invalid argument. Last argument must be a function. Value: `%s`.",t));return R(e,r,i,(function(e){if(e)return t(e);t()}))}},W=U;var X=function(e,t,r,n){if(arguments.length<4)return W(t)(e,r);W(t,r)(e,n)},Y=U;e(X,"factory",Y);var Z=X;export{Z as default,Y as factory};
//# sourceMappingURL=index.mjs.map
