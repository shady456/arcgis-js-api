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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","./Widget","../core/HandleRegistry","../core/watchUtils","./Legend/LegendViewModel","dojo/i18n!./Legend/nls/Legend","../core/lang","dojox/gfx","../core/accessorSupport/decorators","./support/widget"],function(e,r,t,l,n,i,a,s,o,d,c,y,p){function g(e,r){return!r}function u(e,r){return r}var h={widget:"esri-widget",base:"esri-legend",service:"esri-legend__service",label:"esri-legend__service-label",layer:"esri-legend__layer",groupLayer:"esri-legend__group-layer",groupLayerChild:"esri-legend__group-layer-child",layerTable:"esri-legend__layer-table",layerChildTable:"esri-legend__layer-child-table",layerCaption:"esri-legend__layer-caption",layerBody:"esri-legend__layer-body",layerRow:"esri-legend__layer-row",layerCell:"esri-legend__layer-cell",layerInfo:"esri-legend__layer-cell esri-legend__layer-cell--info",imageryLayerStretchedImage:"esri-legend__imagery-layer-image--stretched",imageryLayerCellStretched:"esri-legend__imagery-layer-cell--stretched",imageryLayerInfoStretched:"esri-legend__imagery-layer-info--stretched",symbolContainer:"esri-legend__layer-cell esri-legend__layer-cell--symbols",symbol:"esri-legend__symbol",rampContainer:"esri-legend__ramps",sizeRamp:"esri-legend__size-ramp",colorRamp:"esri-legend__color-ramp",opacityRamp:"esri-legend__opacity-ramp",borderlessRamp:"esri-legend__borderless-ramp",rampTick:"esri-legend__ramp-tick",rampFirstTick:"esri-legend__ramp-tick-first",rampLastTick:"esri-legend__ramp-tick-last",rampLabelsContainer:"esri-legend__ramp-labels",rampLabel:"esri-legend__ramp-label",message:"esri-legend__message",hidden:"esri-hidden"},f="esri-legend__",_=24,v=25,m=50,b=function(e){function r(r){var t=e.call(this)||this;return t._handleRegistry=new i,t.activeLayerInfos=null,t.basemapLegendVisible=!1,t.groundLegendVisible=!1,t.layerInfos=null,t.view=null,t.viewModel=new s,t}return t(r,e),r.prototype.postInitialize=function(){var e=this;this.own(a.on(this,"activeLayerInfos","change",function(){return e._refreshActiveLayerInfos(e.activeLayerInfos)}))},r.prototype.destroy=function(){this._handleRegistry.destroy(),this._handleRegistry=null},r.prototype.render=function(){var e=this,r=this.activeLayerInfos,t=p.join(h.base,h.widget),l=r&&r.toArray().map(function(r){return e._renderLegendForLayer(r)}).filter(function(e){return!!e});return p.tsx("div",{"class":t},l&&l.length?l:p.tsx("div",{"class":h.message},o.noLegend))},r.prototype._refreshActiveLayerInfos=function(e){var r=this;this._handleRegistry.removeAll(),e.forEach(function(e){return r._renderOnActiveLayerInfoChange(e)}),this.scheduleRender()},r.prototype._renderOnActiveLayerInfoChange=function(e){var r=this,t=a.init(e,"version",function(){return r.scheduleRender()});this._handleRegistry.add(t,"version_"+e.layer.uid),e.children.forEach(function(e){return r._renderOnActiveLayerInfoChange(e)})},r.prototype._renderLegendForLayer=function(e){var r=this;if(!e.ready)return null;var t=!!e.children.length,l=""+f+e.layer.uid+"-version-"+e.version;if(t){var n=e.children.map(function(e){return r._renderLegendForLayer(e)}).toArray(),i=(o={},o[h.groupLayer]=t,o);return p.tsx("div",{key:l,"class":h.service,classes:i},p.tsx("p",{"class":h.label},e.title),n)}var a=e.legendElements;if(a&&!a.length)return null;var s=a.map(function(t){return r._renderLegendForElement(t,e.layer)}).filter(function(e){return!!e});if(!s.length)return null;var i=(d={},d[h.groupLayerChild]=!!e.parent,d);return p.tsx("div",{key:l,"class":h.service,classes:i},p.tsx("p",{"class":h.label},e.title),p.tsx("div",{"class":h.layer},s));var o,d},r.prototype._renderLegendForElement=function(e,r,t){var l=this,n="color-ramp"===e.type,i="opacity-ramp"===e.type,a="size-ramp"===e.type,s=null;if("symbol-table"===e.type||a){var o=e.infos.map(function(t){return l._renderLegendForElementInfo(t,r,a,e.legendType)}).filter(function(e){return!!e});o.length&&(s=p.tsx("div",{"class":h.layerBody},o))}else(n||i)&&(s=this._renderLegendForRamp(e.infos,e.overlayColor,i));if(!s)return null;var d=e.title,c=null;if("string"==typeof d)c=d;else if(d){var y=this._getTitle(d,n||i);c=d.title?d.title+" ("+y+")":y}var g=t?h.layerChildTable:h.layerTable,u=c?p.tsx("div",{"class":h.layerCaption},c):null;return p.tsx("div",{"class":g},u,s)},r.prototype._renderLegendForRamp=function(e,r,t){var l=e.length-1,n="100%",i=null;i=l>2?v*l:m;var a=document.createElement("div"),s=t?h.opacityRamp:"";a.className=h.colorRamp+" "+s,a.style.height=i+"px";var o=c.createSurface(a,n,i);try{e.forEach(function(e,r){e.offset=r/l}),o.createRect({x:0,y:0,width:n,height:i}).setFill({type:"linear",x1:0,y1:0,x2:0,y2:i,colors:e}).setStroke(null),r&&r.a>0&&o.createRect({x:0,y:0,width:n,height:i}).setFill(r).setStroke(null)}catch(d){o.clear(),o.destroy()}if(!o)return null;var y=e.filter(function(e){return!!e.label}).map(function(e){return p.tsx("div",{"class":h.rampLabel},e.label)}),g={width:_+"px"},u={height:i+"px"};return p.tsx("div",{"class":h.layerRow},p.tsx("div",{"class":h.symbolContainer,styles:g},p.tsx("div",{"class":h.rampContainer,bind:a,afterCreate:this._attachToNode})),p.tsx("div",{"class":h.layerInfo},p.tsx("div",{"class":h.rampLabelsContainer,styles:u},y)))},r.prototype._renderLegendForElementInfo=function(e,r,t,l){if(e.type)return this._renderLegendForElement(e,r,!0);var n=null,i=this._isImageryStretchedLegend(r,l);if(e.symbol&&e.preview?n=p.tsx("div",{"class":h.symbol,bind:e.preview,afterCreate:this._attachToNode}):e.src&&(n=this._renderImage(e,r,i)),!n)return null;var a=(o={},o[h.imageryLayerInfoStretched]=i,o),s=(d={},d[h.imageryLayerInfoStretched]=i,d[h.sizeRamp]=!i&&t,d);return p.tsx("div",{"class":h.layerRow},p.tsx("div",{"class":h.symbolContainer,classes:s},n),p.tsx("div",{"class":h.layerInfo,classes:a},e.label||""));var o,d},r.prototype._attachToNode=function(e){var r=this;e.appendChild(r)},r.prototype._renderImage=function(e,r,t){var l=e.src,n=e.opacity,i=(s={},s[h.imageryLayerStretchedImage]=t,s[h.symbol]=!t,s),a={opacity:""+(null!=n?n:r.opacity)};return p.tsx("img",{src:l,border:0,width:e.width,height:e.height,classes:i,styles:a});var s},r.prototype._isImageryStretchedLegend=function(e,r){return!!(r&&"Stretched"===r&&e.version>=10.3&&"esri.layers.ImageryLayer"===e.declaredClass)},r.prototype._getTitle=function(e,r){var t=null;return u(e,r)?t=e.ratioPercentTotal?"showRatioPercentTotal":e.ratioPercent?"showRatioPercent":e.ratio?"showRatio":e.normField?"showNormField":e.field?"showField":null:g(e,r)&&(t=e.normField?"showNormField":e.normByPct?"showNormPct":e.field?"showField":null),t?d.substitute({field:e.field,normField:e.normField},o[t]):null},l([y.aliasOf("viewModel.activeLayerInfos"),p.renderable()],r.prototype,"activeLayerInfos",void 0),l([y.aliasOf("viewModel.basemapLegendVisible"),p.renderable()],r.prototype,"basemapLegendVisible",void 0),l([y.aliasOf("viewModel.groundLegendVisible"),p.renderable()],r.prototype,"groundLegendVisible",void 0),l([y.aliasOf("viewModel.layerInfos"),p.renderable()],r.prototype,"layerInfos",void 0),l([y.aliasOf("viewModel.view"),p.renderable()],r.prototype,"view",void 0),l([y.property(),p.renderable()],r.prototype,"viewModel",void 0),r=l([y.subclass("esri.widgets.Legend")],r)}(y.declared(n));return b});