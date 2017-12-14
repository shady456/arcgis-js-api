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

define(["require","exports","../../../core/libs/gl-matrix/mat4","../../../core/libs/gl-matrix/vec3","../../webgl/VertexArrayObject","../GeometryUtils","./rendererUtils","../../webgl/ShaderVariations","./vtShaderSnippets"],function(e,t,i,r,o,a,n,s,f){var c=function(){function e(){this._attributeLocations={a_pos:0,a_vertexOffset:1,a_tex:2,a_levelInfo:3},this._attributeLocationsDD={a_pos:0,a_vertexOffset:1,a_tex:2,a_levelInfo:3,a_color:4,a_size:5},this._spritesTextureSize=new Float32Array(2),this._initialized=!1,this._viewProjMat=i.create(),this._offsetVector=r.create(),this._extrudeMat=i.create()}return e.prototype.dispose=function(){},e.prototype.render=function(e,t,r,o,s,f,c,u,d,_,l,m){var v=this;this._initialized||this._initialize(e);var h=u.getLayoutValue("icon-size",r),p=m*u.getPaintValue("icon-opacity",r),x=u.getLayoutValue("icon-rotation-alignment",r);2===x&&(x=1===u.getLayoutValue("symbol-placement",r)?0:1);var y=0===x,D=t.isSDF,g=u.hasDataDrivenIcon,V=3===o,b=a.degToByte(s),z=c.tileTransform.transform,U=u.getPaintValue("icon-translate",r);if(0!==U[0]||0!==U[1]){i.copy(this._viewProjMat,c.tileTransform.transform);var A=U[0],O=U[1],M=0,S=0,P=512,j=c.coordRange/P,w=(1<<c.key.level)/Math.pow(2,r)*j,I=u.getPaintValue("icon-translate-anchor",r);if(1===I){var L=-a.C_DEG_TO_RAD*s,T=Math.sin(L),B=Math.cos(L);M=w*(A*B-O*T),S=w*(A*T+O*B)}else M=w*A,S=w*O;this._offsetVector[0]=M,this._offsetVector[1]=S,this._offsetVector[2]=0,i.translate(this._viewProjMat,this._viewProjMat,this._offsetVector),z=this._viewProjMat}y?i.copy(this._extrudeMat,_):i.copy(this._extrudeMat,l);var F=this._getIconVAO(e,c,g);if(F){e.bindVAO(F);var C=this._shaderVariations.getProgram([D,g,V],void 0,void 0,g?this._attributeLocationsDD:this._attributeLocations);if(e.bindProgram(C),D){var E=u.getPaintValue("icon-color",r),k=u.getPaintValue("icon-halo-color",r),R=u.getPaintValue("icon-halo-width",r);C.setUniform4f("u_color",E[0],E[1],E[2],E[3]),C.setUniform4f("u_outlineColor",k[0],k[1],k[2],k[3]),C.setUniform1f("u_outlineSize",R)}if(C.setUniformMatrix4fv("u_transformMatrix",z),C.setUniformMatrix4fv("u_extrudeMatrix",this._extrudeMat),C.setUniform2fv("u_normalized_origin",c.tileTransform.displayCoord),C.setUniform1f("u_depth",u.z),C.setUniform1f("u_mapRotation",b),C.setUniform1f("u_keepUpright",0),C.setUniform1f("u_level",10*r),C.setUniform1f("u_fadeSpeed",10*f.fadeSpeed),C.setUniform1f("u_minfadeLevel",10*f.minfadeLevel),C.setUniform1f("u_maxfadeLevel",10*f.maxfadeLevel),C.setUniform1f("u_fadeChange",10*(r+f.fadeChange)),C.setUniform1i("u_texture",1),C.setUniform1f("u_size",h),C.setUniform1f("u_opacity",p),V){var G=n.int32To4Bytes(t.layerID);C.setUniform4f("u_id",G[0],G[1],G[2],G[3])}t.markerPerPageElementsMap.forEach(function(t,i){v._spritesTextureSize[0]=d.getWidth(i)/4,v._spritesTextureSize[1]=d.getHeight(i)/4,C.setUniform2fv("u_mosaicSize",v._spritesTextureSize),d.bind(e,9729,i,1),e.drawElements(4,t[1],5125,12*t[0])}),e.bindVAO()}},e.prototype._initialize=function(e){if(this._initialized)return!0;var t=new s("icon",["iconVS","iconFS"],[],f,e);return t.addDefine("SDF","SDF",[!0,!0],"SDF"),t.addDefine("DD","DD",[!0,!1],"DD"),t.addDefine("ID","ID",[!0,!0],"ID"),this._shaderVariations=t,this._vertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:16,normalized:!1,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:4,stride:16,normalized:!1,divisor:0},{name:"a_tex",count:4,type:5121,offset:8,stride:16,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:16,normalized:!1,divisor:0}]},this._vertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:24,normalized:!1,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:4,stride:24,normalized:!1,divisor:0},{name:"a_tex",count:4,type:5121,offset:8,stride:24,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:24,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:16,stride:24,normalized:!0,divisor:0},{name:"a_size",count:1,type:5126,offset:20,stride:24,normalized:!1,divisor:0}]},this._initialized=!0,!0},e.prototype._getIconVAO=function(e,t,i){if(i){if(t.iconDDVertexArrayObject)return t.iconDDVertexArrayObject;var r=t.iconDDVertexBuffer,a=t.iconIndexBuffer;return r&&a?(t.iconDDVertexArrayObject=new o(e,this._attributeLocationsDD,this._vertexAttributesDD,{geometry:r},a),t.iconDDVertexArrayObject):null}if(t.iconVertexArrayObject)return t.iconVertexArrayObject;var r=t.iconVertexBuffer,a=t.iconIndexBuffer;return r&&a?(t.iconVertexArrayObject=new o(e,this._attributeLocations,this._vertexAttributes,{geometry:r},a),t.iconVertexArrayObject):null},e}();return c});