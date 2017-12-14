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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/watchUtils","../../../../core/HandleRegistry","../../../../core/Logger","../../support/aaBoundingRect","../../support/PreallocArray","./deconflictorDebug","../../lib/glMatrix","../../webgl-engine/lib/Util","../../webgl-engine/lib/screenSizePerspectiveUtils","../../webgl-engine/materials/internal/MaterialUtil","../../webgl-engine/materials/HUDMaterial"],function(i,t,e,r,s,a,n,c,o,l,h,p,u,f){function d(i){return!!i&&"selection"===i.type}var g=l.vec2d,v=l.vec4d,y=h.VertexAttrConstants,m=a.getLogger("esri.views.3d.graphics.Deconflictor"),w=v.create(),b=v.create(),B=v.create(),x=v.create(),I=g.create(),G=n.create(),M=n.create(),D=new Set,S=h.lerp,T={icons:new c(100),labels:new c(100)},V=function(){function i(i,t){this.creator=i,this.disposer=t,this.list=[],this.currentIndex=0}return i.prototype.alloc=function(){for(var i=[],t=0;t<arguments.length;t++)i[t]=arguments[t];return this.currentIndex>=this.list.length&&this.list.push(new this.creator(i)),this.list[this.currentIndex++]},i.prototype.freeAll=function(){for(var i=this.currentIndex,t=this.disposer,e=this.list;--i>=0;)t(e[i]);this.currentIndex=0},i}(),N=function(){function i(){this.graphics3DGraphic=null,this.positions=[g.create(),g.create(),g.create(),g.create()],this.xMin=0,this.xMax=0,this.yMin=0,this.yMax=0,this.posView=0,this.graphicsOwner=null,this.id=0,this.graphicId=0}return i.release=function(i){i.graphics3DGraphic=null,i.graphicsOwner=null},i}(),O=function(){function i(i){var t=this;this.graphicsOwners=[],this.deconflictTimeoutId=0,this.handles=new s,this.graphicInfoPool=new V(N,N.release),this.nextGraphicInfoId=0,this.accBinsNumX=15,this.accBinsNumY=20,this.accBinsSizeX=0,this.accBinsSizeY=0,this.accBins=null,this.accNumTests=0,this.iconMarginFactor=-.1,this.view=i,this.handles.add([i.watch("state.camera",function(){return t.scheduleRun()}),r.whenNot(i,"ready",function(){return t.clearDeconflictTimeout()})])}return i.prototype.destroy=function(){this.handles.destroy(),this.handles=null,this.clearDeconflictTimeout(),this.graphicInfoPool.freeAll(),this.graphicInfoPool=null,this.view=null},i.prototype.clearDeconflictTimeout=function(){this.deconflictTimeoutId&&(clearTimeout(this.deconflictTimeoutId),this.deconflictTimeoutId=0)},i.prototype.addGraphicsOwner=function(i){var t=this;this.graphicsOwners.push(i),this.setDirty(),i.layer&&"function"==typeof i.layer.watch&&i.layer.watch("featureReduction",function(e,r){d(e)?t.setDirty():d(r)&&(t._removeIconVisibilityFlags(i),t.setDirty())})},i.prototype.removeGraphicsOwner=function(i){var t=this.graphicsOwners.indexOf(i);t>=0&&this.graphicsOwners.splice(t,1),this.setDirty()},i.prototype.setDirty=function(){this.scheduleRun(10)},i.prototype.initializeLabelVisibility=function(i){i.setVisibilityFlag(2,!1,1)},i.prototype.doesIntersectExistingPoly=function(i){var t=i.graphicId,e=i.positions,r=D;r.clear();for(var s=Math.floor(i.xMin/this.accBinsSizeX);s<=Math.floor(i.xMax/this.accBinsSizeX);s++)if(!(0>s||s>=this.accBinsNumX))for(var a=Math.floor(i.yMin/this.accBinsSizeY);a<=Math.floor(i.yMax/this.accBinsSizeY);a++)if(!(0>a||a>=this.accBinsNumY)){var n=this.accBins[s][a];i:for(var c=0;c<n.length;c++){var o=n.data[c];if(o.graphicId!==t&&!r.has(o.id)){r.add(o.id);var l=o.positions;this.accNumTests++;for(var h=0;2>h;h++){var p=0===h?e:l,u=0===h?l:e;t:for(var f=0;4>f;f++){var d=p[f],v=p[(f+1)%4],y=p[(f+2)%4];I[0]=v[0]-d[0],I[1]=v[1]-d[1];var m=g.normalize(I);M=[-m[1],m[0]],m[0]=M[0],m[1]=M[1];for(var w=m[0]*d[0]+m[1]*d[1],b=m[0]*y[0]+m[1]*y[1]<w,B=0;4>B;B++){var x=u[B],G=m[0]*x[0]+m[1]*x[1];if(b&&w>G||!b&&G>w)continue t}continue i}}return!0}}}return!1;var M},i.prototype.initBins=function(i,t){if(null==this.accBins){this.accBins=[];for(var e=0;e<this.accBinsNumX;e++){this.accBins.push([]);for(var r=this.accBins[this.accBins.length-1],s=0;s<this.accBinsNumY;s++)r.push(new c(10))}}for(var e=0;e<this.accBinsNumX;e++)for(var s=0;s<this.accBinsNumY;s++)this.accBins[e][s].clear();this.accBinsSizeX=i/this.accBinsNumX,this.accBinsSizeY=t/this.accBinsNumY,this.accNumTests=0},i.prototype.addToBins=function(i){for(var t=Math.floor(i.xMin/this.accBinsSizeX);t<=Math.floor(i.xMax/this.accBinsSizeX);t++)if(!(0>t||t>=this.accBinsNumX))for(var e=Math.floor(i.yMin/this.accBinsSizeY);e<=Math.floor(i.yMax/this.accBinsSizeY);e++)0>e||e>=this.accBinsNumY||this.accBins[t][e].push(i)},i.prototype.scheduleRun=function(i){var t=this;void 0===i&&(i=200),0===this.deconflictTimeoutId&&(this.deconflictTimeoutId=setTimeout(function(){return t.run()},i))},i.prototype.run=function(){var i=this.view;if(this.clearDeconflictTimeout(),!i.ready)return void this.setDirty();var t=i.state.camera;this.graphicInfoPool.freeAll(),this.nextGraphicInfoId=0;var e=t.fullWidth,r=t.fullHeight;o.prepare(i),T.icons.clear(),T.labels.clear();for(var s=!1,a=0;a<this.graphicsOwners.length;a++){var n=this.graphicsOwners[a];if(null!=n.getGraphics3DGraphics&&null!=n.getGraphics3DGraphicsKeys){var c=null!=n.labelsEnabled&&n.labelsEnabled(),l=d(n.layer?n.layer.featureReduction:null);if(c||l){s||(this.initBins(e,r),s=!0);for(var h=n.getGraphics3DGraphics(),p=n.getGraphics3DGraphicsKeys(),u=0;u<p.length;u++){var f=h[p[u]];f.areVisibilityFlagsSet(void 0,2)&&(l&&this._collectGraphics(f,!1,n,t,T.icons,this.iconMarginFactor),c&&this._collectGraphics(f,!0,n,t,T.labels))}}}}T.icons.sort(function(i,t){return t.posView-i.posView}),T.labels.sort(function(i,t){return t.posView-i.posView}),this._deconflictVisibleObjects(T.icons,!1),T.labels.length&&this._deconflictVisibleObjects(T.labels,!0),o.drawAccelerationStruct(this,T.icons),o.drawAccelerationStruct(this,T.labels)},i.prototype._collectGraphics=function(i,t,e,r,s,a){void 0===a&&(a=0);var c=t?i._labelGraphics:i._graphics,o=t?1:0;if(c.length){for(var l,h,d,g=n.set(G,n.NEGATIVE_INFINITY),v=0,I=c;v<I.length;v++){var D=I[v];if(!D.isDraped()){var T=D.stageObject,V=T?T.getNumGeometryRecords():0;if(!(1>V)){var N=T.getGeometryRecord(0),O=N.materials[0];if(O instanceof f)if(V>1)m.warn("Graphic objects with more than 1 geometry record are not supported");else{var A=N.geometry.getData(),X=A.getVertexAttr();if(!h){var Y=T.getCenter(),F=N.origin.vec3,R=u.transformToWorld(Y,F,w);h=u.transformToView(R,F,r.viewMatrix,b);var _=X[y.NORMAL].data;O.applyVerticalOffsetTransformation(h,_,T.objectTransformation,r,z);var j=X[y.AUXPOS1].data,U="screen"!==O.getParams().centerOffsetUnits,E=U?j:[0,0,0],H=u.transformToProjection(h,r.projectionMatrix,E,B);d=u.transformToNDC(H,x),U||(d[0]+=j[0]/r.fullWidth*2,d[1]+=j[1]/r.fullHeight*2);var K=d[0]<-1||d[1]<-1||d[2]<-1||d[0]>=1||d[1]>=1;if(K)break;l=h[2],i.areVisibilityFlagsSet(2,void 0,o)&&(l*=.7)}var L=D.getScreenSize(P);p.applyPrecomputedScaleFactorVec2(L,z.factor,L);var W=n.offset(O.calculateRelativeScreenBounds(L,z.scaleAlignment,M),S(0,r.fullWidth,.5+.5*d[0]),S(0,r.fullHeight,.5+.5*d[1]));if(0!==a){var C=a*Math.min(n.width(W),n.height(W));W[0]-=C,W[1]-=C,W[2]+=C,W[3]+=C}n.expand(g,W)}}}}if(null!=l){var k=this.graphicInfoPool.alloc();k.id=this.nextGraphicInfoId++,k.graphicId=i.graphic.uid,k.xMin=g[0],k.yMin=g[1],k.xMax=g[2],k.yMax=g[3],k.positions[0][0]=g[0],k.positions[0][1]=g[1],k.positions[1][0]=g[0],k.positions[1][1]=g[3],k.positions[2][0]=g[2],k.positions[2][1]=g[3],k.positions[3][0]=g[2],k.positions[3][1]=g[1],k.graphics3DGraphic=i,k.posView=l,k.graphicsOwner=e,s.push(k)}}},i.prototype._deconflictVisibleObjects=function(i,t){for(var e=t?1:0,r=0;r<i.length;r++){var s=i.data[r],a=s.graphics3DGraphic,n=t&&a.areVisibilityFlagsSet(2,void 0)===!1,c=!n&&!this.doesIntersectExistingPoly(s);c&&this.addToBins(s),a.setVisibilityFlag(2,c,e),o.drawPoly(s.positions,c?"green":"red")}},i.prototype._removeIconVisibilityFlags=function(i){if(null!=i.getGraphics3DGraphics&&null!=i.getGraphics3DGraphicsKeys)for(var t=i.getGraphics3DGraphics(),e=i.getGraphics3DGraphicsKeys(),r=0,s=e;r<s.length;r++){var a=s[r],n=t[a];n.setVisibilityFlag(2,void 0)}},i}(),z={factor:{scale:0,factor:0,minPixelSize:0,paddingPixels:0},scaleAlignment:0,minPixelSizeAlignment:0},P=g.create();return O});