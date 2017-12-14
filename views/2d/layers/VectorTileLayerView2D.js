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

define(["require","exports","../../../core/tsSupport/extendsHelper","../../../core/tsSupport/decorateHelper","dojo/has","../../../core/Logger","../../../core/accessorSupport/decorators","../../../core/HandleRegistry","../../../core/promiseUtils","../../../Graphic","./LayerView2D","../engine/StageGL","../tiling/TileInfoViewPOT","../tiling/TileStrategy","../tiling/TileKey","../tiling/TileQueue","../../../views/vectorTiles/TileHandler","../../../views/vectorTiles/VectorTileContainer","../../../views/vectorTiles/VectorTileDisplayObject","../../support/screenshotUtils"],function(e,t,i,r,n,o,s,a,l,h,c,u,p,d,f,_,y,v,g,T){var w=o.getLogger("esri.views.2d.layers.VectorTileLayerView2D"),C=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._handles=new a,t._fetchQueue=null,t._tileRequests=new Map,t.container=new u,t}return i(t,e),t.prototype.hitTest=function(e,t){var i=this;return this._vectorTileContainer.hittest(e,t).then(function(e){var t=i._tileHandler.getStyleRepository().layers;if(null===e||0>e||e>=t.length)return null;var r=t[e],n=new h({attributes:{layerId:e,layerName:r.id}});return n.layer=i.layer,n})},t.prototype.update=function(e){if(this._vectorTileContainer&&this._vectorTileContainer.isInitialized){if(e.devicePixelRatio!==this._tileHandler.devicePixelRatio)return void this._start();this._fetchQueue.pause(),this._fetchQueue.state=e.state,this._tileStrategy.update(e),this._fetchQueue.resume();for(var t=this._vectorTileContainer.children,i=0,r=t;i<r.length;i++){var n=r[i];this._tileHandler.updateTile(n,e)}this.notifyChange("updating")}},t.prototype.attach=function(){n("esri-webgl")?this._start():w.error("WebGL is required but not supported!")},t.prototype.detach=function(){this._stop()},t.prototype.moveStart=function(){this.requestUpdate()},t.prototype.viewChange=function(){this.requestUpdate()},t.prototype.moveEnd=function(){this.requestUpdate()},t.prototype.destroy=function(){this.container.dispose(),this._vectorTileContainer.destroy(),this._tileHandler.destroy()},t.prototype.takeScreenshot=function(e,t){return this.container?(e=T.adjustScreenshotSettings(e,t),this.container.takeScreenshot(e)):l.reject("Could not find an object capable of capturing screenshot!")},t.prototype.isUpdating=function(){var e=!0;return this._tileRequests.forEach(function(t){e=e&&t.isFulfilled()}),!e},t.prototype.acquireTile=function(e){var t=this,i=f.pool.acquire();i.set(e.level,e.row,e.col,e.world);var r=this._tileHandler.getRefKey(i),n=this.updateParameters.state.rotation,o=this._tileHandler.getStyleRepository(),s=this._tileHandler.glyphMosaic,a=g.pool.acquire(i,r,this.layer.tileInfo,o,s,n),l=this._fetchQueue.push(a.key).then(function(e){a.setData(e.tileData,e.workerId,e.connection),a.once("attach",function(){return t.requestUpdate()}),t._vectorTileContainer.addChild(a),t.notifyChange("updating")});return this._tileRequests.set(i.id,l),this.notifyChange("updating"),a},t.prototype.releaseTile=function(e){var t=e.key.id,i=this._tileRequests.get(t);i.isFulfilled()||i.cancel(),this._tileRequests["delete"](t),this._vectorTileContainer.removeChild(e),this.requestUpdate(),e.once("detach",function(){return g.pool.release(e)}),this.notifyChange("updating")},t.prototype._stop=function(){this._handles.removeAll(),this._tileStrategy&&this._tileStrategy.destroy(),this._vectorTileContainer&&(this._vectorTileContainer.removeAllChildren(),this.container.removeChild(this._vectorTileContainer)),this._tileHandler&&this._tileHandler.stop(),g.pool.prune(),this._vectorTileContainer=this._tileHandler=this._tileStrategy=this._tileInfoView=null},t.prototype._start=function(){var e=this;this._stop(),this._handles.add(this.watch("layer.currentStyleInfo",function(){return e.attach()})),this._vectorTileContainer=new v,this.container.addChild(this._vectorTileContainer),this._tileInfoView=new p(this.layer.tileInfo,this.layer.fullExtent),this._tileStrategy=new d({cachePolicy:"keep",acquireTile:function(t){return e.acquireTile(t)},releaseTile:function(t){return e.releaseTile(t)},tileInfoView:this._tileInfoView}),this._fetchQueue=new _({tileInfoView:this._tileInfoView,process:function(t){return e._getTileData(t)}}),this._tileHandler=new y(this.layer,function(){return e.requestUpdate()},window.devicePixelRatio||1,!0,this._tileInfoView),this._tileHandler.start().then(function(){e._vectorTileContainer.initialize(e._tileHandler.spriteMosaic,e._tileHandler.glyphMosaic,e.layer.tileInfo,e._tileInfoView),e.requestUpdate()})},t.prototype._getTileData=function(e){return this._tileHandler.getTileData(e,this.updateParameters.state.rotation)},t=r([s.subclass("esri.views.2d.layers.VectorTileLayerView2D")],t)}(s.declared(c));return C});