// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.11/esri/copyright.txt for details.

define(["require","exports","dojo/date","dojo/i18n!../nls/common","dojo/number","dojo/date/locale","./global","./typedArrayUtil","@dojo/framework/shim/string"],function(t,e,r,n,i,a,o,f,s){function u(t,e){var r;if(e)for(r in t)t.hasOwnProperty(r)&&(void 0===t[r]?delete t[r]:t[r]instanceof Object&&u(t[r],!0));else for(r in t)t.hasOwnProperty(r)&&void 0===t[r]&&delete t[r];return t}function c(t){if(!t||"object"!=typeof t||"function"==typeof t)return t;if(f.isInt8Array(t)||f.isUint8Array(t)||f.isUint8ClampedArray(t)||f.isInt16Array(t)||f.isUint16Array(t)||f.isInt32Array(t)||f.isUint32Array(t)||f.isFloat32Array(t)||f.isFloat64Array(t))return f.slice(t);if(t instanceof Date)return new Date(t.getTime());if(t instanceof ArrayBuffer){return t.slice(0,t.byteLength)}var e=t;return"function"==typeof e.clone?e.clone():"function"==typeof e.map&&"function"==typeof e.forEach?e.map(c):"function"==typeof e.notifyChange&&"function"==typeof e.watch?e.clone():h({},t,c)}function l(t,e){return t===e||"number"==typeof t&&isNaN(t)&&"number"==typeof e&&isNaN(e)||"function"==typeof(t||{}).getTime&&"function"==typeof(e||{}).getTime&&t.getTime()===e.getTime()||!1}function m(t){void 0===t&&(t={});for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];for(var n=1,i=arguments.length;n<i;n++)h(t,arguments[n]);return t}function p(t,e){var r;for(r in t)if(t[r]===e)return r;return null}function d(t){if(t){var e=typeof t;if("string"===e)t=t.replace(A,"");else if("object"===e){var r=void 0;for(r in t){var n=t[r];n&&"string"==typeof n&&(n=n.replace(A,"")),t[r]=n}}}return t}function y(t,e,r){var i,a,o;if(null!=r&&("object"==typeof r?(i=r.first,a=r.dateFormat,o=r.numberFormat):i=r),!e||e===T){var f=['<table class="esri-widget__table" summary="'+n.fieldsSummary+'"><tbody>'],s=void 0,u=void 0;for(u in t)if(s=t[u],a&&-1!==(a.properties||[]).indexOf(u)?s=O(u,t,a.formatter||"DateString"):o&&-1!==(o.properties||[]).indexOf(u)&&(s=O(u,t,o.formatter||"NumberFormat")),f.push("<tr><th>"+u+"</th><td>"+N(s)+"</td></tr>"),i)break;return f.push("</tbody></table>"),f.join("")}return e.replace(D,function(e,r){return v({key:r,data:t,dateFormat:a,nbrFormat:o})})}function g(t,e,r){var n,i=F(t,r,e),a={};t=i[0];for(n in t)i[2].call(i[n],t[n],n,t)&&(a[n]=t[n]);return a}function v(t){var e=t.key,r=t.data,n=t.dateFormat,i=t.nbrFormat,a=e.split(":");if(a.length>1){var o=a[0];return a.shift(),O(o,r,a.join(":"))}return n&&-1!==(n.properties||[]).indexOf(e)?O(e,r,n.formatter||"DateString"):i&&-1!==(i.properties||[]).indexOf(e)?O(e,r,i.formatter||"NumberFormat"):N(r[e])}function b(t,e,r){r||(r=o);try{for(var n=0;n<t.length;n++){var i=t[n];if(!(i in r)){if(!e)return;r[i]={}}r=r[i]}return r}catch(t){}}function h(t,e,r){var n,i,a={};for(n in e){i=e[n];var o=!(n in a)||a[n]!==i;n in t&&(t[n]===i||!o)||(t[n]=r?r(i):i)}return t}function F(t,e,r){return["string"==typeof t?t.split(""):t,e||o,"string"==typeof r?new Function("item","index","array",r):r]}function N(t){return null!=t?t:""}function O(t,e,n){var o,f=n.match(S),s=f[1].trim(),u=e[t],c=JSON.parse((f[2]?f[2].trim():"{}").replace(w,"{").replace(x,"}").replace(U,'$1"$2":').replace(L,'":"').replace(_,'"$1')),l=c.utcOffset;if(-1===j.indexOf(s)){var p=b(s.split("."));"function"==typeof p&&(u=p(u,t,e,c))}else if("number"==typeof u||"string"==typeof u&&u&&!isNaN(Number(u)))switch(u=Number(u),s){case"NumberFormat":var d=m({},c),y="string"==typeof d.places?parseFloat(d.places):d.places;return(isNaN(y)||y<0)&&(d.places=1/0),i.format(u,d);case"DateString":return o=new Date(u),c.local||c.systemLocale?c.systemLocale?o.toLocaleDateString()+(c.hideTime?"":" "+o.toLocaleTimeString()):o.toDateString()+(c.hideTime?"":" "+o.toTimeString()):(o=o.toUTCString(),c.hideTime&&(o=o.replace(k,"")),o);case"DateFormat":return o=new Date(u),null!=l&&(o=r.add(o,"minute",o.getTimezoneOffset()-l)),a.format(o,c)}return N(u)}Object.defineProperty(e,"__esModule",{value:!0});var T="{*}",j=["NumberFormat","DateString","DateFormat"],A=/<\/?[^>]+>/g,D=/\{([^\}]+)\}/g,S=/([^\(]+)(\([^\)]+\))?/i,w=/^\(/,x=/\)$/,U=/([{,])\s*([0-9a-zA-Z\_]+)\s*:/gi,L=/\"\s*:\s*\'/gi,_=/\'\s*(,|\})/gi,k=/\s+\d\d\:\d\d\:\d\d\s+(utc|gmt)/i;e.startsWith=s.startsWith,e.endsWith=s.endsWith,e.fixJson=u,e.clone=c,e.equals=l,e.mixin=m,e.valueOf=p,e.stripTags=d,e.substitute=y,e.filter=g});