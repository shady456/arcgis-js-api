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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/Logger","../../../core/promiseUtils","../../../core/watchUtils","../../../core/accessorSupport/decorators","../../../core/libs/gl-matrix-2/mat4f64","../../../geometry/Extent","../../../geometry/support/aaBoundingRect","./LayerView3D","./support/overlayImageUtils","./support/projectExtentUtils","../support/debugFlags","../webgl-engine/Stage","../webgl-engine/lib/RenderGeometry","../webgl-engine/lib/Texture","../webgl-engine/materials/DefaultMaterial","../../layers/RefreshableLayerView"],function(e,t,i,r,a,n,o,s,l,d,h,p,c,u,g,m,y,f,v,w){var x=a.getLogger("esri.views.3d.layers.DynamicLayerView3D"),_=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.supportsDraping=!0,t.hasDraped=!0,t.fullExtentInLocalViewSpatialReference=null,t.overlayUpdating=!1,t.maximumDataResolution=null,t._images=[],t._extents=[],t.updateWhenStationary=!0,t}return i(t,e),Object.defineProperty(t.prototype,"drawingOrder",{get:function(){return this._get("drawingOrder")},set:function(e){if(e!==this._get("drawingOrder")){this._set("drawingOrder",e);var t=new Set;this._images.forEach(function(i){i&&i.material&&(i.material.renderPriority=e,t.add(i.material.id))}),t.size>0&&(this.view._stage.getDrapedRenderer().updateRenderOrder(t),this.emit("draped-data-change"))}},enumerable:!0,configurable:!0}),t.prototype.initialize=function(){var e=this;this.drawingOrder=this.view.getDrawingOrder(this.layer.uid),this.addResolvingPromise(u.toViewIfLocal(this).then(function(t){return e._set("fullExtentInLocalViewSpatialReference",t)})),this.handles.add(this.watch("suspended",function(){return e._suspendedChangeHandler()})),this.handles.add(this.view.resourceController.scheduler.registerIdleStateCallbacks(function(){e._isScaleRangeActive()&&e.notifyChange("suspended")},function(){})),this._isScaleRangeLayer()&&this.handles.add([this.layer.watch("minScale",function(){return e.notifyChange("suspended")}),this.layer.watch("maxScale",function(){return e.notifyChange("suspended")})],"layer"),this.handles.add([this.watch("fullOpacity",this._opacityChangeHandler.bind(this)),this.layer.on("redraw",this._layerRedrawHandler.bind(this))],"layer")},t.prototype.destroy=function(){this.clear()},t.prototype.setDrapingExtent=function(e,t,i,r,a,n){var o=this._extentAndSizeAtResolution(t,i,r),s=o.size,l=o.extent;if(n*=this.view.pixelRatio,"imageMaxWidth"in this.layer||"imageMaxHeight"in this.layer){var d=this.layer.imageMaxWidth,p=this.layer.imageMaxHeight;if(s.width>d){var c=d/s.width;s.height=Math.floor(s.height*c),s.width=d,n*=c}if(s.height>p){var c=p/s.height;s.width=Math.floor(s.width*c),s.height=p,n*=c}}var u=this._extents[e];u&&h.equals(u.extent,l)&&!this._imageSizeDiffers(l,i,u.imageSize,s)||(this._extents[e]={extent:h.create(l),spatialReference:i,imageSize:s,renderLocalOrigin:a,pixelRatio:n},this.suspended||this._fetch(e))},t.prototype.getGraphicFromGraphicUid=function(e){return null},t.prototype.clear=function(){for(var e=0;e<this._images.length;e++)this._clearImage(e)},t.prototype.doRefresh=function(){this.suspended||this.refetch()},t.prototype.canResume=function(){if(!this.inherited(arguments))return!1;if(this._isScaleRangeLayer()){var e=this.layer,t=e.minScale,i=e.maxScale;if(t>0||i>0){var r=this.view.scale;if(r<i||t>0&&r>t)return!1}}return!0},t.prototype.isUpdating=function(){if(this.overlayUpdating)return!0;for(var e=0,t=this._images;e<t.length;e++){if(t[e].loadingPromise)return!0}return!1},t.prototype.processResult=function(e,t){(t instanceof HTMLImageElement||t instanceof HTMLCanvasElement)&&(e.image=t)},t.prototype.updateImage=function(e){return!1},t.prototype.refetch=function(){for(var e=0;e<this._extents.length;e++)this._extents[e]&&this._fetch(e)},t.prototype.beforeFetch=function(){},t.prototype.findExtentInfoAt=function(e){for(var t=0,i=this._extents;t<i.length;t++){var r=i[t],a=r.extent;if(new d(a[0],a[1],a[2],a[3],r.spatialReference).contains(e))return r}return null},t.prototype._imageSizeDiffers=function(e,t,i,r){if(!this.maximumDataResolution)return!0;if(g.TESTS_DISABLE_UPDATE_THROTTLE_THRESHOLDS)return!0;var a=h.width(e)/this.maximumDataResolution.x,n=h.height(e)/this.maximumDataResolution.y,o=a/i.width,s=n/i.height,l=a/r.width,d=n/r.height,p=Math.abs(o-l),c=Math.abs(s-d);return p>1.5||c>1.5},t.prototype._fetch=function(e){var t=this;if(!this.suspended){this.beforeFetch();var i=this._extents[e],r=i.extent,a=new d(r[0],r[1],r[2],r[3],i.spatialReference);this._images[e]||(this._images[e]={texture:null,material:null,rendergeometry:null,loadingPromise:null,image:null,pixelData:null,renderExtent:h.create(r)});var n=this._images[e];if(n.loadingPromise&&n.loadingPromise.cancel(),0===a.width||0===a.height)return void this._clearImage(e);n.loadingPromise=this._waitFetchReady().then(function(){return t.layer.fetchImage(a,i.imageSize.width,i.imageSize.height,{requestAsImageElement:!0,pixelRatio:i.pixelRatio})}),n.loadingPromise.then(function(i){h.set(n.renderExtent,r),t.processResult(n,i),t._createStageObjects(e,n.image),0===e&&t._images[1]&&t._images[1].rendergeometry&&t._createStageObjects(1,null),t.notifyChange("updating"),t.emit("draped-data-change")}).catch(function(e){e&&"CancelError"!==e.name&&"cancel"!==e.dojoType&&x.error(e),t.notifyChange("updating")}).then(function(){n.loadingPromise=null},function(){n.loadingPromise=null}),this.notifyChange("updating")}},t.prototype._clearImage=function(e){var t=this._images[e],i=this.view._stage;t&&(t.rendergeometry&&(i.getDrapedRenderer().removeRenderGeometries([t.rendergeometry]),t.rendergeometry=null),t.texture&&(i.remove(m.ModelContentType.TEXTURE,t.texture.id),t.texture=null),t.material&&(i.remove(m.ModelContentType.MATERIAL,t.material.id),t.material=null),t.loadingPromise&&(t.loadingPromise.cancel(),t.loadingPromise=null),t.image=null,t.pixelData=null)},t.prototype._createStageObjects=function(e,t){var i=this.view._stage,r=this._images[e];t&&(r.texture&&i.remove(m.ModelContentType.TEXTURE,r.texture.id),r.texture=new f(t,"dynamicLayer",{width:t.width,height:t.height,wrap:{s:33071,t:33071}}),i.add(m.ModelContentType.TEXTURE,r.texture)),r.material?t&&r.material.setParameterValues({textureId:r.texture.id}):(r.material=new v({ambient:[1,1,1],diffuse:[0,0,0],transparent:!0,opacity:this.fullOpacity,textureId:r.texture.id,receiveSSAO:!1},"dynamicLayer"),r.material.renderPriority=this.drawingOrder,i.add(m.ModelContentType.MATERIAL,r.material));var a,n=this._extents[e].renderLocalOrigin;if(0===e)a=c.createGeometryForExtent(r.renderExtent,-1);else{if(1!==e)return void console.error("DynamicLayerView3D._createStageObjects: Invalid extent idx");var o=this._images[0].renderExtent;if(!o)return;a=c.createOuterImageGeometry(o,r.renderExtent,-1)}var s=new y(a);s.material=r.material,s.origin=n,s.transformation=l.mat4f64.create(),s.name="dynamicLayer",s.uniqueName="dynamicLayer#"+a.id;var d=i.getDrapedRenderer();d.addRenderGeometries([s]),r.rendergeometry&&d.removeRenderGeometries([r.rendergeometry]),r.rendergeometry=s},t.prototype._isScaleRangeLayer=function(){return"minScale"in this.layer&&"maxScale"in this.layer},t.prototype._isScaleRangeActive=function(){return!!this._isScaleRangeLayer()&&(this.layer.minScale>0||this.layer.maxScale>0)},t.prototype._extentAndSizeAtResolution=function(e,t,i){var r=h.width(e)/h.height(e),a={width:i,height:i};r>1.0001?a.height=i/r:r<.9999&&(a.width=i*r);var n=this._clippedExtent(e,t,R);return a.width=Math.round(a.width/(h.width(e)/h.width(n))),a.height=Math.round(a.height/(h.height(e)/h.height(n))),{size:a,extent:n}},t.prototype._clippedExtent=function(e,t,i){if("local"!==this.view.viewingMode)return h.set(i,e);var r=this.view.basemapTerrain,a=r.extent;return r.ready&&a?h.intersection(e,a,i):h.set(i,e)},t.prototype._opacityChangeHandler=function(e){for(var t=0,i=this._images;t<i.length;t++){var r=i[t];r&&r.material&&r.material.setParameterValues({opacity:e})}this.emit("draped-data-change")},t.prototype._layerRedrawHandler=function(){for(var e=!1,t=0;t<this._images.length;t++){var i=this._images[t];this.updateImage(i)&&(e=!0,this._createStageObjects(t,i.image))}e&&this.emit("draped-data-change")},t.prototype._suspendedChangeHandler=function(){if(this.suspended)this.clear(),this.emit("draped-data-change");else for(var e=0;e<this._extents.length;e++)this._fetch(e)},t.prototype._waitFetchReady=function(){return this.updateWhenStationary?o.whenOnce(this.view,"stationary"):n.resolve()},r([s.property()],t.prototype,"layer",void 0),r([s.property({dependsOn:["view.scale","layer.minScale","layer.maxScale"]})],t.prototype,"suspended",void 0),r([s.property({type:Boolean})],t.prototype,"supportsDraping",void 0),r([s.property({type:Boolean})],t.prototype,"hasDraped",void 0),r([s.property({value:0,type:Number})],t.prototype,"drawingOrder",null),r([s.property({readOnly:!0})],t.prototype,"fullExtentInLocalViewSpatialReference",void 0),r([s.property()],t.prototype,"overlayUpdating",void 0),r([s.property({dependsOn:["overlayUpdating"]})],t.prototype,"updating",void 0),t=r([s.subclass("esri.views.3d.layers.DynamicLayerView3D")],t)}(s.declared(p,w)),R=h.create();return _});