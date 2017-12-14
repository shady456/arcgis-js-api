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

define(["require","exports"],function(n,r){function t(n){if(!n)return null;if(Array.isArray(n))return n;var r=n.hasZ,t=n.hasM;if("point"===n.type)return t&&r?[n.x,n.y,n.z,n.m]:r?[n.x,n.y,n.z]:t?[n.x,n.y,n.m]:[n.x,n.y];if("polygon"===n.type)return n.rings.slice(0);if("polyline"===n.type)return n.paths.slice(0);if("multipoint"===n.type)return n.points.slice(0);if("extent"===n.type){var e=n.clone().normalize();if(!e)return null;var i=!1,l=!1;return e.forEach(function(n){n.hasZ&&(i=!0),n.hasM&&(l=!0)}),e.map(function(n){var r=[[n.xmin,n.ymin],[n.xmin,n.ymax],[n.xmax,n.ymax],[n.xmax,n.ymin],[n.xmin,n.ymin]];if(i&&n.hasZ)for(var t=.5*(n.zmax-n.zmin),e=0;e<r.length;e++)r[e].push(t);if(l&&n.hasM)for(var a=.5*(n.mmax-n.mmin),e=0;e<r.length;e++)r[e].push(a);return r})}return null}function e(n,r){var t=r[0]-n[0],e=r[1]-n[1];if(n.length>2&&r.length>2){var i=n[2]-r[2];return Math.sqrt(t*t+e*e+i*i)}return Math.sqrt(t*t+e*e)}function i(n,r,t){var e=n[0]+t*(r[0]-n[0]),i=n[1]+t*(r[1]-n[1]);return n.length>2&&r.length>2?[e,i,n[2]+t*(r[2]-n[2])]:[e,i]}function l(n,r){return i(n,r,.5)}function a(n,r){if(!n)return!1;if(g(n))return o(!1,n,r);for(var t=!1,e=0,i=n.length;i>e;e++)t=o(t,n[e],r);return t}function u(n){for(var r=n.length,t=0,i=0;r-1>i;++i)t+=e(n[i],n[i+1]);return t}function f(n,r){if(0>=r)return n[0];for(var t=n.length,l=0,a=0;t-1>a;++a){var u=e(n[a],n[a+1]);if(u>r-l){var f=(r-l)/u;return i(n[a],n[a+1],f)}l+=u}return n[t-1]}function h(n,r,t){for(var e=n.length,i=0,l=0,a=0,u=0;e>u;u++){var f=n[u],h=n[(u+1)%e],o=2;i+=f[0]*h[1]-h[0]*f[1],f.length>2&&h.length>2&&t&&(l+=f[0]*h[2]-h[0]*f[2],o=3),f.length>o&&h.length>o&&r&&(a+=f[0]*h[o]-h[0]*f[o])}return 0>=i&&0>=l&&0>=a}function o(n,r,t){for(var e=t[0],i=t[1],l=0,a=0,u=r.length;u>a;a++){l++,l===u&&(l=0);var f=r[a],h=f[0],o=f[1],g=r[l],v=g[0],s=g[1];(i>o&&s>=i||i>s&&o>=i)&&e>h+(i-o)/(s-o)*(v-h)&&(n=!n)}return n}function g(n){return!Array.isArray(n[0][0])}function v(n){for(var r=0;r<n.length;r++){for(var t=n[r],e=0;e<t.length-1;e++)for(var i=[[t[e][0],t[e][1]],[t[e+1][0],t[e+1][1]]],l=r+1;l<n.length;l++)for(var a=0;a<n[l].length-1;a++){var u=[[n[l][a][0],n[l][a][1]],[n[l][a+1][0],n[l][a+1][1]]],f=y(i,u);if(f&&!(f[0]===i[0][0]&&f[1]===i[0][1]||f[0]===u[0][0]&&f[1]===u[0][1]||f[0]===i[1][0]&&f[1]===i[1][1]||f[0]===u[1][0]&&f[1]===u[1][1]))return!0}var h=t.length;if(!(4>=h))for(var e=0;h-3>e;e++){var o=h-1;0===e&&(o=h-2);for(var i=[[t[e][0],t[e][1]],[t[e+1][0],t[e+1][1]]],l=e+2;o>l;l++){var u=[[t[l][0],t[l][1]],[t[l+1][0],t[l+1][1]]],f=y(i,u);if(f&&!(f[0]===i[0][0]&&f[1]===i[0][1]||f[0]===u[0][0]&&f[1]===u[0][1]||f[0]===i[1][0]&&f[1]===i[1][1]||f[0]===u[1][0]&&f[1]===u[1][1]))return!0}}}return!1}function s(n,r,t){var e,i,l=[];n.length=0;for(var a=t?[1/0,-(1/0),1/0,-(1/0),1/0,-(1/0)]:[1/0,-(1/0),1/0,-(1/0)],u=0,f=r.length;f>u;u++)e=c([],r[u],t,a),e.length&&l.push(e);if(l.sort(function(n,r){var e=n[2]-r[2];return 0===e&&t&&(e=n[4]-r[4]),e}),l.length&&(i=6*l[0][2],n[0]=l[0][0]/i,n[1]=l[0][1]/i,t&&(i=6*l[0][4],0!==i?n[2]=l[0][3]/i:n[2]=0),(n[0]<a[0]||n[0]>a[1]||n[1]<a[2]||n[1]>a[3]||t&&(n[2]<a[4]||n[2]>a[5]))&&(n.length=0)),!n.length){var h=r[0]&&r[0].length?m(r[0],t):null;h&&(n[0]=h[0],n[1]=h[1],t&&h.length>2&&(n[2]=h[2]))}return n}function c(n,r,t,e){for(var i=0,l=0,a=0,u=0,f=0,h=0,o=r.length-1;o>h;h++){var g=r[h],v=g[0],s=g[1],c=g[2],m=r[h+1],y=m[0],p=m[1],x=m[2],M=v*p-y*s;u+=M,i+=(v+y)*M,l+=(s+p)*M,t&&g.length>2&&m.length>2&&(M=v*x-y*c,a+=(c+x)*M,f+=M),v<e[0]&&(e[0]=v),v>e[1]&&(e[1]=v),s<e[2]&&(e[2]=s),s>e[3]&&(e[3]=s),t&&(c<e[4]&&(e[4]=c),c>e[5]&&(e[5]=c))}return u>0&&(u*=-1),f>0&&(f*=-1),u?(n[0]=i,n[1]=l,n[2]=.5*u,t?(n[3]=a,n[4]=.5*f):n.length=3):n.length=0,n}function m(n,r){for(var t=r?[0,0,0]:[0,0],i=r?[0,0,0]:[0,0],a=0,u=0,f=0,h=0,o=0,g=n.length;g-1>o;o++){var v=n[o],s=n[o+1];if(v&&s&&(t[0]=v[0],t[1]=v[1],i[0]=s[0],i[1]=s[1],r&&v.length>2&&s.length>2&&(t[2]=v[2],i[2]=s[2]),length=e(t,i),length)){a+=length;var c=l(v,s);u+=length*c[0],f+=length*c[1],r&&c.length>2&&(h+=length*c[2])}}return a>0?r?[u/a,f/a,h/a]:[u/a,f/a]:n.length?n[0]:null}function y(n,r){var t=n[0],e=t[0],i=t[1],l=n[1],a=l[0],u=l[1],f=r[0],h=f[0],o=f[1],g=r[1],v=g[0],s=g[1],c=v-h,m=e-h,y=a-e,p=s-o,x=i-o,M=u-i,d=p*y-c*M;if(0===d)return null;var z=(c*x-p*m)/d,A=(y*x-M*m)/d;if(z>=0&&1>=z&&A>=0&&1>=A){var P=e+z*(a-e),q=i+z*(u-i);return[P,q]}return null}Object.defineProperty(r,"__esModule",{value:!0}),r.geometryToCoordinates=t,r.getLength=e,r.getMidpoint=l,r.contains=a,r.getPathLength=u,r.getPointOnPath=f,r.isClockwise=h,r.isSelfIntersecting=v,r.ringsCentroid=s,r._getLineIntersection2=y});