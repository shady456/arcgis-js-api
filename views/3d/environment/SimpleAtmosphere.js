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
// See http://js.arcgis.com/4.9/esri/copyright.txt for details.

define(["require","exports","../../../core/watchUtils","./atmosphereUtils","./resources/SimpleAtmosphereTexture","../lib/gl-matrix","../support/earthUtils","../support/imageUtils","../support/mathUtils","../support/buffer/glUtil","../support/buffer/InterleavedLayout","../webgl-engine/lib/glUtil3D","../webgl-engine/lib/RenderPass","../webgl-engine/lib/RenderSlot","../webgl-engine/lib/Util","../webgl-engine/shaders/SimpleAtmospherePrograms","../../webgl/BufferObject","../../webgl/programUtils","../../webgl/Texture","../../webgl/Util","../../webgl/VertexArrayObject"],function(e,t,r,a,i,n,s,o,d,l,h,c,u,p,f,g,m,_,v,b,C){function x(e,t,r,a,i){var s=n.vec3d.length(e),o=Math.sqrt(s*s-a*a),d=a*o/s,l=Math.sqrt(a*a-d*d),h=i.silCircleV1,c=i.silCircleV2;return n.vec3d.scale(e,l/s,i.silCircleCenter),n.vec3d.cross(e,t,h),n.vec3d.length2(h)<1&&n.vec3d.cross(e,r,h),n.vec3d.scale(h,d/n.vec3d.length(h)),n.vec3d.cross(h,e,c),n.vec3d.scale(c,d/n.vec3d.length(c)),d}function D(e,t,r,a){return n.vec3d.add(a.silCircleCenter,a.silCircleV2,E),n.vec3d.scale(E,U,S),n.mat4d.lookAt(t,E,r,M),f.project(E,M,e.projectionMatrix,e.viewport),f.project(S,M,e.projectionMatrix,e.viewport),n.vec3d.dist(E,S)/e.height}function y(e,t,r){return e*e/(Math.sqrt(e*e-t*t)*Math.sqrt(e*e-r*r)+t*r)}var w=-a.INNER_ATMOSPHERE_DEPTH,P=(s.earthRadius+w)/s.earthRadius,V=(s.earthRadius+0)/s.earthRadius,U=(s.earthRadius+3e5)/s.earthRadius,A=function(e){return 1-511/512},R=d.makePiecewiseLinearFunction([[50,.1015625],[500,.21875],[5e3,.51171875],[5e4,.4140625]]),F=function(){function e(e){this.needsRender=!1,this.didRender=!0,this.slot=p.POSTPROCESSING_ATMOSPHERE_OPAQUE,this._renderData={texV:n.vec2d.create(),silCircleCenter:n.vec3d.create(),silCircleV1:n.vec3d.create(),silCircleV2:n.vec3d.create(),altitudeFade:0,innerScale:0,undergroundFadeAlpha:0},this._fadeVaoCount=0,this.view=e}return e.prototype.when=function(e){return this._readyPromise.then(e)},e.prototype.initializeRenderContext=function(e){var t=this,a=e.rctx;this._cameraChangeHandle=r.init(this.view,"state.camera",function(){return t.needsRender=!0},!0),this._program=_.createProgram(a,g.colorPass),this._fadeProgram=_.createProgram(a,g.fadePass),this._vao=this._createRibbon(a),this._vaoCount=b.vertexCount(this._vao,"geometry"),this._fadeVao=c.createQuadVAO(a),this._fadeVaoCount=b.vertexCount(this._fadeVao,"geometry"),this._readyPromise=o.requestImage(i).then(function(e){t._texture=new v(a,{pixelFormat:6408,dataType:5121,wrapMode:33071,samplingMode:9729,flipped:!0},e),t.needsRender=!0})},e.prototype.uninitializeRenderContext=function(e){this.destroy()},e.prototype.destroy=function(){this._cameraChangeHandle&&(this._cameraChangeHandle.remove(),this._cameraChangeHandle=null),this._texture&&(this._texture.dispose(),this._texture=null),this._program&&(this._program.dispose(),this._program=null),this._fadeProgram&&(this._fadeProgram.dispose(),this._fadeProgram=null),this._fadeVao&&(this._fadeVao.dispose(),this._fadeVao=null)},e.prototype.render=function(e){if(e.slot!==this.slot||e.pass!==u.MATERIAL)return!1;if(null==this._texture)return!1;this._update(e.camera);var t=e.rctx,r=this._program;return t.setDepthTestEnabled(!0),t.setDepthFunction(515),t.setBlendingEnabled(!0),t.setDepthWriteEnabled(!1),t.setBlendFunctionSeparate(770,771,1,771),this._renderData.undergroundFadeAlpha<1&&(t.bindProgram(r),r.setUniformMatrix4fv("proj",e.camera.projectionMatrix),r.setUniformMatrix4fv("view",e.camera.viewMatrix),r.setUniform3fv("silCircleCenter",this._renderData.silCircleCenter),r.setUniform3fv("silCircleV1",this._renderData.silCircleV1),r.setUniform3fv("silCircleV2",this._renderData.silCircleV2),r.setUniform2fv("texV",this._renderData.texV),t.bindTexture(this._texture,0),r.setUniform1i("tex",0),r.setUniform3fv("lightDirection",e.lightingData.direction),r.setUniform1f("altitudeFade",this._renderData.altitudeFade),r.setUniform1f("innerScale",this._renderData.innerScale),t.bindVAO(this._vao),t.drawArrays(4,0,this._vaoCount)),this._renderData.undergroundFadeAlpha>0&&(t.bindProgram(this._fadeProgram),this._fadeProgram.setUniform1f("undergroundFadeAlpha",this._renderData.undergroundFadeAlpha),this._fadeProgram.setUniform3fv("lightDirection",e.lightingData.direction),this._fadeProgram.setUniform3fv("cameraPosition",e.camera.eye),t.bindVAO(this._fadeVao),t.drawArrays(5,0,this._fadeVaoCount)),t.setBlendingEnabled(!1),t.setDepthWriteEnabled(!0),t.setDepthFunction(513),this.needsRender=!1,!0},e.prototype._update=function(e){var t=n.vec3d.create(),r=s.earthRadius,i=n.vec3d.length(e.eye),o=i-r;if(o<0){var l=Math.min(-o/5e3,1);this._renderData.undergroundFadeAlpha=l}else this._renderData.undergroundFadeAlpha=0;var h=Math.max(50,o),c=r+w;this._renderData.innerScale=y(r+h,r,c)-1,this._renderData.altitudeFade=a.computeInnerAltitudeFade(o),n.vec3d.scale(e.eye,(r+50)/i,t),x(t,e.center,e.up,r,this._renderData);var u=D(e,t,e.up,this._renderData),p=A(),f=R(o),g=0+1*p,m=0+u*f*1;if(o>50){x(e.eye,e.center,e.up,r,this._renderData);var _=D(e,e.eye,e.up,this._renderData),v=d.clamp((_-1.5)/(u-1.5),0,1);g=0+v*p*1,m=0+1*d.lerp(1,u*f,v)}n.vec2d.set2(g,m,this._renderData.texV)},e.prototype._createRibbon=function(e){var t=new Float32Array(1155),r=new Uint32Array(1920);t[0]=0,t[1]=0,t[2]=-1;for(var a=0;a<128;a++){var i=9*a+3;t[i+0]=a,t[i+1]=P,t[i+2]=-1,t[i+3]=a,t[i+4]=V,t[i+5]=0,t[i+6]=a,t[i+7]=U,t[i+8]=1;var n=3*a+1,s=127===a?1:n+3,o=15*a;r[o+0]=n,r[o+1]=n+1,r[o+2]=s+1,r[o+3]=s+1,r[o+4]=s,r[o+5]=n,r[o+6]=n+1,r[o+7]=n+2,r[o+8]=s+2,r[o+9]=s+2,r[o+10]=s+1,r[o+11]=n+1,r[o+12]=n,r[o+13]=s,r[o+14]=0}for(var d=O.createBuffer(r.length),h=d.position,a=0;a<r.length;++a){var c=3*r[a];h.set(a,0,t[c]),h.set(a,1,t[c+1]),h.set(a,2,t[c+2])}return new C(e,g.colorPass.attributes,{geometry:l.glLayout(O)},{geometry:m.createVertex(e,35044,d.buffer)})},e}(),M=n.mat4d.create(),E=n.vec3d.create(),S=n.vec3d.create(),O=h.newLayout().vec3f("position");return F});