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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/tsSupport/assignHelper","../../../core/Accessor","../../../core/Error","../../../core/Evented","../../../core/Handles","../../../core/Logger","../../../core/Promise","../../../core/promiseUtils","../../../core/unitUtils","../../../core/accessorSupport/decorators","../../../geometry/support/scaleUtils","../../support/GraphicsManager","../../../views/3d/layers/graphics/Graphics3DVerticalScale"],function(e,t,r,i,a,s,n,o,u,l,p,h,c,d,y,g,f){var _=l.getLogger("esri.layers.graphics.controllers.SnapshotController");return function(e){function t(t){var r=e.call(this)||this;return r.type="snapshot",r._gManager=null,r._verticalScale=null,r._handles=new u,r._source=null,r._started=!1,r._pendingQueries=new Map,r.extent=null,r.hasAllFeatures=!1,r.hasFeatures=!1,r.layer=null,r.layerView=null,r.maxPageSize=null,r.defaultReturnZ=void 0,r.defaultReturnM=void 0,r.pageSize=null,r.paginationEnabled=!1,r}return r(t,e),t.prototype.initialize=function(){var e=this,t=this.layer.when(function(){return e._verifyCapabilities()}).then(function(){return e._init()});this.addResolvingPromise(t)},t.prototype.destroy=function(){this.cancelQuery(),this._gManager&&(this._gManager.destroy(),this._gManager=null),this._handles.destroy(),this._handles=null,this._pendingQueries=null},Object.defineProperty(t.prototype,"updating",{get:function(){return!!(this._pendingQueries&&this._pendingQueries.size>0)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"graphics",{set:function(e){var t=this._get("graphics");t!==e&&(this._handles.remove("graphics"),e&&(this._collectionChanged({added:e.toArray(),removed:t&&t.toArray()}),this._handles.add(e.on("change",this._collectionChanged.bind(this)),"graphics")),this._set("graphics",e))},enumerable:!0,configurable:!0}),t.prototype.cancelQuery=function(){var e=this;this._pendingQueries&&(this._pendingQueries.forEach(function(t,r){t.isFulfilled()||t.cancel(new Error(e._cancelErrorMsg))}),this._pendingQueries.clear(),this.notifyChange("updating"))},t.prototype.refresh=function(){this.isResolved()&&this._started&&this._queryFeatures()},t.prototype.startup=function(){this._started||(this._started=!0,this._resolutionParams=this._getResolutionParams(),this._queryFeatures())},t.prototype.update=function(){this.startup()},t.prototype._init=function(){var e=this.layer;this.paginationEnabled=!!e.get("capabilities.query.supportsPagination"),this._source=e.source;var t=e.maxRecordCount||4e3;this.pageSize=null==this.maxPageSize?t:Math.min(t,this.maxPageSize),this._gManager=new g({graphics:this.graphics,objectIdField:e.objectIdField}),this._verticalScale=new f({sourceSpatialReference:e.spatialReference,destSpatialReference:this.layerView.view.spatialReference}),this._setupStateWatchers()},t.prototype._getResolutionParams=function(){var e,t=this.layer,r=t.get("capabilities.query.supportsQuantization");if("polyline"===t.geometryType||"polygon"===t.geometryType){var i=c.getMetersPerUnit(this.layerView.view.spatialReference);if(null==i);else{var a=this._featureResolution.scale,s=this._featureResolution.value/i;a=t.maxScale?t.maxScale:t.minScale?Math.min(a,t.minScale):Math.min(a,y.getScale(this.layerView.view,t.fullExtent)),e=s/this._featureResolution.scale*a}}return e?{maxAllowableOffset:r?null:e,quantizationParameters:r?{mode:"view",originPosition:"upperLeft",tolerance:e,extent:t.fullExtent}:null}:null},t.prototype._setupStateWatchers=function(){var e=this;this._handles.add([this.watch("extent",this.refresh.bind(this)),this.layerView.watch("availableFields",function(t,r){if(t&&r){if(-1!==r.indexOf("*"))return;t.sort(),r.sort(),JSON.stringify(t)!==JSON.stringify(r)&&e.refresh()}else e.refresh()}),this.layer.watch("definitionExpression, historicMoment",this.refresh.bind(this)),this.layer.on("edits",this._editsHandler.bind(this))])},t.prototype._createQueryParams=function(){var e=this.layer,t=this.layerView,r=e.createQuery();r.outSpatialReference=t.view.spatialReference,r.geometry=this.extent,r.outFields=t.availableFields;var i=e.capabilities&&e.capabilities.data;return i&&i.supportsZ&&null==r.returnZ&&null!=this.defaultReturnZ&&(r.returnZ=this.defaultReturnZ),i&&i.supportsM&&null==r.returnM&&null!=this.defaultReturnM&&(r.returnM=this.defaultReturnM),r.set(this._resolutionParams),this.paginationEnabled&&(r.start=0,r.num=this.pageSize),r},t.prototype._queryFeatures=function(){this.cancelQuery(),this.hasAllFeatures=this.hasFeatures=!1,this._gManager.beginPagedUpdate(),this.emit("query-start"),this._executeQuery(this._createQueryParams())},t.prototype._executeQuery=function(e){var t=this,r=this._source.queryFeatures(e).then(function(e){return e.unquantize()}),i=this._gManager.createIntentToAdd();this._querySetup(i,r),r.then(this._processFeatureSet.bind(this,e,i)).catch(function(e){return t._queryError(i,e)}).then(function(){return t._queryTeardown(i)},function(){return t._queryTeardown(i)})},t.prototype._processFeatureSet=function(e,t,r){var i=r.exceededTransferLimit,a=r.features,s=this._maxFeatures[this.layer.geometryType]||0,n=a?a.length:0,o=this._gManager.numGraphics+n,u=o>=s;if(u){_.warn('Feature limit exceeded on layer "',this.layer.title,'". Not all features are shown.');var l=o-s;l&&a.splice(n-l,l)}var p=!(!i||!this.paginationEnabled||u)&&this._queryNextPage(e);return this._verticalScale.adjust(a),a&&this._gManager.addPage(a,t),this.hasFeatures=!0,p||(this._gManager.endPagedUpdate(),this.hasAllFeatures=!i,this.emit("query-end",{success:!0})),r},t.prototype._queryNextPage=function(e){return e.start+=this.pageSize,this._executeQuery(e),!0},t.prototype._queryError=function(e,t){if(t&&"cancel"===t.dojoType&&!this.hasFeatures?this._gManager.revertPagedUpdate():this._gManager.endPagedUpdate(),this.emit("query-end",{success:!1}),t&&"cancel"===t.dojoType)return h.reject(t);var r=new n("snapshotcontroller:tile-request-failed","Failed to query for features",{error:t});return _.error(r),h.reject(r)},t.prototype._querySetup=function(e,t){this._pendingQueries.set(e,t),this.notifyChange("updating")},t.prototype._queryTeardown=function(e){this._gManager.removeIntent(e),this._pendingQueries.delete(e),this.notifyChange("updating")},t.prototype._processRefetch=function(e,t){var r=t.features;r&&this._gManager.add(r,e)},t.prototype._refetchError=function(e,t){},t.prototype._verifyCapabilities=function(){if(!this.layer.get("capabilities.operations.supportsQuery"))throw new n("graphicscontroller:query-capability-required","Service requires query capabilities to be used as a feature layer",{layer:this.layer})},t.prototype._collectionChanged=function(e){var t=e.added;if(t)for(var r=0;r<t.length;r++)t[r].layer=this.layer,t[r].sourceLayer=this.layer;if(t=e.removed)for(var r=0;r<t.length;r++)t[r].layer=null,t[r].sourceLayer=null},t.prototype._editsHandler=function(e){var t=this,r=function(e){return e.objectId},i=e.deletedFeatures.map(r);this._gManager.delete(i);var a=e.addedFeatures.concat(e.updatedFeatures).map(r);if(a.length){var s=this._createQueryParams();s.objectIds=a;var n=this._source.queryFeatures(s),o=this._gManager.createIntentToAdd(a);this._querySetup(o,n),n.then(this._processRefetch.bind(this,o)).catch(this._refetchError.bind(this,o)).then(function(){return t._queryTeardown(o)},function(){return t._queryTeardown(o)})}},i([d.shared("SnapshotController: query cancelled")],t.prototype,"_cancelErrorMsg",void 0),i([d.property({readOnly:!0})],t.prototype,"type",void 0),i([d.shared({value:.25,scale:945})],t.prototype,"_featureResolution",void 0),i([d.shared({point:16e3,multipoint:8e3,polyline:4e3,polygon:4e3,multipatch:4e3})],t.prototype,"_maxFeatures",void 0),i([d.property()],t.prototype,"_pendingQueries",void 0),i([d.property({dependsOn:["_pendingQueries"]})],t.prototype,"updating",null),i([d.property()],t.prototype,"graphics",null),i([d.property()],t.prototype,"extent",void 0),i([d.property()],t.prototype,"hasAllFeatures",void 0),i([d.property()],t.prototype,"hasFeatures",void 0),i([d.property()],t.prototype,"layer",void 0),i([d.property()],t.prototype,"layerView",void 0),i([d.property()],t.prototype,"maxPageSize",void 0),i([d.property()],t.prototype,"defaultReturnZ",void 0),i([d.property()],t.prototype,"defaultReturnM",void 0),i([d.property()],t.prototype,"pageSize",void 0),i([d.property()],t.prototype,"paginationEnabled",void 0),t=i([d.subclass("esri.layers.graphics.controllers.SnapshotController")],t)}(d.declared(s,p,o))});