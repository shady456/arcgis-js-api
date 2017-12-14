// COPYRIGHT © 2017 Esri
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
// See http://js.arcgis.com/4.6/esri/copyright.txt for details.

define(["require","exports","./aaBoundingRect","../../../geometry/Extent"],function(n,t,i,a){function e(n){return void 0===n&&(n=t.ZERO),[n[0],n[1],n[2],n[3],n[4],n[5]]}function r(n){return[n.xmin,n.ymin,n.zmin,n.xmax,n.ymax,n.zmax]}function m(n,t){var i=isFinite(n[2])||isFinite(n[5]);return new a(i?{xmin:n[0],xmax:n[3],ymin:n[1],ymax:n[4],zmin:n[2],zmax:n[5],spatialReference:t}:{xmin:n[0],xmax:n[3],ymin:n[1],ymax:n[4],spatialReference:t})}function u(n,t){return[n[0],n[1],n[2],t[0],t[1],t[2]]}function o(n,t,a){void 0===a&&(a=n);var e=t.declaredClass;return"esri.geometry.Extent"===e?(a[0]=Math.min(n[0],t.xmin),a[1]=Math.min(n[1],t.ymin),a[3]=Math.max(n[3],t.xmax),a[4]=Math.max(n[4],t.ymax),t.hasZ&&(a[2]=Math.min(n[2],t.zmin),a[5]=Math.max(n[5],t.zmax))):"esri.geometry.Point"===e?(a[0]=Math.min(n[0],t.x),a[1]=Math.min(n[1],t.y),a[3]=Math.max(n[3],t.x),a[4]=Math.max(n[4],t.y),t.hasZ&&(a[2]=Math.min(n[2],t.z),a[5]=Math.max(n[5],t.z))):P(t)?(a[0]=Math.min(n[0],t[0]),a[1]=Math.min(n[1],t[1]),a[2]=Math.min(n[2],t[2]),a[3]=Math.max(n[3],t[3]),a[4]=Math.max(n[4],t[4]),a[5]=Math.max(n[5],t[5])):i.is(t)?(a[0]=Math.min(n[0],t[0]),a[1]=Math.min(n[1],t[1]),a[3]=Math.max(n[3],t[2]),a[4]=Math.max(n[4],t[3])):Array.isArray(t)&&(2===t.length?(a[0]=Math.min(n[0],t[0]),a[1]=Math.min(n[1],t[1]),a[3]=Math.max(n[3],t[0]),a[4]=Math.max(n[4],t[1])):3===t.length&&(a[0]=Math.min(n[0],t[0]),a[1]=Math.min(n[1],t[1]),a[2]=Math.min(n[2],t[2]),a[3]=Math.max(n[3],t[0]),a[4]=Math.max(n[4],t[1]),a[5]=Math.max(n[5],t[2]))),a}function h(n,t,i,a,e){void 0===e&&(e=n);for(var r=n[0],m=n[1],u=n[2],o=n[3],h=n[4],x=n[5],M=0;a>M;M++)r=Math.min(r,t[i+3*M]),m=Math.min(m,t[i+3*M+1]),u=Math.min(u,t[i+3*M+2]),o=Math.max(o,t[i+3*M]),h=Math.max(h,t[i+3*M+1]),x=Math.max(x,t[i+3*M+2]);return e[0]=r,e[1]=m,e[2]=u,e[3]=o,e[4]=h,e[5]=x,e}function x(n){for(var t=0;6>t;t++)if(!isFinite(n[t]))return!1;return!0}function M(n){return n[0]>=n[3]?0:n[3]-n[0]}function f(n){return n[1]>=n[4]?0:n[4]-n[1]}function c(n){return n[2]>=n[5]?0:n[5]-n[2]}function s(n,t){return void 0===t&&(t=[0,0,0]),t[0]=n[0]+M(n)/2,t[1]=n[1]+f(n)/2,t[2]=n[2]+c(n)/2,t}function l(n,t){return void 0===t&&(t=[0,0,0]),t[0]=M(n),t[1]=f(n),t[2]=c(n),t}function d(n,t){return t[0]>=n[0]&&t[1]>=n[1]&&t[2]>=n[2]&&t[0]<=n[3]&&t[1]<=n[4]&&t[2]<=n[5]}function y(n,t,i){return t[0]>=n[0]-i&&t[1]>=n[1]-i&&t[2]>=n[2]-i&&t[0]<=n[3]+i&&t[1]<=n[4]+i&&t[2]<=n[5]+i}function v(n,t){return t[0]>=n[0]&&t[1]>=n[1]&&t[2]>=n[2]&&t[3]<=n[3]&&t[4]<=n[4]&&t[5]<=n[5]}function g(n,t){return Math.max(t[0],n[0])<=Math.min(t[3],n[3])&&Math.max(t[1],n[1])<=Math.min(t[4],n[4])&&Math.max(t[2],n[2])<=Math.min(t[5],n[5])}function z(n,t,i,a,e){return void 0===e&&(e=n),e[0]=n[0]+t,e[1]=n[1]+i,e[2]=n[2]+a,e[3]=n[3]+t,e[4]=n[4]+i,e[5]=n[5]+a,e}function E(n,t,i){return void 0===i&&(i=n),i[0]=t[0],i[1]=t[1],i[2]=t[2],i!==n&&(i[3]=n[3],i[4]=n[4],i[5]=n[5]),i}function I(n,t,i){return void 0===i&&(i=n),i[3]=t[0],i[4]=t[1],i[5]=t[2],i!==n&&(i[0]=n[0],i[1]=n[1],i[2]=n[2]),n}function p(n,t){return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n}function R(n,t){return t||(t=i.create()),t[0]=n[0],t[1]=n[1],t[2]=n[3],t[3]=n[4],t}function F(n,t){return n[0]=t[0],n[1]=t[1],n[3]=t[2],n[4]=t[3],n}function P(n){return 6===n.length}function N(n){return 0===M(n)&&0===f(n)&&0===c(n)}function O(n,t,i){if(null==n||null==t)return n===t;if(!P(n)||!P(t))return!1;if(i){for(var a=0;a<n.length;a++)if(!i(n[a],t[a]))return!1}else for(var a=0;a<n.length;a++)if(n[a]!==t[a])return!1;return!0}Object.defineProperty(t,"__esModule",{value:!0}),t.create=e,t.fromExtent=r,t.toExtent=m,t.fromMinMax=u,t.expand=o,t.expandBuffer=h,t.allFinite=x,t.width=M,t.depth=f,t.height=c,t.center=s,t.size=l,t.containsPoint=d,t.containsPointWithMargin=y,t.contains=v,t.intersects=g,t.offset=z,t.setMin=E,t.setMax=I,t.set=p,t.toRect=R,t.fromRect=F,t.is=P,t.isPoint=N,t.equals=O,t.POSITIVE_INFINITY=[-(1/0),-(1/0),-(1/0),1/0,1/0,1/0],t.NEGATIVE_INFINITY=[1/0,1/0,1/0,-(1/0),-(1/0),-(1/0)],t.ZERO=[0,0,0,0,0,0]});