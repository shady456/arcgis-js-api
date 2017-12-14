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

define(["require","exports","dojo/_base/lang","../../../Color","./support/utils"],function(o,a,e,i,r){function t(){for(var o in w){var a=w[o],e=a.basemapGroups,i=D[o]={basemaps:[].concat(e.light).concat(e.dark),point:{},polyline:{},polygon:{}};for(var r in e)for(var t=e[r],n=0;n<t.length;n++){var c=t[n];a.pointSchemes&&(i.point[c]=a.pointSchemes[r]),a.lineSchemes&&(i.polyline[c]=a.lineSchemes[r]),a.polygonSchemes&&(i.polygon[c]=a.polygonSchemes[r])}}}function n(o,a){var e;if(o)switch(a){case"point":case"multipoint":var r=o;e={color:new i(r.color),noDataColor:new i(r.noDataColor),outline:{color:new i(r.outline.color),width:r.outline.width},size:r.size,noDataSize:r.noDataSize,minSize:r.minSize,maxSize:r.maxSize,opacity:r.opacity||1};break;case"polyline":var t=o;e={color:new i(t.color),noDataColor:new i(t.noDataColor),width:t.width,noDataWidth:t.noDataWidth,minWidth:t.minWidth,maxWidth:t.maxWidth,opacity:t.opacity||1};break;case"polygon":var n=o,c=n.marker,l=n.background;e={marker:{color:new i(c.color),noDataColor:new i(c.noDataColor),outline:{color:new i(c.outline.color),width:c.outline.width},size:c.size,noDataSize:c.noDataSize,minSize:c.minSize,maxSize:c.maxSize},background:{color:new i(l.color),outline:{color:new i(l.outline.color),width:l.outline.width}},opacity:o.opacity||1}}return e}function c(o){var a;return o&&(a=e.mixin({},o),a.color&&(a.color=new i(a.color)),a.noDataColor&&(a.noDataColor=new i(a.noDataColor)),a.outline&&(a.outline={color:a.outline.color&&new i(a.outline.color),width:a.outline.width})),a}function l(o,a){return o.size&&(o.size=r.toWorldScale(o.size,a)),o.noDataSize&&(o.noDataSize=r.toWorldScale(o.noDataSize,a)),o.minSize&&(o.minSize=r.toWorldScale(o.minSize,a)),o.maxSize&&(o.maxSize=r.toWorldScale(o.maxSize,a)),o}function p(o,a){return o.width&&(o.width=r.toWorldScale(o.width,a)),o.noDataWidth&&(o.noDataWidth=r.toWorldScale(o.noDataWidth,a)),o.minWidth&&(o.minWidth=r.toWorldScale(o.minWidth,a)),o.maxWidth&&(o.maxWidth=r.toWorldScale(o.maxWidth,a)),o}function d(o,a){return o.marker&&(o.marker=l(o.marker,a)),o}function m(o,a){var e="default",i=D[e],t=r.getStorageType(a),n=i&&i[t];return n&&n[o]}var s=[128,128,128,1],h=[128,128,128,1],x={primary:{color:[227,139,79,1],noDataColor:s,outline:{color:[255,255,255,1],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8},secondary:[{color:[128,128,128,1],noDataColor:s,outline:{color:[255,255,255,1],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8},{color:[255,255,255,1],noDataColor:s,outline:{color:[128,128,128,1],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8}]},u={primary:{color:[227,139,79,1],noDataColor:h,outline:{color:[51,51,51,1],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8},secondary:[{color:[178,178,178,1],noDataColor:h,outline:{color:[51,51,51,1],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8},{color:[26,26,26,1],noDataColor:h,outline:{color:[128,128,128,1],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8}]},y={r:0,g:0,b:0,a:0},S={color:y,outline:{color:{r:166,g:166,b:166,a:1},width:"1px"}},z={color:y,outline:{color:{r:166,g:166,b:166,a:1},width:"1px"}},w={"default":{name:"default",label:"Default",description:"Default theme for visualizing features by varying their size to show data.",basemapGroups:{light:["streets","gray","topo","terrain","national-geographic","oceans","osm","gray-vector","streets-vector","topo-vector","streets-relief-vector","streets-navigation-vector"],dark:["satellite","hybrid","dark-gray","dark-gray-vector","streets-night-vector"]},pointSchemes:{light:x,dark:u},lineSchemes:{light:{primary:{color:[226,119,40,1],noDataColor:s,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"},secondary:[{color:[77,77,77,1],noDataColor:s,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"},{color:[153,153,153,1],noDataColor:s,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"}]},dark:{primary:{color:[226,119,40,1],noDataColor:h,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"},secondary:[{color:[255,255,255,1],noDataColor:h,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"},{color:[153,153,153,1],noDataColor:h,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"}]}},polygonSchemes:{light:{primary:{marker:x.primary,background:z,opacity:x.primary.opacity},secondary:[{marker:x.secondary[0],background:z,opacity:x.secondary[0].opacity},{marker:x.secondary[1],background:z,opacity:x.secondary[1].opacity}]},dark:{primary:{marker:u.primary,background:S,opacity:u.primary.opacity},secondary:[{marker:u.secondary[0],background:S,opacity:u.secondary[0].opacity},{marker:u.secondary[1],background:S,opacity:u.secondary[1].opacity}]}}}},D={};t();var g={getThemes:function(o){var a=[];for(var e in w){var i=w[e],t=D[e],n=r.getBasemapId(o,t.basemaps);n&&-1===t.basemaps.indexOf(n)||a.push({name:i.name,label:i.label,description:i.description,basemaps:t.basemaps.slice(0)})}return a},getSchemes:function(o){if("mesh"===o.geometryType)return null;var a,e=o.geometryType,i=o.worldScale,t=o.view,c=r.getBasemapId(o.basemap,D["default"].basemaps),l=m(c,e);if(l){var p=n(l.primary,e);a={primaryScheme:i?g.toWorldScale({scheme:p,view:t}):p,secondarySchemes:l.secondary.map(function(o){var a=n(o,e);return i?g.toWorldScale({scheme:a,view:t}):a}),basemapId:c}}return a},cloneScheme:function(o){var a;return o&&(a=c(o),a.marker&&(a.marker=c(a.marker)),a.background&&(a.background=c(a.background))),a},toWorldScale:function(o){if(o.scheme&&o.view){var a=o.scheme,e=o.scheme,i=o.scheme,r=null;return a.hasOwnProperty("size")?r=l(a,o.view):e.hasOwnProperty("width")?r=p(e,o.view):i.hasOwnProperty("marker")&&(r=d(i,o.view)),r}}};return g});