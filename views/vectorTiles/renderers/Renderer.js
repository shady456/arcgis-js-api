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

define(["require","exports","../../webgl/FramebufferObject","../../../core/libs/gl-matrix/mat4","../GeometryUtils","./BackgroundRenderer","./LineRenderer","./FillRenderer","./SymbolRenderer","./TileInfoRenderer","./FadeRecorder"],function(e,t,r,i,s,o,n,a,d,h,l){var _=function(){function e(){this._extrudeRotateVector=new Float32Array([0,0,1]),this._extrudeScaleVector=new Float32Array([1,1,1]),this._state={rotation:0,width:0,height:0},this._cachedWidth=0,this._cachedHeight=0,this._cachedRotation=0}return e.prototype.initialize=function(e,t,r){void 0===r&&(r=!0),this._SpriteMosaic=e,this._glyphMosaic=t,this._ignoreSpeed=!r,this._backgroundRenderer=new o,this._lineRenderer=new n,this._fillRenderer=new a,this._symbolRenderer=new d,this._tileInfoRenderer=new h,this._fadeRecorder=new l.FadeRecorder(300),this._extrudeMatrix=new Float32Array(16),this._extrudeNoRotationMatrix=new Float32Array(16),this._backgroundColor=new Float32Array([1,0,0,1])},e.prototype.dispose=function(){this._backgroundRenderer&&(this._backgroundRenderer.dispose(),this._backgroundRenderer=null),this._lineRenderer&&(this._lineRenderer.dispose(),this._lineRenderer=null),this._fillRenderer&&(this._fillRenderer.dispose(),this._fillRenderer=null),this._symbolRenderer&&(this._symbolRenderer.dispose(),this._symbolRenderer=null),this._tileInfoRenderer&&(this._tileInfoRenderer.dispose(),this._tileInfoRenderer=null),this._hittestFBO&&(this._hittestFBO.dispose(),this._hittestFBO=null)},e.prototype.setStateParams=function(e,t,r){this._fadeRecorder.recordLevel(r),this._state=e,(this._state.width!==this._cachedWidth||this._state.height!==this._cachedHeight||this._state.rotation!==this._cachedRotation)&&(this._extrudeScaleVector[0]=2/e.width,this._extrudeScaleVector[1]=-2/e.height,i.identity(this._extrudeMatrix),i.rotate(this._extrudeMatrix,this._extrudeMatrix,-e.rotation*s.C_DEG_TO_RAD,this._extrudeRotateVector),i.scale(this._extrudeMatrix,this._extrudeMatrix,this._extrudeScaleVector),i.transpose(this._extrudeMatrix,this._extrudeMatrix),i.identity(this._extrudeNoRotationMatrix),i.scale(this._extrudeNoRotationMatrix,this._extrudeNoRotationMatrix,this._extrudeScaleVector),i.transpose(this._extrudeNoRotationMatrix,this._extrudeNoRotationMatrix),this._cachedWidth=this._state.width,this._cachedHeight=this._state.height,this._cachedRotation=this._state.rotation)},e.prototype.drawClippingMasks=function(e,t){if(0!==t.length){e.setDepthWriteEnabled(!1),e.setDepthTestEnabled(!1),e.setStencilTestEnabled(!0),e.setBlendingEnabled(!1),e.setColorMask(!1,!1,!1,!1),e.setStencilOp(7680,7680,7681),e.setStencilWriteMask(255),e.setClearStencil(0);var r=e.gl;e.clear(r.STENCIL_BUFFER_BIT);for(var i=0,s=t;i<s.length;i++){var o=s[i];o.attached&&o.visible&&(e.setStencilFunctionSeparate(1032,519,o.stencilData.reference,o.stencilData.mask),this._backgroundRenderer.renderSolidColor(e,{u_matrix:o.tileTransform.transform,u_normalized_origin:o.tileTransform.displayCoord,u_coord_range:o.coordRange,u_depth:0,u_color:this._backgroundColor}))}e.setColorMask(!0,!0,!0,!0),e.setBlendingEnabled(!0)}},e.prototype.renderDebug=function(e,t){var r=t.key;this._backgroundColor.set([r.col%2,r.row%2,r.col%2===0&&r.row%2===0?1:0,.5]),this._backgroundRenderer.renderSolidColor(e,{u_matrix:t.tileTransform.transform,u_normalized_origin:t.tileTransform.displayCoord,u_coord_range:t.coordRange,u_depth:0,u_color:this._backgroundColor})},e.prototype.renderBucket=function(e,t,r,i,s,o,n,a){if(!(void 0!==n.minzoom&&n.minzoom>r||void 0!==n.maxzoom&&n.maxzoom<=r))switch(t.type){case 0:2!==s&&this._renderBackground(e,t,r,s,o,n,a);break;case 1:2!==s&&this._renderFill(e,t,r,s,o,n,a);break;case 2:(1===s||3===s)&&this._renderLine(e,t,r,s,o,n,a);break;case 3:(2===s||3===s)&&this._renderSymbol(e,t,r,s,i,o,n,a)}},e.prototype.renderTileInfo=function(e,t){this._tileInfoRenderer.render(e,t)},e.prototype.needsRedraw=function(){return this._fadeRecorder.needsRedraw()},e.prototype.hitTest=function(e,t,i,s,o,n,a){var d=[0,0],h=[0,0],l=e.state;l.toMap(d,[0,0]),l.toMap(h,[n,n]);var _=s.filter(function(e){return!(d[0]>e.bounds[2]||h[0]<e.bounds[0]||d[1]<e.bounds[3]||h[1]>e.bounds[1])});if(0===_.length)return[];_.sort(function(e,t){return e.key.level-t.key.level});for(var c=_.length,u=1;c>=u;u++){var p=_[u-1];p.attached&&(p.stencilData.reference=u,p.stencilData.mask=255)}a(l,o,_);var f=e.context;this._hittestFBO||(this._hittestFBO=r.create(f,{colorTarget:0,depthStencilTarget:3,width:n,height:n}));var R=f.getViewport(),b=f.getBoundFramebufferObject();f.bindFramebuffer(this._hittestFBO),f.setViewport(0,0,n,n);var x=f.gl;f.setDepthWriteEnabled(!0),f.setStencilWriteMask(255),f.setClearColor(1,1,1,1),f.setClearDepth(1),f.setClearStencil(0),f.clear(x.COLOR_BUFFER_BIT|x.DEPTH_BUFFER_BIT|x.STENCIL_BUFFER_BIT),f.setDepthWriteEnabled(!1),this.drawClippingMasks(f,_),f.setBlendingEnabled(!1),f.setStencilWriteMask(0),f.setStencilOp(7680,7680,7681),f.setDepthFunction(515),f.setDepthTestEnabled(!0),f.setDepthWriteEnabled(!0),f.setStencilTestEnabled(!0);for(var g=0;c>g;g++){var p=_[g];p.attached&&p.doRender(e)}f.setStencilTestEnabled(!1),f.setDepthTestEnabled(!1),this._readbackBuffer||(this._readbackBuffer=new Uint8Array(4*n*n),this._readbackBuffer32=new Uint32Array(this._readbackBuffer.buffer)),this._hittestFBO.readPixels(0,0,n,n,6408,5121,this._readbackBuffer);var y=new Set,M=n*n,S=Math.round(M/2),k=this._readbackBuffer32[S];4294967295!==k&&y.add(k);for(var u=0;M>u;u++)k=this._readbackBuffer32[u],4294967295!==k&&y.add(k);f.bindFramebuffer(b),f.setViewport(R.x,R.y,R.width,R.height);var m=[];return y.forEach(function(e){m.push(e)}),m},e.prototype._renderBackground=function(e,t,r,i,s,o,n){this._backgroundRenderer.render(e,t,r,i,s,o,this._SpriteMosaic,this._SpriteMosaic.pixelRatio,n)},e.prototype._renderLine=function(e,t,r,i,s,o,n){this._lineRenderer.render(e,t,r,i,this._state,s,o,this._SpriteMosaic,this._extrudeMatrix,this._SpriteMosaic.pixelRatio,n)},e.prototype._renderFill=function(e,t,r,i,s,o,n){this._fillRenderer.render(e,t,r,this._state.rotation,i,s,o,this._SpriteMosaic,this._extrudeMatrix,this._SpriteMosaic.pixelRatio,n)},e.prototype._renderSymbol=function(e,t,r,i,s,o,n,a){var d=!0;s===o.key.level&&(d=!1),e.setStencilTestEnabled(d),this._symbolRenderer.render(e,t,r,i,this._state.rotation,this._fadeRecorder.getFadeValues(this._ignoreSpeed),o,n,this._SpriteMosaic,this._glyphMosaic,this._extrudeMatrix,this._extrudeNoRotationMatrix,this._SpriteMosaic.pixelRatio,a)},e}();return _});