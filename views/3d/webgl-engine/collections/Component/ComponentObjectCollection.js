// COPYRIGHT © 2020 Esri
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
// See http://js.arcgis.com/4.15/esri/copyright.txt for details.

define(["require","exports","../../../../../core/tsSupport/assignHelper","../../../../../core/tsSupport/extendsHelper","../../../../../core/tsSupport/decorateHelper","../../../../../core/Logger","../../../../../core/maybe","../../../../../core/typedArrayUtil","../../../../../core/libs/gl-matrix-2/mat3","../../../../../core/libs/gl-matrix-2/mat3f32","../../../../../core/libs/gl-matrix-2/vec3","../../../../../core/libs/gl-matrix-2/vec3f64","../../../../../core/libs/gl-matrix-2/vec4","../../../../../core/libs/gl-matrix-2/vec4f32","../../../../../geometry/support/aaBoundingBox","../../../layers/support/symbolColorUtils","../../../support/orientedBoundingBox","../../../support/buffer/BufferView","../../../support/buffer/glUtil","../../../support/buffer/InterleavedLayout","./interface","./RenderSubmitSystem","./SourceGeometry","./IndexRange/ComponentRangeRunLengthEncoded","./Material/ComponentMaterial","./Material/ComponentTechnique","../../core/util/BucketedObjectStore","../../core/util/TwoVectorPosition","../../lib/AutoDisposable","../../lib/ComponentUtils","../../lib/geometryDataUtils","../../lib/Util","../../lib/TextureBackedBuffer/BufferManager","../../materials/internal/MaterialUtil","../../../../webgl/BufferObject","../../../../webgl/VertexArrayObject"],(function(e,t,o,n,r,i,s,a,c,p,l,u,m,h,f,g,y,d,b,v,C,B,_,x,A,w,S,D,M,P,j,O,R,I,V,k){Object.defineProperty(t,"__esModule",{value:!0});var U=i.getLogger("esri.views.3d.webgl-engine.collections.Component.ComponentObjectCollection"),G=function(){function e(e){this._renderManager=e,this._objects=new S.BucketedObjectStore,this._renderSubmit=new B.RenderSubmitSystem(this),this._renderManager.register(this._renderSubmit),this._componentBufferManager=new R.BufferManager(e.rctx)}return e.prototype.dispose=function(){O.assert(0===this.count,"ObjectCollection should be empty upon disposal")},e.prototype.createObject=function(e){var t=new N;return t.toMapSpace=e.toMapSpace.slice(),t.transform=e.transform,t.obb=y.clone(e.obb),t.components=new H(this._componentBufferManager,e.geometry.componentOffsets),t.renderable=this._createRenderable(e,t.components),t.intersectionGeometry=new E(e.geometry.positionData,t.components),this._objects.add(e.visible?X:0,t),t},e.prototype.destroyObject=function(e){var t=e;this._objects.remove(t),t.dispose(),this._notifyDirty()},e.prototype.setObjectVisibility=function(e,t){var o=e;if(t!==o.visible){var n=t?o.bucketKey|X:o.bucketKey&~X;this._objects.updateKey(o,n),this._notifyDirty()}},Object.defineProperty(e.prototype,"count",{get:function(){return this._objects.count},enumerable:!0,configurable:!0}),e.prototype.preSubmit=function(e){var t=e.camera.eye;this._objects.forEach((function(e,o){o&X&&e.forEach((function(e){var o=l.vec3.squaredDistance(t,e.obb.center);e.renderable.meta.cameraDepthSquared=o}))}))},e.prototype.updateMaterial=function(e,t){var o=e.renderable.material;t(o),o.dirty&&this._notifyDirty()},e.prototype.setAllComponentVisibilities=function(e,t){var o=e;o.components.visibility.reset(t),o.components.visibilityDirty(),this._notifyDirty()},e.prototype.forEachVisibleComponent=function(e,t){return e.components.visibility.forEachComponent(t)},e.prototype.getComponentCount=function(e){var t=e,o=t.components.visibility.componentCount();return{visible:o,invisible:t.components.count-o}},e.prototype.setComponentData=function(e,t){var o=e,n=o.renderable.material;if(C.isVaryingComponentParameters(t)){for(var r=o.components,i=r.materialDataBuffer,s=r.materialDataIndices,a={castShadows:!0,pickable:!0,externalColor:h.vec4f32.create(),externalColorMixMode:1},c=i.textureBuffer,p=new Uint8Array(4),l=new Uint32Array(p.buffer),u=0,m=0,f=0,y=0,d=!1,b=0,v=0;v<r.count;v++)t(v,a),u+=+(a.externalColor[3]<1),m+=+(3===a.externalColorMixMode&&1===a.externalColor[3]),f+=+(a.externalColor[3]>0),y+=+a.castShadows,g.encodeSymbolColor(a.externalColor,a.externalColorMixMode,p),p[2]=254&p[2]|+a.castShadows,c.setData(s[v],0,p[0],p[1],p[2],p[3]),d=d||v>0&&b!==l[0],b=l[0],a.pickable!==P.getVisibility(r.pickability,v)&&(r.pickability=P.updateVisibilityWithCount(r.pickability,r.count,v,a.pickable));d?(n.componentParameters=new A.ComponentParametersVarying,n.componentParameters.castShadows=F(y,r.count),n.componentParameters.transparent=F(u,r.count),n.componentParameters.opaqueOverride=F(m,r.count),n.componentParameters.visible=F(f,r.count),n.componentParameters.texture=c,c.updateTexture()):(n.componentParameters=new A.ComponentParametersUniform,n.componentParameters.castShadows=a.castShadows?0:2,n.componentParameters.externalColor=a.externalColor,n.componentParameters.externalColorMixMode=a.externalColorMixMode)}else n.componentParameters=new A.ComponentParametersUniform,n.componentParameters.castShadows=t.castShadows?0:2,n.componentParameters.externalColor=t.externalColor,n.componentParameters.externalColorMixMode=t.externalColorMixMode;this._notifyDirty()},e.prototype.getComponentAABB=function(e,t,o){return e.intersectionGeometry.getComponentAABB(t,o)},e.prototype.getObjectTransform=function(e){return e.transform},e.prototype.getComponentPositions=function(e,t,o){return e.intersectionGeometry.getComponentPositions(t,o)},e.prototype.intersect=function(e,t,o,n,r,i){var a=e;s.isSome(r)&&(r.localOrigin=a.transform.position);var p=c.mat3.invert(z,a.transform.rotationScale);l.vec3.sub(W,t,a.transform.position),l.vec3.sub(J,o,a.transform.position),l.vec3.transformMat3(W,W,p),l.vec3.transformMat3(J,J,p);var u=c.mat3.transpose(z,p);return a.intersectionGeometry.intersect(W,J,n,u,r,i)},e.prototype.addEdges=function(e,t,o,n){var r=e,i=r.intersectionGeometry,s=i.indices,a=i.positions,c=r.components.offsets;return t.addComponentObject(e,r.transform,r.obb.center,a,s,c,o,n)},e.prototype.addComponentHighlight=function(e,t){var o=e.components;s.isNone(o.highlightCounts)&&(o.highlightCounts=new Uint32Array(o.count+1)),0===o.highlightCounts[t]++&&(o.highlightsDirty(),this._notifyDirty()),o.highlightCounts[o.count]++},e.prototype.removeComponentHighlight=function(e,t){var o=e.components;if(s.isNone(o.highlightCounts))U.warn("Removing non-existing highlight.");else{var n=o.highlightCounts[t],r=o.highlightCounts[o.count];if(0!==n){if(n>1)return o.highlightCounts[t]=n-1,void(o.highlightCounts[o.count]=r-1);o.highlightCounts[t]=0,o.highlightsDirty(),this._notifyDirty(),1===r?o.highlightCounts=null:o.highlightCounts[o.count]=r-1}else U.warn("Removing non-existing highlight.")}},e.prototype.clearHighlights=function(e){var t=e.components;s.isSome(t.highlightCounts)&&(t.highlightCounts=null,t.highlightsDirty(),this._notifyDirty())},e.prototype.getObjectMemoryUsageGPU=function(e){return e.renderable.meta.gpuMemoryEstimate},Object.defineProperty(e.prototype,"visibleObjects",{get:function(){return this._objects.getBucket(X)},enumerable:!0,configurable:!0}),e.prototype._createRenderable=function(e,t){for(var o=this._renderManager.rctx,n=e.geometry,r=n.vertices.layoutParameters,i=V.createVertex(o,35044,n.vertices.data),a=s.applySome(n.indices,(function(e){return V.createIndex(o,35044,e)})),u=b.glLayout(_.createVertexBufferLayout(r)),h=new Uint16Array(n.vertices.count),f=0;f<t.count;f++){var g=t.offsets[f],y=t.offsets[f+1],d=t.materialDataIndices[f];if(s.isSome(n.indices))for(var v=g;v<y;v++){h[n.indices[v]]=d}else for(v=g;v<y;v++)h[v]=d}var C=V.createVertex(o,35044,h.buffer),B=new D.TwoVectorPosition(e.transform.position),x=p.mat3f32.clone(e.transform.rotationScale);c.mat3.invert(x,x),c.mat3.transpose(x,x);var S=new w.ComponentDrawParameters;l.vec3.copy(S.worldFromModel_TL,B.low),l.vec3.copy(S.worldFromModel_TH,B.high),c.mat3.copy(S.worldFromModel_RS,e.transform.rotationScale),c.mat3.copy(S.transformNormal_GlobalFromModel,x),m.vec4.copy(S.toMapSpace,e.toMapSpace);var M=new A.ComponentMaterial,P=new k(o,M.attributeLocations,{data:u,componentIndices:q},{data:i,componentIndices:C},s.unwrap(a)),j=new L;return j.material=M,j.drawParameters=S,j.geometry=new T(P,n.primitiveType,r,s.isSome(a)),j.meta.cameraDepthSquared=.5,j.meta.gpuMemoryEstimate=i.byteSize+C.byteSize+(s.isSome(a)?a.byteSize:0),j},e.prototype._notifyDirty=function(){this._renderManager.notifyDirty()},e}();t.ComponentObjectCollection=G;var H=function(e){function t(t,o){var n=e.call(this)||this;n.pickability=null,n.highlightCounts=null,n.cachedGeometryRanges=null,n.cachedHighlightRanges=null,n.offsets=a.slice(o);var r=n.count;n.visibility=new x.ComponentRangeRunLengthEncoded(r),n.materialDataBuffer=t.getBuffer(r),n.materialDataIndices=new Uint16Array(r);for(var i=0;i<r;i++)n.materialDataIndices[i]=n.materialDataBuffer.acquireIndex();return n}return n(t,e),t.prototype.dispose=function(){e.prototype.dispose.call(this);for(var t=0;t<this.count;t++)this.materialDataBuffer.releaseIndex(this.materialDataIndices[t])},Object.defineProperty(t.prototype,"count",{get:function(){return this.offsets.length-1},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"geometryRanges",{get:function(){return s.isNone(this.cachedGeometryRanges)&&(this.cachedGeometryRanges=this.visibility.computeOffsetRanges(this.offsets)),this.cachedGeometryRanges},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"highlightRanges",{get:function(){return s.isNone(this.highlightCounts)?null:(s.isNone(this.cachedHighlightRanges)&&(this.cachedHighlightRanges=function(e,t,o){var n=[],r=o.length;t.forEachComponent((function(t){return e[t]>0&&(r!==t-1&&(n.length&&n.push(o[r+1]-n[n.length-1]),n.push(o[t])),r=t),!0})),n.length&&n.push(o[r+1]-n[n.length-1]);return n}(this.highlightCounts,this.visibility,this.offsets)),this.cachedHighlightRanges)},enumerable:!0,configurable:!0}),t.prototype.highlightsDirty=function(){this.cachedHighlightRanges=null},t.prototype.visibilityDirty=function(){this.cachedGeometryRanges=null,this.cachedHighlightRanges=null},t}(M.AutoDisposable);var E=function(){function e(e,t){this._indices=s.isSome(e.indices)?e.indices:j.generateDefaultIndexArray(e.positions.length/3),this._positions=new d.BufferViewVec3f(e.positions),this._components=t}return e.prototype.getComponentAABB=function(e,t){if(s.isSome(this._perComponentAABBs)){for(var o=0;o<6;o++)t[o]=this._perComponentAABBs[6*e+o];return t}return this._computePerComponentAABBs(),this.getComponentAABB(e,t)},e.prototype.getComponentPositions=function(e,t){t.indices=this._indices,t.data=this._positions.typedBuffer,t.stride=this._positions.typedBufferStride,t.startIndex=this._components.offsets[e],t.endIndex=this._components.offsets[e+1]},e.prototype.intersect=function(e,t,o,n,r,i){var a=this,c={data:this._positions.typedBuffer,strideIdx:this._positions.typedBufferStride,offsetIdx:0,size:3},p=this._indices,u=this._components.offsets,m=I.computeInvDir(e,t,K);this._components.visibility.forEachComponent((function(h){if(!P.getVisibility(a._components.pickability,h))return!0;var f=a.getComponentAABB(h,Q);if(s.isSome(r)&&r.applyToAABB(f),!I.intersectAabbInvDir(f,e,m,o))return!0;var g=u[h]/3,y=u[h+1]/3;return I.intersectTriangles(e,t,g,y,p,c,void 0,r,(function(e,t,o){return i(h,e,l.vec3.transformMat3(t,t,n),o)})),!0}))},e.prototype._computePerComponentAABBs=function(){var e=this._components.count;this._perComponentAABBs=new Float32Array(6*e);for(var t=0;t<e;t++)this._computeAABB(t)},e.prototype._computeAABB=function(e){for(var t=this._indices,o=this._positions,n=this._components.offsets,r=n[e],i=n[e+1],s=[0,0,0],a=[1/0,1/0,1/0],c=[-1/0,-1/0,-1/0],p=r;p<i;p++){var u=t[p];o.getVec(u,s),l.vec3.min(a,a,s),l.vec3.max(c,c,s)}var m=6*e;this._perComponentAABBs[m++]=a[0],this._perComponentAABBs[m++]=a[1],this._perComponentAABBs[m++]=a[2],this._perComponentAABBs[m++]=c[0],this._perComponentAABBs[m++]=c[1],this._perComponentAABBs[m]=c[2]},Object.defineProperty(e.prototype,"positions",{get:function(){return this._positions},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"indices",{get:function(){return this._indices},enumerable:!0,configurable:!0}),e}(),T=function(e){function t(t,o,n,r){var i=e.call(this)||this;return i.vao=t,i.primitiveType=o,i.parameters=n,i.indexed=r,i}return n(t,e),r([M.autoDispose()],t.prototype,"vao",void 0),t}(M.AutoDisposable);t.RenderGeometry=T;var L=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.meta={cameraDepthSquared:0,gpuMemoryEstimate:0},t}return n(t,e),r([M.autoDispose()],t.prototype,"geometry",void 0),t}(M.AutoDisposable);t.Renderable=L;var q=b.glLayout(v.newLayout().u16("componentIndex")),N=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),Object.defineProperty(t.prototype,"visible",{get:function(){return!!(this.bucketKey&X)},enumerable:!0,configurable:!0}),r([M.autoDispose()],t.prototype,"renderable",void 0),r([M.autoDispose()],t.prototype,"components",void 0),t}(S.BucketStorable);function F(e,t){return e===t?0:0===e?2:1}t.ComponentObject=N;var z=p.mat3f32.create(),K=u.vec3f64.create(),W=u.vec3f64.create(),J=u.vec3f64.create(),Q=f.create(),X=1}));