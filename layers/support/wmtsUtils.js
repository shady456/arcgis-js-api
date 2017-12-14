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

define(["require","exports","../../geometry/Extent","../../geometry/Point","../../geometry/SpatialReference","../../geometry/support/WKIDUnitConversion","./TileInfo","../../core/Error"],function(e,t,r,i,n,a,l,o){function s(e,t){e=e.replace(/ows:/gi,"");var r=new DOMParser,i=r.parseFromString(e,"text/xml"),n=i.documentElement,a=c("Contents",n);if(!a)throw new o("wmtslayer:wmts-capabilities-xml-is-not-valid");var l,s,u,p=c("OperationsMetadata",n),g=p&&p.querySelector("[name='GetTile']"),v=g&&g.getElementsByTagName("Get"),x=v&&Array.prototype.slice.call(v),y=t.serviceMode;if(x&&x.length&&x.some(function(e){var t=c("Constraint",e);return!t||d("AllowedValues","Value",y,t)?(s=e.attributes[0].nodeValue,!0):(!t||d("AllowedValues","Value","RESTful",t)||d("AllowedValues","Value","REST",t)?u=e.attributes[0].nodeValue:(!t||d("AllowedValues","Value","KVP",t))&&(l=e.attributes[0].nodeValue),!1)}),!s)if(u)s=u,y="RESTful";else if(l)s=l,y="KVP";else{var h=c("ServiceMetadataURL",n);s=h.getAttribute("xlink:href")}var T=s.indexOf("1.0.0/");-1===T&&"RESTful"===y?s+="/":T>-1&&(s=s.substring(0,T)),"KVP"===y&&(s+=T>-1?"":"?");var w=f("ServiceIdentification>AccessConstraints",n),M=Array.prototype.slice.call(a.getElementsByTagName("Layer")),E=M.map(function(e){var t=f("Identifier",e);return R[t]=e,m(t,e,a)});return{copyright:w,layers:E,tileUrl:s,serviceMode:y}}function u(e){var t=e.layers;return t.forEach(function(e){e.tileMatrixSets.forEach(function(e){var t=e.tileInfo;96!==t.dpi&&(t.lods.forEach(function(r){r.scale=96*r.scale/t.dpi,r.resolution=V(t.spatialReference.wkid,r.scale*b/96,e.id)}),t.dpi=96)})}),e}function c(e,t){var r=t.getElementsByTagName(e);return r&&r.length>0?r[0]:null}function p(e,t){var r=Array.prototype.slice.call(t.getElementsByTagName(e));return r.map(function(e){return e.textContent})}function f(e,t){var r=e.split(">");return r.forEach(function(e){t=c(e,t)}),t&&t.textContent}function d(e,t,r,i){var n,a=Array.prototype.slice.call(i.childNodes);return a.some(function(i){if(i.nodeName.indexOf(e)>-1){var a=c(t,i),l=a&&a.textContent;return l===r||r.split(":")&&r.split(":")[1]===l?(n=i,!0):!1}}),n}function m(e,t,r){var i=f("Abstract",t),n=p("Format",t),a=y(t),l=h(t),o=f("Title",t),s=T(t,r);return{id:e,fullExtent:a,description:i,formats:n,styles:l,title:o,tileMatrixSets:s}}function g(e){var t,r,i,n,a=[],l=R[e],o=Array.prototype.slice.call(l.getElementsByTagName("ResourceURL")),s=l.getElementsByTagName("Dimension");return s.length&&(t=f("Identifier",s[0]),r=p("Default",s[0])||p("Value",s[0])),s.length>1&&(i=f("Identifier",s[1]),n=p("Default",s[1])||p("Value",s[1])),A[e]={dimensions:r,dimensions2:n},o.forEach(function(e){var l=e.getAttribute("template");if(t&&r.length)if(l.indexOf("{"+t+"}")>-1)l=l.replace("{"+t+"}","{dimensionValue}");else{var o=l.toLowerCase().indexOf("{"+t.toLowerCase()+"}");o>-1&&(l=l.substring(0,o)+"{dimensionValue}"+l.substring(o+t.length+2))}if(i&&n.length)if(l.indexOf("{"+i+"}")>-1)l=l.replace("{"+i+"}","{dimensionValue2}");else{var o=l.toLowerCase().indexOf("{"+i.toLowerCase()+"}");o>-1&&(l=l.substring(0,o)+"{dimensionValue2}"+l.substring(o+i.length+2))}a.push({template:l,format:e.getAttribute("fomrat"),resourceType:e.getAttribute("resourceType")})}),a}function v(e,t,r,i,n,a){var l=g(e),o=A[e].dimensions&&A[e].dimensions[0],s=A[e].dimensions2&&A[e].dimensions2[0],u="";return l&&l.length>0&&(u=l[n%l.length].template.replace(/\{Style\}/gi,r).replace(/\{TileMatrixSet\}/gi,t).replace(/\{TileMatrix\}/gi,i).replace(/\{TileRow\}/gi,n).replace(/\{TileCol\}/gi,a).replace(/\{dimensionValue\}/gi,o).replace(/\{dimensionValue2\}/gi,s)),u}function x(e,t,r,i){var n=g(e),a="";if(n&&n.length>0){var l=A[e].dimensions&&A[e].dimensions[0],o=A[e].dimensions2&&A[e].dimensions2[0];a=n[0].template,a.indexOf(".xxx")===a.length-4&&(a=a.slice(0,a.length-4)),a=a.replace(/\{Style\}/gi,i),a=a.replace(/\{TileMatrixSet\}/gi,t),a=a.replace(/\{TileMatrix\}/gi,"{level}"),a=a.replace(/\{TileRow\}/gi,"{row}"),a=a.replace(/\{TileCol\}/gi,"{col}"),a=a.replace(/\{dimensionValue\}/gi,l),a=a.replace(/\{dimensionValue2\}/gi,o)}return a}function y(e){var t=c("WGS84BoundingBox",e),r=t?f("LowerCorner",t).split(" "):["-180","-90"],i=t?f("UpperCorner",t).split(" "):["180","90"];return{xmin:parseFloat(r[0]),ymin:parseFloat(r[1]),xmax:parseFloat(i[0]),ymax:parseFloat(i[1]),spatialReference:{wkid:4326}}}function h(e){var t=Array.prototype.slice.call(e.getElementsByTagName("Style"));return t.map(function(e){var t=c("LegendURL",e),r=c("Keywords",e),i=r&&p("Keyword",r),n={"abstract":f("Abstract",e),id:f("Identifier",e),isDefault:"true"===e.getAttribute("isDefault"),keywords:i,legendUrl:t&&t.getAttribute("xlink:href"),title:f("Title",e)};return n})}function T(e,t){var r=p("TileMatrixSet",e);return r.map(function(r){return w(r,e,t)})}function w(e,t,r){var i=d("TileMatrixSetLink","TileMatrixSet",e,t),n=p("TileMatrix",i),a=d("TileMatrixSet","Identifier",e,r),o=M(a),s=o.spatialReference,u=s.wkid,m=c("TileMatrix",a),g=[parseInt(f("TileWidth",m),10),parseInt(f("TileHeight",m),10)],v=[];if(n.length)n.forEach(function(t,r){var i=d("TileMatrix","Identifier",t,a);v.push(S(i,u,r,e))});else{var x=Array.prototype.slice.call(a.getElementsByTagName("TileMatrix"));x.forEach(function(t,r){v.push(S(t,u,r,e))})}var y=E(a,o,g,v[0]),h={id:e,fullExtent:y,tileInfo:new l({dpi:96,spatialReference:s,size:g,origin:o,lods:v})};return h}function M(e){var t=f("SupportedCRS",e);t&&(t=t.toLowerCase());var r=parseInt(t.split(":").pop(),10);(900913===r||3857===r)&&(r=102100);var a=!1;t.indexOf("crs84")>-1||t.indexOf("crs:84")>-1?(r=4326,a=!0):t.indexOf("crs83")>-1||t.indexOf("crs:83")>-1?(r=4269,a=!0):(t.indexOf("crs27")>-1||t.indexOf("crs:27")>-1)&&(r=4267,a=!0);var l,o=new n({wkid:r}),s=c("TileMatrix",e),u=f("TopLeftCorner",s).split(" "),p=u[0].split("E").map(function(e){return Number(e)}),d=u[1].split("E").map(function(e){return Number(e)}),m=p[0],g=d[0];p.length>1&&(m=p[0]*Math.pow(10,p[1])),d.length>1&&(g=d[0]*Math.pow(10,d[1]));var v=a&&4326===r&&90===m&&-180===g;return C.some(function(e,n){var s=Number(t.split(":").pop());return s>=e[0]&&s<=e[1]||4326===r&&(!a||v)?(l=new i(g,m,o),!0):(n===C.length-1&&(l=new i(m,g,o)),!1)}),l}function E(e,t,i,n){var a,l,o=c("BoundingBox",e);o&&(a=f("LowerCorner",o).split(" "),l=f("UpperCorner",o).split(" "));var s,u,p,d;if(a&&a.length>1&&l&&l.length>1)s=parseFloat(a[0]),p=parseFloat(a[1]),u=parseFloat(l[0]),d=parseFloat(l[1]);else{var m=c("TileMatrix",e),g=parseFloat(f("MatrixWidth",m)),v=parseFloat(f("MatrixHeight",m));s=t.x,d=t.y,u=s+g*i[0]*n.resolution,p=d-v*i[1]*n.resolution}return new r(s,p,u,d,t.spatialReference)}function S(e,t,r,i){var n,a=f("Identifier",e),l=f("ScaleDenominator",e),o=l.split("E").map(function(e){return Number(e)});n=o.length>1?o[0]*Math.pow(10,o[1]):o[0];var s=V(t,n,i);return n*=96/b,{level:r,levelValue:a,scale:n,resolution:s}}function V(e,t,r){var i;return i=a.hasOwnProperty(String(e))?a.values[a[e]]:"default028mm"===r?6370997*Math.PI/180:6378137*Math.PI/180,7*t/25e3/i}Object.defineProperty(t,"__esModule",{value:!0});var b=90.71428571428571,C=[[3819,3819],[3821,3824],[3889,3889],[3906,3906],[4001,4025],[4027,4036],[4039,4047],[4052,4055],[4074,4075],[4080,4081],[4120,4176],[4178,4185],[4188,4216],[4218,4289],[4291,4304],[4306,4319],[4322,4326],[4463,4463],[4470,4470],[4475,4475],[4483,4483],[4490,4490],[4555,4558],[4600,4646],[4657,4765],[4801,4811],[4813,4821],[4823,4824],[4901,4904],[5013,5013],[5132,5132],[5228,5229],[5233,5233],[5246,5246],[5252,5252],[5264,5264],[5324,5340],[5354,5354],[5360,5360],[5365,5365],[5370,5373],[5381,5381],[5393,5393],[5451,5451],[5464,5464],[5467,5467],[5489,5489],[5524,5524],[5527,5527],[5546,5546],[2044,2045],[2081,2083],[2085,2086],[2093,2093],[2096,2098],[2105,2132],[2169,2170],[2176,2180],[2193,2193],[2200,2200],[2206,2212],[2319,2319],[2320,2462],[2523,2549],[2551,2735],[2738,2758],[2935,2941],[2953,2953],[3006,3030],[3034,3035],[3038,3051],[3058,3059],[3068,3068],[3114,3118],[3126,3138],[3150,3151],[3300,3301],[3328,3335],[3346,3346],[3350,3352],[3366,3366],[3389,3390],[3416,3417],[3833,3841],[3844,3850],[3854,3854],[3873,3885],[3907,3910],[4026,4026],[4037,4038],[4417,4417],[4434,4434],[4491,4554],[4839,4839],[5048,5048],[5105,5130],[5253,5259],[5269,5275],[5343,5349],[5479,5482],[5518,5519],[5520,5520],[20004,20032],[20064,20092],[21413,21423],[21473,21483],[21896,21899],[22171,22177],[22181,22187],[22191,22197],[25884,25884],[27205,27232],[27391,27398],[27492,27492],[28402,28432],[28462,28492],[30161,30179],[30800,30800],[31251,31259],[31275,31279],[31281,31290],[31466,31700]],A=new Map,R=new Map;t.parseCapabilities=s,t.parseResourceInfo=u,t.getTileUrlFromResourceUrls=v,t.getTileUrlTemplateFromResourceUrls=x});