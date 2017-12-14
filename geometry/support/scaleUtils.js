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

define(["require","exports","../../config","../../core/kebabDictionary","./WKIDUnitConversion"],function(e,t,r,n,i){function a(e){return v.fromJSON(e.toLowerCase())||null}function o(e){return v.toJSON(e)||null}function s(e){var t=u(e);return t>1e5?1:t}function c(e){var t=u(e);return t>1e5?"meters":l(e)}function u(e){return f(e)||y}function f(e){var t,r,n;if(e&&("object"==typeof e?(t=e.wkid,r=e.wkt):"number"==typeof e?t=e:"string"==typeof e&&(r=e)),t)n=p.values[p[t]];else if(r&&-1!==r.search(/^PROJCS/i)){var i=S.exec(r);i&&i[1]&&(n=parseFloat(i[1].split(",")[1]))}return n}function l(e){var t,r,n;if(e&&("object"==typeof e?(t=e.wkid,r=e.wkt):"number"==typeof e?t=e:"string"==typeof e&&(r=e)),t)n=p.units[p[t]];else if(r&&-1!==r.search(/^PROJCS/i)){var i=S.exec(r);i&&i[1]&&(i=/[\\"\\']{1}([^\\"\\']+)/.exec(i[1]),n=i&&i[1])}return n?a(n):null}function d(e,t){var n=t||e.extent,i=e.width,a=f(n&&n.spatialReference);return n&&i?n.width/i*(a||y)*g*r.screenDPI:0}function _(e,t){var n=u(t);return e/(n*g*r.screenDPI)}function k(e,t){var r=e.extent,n=e.width,i=_(t,r.spatialReference);return r.clone().expand(i*n/r.width)}Object.defineProperty(t,"__esModule",{value:!0});var g=39.37,y=20015077/180,S=/UNIT\[([^\]]+)\]\]$/i,p=i,v=n({meter:"meters",foot:"feet",foot_us:"us-feet",foot_clarke:"clarke-feet",yard_clarke:"clarke-yards",link_clarke:"clarke-links",yard_sears:"sears-yards",foot_sears:"sears-feet",chain_sears:"sears-chains",chain_benoit_1895_b:"benoit-1895-b-chains",yard_indian:"indian-yards",yard_indian_1937:"indian-1937-yards",foot_gold_coast:"gold-coast-feet",chain_sears_1922_truncated:"sears-1922-truncated-chains","50_kilometers":"50-kilometers","150_kilometers":"150-kilometers"},{ignoreUnknown:!0});t.unitFromRESTJSON=a,t.unitToRESTJSON=o,t.getMetersPerVerticalUnitForSR=s,t.getVerticalUnitStringForSR=c,t.getMetersPerUnitForSR=u,t.getMetersPerUnit=f,t.getUnitString=l,t.getScale=d,t.getResolutionForScale=_,t.getExtentForScale=k});