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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../../../geometry/support/aaBoundingBox","./featureExpressionInfoUtils","./Graphics3DGraphicElevationContext","./graphicUtils","../../webgl-engine/Stage"],function(e,t,i,s,n,o,r,a,u,l,h,c){function g(e,t,i){return i||(i=a.create()),a.setMin(i,e.getBBMin(t)),a.setMax(i,e.getBBMax(t)),i}var d=function(){function e(t,i,s,n,o,r,a,u){this.type="object3d",this._addedToStage=!1,this.alignedTerrainElevation=0,this.needsElevationUpdates=!1,this.graphics3DSymbolLayer=t,this.uniqueMaterials=n,this.uniqueGeometries=s,this.uniqueTextures=o,this.stageObject=i,this.elevationAligner=r,this.elevationContext=new l(a),this.stage=null,this.stageLayer=null,this._visible=!1,this.visibilityMode=null!=u?u:e.VisibilityModes.HIDE_FACERANGE}return e.prototype.initialize=function(e,t){if(this.stageLayer=e,this.stage=t,this.uniqueMaterials)for(var i=0;i<this.uniqueMaterials.length;i++)t.add(c.ModelContentType.MATERIAL,this.uniqueMaterials[i]);if(this.uniqueGeometries)for(var i=0;i<this.uniqueGeometries.length;i++)t.add(c.ModelContentType.GEOMETRY,this.uniqueGeometries[i]);if(this.uniqueTextures)for(var i=0;i<this.uniqueTextures.length;i++)t.add(c.ModelContentType.TEXTURE,this.uniqueTextures[i]);t.add(c.ModelContentType.OBJECT,this.stageObject)},e.prototype.setVisibility=function(t){if(null!=this.stage){if(this._visible!==t){this._visible=t,this._visible?this._addedToStage?this.stageObject.unhideAllComponents():(this.stageLayer.addObject(this.stageObject),this._addedToStage=!0):this.visibilityMode===e.VisibilityModes.HIDE_FACERANGE?this.stageObject.hideAllComponents():(this.stageLayer.removeObject(this.stageObject),this._addedToStage=!1);var i=this.stage.view.ensureEdgeView();return i.hasObject(this.stageObject)&&i.updateObjectVisibility(this.stageObject,this._visible),!0}return!1}},Object.defineProperty(e.prototype,"visible",{get:function(){return this._visible},enumerable:!0,configurable:!0}),e.prototype.destroy=function(){var e=this.stage;if(this.stageLayer){if(this.uniqueMaterials)for(var t=0;t<this.uniqueMaterials.length;t++)e.remove(c.ModelContentType.MATERIAL,this.uniqueMaterials[t].id);if(this.uniqueGeometries)for(var t=0;t<this.uniqueGeometries.length;t++)e.remove(c.ModelContentType.GEOMETRY,this.uniqueGeometries[t].id);if(this.uniqueTextures)for(var t=0;t<this.uniqueTextures.length;t++)e.remove(c.ModelContentType.TEXTURE,this.uniqueTextures[t].id)}e.remove(c.ModelContentType.OBJECT,this.stageObject.id),this._addedToStage&&(this.stageLayer.removeObject(this.stageObject),this._addedToStage=!1);var i=this.stage.view.ensureEdgeView();i.hasObject(this.stageObject)&&i.removeObject(this.stageObject),this._visible=!1,this.stageLayer=null,this.stage=null},e.prototype.alignWithElevation=function(e,t,i){if(this.elevationAligner){u.setContextFeature(this.elevationContext.featureExpressionInfoContext,i);var s=this.elevationAligner(this,this.elevationContext,e,t);null!=s&&(this.alignedTerrainElevation=s)}},e.prototype.getBSRadius=function(){return this.stageObject.getBSRadius()},e.prototype.getCenterObjectSpace=function(e){return void 0===e&&(e=r.vec3f64.create()),o.vec3.copy(e,this.stageObject.getCenter(!0))},e.prototype.getBoundingBoxObjectSpace=function(e){return void 0===e&&(e=a.create()),g(this.stageObject,!0,e)},e.prototype.getProjectedBoundingBox=function(e,t,i,r){return n(this,void 0,void 0,function(){var n,u,l,c,g,d,c,y,E,O,T,j;return s(this,function(s){switch(s.label){case 0:for(n=this.getBoundingBoxObjectSpace(r),u=f,l=a.isPoint(n)?1:u.length,c=0;c<l;c++)g=u[c],p[0]=n[g[0]],p[1]=n[g[1]],p[2]=n[g[2]],o.vec3.transformMat4(p,p,this.stageObject.objectTransformation),v[3*c+0]=p[0],v[3*c+1]=p[1],v[3*c+2]=p[2];if(!e(v,0,l))return[2,null];for(a.empty(n),d=null,this.calculateRelativeScreenBounds&&(d=this.calculateRelativeScreenBounds()),c=0;c<3*l;c+=3){for(y=0;y<3;y++)n[y]=Math.min(n[y],v[c+y]),n[y+3]=Math.max(n[y+3],v[c+y]);d&&i.push({location:v.slice(c,c+3),screenSpaceBoundingRect:d})}return t&&t.service&&"absolute-height"!==this.elevationContext.mode?(a.center(n,b),E="relative-to-scene"===this.elevationContext.mode?"scene":"ground",O=void 0,t.useViewElevation?(O=t.service.getElevation(b[0],b[1],E),[3,4]):[3,1]):[3,5];case 1:return s.trys.push([1,3,,4]),T=h.demResolutionForBoundingBox(n,t),[4,t.service.queryElevation(b[0],b[1],T,E)];case 2:return O=s.sent(),[3,4];case 3:return j=s.sent(),O=null,[3,4];case 4:a.offset(n,0,0,-this.alignedTerrainElevation+O),s.label=5;case 5:return[2,n]}})})},e.prototype.addHighlight=function(e,t){var i=this.stageObject.highlightAllComponents(t);e.addObject(this.stageObject,i)},e.prototype.removeHighlight=function(e){e.removeObject(this.stageObject)},e}();!function(e){!function(e){e[e.REMOVE_OBJECT=0]="REMOVE_OBJECT",e[e.HIDE_FACERANGE=1]="HIDE_FACERANGE"}(e.VisibilityModes||(e.VisibilityModes={}))}(d||(d={}));var v=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],p=r.vec3f64.create(),b=r.vec3f64.create(),f=[[0,1,2],[3,1,2],[0,4,2],[3,4,2],[0,1,5],[3,1,5],[0,4,5],[3,4,5]];return d});