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

define(["require","exports","../webgl/Texture","../2d/engine/webgl/Geometry","./Rect","./GeometryUtils","./RectangleBinPack"],function(t,i,e,r,s,a,h){function o(t,i,e){return i>t?i:t>e?e:t}function n(t){return t-Math.floor(t)}function u(t,i,e){t=o(t,0,.9999991);var r=n(t*_[0]),s=n(t*_[1]),a=n(t*_[2]),h=n(t*_[3]);i[e+0]=256*(r-r*l[0]),i[e+1]=256*(s-r*l[1]),i[e+2]=256*(a-s*l[2]),i[e+3]=256*(h-a*l[3])}function p(t,i,e,r){return 255&t|(255&i)<<8|(255&e)<<16|r<<24}var _=[16777216,65536,256,1],l=[0,1/256,1/256,1/256],g=function(){function t(t,i,e){void 0===e&&(e=0),this._size=[],this._mosaicsData=[],this._textures=[],this._dirties=[],this._maxItemSize=0,this._currentPage=0,this._pageWidth=0,this._pageHeight=0,this._mosaicRects={},this.pixelRatio=1,(0>=t||0>=i)&&console.error("Sprites mosaic defaultWidth and defaultHeight must be greater than zero!"),this._pageWidth=t,this._pageHeight=i,e>0&&(this._maxItemSize=e),this._binPack=new h(t-4,i-4)}return t.prototype.getWidth=function(t){return t>=this._size.length?-1:this._size[t][0]},t.prototype.getHeight=function(t){return t>=this._size.length?-1:this._size[t][1]},t.prototype.setSpriteSource=function(t){if(this.dispose(),this.pixelRatio=t.devicePixelRatio,0===this._mosaicsData.length){this._binPack=new h(this._pageWidth-4,this._pageHeight-4);var i=Math.floor(this._pageWidth),e=Math.floor(this._pageHeight),r=i*e,s=new Uint32Array(r);this._mosaicsData[0]=s,this._dirties.push(!0),this._size.push([this._pageWidth,this._pageHeight]),this._textures.push(void 0)}this._sprites=t},t.prototype.getSpriteItem=function(t,i){void 0===i&&(i=!1);var e=this._mosaicRects[t];if(e)return e;if(!this._sprites||"loaded"!==this._sprites.loadStatus)return null;var r=this._sprites.getSpriteInfo(t);if(!r||!r.width||!r.height||r.width<0||r.height<0)return null;var s,a,h=r.width,o=r.height,n=1;if(r.cim){var u=this._buildSDF(r.cim),p=u[0],_=u[1],l=u[2],g=u[3],f=u[4],c=u[5];if(!p||0>=g||0>=f)return null;var d=this._allocateImage(_,l),v=d[0],y=d[1],x=d[2];if(v.width<=0)return null;(r.cim||r.sdf)&&this._clearRect(v,y,x,1),this._copy(v,{width:_,height:l,x:0,y:0},y,x,i,p),v.x+=4,v.y+=4,v.width-=8,v.height-=8,s=v,a=y,n=.75*c,n=l/o,r.sdf=!0}else{var m=this._allocateImage(h,o),v=m[0],y=m[1],x=m[2];if(v.width<=0)return null;this._copy(v,r,y,x,i),s=v,a=y}return e={rect:s,width:h,height:o,sdf:r.sdf,pixelRatio:r.pixelRatio,page:a,sdfRatio:n},this._mosaicRects[t]=e,e},t.prototype.preloadSpriteItems=function(){for(var t=0,i=this._sprites.spriteNames;t<i.length;t++){var e=i[t];this.getSpriteItem(e,!0)}},t.prototype.getSpriteItems=function(t){for(var i={},e=0,r=t;e<r.length;e++){var s=r[e];i[s]=this.getSpriteItem(s)}return i},t.prototype.getMosaicItemPosition=function(t,i){var e=this.getSpriteItem(t,i),r=e&&e.rect;if(!r)return null;r.width=e.width,r.height=e.height;var s=e.width,a=e.height,h=2;return{size:[e.width,e.height],tl:[(r.x+h)/this._size[e.page][0],(r.y+h)/this._size[e.page][1]],br:[(r.x+h+s)/this._size[e.page][0],(r.y+h+a)/this._size[e.page][1]],page:e.page}},t.prototype.bind=function(t,i,r,s){void 0===r&&(r=0),void 0===s&&(s=0),this._textures[r]||(this._textures[r]=new e(t,{pixelFormat:6408,dataType:5121,width:this._size[r][0],height:this._size[r][1]},new Uint8Array(this._mosaicsData[r].buffer)));var a=this._textures[r];a.setSamplingMode(i),this._dirties[r]&&a.setData(new Uint8Array(this._mosaicsData[r].buffer)),t.bindTexture(a,s),this._dirties[r]=!1},t._copyBits=function(t,i,e,r,s,a,h,o,n,u,p){var _=r*i+e,l=o*a+h;if(p){l-=a;for(var g=-1;u>=g;g++,_=((g+u)%u+r)*i+e,l+=a)for(var f=-1;n>=f;f++)s[l+f]=t[_+(f+n)%n]}else for(var g=0;u>g;g++){for(var f=0;n>f;f++)s[l+f]=t[_+f];_+=i,l+=a}},t.prototype._copy=function(i,e,r,s,a,h){if(this._sprites&&"loaded"===this._sprites.loadStatus&&!(r>=this._mosaicsData.length)){var o=new Uint32Array(h?h.buffer:this._sprites.image.buffer),n=this._mosaicsData[r];n&&o||console.error("Source or target images are uninitialized!");var u=2,p=h?e.width:this._sprites.width;t._copyBits(o,p,e.x,e.y,n,s[0],i.x+u,i.y+u,e.width,e.height,a),this._dirties[r]=!0}},t.prototype._allocateImage=function(t,i){t+=2,i+=2;var e=Math.max(t,i);if(this._maxItemSize&&this._maxItemSize<e){var r=Math.pow(2,Math.ceil(a.log2(t))),o=Math.pow(2,Math.ceil(a.log2(i))),n=new s(0,0,t,i);return this._mosaicsData.push(new Uint32Array(r*o)),this._dirties.push(!0),this._size.push([r,o]),this._textures.push(void 0),[n,this._mosaicsData.length-1,[r,o]]}var u=t%4?4-t%4:4,p=i%4?4-i%4:4;1===u&&(u=5),1===p&&(p=5);var _=this._binPack.allocate(t+u,i+p);return _.width<=0?(this._dirties[this._currentPage]||(this._mosaicsData[this._currentPage]=null),this._currentPage=this._mosaicsData.length,this._mosaicsData.push(new Uint32Array(this._pageWidth*this._pageHeight)),this._dirties.push(!0),this._size.push([this._pageWidth,this._pageHeight]),this._textures.push(void 0),this._binPack=new h(this._pageWidth-4,this._pageHeight-4),this._allocateImage(t,i)):[_,this._currentPage,[this._pageWidth,this._pageHeight]]},t.prototype._clearRect=function(t,i,e,r){var s=this._mosaicsData[i];s||console.error("Source image is uninitialized!");var a=[0,0,0,0];u(r,a,0);for(var h=p(a[0],a[1],a[2],a[3]),o=e[0],n=t.y*o+t.x,_=t.width,l=t.height,g=0;l>g;g++){for(var f=0;_>f;f++)s[n+f]=h;n+=o}},t.prototype.dispose=function(){this._binPack=null,this._mosaicRects={};for(var t=0,i=this._textures;t<i.length;t++){var e=i[t];e&&e.dispose()}this._textures.length=0},t.prototype._extractGeometry=function(t){if(!t)return null;var i=t.symbolLayers;if(!i||1!==i.length)return null;var e=i[0];if(!e)return null;var s=e.markerGraphics;if(!s||1!==s.length)return null;var a=s[0];if(!a)return null;var h=a.geometry;if(!h||!h.rings)return null;for(var o=[],n=0,u=h.rings;n<u.length;n++){for(var p=u[n],_=[],l=0,g=p;l<g.length;l++){var f=g[l];_.push(new r.Point(f[0],f[1]))}o.push(_)}return o},t.prototype._getEnvelope=function(t){for(var i=1/0,e=-(1/0),r=1/0,a=-(1/0),h=0,o=t;h<o.length;h++)for(var n=o[h],u=0,p=n;u<p.length;u++){var _=p[u];_.x<i&&(i=_.x),_.x>e&&(e=_.x),_.y<r&&(r=_.y),_.y>a&&(a=_.y)}return new s(i,r,e-i,a-r)},t.prototype._buildSDF=function(t){var i=this._extractGeometry(t);if(!i)return null;var e=this._getEnvelope(i);if(e.width<=0||e.height<=0)return null;for(var r=4,s=16,a=128-2*(s+r)-2,h=Math.max(e.width,e.height),o=a/h,n=Math.round(e.width*o),u=Math.round(e.height*o),p=n+2*s,_=u+2*s,l=0,g=i;l<g.length;l++)for(var f=g[l],c=0,d=f;c<d.length;c++){var v=d[c];v.x-=e.x,v.y-=e.y,v.x*=o,v.y*=o,v.x+=s-.5,v.y+=s-.5}var y=this._dist_map(i,p,_,s);return this._sign_dist_map(i,p,_,s,y),[this._encodeDistMap(y),p,_,n,u,o]},t.prototype._dist_map=function(t,i,e,r){for(var s=i*e,a=new Float32Array(s),h=r*r+1,o=0;s>o;++o)a[o]=h;for(var n=0,u=t;n<u.length;n++)for(var p=u[n],_=p.length,o=1;_>o;++o){var l=p[o-1],g=p[o],f=void 0,c=void 0;l.x<g.x?(f=l.x,c=g.x):(f=g.x,c=l.x);var d=void 0,v=void 0;l.y<g.y?(d=l.y,v=g.y):(d=g.y,v=l.y);var y=Math.floor(f)-r,x=Math.floor(c)+r,m=Math.floor(d)-r,w=Math.floor(v)+r;0>y&&(y=0),x>i&&(x=i),0>m&&(m=0),w>e&&(w=e);for(var M=g.x-l.x,z=g.y-l.y,S=M*M+z*z,b=y;x>b;b++)for(var D=m;w>D;D++){var I=(b-l.x)*M+(D-l.y)*z,P=void 0,R=void 0;0>I?(P=l.x,R=l.y):I>S?(P=g.x,R=g.y):(I/=S,P=l.x+I*M,R=l.y+I*z);var H=(b-P)*(b-P)+(D-R)*(D-R),W=(e-D-1)*i+b;H<a[W]&&(a[W]=H)}}for(var o=0;s>o;++o)a[o]=Math.sqrt(a[o]);return a},t.prototype._sign_dist_map=function(t,i,e,r,s){for(var a=0,h=t;a<h.length;a++)for(var o=h[a],n=o.length,u=1;n>u;++u){var p=o[u-1],_=o[u],l=void 0,g=void 0;p.x<_.x?(l=p.x,g=_.x):(l=_.x,g=p.x);var f=void 0,c=void 0;p.y<_.y?(f=p.y,c=_.y):(f=_.y,c=p.y);var d=Math.floor(l),v=Math.floor(g)+1,y=Math.floor(f),x=Math.floor(c)+1;r>d&&(d=r),v>i-r&&(v=i-r),r>y&&(y=r),x>e-r&&(x=e-r);for(var m=y;x>m;++m)if(p.y>m!=_.y>m){for(var w=(e-m-1)*i,M=d;v>M;++M)M<(_.x-p.x)*(m-p.y)/(_.y-p.y)+p.x&&(s[w+M]=-s[w+M]);for(var M=r;d>M;++M)s[w+M]=-s[w+M]}}},t.prototype._encodeDistMap=function(t){for(var i=16,e=t.length,r=new Uint8Array(4*e),s=0;e>s;++s){var a=t[s]/i+.5;u(a,r,4*s)}return r},t}();return g});