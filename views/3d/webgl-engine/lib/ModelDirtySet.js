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

define(["require","exports","./ModelContentType","./ModelDirtyTypesTs","./Util"],function(e,t,r,o,i){var n=i.objectEmpty,d=i.assert,s=function(){function e(e){this._residentGeomRecords={},this._dirtyGeomRecords={},this._dirtyMaterials={},this._model=e}return Object.defineProperty(e.prototype,"residentLayerCount",{get:function(){return Object.keys(this._residentGeomRecords).length},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"residentObjectCount",{get:function(){var e=0;for(var t in this._residentGeomRecords)e+=Object.keys(this._residentGeomRecords[t]).length;return e},enumerable:!0,configurable:!0}),e.prototype._getResidentGeometryRecords=function(){return this._residentGeomRecords},e.prototype._getDirtyGeometryRecords=function(){return this._dirtyGeomRecords},e.prototype.getDirtyMaterials=function(){return n(this._dirtyMaterials)?null:this._dirtyMaterials},e.prototype.clearDirtyMaterials=function(){this._dirtyMaterials={}},e.prototype.hasDirtyGeometryRecords=function(){for(var e in this._dirtyGeomRecords)for(var t in this._dirtyGeomRecords[e]){var r=this._dirtyGeomRecords[e][t];if(r&&!n(r))return!0}return!1},e.prototype.handleUpdate=function(e,t,r){return d(this[t],"ModelDirtySet doesn't know how to process "+t),this[t](e,r)},e.prototype.shaderTransformationChanged=function(e){var t=this._residentGeomRecords[e.getId()];if(t)for(var o in t){var i=this._model.content[r.OBJECT][o];if(i&&i.hasVolativeTransformation()){var n=t[o];for(var d in n)for(var s=n[d],a=0,y=s[1];a<y.length;a++){var c=y[a];c.shaderTransformationChanged()}}}},e.prototype.getAddRemoveUpdateList=function(e){return this.getAddRemoveUpdateListFilteredByLayers(Object.keys(this._dirtyGeomRecords),e)},e.prototype.getAddRemoveUpdateListFilteredByLayers=function(e,t){for(var o=[],i=[],s=[],a=0;a<e.length;a++){var y=e[a];if(y in this._dirtyGeomRecords){for(var c in this._dirtyGeomRecords[y]){var p=this._dirtyGeomRecords[y][c];if(p){var h=this._createObjectRecordObjIfNonexistent(this._residentGeomRecords,y,c);for(var f in p){var m=p[f],l=m[0],u=m[1],v=m[2],R=2&u&&1&v;if(4&u||R){var g=h[f];g?i.push.apply(i,g[1]):4===u&&d(!1,"ModelDirtySet.getAddRemoveListFilteredByLayers: invalid remove"),t&&g&&delete h[f]}if(1&u||R){var _=[l,[]],G=this._model.get(r.OBJECT,c);this._model.getGeometryRenderGeometries(G,l,_[1]),o.push.apply(o,_[1]),t&&(h[f]=_)}if(2&u&&!R){var g=h[f],G=this._model.get(r.OBJECT,c);if(g){var b=g[1],j=b.length;if(16&v)for(var O=0;j>O;O++){var C=b[O];this._model.updateRenderGeometryTransformation(G,l,C)}for(var O=0;j>O;O++){var C=b[O];s.push({renderGeometry:C,updateType:v})}}else d(!1,"ModelDirtySet.getAddRemoveListFilteredByLayers: invalid update")}}n(h)&&delete this._residentGeomRecords[y][c]}}n(this._residentGeomRecords[y])&&delete this._residentGeomRecords[y]}t&&delete this._dirtyGeomRecords[y]}return[o,i,s]},e.prototype.getResidentRenderGeometries=function(){return this.getResidentRenderGeometriesFilteredByLayers(Object.keys(this._residentGeomRecords))},e.prototype.getResidentRenderGeometriesFilteredByLayers=function(e){for(var t=[],r=0;r<e.length;r++){var o=e[r];if(o in this._residentGeomRecords)for(var i in this._residentGeomRecords[o]){var n=this._residentGeomRecords[o][i];if(n)for(var d in n)t.push.apply(t,n[d][1])}}return t},e.prototype.componentVisibilityChanged=function(e,t,r){if(null!=t)this._componentPropertyChanged(e,t,r,2);else for(var o=0,i=e.getGeometryRecords();o<i.length;o++){var n=i[o];this._componentPropertyChanged(e,n,r,2)}},e.prototype.componentHighlightChanged=function(e,t,r){if(null!=t)this._componentPropertyChanged(e,t,r,32);else for(var o=0,i=e.getGeometryRecords();o<i.length;o++){var n=i[o];this._componentPropertyChanged(e,n,r,32)}},e.prototype.vertexAttrsUpdated=function(e,t,r){this._updateOrCreateDirtyRecord(e,t,r,2,0,0,2,5,4)},e.prototype.colorAttrsUpdated=function(e,t,r){this._updateOrCreateDirtyRecord(e,t,r,2,0,0,2,5,8)},e.prototype.matChanged=function(e){this._dirtyMaterials[e.getId()]=!0},e.prototype.layerAdded=function(e){for(var t=e.getObjects(),r=0;r<t.length;r++)this.layObjectAdded(e,t[r])},e.prototype.layerRemoved=function(e){for(var t=e.getObjects(),r=0;r<t.length;r++)this.layObjectRemoved(e,t[r])},e.prototype.layObjectAdded=function(e,t){for(var r=e.getId(),o=t.getGeometryRecords(),i=0;i<o.length;i++)this.objGeometryAdded(t,o[i],r)},e.prototype.layObjectRemoved=function(e,t){for(var r=e.getId(),o=t.getGeometryRecords(),i=0;i<o.length;i++)this.objGeometryRemoved(t,o[i],r)},e.prototype.layObjectReplaced=function(e,t){this.layObjectRemoved(e,t[0]),this.layObjectAdded(e,t[1])},e.prototype.objDirty=function(e,t){t=t||this._getParentLayerId(e);var r=e.getId(),o=this._createObjectRecordObjIfNonexistent(this._residentGeomRecords,t,r);for(var i in o)this._updateOrCreateDirtyRecord(e,o[i][0],t,2,0,2,0,5,1)},e.prototype.objTransformation=function(e,t){t=t||this._getParentLayerId(e);var r=e.getId(),o=this._createObjectRecordObjIfNonexistent(this._residentGeomRecords,t,r);for(var i in o)this._updateOrCreateDirtyRecord(e,o[i][0],t,2,0,0,2,5,16)},e.prototype.objGeometryAdded=function(e,t,r){this._updateOrCreateDirtyRecord(e,t,r,1,4,0,0,0)},e.prototype.objGeometryRemoved=function(e,t,r){this._updateOrCreateDirtyRecord(e,t,r,4,1,2,0,0)},e.prototype.objGeometryReplaced=function(e,t){this.objGeometryRemoved(e,t[0]),this.objGeometryAdded(e,t[1])},e.prototype.objGeometryTransformation=function(e,t){this.objGeometryReplaced(e,t)},e.prototype._componentPropertyChanged=function(e,t,r,o){this._updateOrCreateDirtyRecord(e,t,r,2,0,0,2,5,o)},e.prototype._updateOrCreateDirtyRecord=function(e,t,r,o,i,n,s,a,y){r=r||this._getParentLayerId(e);var c=e.getId(),p=t.getId(),h=this._createObjectRecordObjIfNonexistent(this._dirtyGeomRecords,r,c),f=h[p];if(f){var m=f[1];m&i?delete h[p]:m&n?(f[1]=o,f[2]=y):m&s?f[2]|=y:m&a||d(!1,"ModelDirtySet.objGeometryAdded: inconsistent state")}else h[p]=[t,o,y]},e.prototype._createObjectRecordObjIfNonexistent=function(e,t,r){return e[t]||(e[t]={}),e[t][r]||(e[t][r]={}),e[t][r]},e.prototype._getParentLayerId=function(e){return e.parentLayer.id},e.prototype.formatDebugInfo=function(e){var t=["ADD","UPD",void 0,"REM"];if(e)return"";var r="";for(var o in this._dirtyGeomRecords)for(var i in this._dirtyGeomRecords[o]){var n=this._dirtyGeomRecords[o][i];if(n){r.length>0&&(r+="\n"),r+=o+"."+i;var d=[];for(var s in n){var a=n[s][1];d[a]||(d[a]=[]),d[a].push(n[s][0].geometry.id)}for(var y=0;y<d.length;y++)if(d[y]){r+=" "+t[y-1]+": ";for(var c=0;c<d[y].length;c++)r+=d[y][c]+", "}}}return r},e}();return s});