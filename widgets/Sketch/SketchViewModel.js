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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/accessorSupport/decorators","../../core/Accessor","../../views/2d/draw/Draw","../../core/Evented","../../Graphic","../../core/HandleRegistry","../../geometry/Multipoint","../../geometry/Point","../../geometry/Polygon","../../geometry/Polyline","../../symbols/SimpleFillSymbol","../../symbols/SimpleLineSymbol","../../symbols/SimpleMarkerSymbol"],function(e,t,r,i,o,a,c,n,p,s,l,h,g,d,y,m,_){var v=function(){function e(e,t){this.geometry=e,this.graphic=t,this.type="draw-complete"}return e}(),u=function(e){function t(t){var r=e.call(this,t)||this;return r._actionHandles=new s,r._graphics=null,r.draw=null,r.graphic=null,r.layer=null,r.pointSymbol=new _,r.polygonSymbol=new y,r.polylineSymbol=new m,r.view=null,r}return r(t,e),t.prototype.initialize=function(){this.draw=new c({view:this.view}),this._setGraphicsCollection(),this.watch("layer",this._setGraphicsCollection)},t.prototype.destroy=function(){this.reset(),this._actionHandles.destroy(),this._actionHandles=null,this.draw&&(this.draw.destroy(),this.draw=null),this.view=null,this.emit("destroy")},Object.defineProperty(t.prototype,"state",{get:function(){return this.get("view.ready")?"ready":"disabled"},enumerable:!0,configurable:!0}),t.prototype.complete=function(){this.get("draw.activeAction")&&this.draw.activeAction.complete(),this._actionHandles.removeAll(),this.draw.reset()},t.prototype.create=function(e){this.reset(),"point"===e?this._createPoint():"polygon"===e?this._createPolygon():"polyline"===e?this._createPolyline():"multipoint"===e?this._createMultipoint():"rectangle"===e&&this._createRectangle()},t.prototype.reset=function(){this.graphic&&this.get("view.graphics")&&(this._graphics.remove(this.graphic),this._set("graphic",null)),this._actionHandles.removeAll(),this.draw.reset()},t.prototype._createPoint=function(){var e=this,t=this.draw.create("point");this._actionHandles.add([t.on("cursor-update",function(t){e._graphics.remove(e.graphic);var r=t.coordinates,i=r[0],o=r[1],a=new h({x:i,y:o,spatialReference:e.view.spatialReference});e._set("graphic",new p(a,e.pointSymbol)),e._graphics.add(e.graphic)}),t.on("draw-complete",function(t){e._graphics.remove(e.graphic);var r=t.coordinates,i=r[0],o=r[1],a=new h({x:i,y:o,spatialReference:e.view.spatialReference});e._set("graphic",new p(a,e.pointSymbol)),e.emit("draw-complete",new v(a,e.graphic.clone())),e._actionHandles.removeAll()})])},t.prototype._createPolygon=function(){var e=this,t=this.draw.create("polygon");this._actionHandles.add([t.on("vertex-add",function(t){e._graphics.remove(e.graphic),e._set("graphic",new p(e._createPolygonFromVertices(t.vertices),e.polygonSymbol)),e._graphics.add(e.graphic)}),t.on("vertex-remove",function(t){e._graphics.remove(e.graphic),e._set("graphic",new p(e._createPolygonFromVertices(t.vertices),e.polygonSymbol)),e._graphics.add(e.graphic)}),t.on("cursor-update",function(t){e._graphics.remove(e.graphic),e._set("graphic",new p(e._createPolygonFromVertices(t.vertices),e.polygonSymbol)),e._graphics.add(e.graphic)}),t.on("draw-complete",function(t){e._graphics.remove(e.graphic);var r=e._createPolygonFromVertices(t.vertices);e._set("graphic",new p(r,e.polygonSymbol)),e.emit("draw-complete",new v(r,e.graphic.clone())),e._actionHandles.removeAll()})])},t.prototype._createPolyline=function(){var e=this,t=this.draw.create("polyline");this._actionHandles.add([t.on("vertex-add",function(t){e._graphics.remove(e.graphic),e._set("graphic",new p(e._createPolylineFromVertices(t.vertices),e.polylineSymbol)),e._graphics.add(e.graphic)}),t.on("vertex-remove",function(t){e._graphics.remove(e.graphic),e._set("graphic",new p(e._createPolylineFromVertices(t.vertices),e.polylineSymbol)),e._graphics.add(e.graphic)}),t.on("cursor-update",function(t){e._graphics.remove(e.graphic),e._set("graphic",new p(e._createPolylineFromVertices(t.vertices),e.polylineSymbol)),e._graphics.add(e.graphic)}),t.on("draw-complete",function(t){e._graphics.remove(e.graphic);var r=e._createPolylineFromVertices(t.vertices);e._set("graphic",new p(r,e.polylineSymbol)),e.emit("draw-complete",new v(r,e.graphic.clone())),e._actionHandles.removeAll()})])},t.prototype._createRectangle=function(){var e=this,t=this.draw.create("rectangle");this._actionHandles.add([t.on("cursor-update",function(t){e._graphics.remove(e.graphic),t.vertices.length&&(e._set("graphic",new p(e._createPolygonFromVertices(t.vertices),e.polygonSymbol)),e._graphics.add(e.graphic))}),t.on("draw-complete",function(t){e._graphics.remove(e.graphic);var r=null,i=null;t.vertices.length&&(r=e._createPolygonFromVertices(t.vertices),i=new p(r,e.polygonSymbol)),e._set("graphic",i);var o=i?i.clone():null;e.emit("draw-complete",new v(r,o)),e._actionHandles.removeAll()})])},t.prototype._createMultipoint=function(){var e=this,t=this.draw.create("multipoint");this._actionHandles.add([t.on("vertex-add",function(t){e._graphics.remove(e.graphic),e._set("graphic",new p(e._createMultipointFromVertices(t.vertices),e.pointSymbol)),e._graphics.add(e.graphic)}),t.on("vertex-remove",function(t){e._graphics.remove(e.graphic),e._set("graphic",new p(e._createMultipointFromVertices(t.vertices),e.pointSymbol)),e._graphics.add(e.graphic)}),t.on("cursor-update",function(t){e._graphics.remove(e.graphic),e._set("graphic",new p(e._createMultipointFromVertices(t.vertices),e.pointSymbol)),e._graphics.add(e.graphic)}),t.on("draw-complete",function(t){e._graphics.remove(e.graphic);var r=e._createMultipointFromVertices(t.vertices);e._set("graphic",new p(r,e.pointSymbol)),e.emit("draw-complete",new v(r,e.graphic.clone())),e._actionHandles.removeAll()})])},t.prototype._createPolylineFromVertices=function(e){return new d({paths:e,spatialReference:this.view.spatialReference})},t.prototype._createPolygonFromVertices=function(e){var t=e.slice(0);return t.push(t[0]),new g({rings:t,spatialReference:this.view.spatialReference})},t.prototype._createMultipointFromVertices=function(e){return new l({points:e,spatialReference:this.view.spatialReference})},t.prototype._setGraphicsCollection=function(){this._graphics=this.layer&&this.layer.graphics?this.layer.graphics:this.view.graphics},i([o.property()],t.prototype,"draw",void 0),i([o.property()],t.prototype,"graphic",void 0),i([o.property()],t.prototype,"layer",void 0),i([o.property()],t.prototype,"pointSymbol",void 0),i([o.property()],t.prototype,"polygonSymbol",void 0),i([o.property()],t.prototype,"polylineSymbol",void 0),i([o.property({dependsOn:["view.ready"],readOnly:!0})],t.prototype,"state",null),i([o.property()],t.prototype,"view",void 0),t=i([o.subclass("esri.views.2d.SketchViewModel")],t)}(o.declared(a,n));return u});