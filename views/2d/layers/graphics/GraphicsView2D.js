// COPYRIGHT © 2019 Esri
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
// See http://js.arcgis.com/next/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/tsSupport/assignHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","../../../../core/Accessor","../../../../core/asyncUtils","../../../../core/HandleOwner","../../../../core/Identifiable","../../../../core/iteratorUtils","../../../../core/MapPool","../../../../core/maybe","../../../../core/promiseUtils","../../../../core/promiseUtils","../../../../core/screenUtils","../../../../core/accessorSupport/decorators","../../../../geometry/Polygon","../../../../geometry/support/aaBoundingRect","../../../../geometry/support/coordsUtils","../../../../geometry/support/jsonUtils","../../../../geometry/support/spatialReferenceUtils","../../../../layers/graphics/data/projectionSupport","../../../../symbols/support/cimSymbolUtils","../../../../symbols/support/defaults","../../engine","../../engine/webgl/definitions","../features/support/AttributeStore","../features/support/TileStore","./GraphicContainer","./GraphicProcessingQueue","./GraphicStore","./graphicsUtils","../../../layers/GraphicsView"],function(e,t,i,r,a,o,s,n,h,p,c,l,d,u,g,f,_,v,y,m,S,b,w,T,G,U,I,P,C,A,O,M,R,H,x){function D(e,t,i){if(i.has(e))return i.get(e);var r={tile:t,addedOrModified:[],removed:[]};return i.set(e,r),r}Object.defineProperty(t,"__esModule",{value:!0});var k=function(e){function t(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];var r=e.apply(this,t)||this;return r._tiles=new Map,r._graphicStoreUpdate=!1,r._graphicsSet=new Set,r._matcher=g.resolve(null),r._tileUpdateSet=new Set,r._tilesToUpdate=new Map,r._graphicIdToAbortController=new Map,r._attached=!1,r._highlightIds=new Map,r._updatingGraphicsTimer=null,r.lastUpdateId=-1,r.updateRequested=!1,r.graphicUpdateHandler=r.graphicUpdateHandler.bind(r),r.addOrUpdateGraphic=r.addOrUpdateGraphic.bind(r),r._processAnalyzedGraphics=r._processAnalyzedGraphics.bind(r),r._graphicsChangeHandler=r._graphicsChangeHandler.bind(r),r}return i(t,e),t.prototype.initialize=function(){var e=this;this._tileStore=new A.default(this.view.featuresTilingScheme),this.container=new O.default(this.view.featuresTilingScheme,null),this._attributeStore=new C.default({type:"local",initialize:function(t){return g.resolve(e.container.attributeView.initialize(t))},update:function(t){return h.safeCast(e.container.attributeView.requestUpdate(t))},render:function(){return e.container.requestRender()}});var t=function(t){var i=e._attributeStore.createLocalId(t.uid);e._attributeStore.setData(i,0,0,t.visible?P.FILTER_FLAG_0:0)},i=function(t){e._attributeStore.freeLocalId(t.uid)};this._graphicStore=new R.default(this.view.featuresTilingScheme,this.view.state.scale,this.uid,this.graphics,t,i),this._graphicProcessingQueue=new M.default({process:this.addOrUpdateGraphic});var r=new I.WGLTemplateStore(this.container.getMaterialItems.bind(this.container),!0),a=this._tileStore.tileScheme.tileInfo;this.renderer&&(this._matcher=I.createMatcher(this.renderer,r,null)),this._meshFactory=new I.WGLMeshFactory(null,this.uid,null,r,null,a),this.watch("renderer",function(t){t&&(e._matcher=I.createMatcher(e.renderer,r,null))}),this._tileStore.on("update",this._onTileUpdate.bind(this)),this.container.on("attach",function(){e.graphics.items.length>0&&e._graphicsChangeHandler({target:e.graphics,added:e.graphics.items,removed:[],moved:[]}),e.handles.add(e.graphics.on("change",e._graphicsChangeHandler),"graphics"),e._attached=!0,e.notifyChange("updating")}),this.container.on("detach",function(){e._graphicProcessingQueue&&e._graphicProcessingQueue.clear()})},t.prototype.destroy=function(){this._updatingGraphicsTimer&&(clearTimeout(this._updatingGraphicsTimer),this._updatingGraphicsTimer=null,this.notifyChange("updating")),this.container.dispose(),this._set("graphics",null),this._graphicProcessingQueue&&(this._graphicProcessingQueue.destroy(),this._graphicProcessingQueue=null),this._graphicStore.clear(),this._tileStore.destroy(),this._attributeStore=null},Object.defineProperty(t.prototype,"updating",{get:function(){return!this._attached||null!==this._updatingGraphicsTimer||this._graphicProcessingQueue.updating||this._tileUpdateSet.size>0||this._tilesToUpdate.size>0},enumerable:!0,configurable:!0}),t.prototype.install=function(e){e.addChild(this.container)},t.prototype.uninstall=function(e){e.removeChild(this.container)},t.prototype.hitTest=function(e,t){if(!this.view||!this.view.position)return g.resolve();var i=this.view.toMap(_.createScreenPoint(e,t));return this.searchFeatures(i).then(function(e){return e&&e.length?e[0]:null})},t.prototype.searchFeatures=function(e,t){var i=this;return void 0===t&&(t=2),g.create(function(r){r(i._graphicStore.hitTest(e.x,e.y,t,i.view.state.resolution,i.view.state.rotation))})},t.prototype.update=function(e){var t=e.state,i=this.view.featuresTilingScheme.getClosestInfoForScale(t.scale).level;this._graphicStore.updateLevel(i),this._tileStore.setViewState(t),this._graphicStoreUpdate=!0,this.updateRequested=!1},t.prototype.viewChange=function(){this.requestUpdate()},t.prototype.requestUpdate=function(){this.updateRequested||(this.updateRequested=!0,this.view.requestUpdate(this))},t.prototype.processUpdate=function(e){this.updateRequested&&(this.updateRequested=!1,this.update(e))},t.prototype.graphicUpdateHandler=function(e){var t=e.graphic,i=e.property,r=e.newValue,a=t;switch(i){case"attributes":break;case"geometry":case"symbol":this._graphicProcessingQueue.push(a,"update");break;case"visible":this._setVisible(a.uid,r),this._attributeStore.sendUpdates()}},t.prototype.addHighlight=function(e){for(var t=0,i=e;t<i.length;t++){var r=i[t];if(this._highlightIds.has(r)){var a=this._highlightIds.get(r);this._highlightIds.set(r,a+1)}else this._highlightIds.set(r,1)}this._updateHighlight()},t.prototype.removeHighlight=function(e){for(var t=0,i=e;t<i.length;t++){var r=i[t];if(this._highlightIds.has(r)){var a=this._highlightIds.get(r)-1;0===a?this._highlightIds.delete(r):this._highlightIds.set(r,a)}}this._updateHighlight()},t.prototype._updateHighlight=function(){this._attributeStore.setHighlight(l.keysOfMap(this._highlightIds))},t.prototype._getIntersectingTiles=function(e){var t=this._graphicStore.getBounds(e);return t&&0!==m.width(t)&&0!==m.height(t)?this._tileStore.boundsIntersections(t):[]},t.prototype._updateTile=function(e){var t=this,i=e.tile,r=this._getGraphicsData(i,e.addedOrModified);return h.safeCast(this._processGraphics(i.key,r)).then(function(r){return t._patchTile(i.key,{addOrUpdate:r,remove:e.removed}),r})},t.prototype._patchTile=function(e,t){if(this._tiles.has(e)){var i=this._tiles.get(e);this.container.onTileData(i,t),this.container.requestRender()}},t.prototype._graphicsChangeHandler=function(e){var t=this;if(!this._graphicStoreUpdate){var i=this.view.state,r=this.view.featuresTilingScheme.getClosestInfoForScale(i.scale).level;this._graphicStore.updateLevel(r),this._tileStore.setViewState(i)}for(var a,o=e.added,s=e.removed,n=e.moved,h=this._tilesToUpdate,p=[],c=new Array(o.length),l=0;l<o.length;l++){var d=o[l];c[l]=d,this._graphicsSet.add(d),p.push(this.addGraphic(d))}for(var u=0,f=s;u<f.length;u++){var _=f[u];this._abortProcessingGraphic(_.uid);for(var v=this._getIntersectingTiles(_),y=0,m=v;y<m.length;y++){var S=m[y];a=S.key.id;var b=D(a,S,h);b.removed.push(this._attributeStore.getLocalId(_.uid))}this._graphicsSet.delete(_),this._graphicStore.remove(_)}for(var w=0,T=n;w<T.length;w++)for(var G=T[w],v=this._getIntersectingTiles(G),U=0,I=v;U<I.length;U++){var S=I[U];a=S.key.id;var b=D(a,S,h);b.addedOrModified.push(G)}this._flipUpdatingGraphics(),g.all(p).then(function(){for(var e,i=0;i<c.length;i++){e=c[i];for(var r=t._getIntersectingTiles(e),o=0,s=r;o<s.length;o++){var n=s[o];a=n.key.id;D(a,n,h).addedOrModified.push(e)}}t._graphicStore.updateZ();var p=[];return h.forEach(function(e){return p.push(t._updateTile(e))}),g.all(p).then(function(){h.clear(),t.notifyChange("updating")})}).catch(function(){h.clear(),t.notifyChange("updating")})},t.prototype._getSymbolResources=function(e,t){return s(this,void 0,void 0,function(){var i,r,a,s,n,h,p,c;return o(this,function(o){switch(o.label){case 0:return this.container.attached?(i=u.isSome(e.symbol)?e.symbol:null,i?[3,3]:this.renderer?[4,this.renderer.getSymbolAsync(e,{scale:this.view.scale})]:[3,2]):[2,g.resolve(null)];case 1:return i=o.sent(),[3,3];case 2:i=this._getNullSymbol(e),o.label=3;case 3:return[4,G.expandSymbol(i,t)];case 4:if(i=o.sent(),r=[],"text"===i.type){for(a=new Set,s=i,n=s.text,h=0;h<n.length;h++)a.add(n.charCodeAt(h));p=[],a.forEach(function(e){return p.push(e)}),r.push({symbol:s.toJSON(),id:0,glyphIds:p})}else r.push({symbol:i.toJSON(),id:e.uid,glyphIds:null});return[4,this.container.getMaterialItems(r,t).then(function(e){return e&&e.length>0?e[0].mosaicItem:null})];case 5:return c=o.sent(),[2,{symbol:i,mosaicItem:c}]}})})},t.prototype._projectAndNormalizeGeometry=function(e){return s(this,void 0,void 0,function(){var t,i,r,a=this;return o(this,function(o){return u.isNone(e.geometry)?[2,g.resolve(null)]:(t=e.geometry,b.isPolygon(t)?(i=t.rings,t.rings=i):b.isPolyline(t)?(r=t.paths,t.paths=r):b.isExtent(t)&&(t=y.fromExtent(t)),[2,T.checkProjectionSupport(t.spatialReference,this.view.spatialReference).then(function(){var e=H.normalizeCentralMeridian(t),i=T.project(e,t.spatialReference,a.view.spatialReference);return S.closeRingsAndFixWinding(i),i})])})})},t.prototype._onTileUpdate=function(e){var t=w.getInfo(this.view.spatialReference);if(e.added&&e.added.length>0)for(var i=0,r=e.added;i<r.length;i++){var a=r[i];this._addNewTile(a,t)}if(e.removed&&e.removed.length>0)for(var o=0,s=e.removed;o<s.length;o++){var n=s[o];this._removeTile(n.key)}},t.prototype.addOrUpdateGraphic=function(e,t,i){return this._addOrUpdateGraphic(e,t,i)},t.prototype.addGraphic=function(e){var t=this;this._abortProcessingGraphic(e.uid);var i=f.createAbortController();this._graphicIdToAbortController.set(e.uid,i);var r={signal:i.signal};return this._addOrUpdateGraphic(e,"add",r).then(function(){t._graphicIdToAbortController.delete(e.uid)}).catch(function(i){if(t._graphicIdToAbortController.delete(e.uid),!g.isAbortError(i))throw i})},t.prototype._addOrUpdateGraphic=function(e,t,i){var r=this,a=this._projectAndNormalizeGeometry(e),o=this._getSymbolResources(e,i);return g.all([a,o]).then(function(a){var o=a[0],s=a[1];return"add"===t?r._addProjectedGraphic(e,s,o):r._updateGraphic(e,s,o,i)})},t.prototype._addProjectedGraphic=function(e,t,i){this._graphicsSet.has(e)&&this._graphicStore.add(e,t,i)},t.prototype._updateGraphic=function(e,t,i,r){var a=this;if(!this._graphicStore.has(e)||g.isAborted(r))return g.resolve();for(var o=this._graphicStore.update(e,t,i),s=o.oldBounds,n=o.newBounds,p=0===m.width(s)&&0===m.height(s),c=0===m.width(n)&&0===m.height(n),l=p?[]:this._tileStore.boundsIntersections(s),u=c?[]:this._tileStore.boundsIntersections(n),f=d.acquire(),_=0,v=l;_<v.length;_++){var y=v[_];f.set(y.key,{addOrUpdate:null,remove:[this._attributeStore.getLocalId(e.uid)]})}for(var S=0,b=u;S<b.length;S++){var y=b[S],w=this._getGraphicData(y,e);if(f.has(y.key)){var T=f.get(y.key);T.remove.length=0,T.addOrUpdate=w}else f.set(y.key,{addOrUpdate:w,remove:null})}var G=[];return f.forEach(function(e,t){var i=h.safeCast(a._processGraphics(t,e.addOrUpdate,r)).then(function(i){a._patchTile(t,{addOrUpdate:i,remove:e.remove})});G.push(i)}),d.release(f),g.all(G).then(function(){})},t.prototype._addTile=function(e,t){var i=m.create();this.view.featuresTilingScheme.getTileBounds(i,e);var r=new I.WGLTile(e,i,!0),a={clear:!0,addOrUpdate:t,remove:[]};this._tiles.set(e,r),this.container.addChild(r),r.setData(a,!1,!1)},t.prototype._addNewTile=function(e,t){var i=this,r=this._graphicStore.queryTileData(e);if(t)for(var a=Math.round((t.valid[1]-t.valid[0])/e.resolution),o=0,s=r;o<s.length;o++){var n=s[o];n.geometry&&b.isPoint(n.geometry)&&this._wrapPoints(n,a)}var h=e.key;this._tileUpdateSet.add(e.key),this.notifyChange("updating"),this._processGraphics(h,r).then(function(e){i._addTile(h,e),i._tileUpdateSet.delete(h),i.notifyChange("updating")}).catch(function(e){if(i._tileUpdateSet.delete(h),i.notifyChange("updating"),!g.isAbortError(e))throw e})},t.prototype._removeTile=function(e){if(this._tiles.has(e)){var t=this._tiles.get(e);this.container.removeChild(t),t.destroy(),this._tiles.delete(e)}},t.prototype._setVisible=function(e,t){var i=this._attributeStore.getLocalId(e);this._attributeStore.setData(i,0,0,t?P.FILTER_FLAG_0:0)},t.prototype._getGraphicsData=function(e,t){var i=w.getInfo(this.view.spatialReference),r=this._graphicStore.getGraphicsData(e,t);if(i)for(var a=Math.round((i.valid[1]-i.valid[0])/e.resolution),o=0,s=r;o<s.length;o++){var n=s[o];n.geometry&&b.isPoint(n.geometry)&&this._wrapPoints(n,a)}return r.sort(function(e,t){return e.insertAfter-t.insertAfter}),r},t.prototype._getGraphicData=function(e,t){var i=this._graphicStore.getGraphicData(e,t),r=[i],a=w.getInfo(this.view.spatialReference);if(a){var o=Math.round((a.valid[1]-a.valid[0])/e.resolution);i.geometry&&b.isPoint(i.geometry)&&this._wrapPoints(i,o)}return r},t.prototype._wrapPoints=function(e,t){var i=e.geometry;512===t?i.x<20?e.geometry={points:[[i.x,i.y],[t,0]]}:i.x>492&&(e.geometry={points:[[i.x,i.y],[-t,0]]}):i.x<-20?e.geometry={points:[[i.x,i.y],[t,0]]}:i.x>532&&(e.geometry={points:[[i.x,i.y],[-t,0]]})},t.prototype._processGraphics=function(e,t,i){return s(this,void 0,void 0,function(){var r,a,s;return o(this,function(o){switch(o.label){case 0:return(r=t&&t.length)&&this._meshFactory?(a=this._meshFactory,[4,h.safeCast(this._matcher.then(function(e){return a.analyze(t,!0,e,null,null,i)}))]):[2,null];case 1:return s=o.sent(),this._attributeStore.sendUpdates(),[2,this._processAnalyzedGraphics(e,s)]}})})},t.prototype._processAnalyzedGraphics=function(e,t){for(var i=this._meshFactory,r=i.createMeshData(t.length),a=this._attributeStore,o=0,s=t;o<s.length;o++){var n=s[o];n.insertAfter=-1===n.insertAfter?-1:a.getLocalId(n.insertAfter),n.localId=a.getLocalId(n.attributes[this.uid]),i.write(r,n,null,null,e.level)}return I.TileData.fromMeshData(r)},t.prototype._abortProcessingGraphic=function(e){if(this._graphicIdToAbortController.has(e)){this._graphicIdToAbortController.get(e).abort()}},t.prototype._getNullSymbol=function(e){var t=e.geometry;return b.isPolyline(t)?U.errorPolylineSymbol2D:b.isPolygon(t)||b.isExtent(t)?U.errorPolygonSymbol2D:U.errorPointSymbol2D},t.prototype._flipUpdatingGraphics=function(){var e=this;this._updatingGraphicsTimer&&clearTimeout(this._updatingGraphicsTimer),this._updatingGraphicsTimer=setTimeout(function(){e._updatingGraphicsTimer=null,e.notifyChange("updating")},160),this.notifyChange("updating")},r([v.property()],t.prototype,"_graphicProcessingQueue",void 0),r([v.property({constructOnly:!0})],t.prototype,"graphics",void 0),r([v.property({dependsOn:["_graphicProcessingQueue.updating"]})],t.prototype,"updating",null),r([v.property()],t.prototype,"view",void 0),r([v.property()],t.prototype,"updateRequested",void 0),t=r([v.subclass("esri.views.2d.layers.support.GraphicsView2D")],t)}(v.declared(x.GraphicsView(p.HandleOwnerMixin(c.IdentifiableMixin(n)))));t.default=k});