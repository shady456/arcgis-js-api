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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/screenUtils","./Graphics3DSymbolLayer","./Graphics3DGraphicLayer","./Graphics3DDrapedGraphicLayer","./ElevationAligners","./Graphics3DSymbolCommonCode","./lineUtils","./graphicUtils","../../../../geometry/Polygon","../../../../Color","../../lib/glMatrix","../../support/aaBoundingBox","../../webgl-engine/Stage","../../webgl-engine/lib/Object3D","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/GeometryData","../../webgl-engine/lib/RenderGeometry","../../webgl-engine/materials/ColorMaterial","../../webgl-engine/lib/Util","./earcut/earcut"],function(t,e,r,i,a,o,n,l,s,u,p,h,c,d,y,g,_,m,v,f,x,O,E){var D=O.VertexAttrConstants,b=d.vec3d,G=d.mat4d,M=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e._elevationOptions={supportsOffsetAdjustment:!1,supportsOnTheGround:!0},e}return r(e,t),e.prototype._prepareResources=function(){this._prepareFillResources(),this._prepareOutlineResources(),this.resolve()},e.prototype._prepareFillResources=function(){var t=this._getStageIdHint(),e=this._getMaterialOpacityAndColor(),r={color:e,transparent:e[3]<1||this._isPropertyDriven("opacity"),polygonOffset:!1,vertexColors:!0};this._material=new x(r,t+"_colormat"),this._context.stage.add(g.ModelContentType.MATERIAL,this._material)},e.prototype._prepareOutlineResources=function(){var t=this.symbol.outline;if(this._hasOutline=!!(t&&t.size&&t.size>0&&t.color),this._hasOutline){var e={idHint:this._getStageIdHint()+"_outline",color:this._getOutlineColor(),width:i.pt2px(t.size)};e.width>2?this._outlineMaterial=u.createRibbonMaterial(e):this._outlineMaterial=u.createNativeMaterial(e),this._context.stage.add(g.ModelContentType.MATERIAL,this._outlineMaterial)}},e.prototype.destroy=function(){t.prototype.destroy.call(this),this.isFulfilled()||this.reject(),this._material&&(this._context.stage.remove(g.ModelContentType.MATERIAL,this._material.getId()),this._material=null),this._outlineMaterial&&(this._context.stage.remove(g.ModelContentType.MATERIAL,this._outlineMaterial.getId()),this._outlineMaterial=null)},e.prototype.createGraphics3DGraphic=function(t,e){var r=this._validateGeometry(t.geometry);if("polyline"!==r.type&&"polygon"!==r.type&&"extent"!==r.type)return this._logWarning("unsupported geometry type for fill symbol: "+r.type),null;var i="graphic"+t.uid,a=this._getVertexOpacityAndColor(e,Uint8Array,255),o=this.getGraphicElevationContext(t);return"on-the-ground"===o.mode?this._createAsOverlay(t,a,o,i):this._createAs3DShape(t,a,o,i,t.uid)},e.prototype.layerPropertyChanged=function(t,e,r){if("opacity"===t){var i=this._material.getColor();if(i[3]=this._getMaterialOpacity(),this._material.setColor(i),this._material.setTransparent(i[3]<1),this._outlineMaterial){var a=this._outlineMaterial.getColor();this._outlineMaterial.setColor([a[0],a[1],a[2],this._getOutlineOpacity()])}return!0}if("elevationInfo"===t){var o=this._elevationContext.mode;this._updateElevationContext();var n=this._elevationContext.mode;if(null==o||null==n)return!1;if("on-the-ground"===o&&"on-the-ground"===n)return!0;if(o!==n&&("on-the-ground"===o||"on-the-ground"===n))return!1;var l=s.needsElevationUpdates2D(n);for(var u in e){var p=e[u],h=r(p);if(h&&!h.isDraped()){var c=p.graphic;h.needsElevationUpdates=l,h.elevationContext.set(this.getGraphicElevationContext(c))}}return!0}return!1},e.prototype.setDrawOrder=function(t,e,r){this._material&&(this._material.setRenderPriority(t+e/2),r[this._material.getId()]=!0),this._outlineMaterial&&(this._outlineMaterial.setRenderPriority(t),r[this._outlineMaterial.getId()]=!0)},e.prototype._createAs3DShape=function(t,e,r,i,a){var n=this._getPolyGeometry(t),u=n.hasZ,p=n.rings,h=this._getOutlineGeometry(n,p),c=s.getGeometryVertexData3D(h,u,n.spatialReference,this._context.renderSpatialReference,this._context.elevationProvider,this._context.renderCoordsHelper,r);w.idHint=i,w.color=e,w.data=c;var d;if(this._hasOutline){var y=c.vertexData.constructor;d=new y(c.vertexData)}if(w.outNum=0,w.outGeometries=[],w.outTransforms=[],w.outMaterials=[],this._createAs3DShapeFill(w),w.data.vertexData=d,this._createAs3DShapeOutline(w),this._logGeometryCreationWarnings(w.data,p,"rings","FillSymbol3DLayer"),0===w.outNum)return null;var g=new _({geometries:w.outGeometries,materials:w.outMaterials,transformations:w.outTransforms,castShadow:!1,metadata:{layerUid:this._context.layer.uid,graphicId:a},idHint:i}),m=l.perVertexElevationAligner,v=new o(this,g,w.outGeometries,null,null,m,r);return v.alignedTerrainElevation=c.terrainElevation,v.needsElevationUpdates=s.needsElevationUpdates2D(r.mode),v},e.prototype._createAs3DShapeFill=function(t){for(var e=t.data.geometryData.polygons,r=t.data.eleVertexData,i=t.data.vertexData,a=function(a){var n=e[a],l=n.count,u=n.index;if(o._context.clippingExtent&&(s.computeBoundingBox(r,u,l,C),s.boundingBoxClipped(C,o._context.clippingExtent)))return"continue";var p=new Float64Array(r.buffer,3*u*r.BYTES_PER_ELEMENT,3*l),h=new Float64Array(i.buffer,3*u*i.BYTES_PER_ELEMENT,3*l),c=n.holeIndices.map(function(t){return t-u}),d=E(p,c,3);if(0===d.length)return"continue";s.chooseOrigin(i,u,l,A),s.subtractCoordinates(i,u,l,A);var y=o._createFillGeometry(d,0,h,p,t.color),g=new m(y,t.idHint);g.singleUse=!0;var _=G.identity();G.translate(_,A,_),t.outGeometries.push(g),t.outMaterials.push([o._material]),t.outTransforms.push(_),t.outNum++},o=this,n=0;n<e.length;++n)a(n)},e.prototype._createAs3DShapeOutline=function(t){if(this._hasOutline)for(var e=t.data.geometryData.outlines,r=t.data.eleVertexData,i=t.data.vertexData,a=0;a<e.length;++a){var o=e[a],n=o.index,l=o.count;if(!this._context.clippingExtent||(s.computeBoundingBox(r,n,l,C),!s.boundingBoxClipped(C,this._context.clippingExtent))){s.chooseOrigin(i,n,l,A),s.subtractCoordinates(i,n,l,A);var p=new Float64Array(r.buffer,3*n*r.BYTES_PER_ELEMENT,3*l),h=new Float64Array(i.buffer,3*n*i.BYTES_PER_ELEMENT,3*l),c=u.createPolylineGeometry(h,p,t.isRings,T,0),d=new m(c,t.idHint+"outline"+a);d.singleUse=!0;var y=G.identity();G.translate(y,A,y),t.outGeometries.push(d),t.outMaterials.push([this._outlineMaterial]),t.outTransforms.push(y),t.outNum++}}},e.prototype._createAsOverlay=function(t,e,r,i){var a=this._getPolyGeometry(t),o=a.rings,l=this._getOutlineGeometry(a,o);this._material.setRenderPriority(this._symbolLayerOrder+this._symbolLayerOrderDelta/2),this._hasOutline&&this._outlineMaterial.setRenderPriority(this._symbolLayerOrder);var u=s.getGeometryVertexDataDraped(l,a.spatialReference,this._context.overlaySR);w.idHint=i,w.color=e,w.data=u;var p;if(this._hasOutline){var h=u.vertexData.constructor;p=new h(u.vertexData)}return w.outNum=0,w.outGeometries=[],w.outBoundingBox=y.create(y.NEGATIVE_INFINITY),this._createAsOverlayFill(w),w.data.vertexData=p,this._createAsOverlayOutline(w),this._logGeometryCreationWarnings(w.data,o,"rings","FillSymbol3DLayer"),w.outNum>0?new n(this,w.outGeometries,null,null,w.outBoundingBox,r):null},e.prototype._createAsOverlayFill=function(t){for(var e=t.data.vertexData,r=t.data.geometryData.polygons,i=function(i){var o=r[i],n=o.count,l=o.index,u=new Float64Array(e.buffer,3*l*e.BYTES_PER_ELEMENT,3*n),p=o.holeIndices.map(function(t){return t-l}),h=E(u,p,3);if(0===h.length)return"continue";if(s.computeBoundingBox(e,l,n,C),s.boundingBoxClipped(C,a._context.clippingExtent))return"continue";y.expand(t.outBoundingBox,C),s.chooseOrigin(e,l,n,A),s.subtractCoordinates(e,l,n,A),s.setZ(e,l,n,a._getDrapedZ());var c=G.identity();G.translate(c,A,c);var d=a._createFillGeometry(h,l,e,null,t.color),g=new f(d);g.material=a._material;var _=C;g.center=[.5*(_[0]+_[3]),.5*(_[1]+_[4]),0],g.bsRadius=.5*Math.sqrt((_[3]-_[0])*(_[3]-_[0])+(_[4]-_[1])*(_[4]-_[1])),g.transformation=c,g.name=t.idHint,g.uniqueName=t.idHint+"#"+d.id,t.outGeometries.push(g),t.outNum++},a=this,o=0;o<r.length;++o)i(o)},e.prototype._createAsOverlayOutline=function(t){if(this._hasOutline)for(var e=t.data.vertexData,r=t.data.geometryData.outlines,i=0;i<r.length;++i){var a=r[i],o=a.index,n=a.count;if(s.computeBoundingBox(e,o,n,C),!s.boundingBoxClipped(C,this._context.clippingExtent)){y.expand(t.outBoundingBox,C),s.chooseOrigin(e,o,n,A),s.subtractCoordinates(e,o,n,A),s.setZ(e,o,n,this._getDrapedZ());var l=new Float64Array(e.buffer,3*o*e.BYTES_PER_ELEMENT,3*n),p=G.identity();G.translate(p,A,p);var h=u.createPolylineGeometry(l,null,!0,T,0),c=new f(h);c.material=this._outlineMaterial;var d=C;c.center=[.5*(d[0]+d[3]),.5*(d[1]+d[4]),0],c.bsRadius=.5*Math.sqrt((d[3]-d[0])*(d[3]-d[0])+(d[4]-d[1])*(d[4]-d[1])),c.transformation=p,c.name=t.idHint+"outline",c.uniqueName=t.idHint+"outline#"+h.id,t.outGeometries.push(c),t.outNum++}}},e.prototype._getOutlineGeometry=function(t,e){return e},e.prototype._getOutlineOpacity=function(){var t=this._getLayerOpacity(),e=this.symbol.outline.color;return t*e.a},e.prototype._getOutlineColor=function(){var t=this.symbol.outline.color,e=this._getOutlineOpacity();return p.mixinColorAndOpacity(c.toUnitRGB(t),e)},e.prototype._getPolyGeometry=function(t){var e=t.geometry;return"extent"===e.type?h.fromExtent(e):e},e.prototype._createFillGeometry=function(t,e,r,i,a){for(var o=t.length,n=new Uint32Array(o),l=new Uint32Array(o),s=0;o>s;s++)n[s]=t[s]+e,l[s]=0;var u={},p={};return u[D.POSITION]=n,u[D.COLOR]=l,p[D.POSITION]={size:3,data:r},p[D.COLOR]={size:4,data:a},i&&(p.mapPos={size:3,data:i},u.mapPos=n),new v(p,u)},e}(a),C=y.create(),A=b.create(),T=new Float32Array([255,255,255,255]),w={idHint:null,color:null,data:null,outNum:0,outBoundingBox:null,outGeometries:null,outMaterials:null,outTransforms:null};return M});