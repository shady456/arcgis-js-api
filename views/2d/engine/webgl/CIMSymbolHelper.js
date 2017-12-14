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

define(["require","exports","../../../vectorTiles/GeometryUtils","./CIMSymbolDrawHelper","./SDFHelper"],function(e,r,a,o,t){Object.defineProperty(r,"__esModule",{value:!0});var i=function(){function e(){}return e.getEnvelope=function(e){if("CIMPointSymbol"!==e.type)return null;var r=new o.EnvDrawHelper,a={type:"point",x:0,y:0};return r.drawSymbol(e,a),r.envelope()},e.rasterize=function(e,r){var a=this.getEnvelope(r);if(!a||a.width<=0||a.height<=0)return[null,0,0,0,0];var t=96/72,i=(a.x+.5*a.width)*t,s=-(a.y+.5*a.height)*t;e.width=a.width*t+2,e.height=a.height*t+2;var n=e.getContext("2d"),l=o.Transformation.createScale(t,-t);l.translate(.5*e.width-i,.5*e.height-s);var h=new o.CanvasDrawHelper(n,l),S={type:"point",x:0,y:0};h.drawSymbol(r,S);for(var c,d=n.getImageData(0,0,e.width,e.height),m=new Uint8Array(d.data),y=0;y<m.length;y+=4)c=m[y+3]/255,m[y]=m[y]*c,m[y+1]=m[y+1]*c,m[y+2]=m[y+2]*c;return[m,e.width,e.height,i/e.width,s/e.height]},e.fromSimpleMarker=function(e){var r,o,t=100,i=50,s=e.style;if("circle"===s||"esriSMSCircle"===s){var n=.25,l=Math.acos(1-n/i),h=Math.ceil(a.C_PI/l/4);0===h&&(h=1),l=a.C_PI_BY_2/h,h*=4;var S=[];S.push([i,0]);for(var c=1;h>c;c++)S.push([i*Math.cos(c*l),-i*Math.sin(c*l)]);S.push([i,0]),r={rings:[S]},o={xmin:-i,ymin:-i,xmax:i,ymax:i}}else if("cross"===s||"esriSMSCross"===s){var d=10;r={rings:[[[d,i],[d,d],[i,d],[i,-d],[d,-d],[d,-i],[-d,-i],[-d,-d],[-i,-d],[-i,d],[-d,d],[-d,i],[d,i]]]},o={xmin:-i,ymin:-i,xmax:i,ymax:i}}else if("diamond"===s||"esriSMSDiamond"===s)r={rings:[[[-i,0],[0,i],[i,0],[0,-i],[-i,0]]]},o={xmin:-i,ymin:-i,xmax:i,ymax:i};else if("square"===s||"esriSMSSquare"===s)r={rings:[[[-i,-i],[-i,i],[i,i],[i,-i],[-i,-i]]]},o={xmin:-i,ymin:-i,xmax:i,ymax:i};else if("x"===s||"esriSMSX"===s){var m=.7071067811865476,d=20*m;r={rings:[[[0,d],[i-d,i],[i,i-d],[d,0],[i,d-i],[i-d,-i],[0,-d],[d-i,-i],[-i,d-i],[-d,0],[-i,i-d],[d-i,i],[0,d]]]},o={xmin:-i,ymin:-i,xmax:i,ymax:i}}else if("triangle"===s||"esriSMSTriangle"===s){var y=.5773502691896257,g=t*y,v=-g,f=2/3*t,u=f-t;r={rings:[[[v,u],[0,f],[g,u],[v,u]]]},o={xmin:v,ymin:u,xmax:g,ymax:f}}var p;if(r&&o){var x=[{type:"CIMSolidFill",enable:!0,color:e.color}];e.outline&&x.push({type:"CIMSolidStroke",enable:!0,width:e.outline.width,color:e.outline.color});var w={type:"CIMPolygonSymbol",symbolLayers:x};p={type:"CIMPointSymbol",symbolLayers:[{type:"CIMVectorMarker",enable:!0,rotation:e.angle,size:e.size,offsetX:e.xoffset,offsetY:e.yoffset,frame:o,markerGraphics:[{type:"CIMMarkerGraphic",geometry:r,symbol:w}]}]}}return p},e}();r.CIMSymbolHelper=i;var s=function(){function e(){}return e.rasterizeSimpleFill=function(e,r){("solid"===r||"none"===r||"esriSFSSolid"===r||"esriSFSNull"===r)&&console.error("Unexpected: style does not require rasterization"),e.width=8,e.height=8;var a=e.getContext("2d");a.strokeStyle="#FFFFFF",a.beginPath(),("vertical"===r||"cross"===r||"esriSFSCross"===r||"esriSFSVertical"===r)&&(a.moveTo(0,0),a.lineTo(0,8)),("horizontal"===r||"cross"===r||"esriSFSCross"===r||"esriSFSHorizontal"===r)&&(a.moveTo(0,0),a.lineTo(8,0)),("forward-diagonal"===r||"diagonal-cross"===r||"esriSFSDiagonalCross"===r||"esriSFSForwardDiagonal"===r)&&(a.moveTo(0,0),a.lineTo(8,8)),("backward-diagonal"===r||"diagonal-cross"===r||"esriSFSBackwardDiagonal"===r||"esriSFSDiagonalCross"===r)&&(a.moveTo(8,0),a.lineTo(0,8)),a.stroke();for(var o,t=a.getImageData(0,0,e.width,e.height),i=new Uint8Array(t.data),s=0;s<i.length;s+=4)o=i[s+3]/255,i[s]=i[s]*o,i[s+1]=i[s+1]*o,i[s+2]=i[s+2]*o;return[i,e.width,e.height]},e.rasterizeSimpleLine=function(e,r){var a;switch(r){case"dash":case"esriSLSDash":a=[3,2];break;case"dash-dot":case"esriSLSDashDot":a=[2,2,0,2];break;case"dot":case"esriSLSDot":a=[0,3];break;case"long-dash":case"esriSLLongDash":a=[6,3];break;case"long-dash-dot":case"esriSLLongDashDot":a=[6,3,0,3];break;case"long-dash-dot-dot":case"esriSLLongDashDotDot":a=[2,2,0,2,0,2];break;case"short-dash":case"esriSLSShortDash":a=[2,2];break;case"short-dash-dot":case"esriSLSShortDashDot":a=[2,2,0,2];break;case"short-dash-dot-dot":case"esriSLSShortDashDotDot":a=[2,2,0,2,0,2];break;case"short-dot":case"esriSLSShortDot":a=[0,2];break;case"solid":case"esriSLSSolid":throw new Error("Unexpected: style does not require rasterization");case"none":throw new Error("Unexpected: style does not require rasterization")}for(var o=16,i=2*o-1,s=0,n=0,l=a;n<l.length;n++){var h=l[n];s+=h}for(var S=s*o,c=S*i,d=new Float32Array(c),m=o*o+1,y=0;c>y;++y)d[y]=m;for(var g=2*o-1,v=o-.5,f=.5,u=.5,p=!0,x=0,w=a;x<w.length;x++){var h=w[x];f=u,u+=h*o;for(var D=f;u>D;){for(var b=.5;g>b;){var y=(i-b+.5+1)*S+D-.5,M=(b-v)*(b-v);p?d[y]=M:d[y]=Math.min((D-f)*(D-f)+M,(D-u)*(D-u)+M),b++}D++}p=!p}for(var F=d.length,k=new Uint8Array(4*F),y=0;F>y;++y){var C=Math.sqrt(d[y])/(o-1);t.packFloat(C,k,4*y)}return[k,S,i]},e}();r.SymbolHelper=s});