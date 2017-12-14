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

define(["require","exports","dojo/_base/lang","../geometry/Geometry","../geometry/support/jsonUtils","./Dictionary","./languageUtils","./ImmutableArray","../geometry/Point"],function(t,e,i,r,s,a,n,o,u){var l=function(){function t(e,i,n){if(this.geometry=null,this.attributes=null,this._layer=null,this._datesfixed=!0,this.immutable=!0,e instanceof t)this.attributes=e.attributes,this.geometry=e.geometry,e._layer&&(this._layer=e._layer);else if(e&&"esri.Graphic"===e.declaredClass)this.geometry=e.geometry,void 0===e.attributes?this.attributes={}:null===e.attributes?this.attributes={}:this.attributes=e.attributes,e._sourceLayer?(this._layer=e._sourceLayer,this._datesfixed=!1):e._layer?(this._layer=e._layer,this._datesfixed=!1):e.layer&&(this._layer=e.layer,this._datesfixed=!1);else if(e instanceof a)this.attributes=e.field("attributes"),null!==this.attributes&&(this.attributes instanceof a?this.attributes=this.attributes.attributes:this.attributes=null),this.geometry=e.field("geometry"),null!==this.geometry&&(this.geometry instanceof a?this.geometry=t.parseGeometryFromDictionary(this.geometry):this.geometry instanceof r||(this.geometry=null));else if(i instanceof r||null===i)this.geometry=i,void 0===e?this.attributes={}:null===e?this.attributes={}:this.attributes=e,void 0!==n&&(this._layer=n);else if("string"==typeof e){var o=JSON.parse(e);null!==o.geometry&&void 0!==o.geometry&&(this.geometry=s.fromJSON(o.geometry)),void 0===o.attributes?this.attributes={}:null===o.attributes?this.attributes={}:this.attributes=o.attributes,void 0!==n&&(this._layer=n)}else void 0===e?this.attributes={}:null===e&&(this.attributes={}),this.geometry=null,void 0!==n&&(this._layer=n)}return t.prototype.castToText=function(){var t="";for(var e in this.attributes){""!==t&&(t+=",");var i=this.attributes[e];null==i?t+=JSON.stringify(e)+":null":n.isBoolean(i)||n.isNumber(i)||n.isString(i)?t+=JSON.stringify(e)+":"+JSON.stringify(i):i instanceof r?t+=JSON.stringify(e)+":"+n.toStringExplicit(i):i instanceof o?t+=JSON.stringify(e)+":"+n.toStringExplicit(i):i instanceof Array?t+=JSON.stringify(e)+":"+n.toStringExplicit(i):i instanceof Date?t+=JSON.stringify(e)+":"+JSON.stringify(i):null!==i&&"object"==typeof i&&void 0!==i.castToText&&(t+=JSON.stringify(e)+":"+i.castToText())}return'{"geometry":'+(null===this.geometry?"null":n.toStringExplicit(this.geometry))+',"attributes":{'+t+"}}"},t.prototype._fixDates=function(){for(var t=[],e=0;e<this._layer.fields.length;e++){var i=this._layer.fields[e];("date"===i.type||"esriFieldTypeDate"===i.type)&&t.push(i.name)}t.length>0&&this._fixDateFields(t),this._datesfixed=!0},t.prototype._fixDateFields=function(t){this.attributes=i.mixin({},this.attributes);for(var e=0;e<t.length;e++){var r=this.attributes[t[e]];if(null===r);else if(void 0===r){for(var s in this.attributes)if(s.toLowerCase()===t[e]){r=this.attributes[s],null!==r&&(r instanceof Date||(this.attributes[s]=new Date(r)));break}}else r instanceof Date||(this.attributes[t[e]]=new Date(r))}},t.prototype.field=function(t){this._datesfixed===!1&&this._fixDates();var e=t.toLowerCase(),i=this.attributes[t];if(void 0!==i)return i;for(var r in this.attributes)if(r.toLowerCase()===e)return this.attributes[r];if(this._hasFieldDefinition(e))return null;throw new Error("Field not Found")},t.prototype._hasFieldDefinition=function(t){if(null===this._layer)return!1;for(var e=0;e<this._layer.fields.length;e++){var i=this._layer.fields[e];if(i.name.toLowerCase()===t)return!0}return!1},t.prototype._field=function(t){this._datesfixed===!1&&this._fixDates();var e=t.toLowerCase(),i=this.attributes[t];if(void 0!==i)return i;for(var r in this.attributes)if(r.toLowerCase()===e)return this.attributes[r];return null},t.prototype.setField=function(t,e){if(this.immutable)throw new Error("Feature is Immutable");if(n.isSimpleType(e)===!1)throw new Error("Illegal Value Assignment to Feature");var i=t.toLowerCase(),r=this.attributes[t];if(void 0!==r)return void(this.attributes[t]=e);for(var s in this.attributes)if(s.toLowerCase()===i)return void(this.attributes[s]=e);this.attributes[t]=e},t.prototype.hasField=function(t){var e=t.toLowerCase(),i=this.attributes[t];if(void 0!==i)return!0;for(var r in this.attributes)if(r.toLowerCase()===e)return!0;return this._hasFieldDefinition(e)?!0:!1},t.prototype.keys=function(){var t=[],e={};for(var i in this.attributes)t.push(i),e[i.toLowerCase()]=1;if(null!==this._layer)for(var r=0;r<this._layer.fields.length;r++){var s=this._layer.fields[r];1!==e[s.name.toLowerCase()]&&t.push(s.name)}return t=t.sort()},t.fromFeature=function(e){return new t(e)},t.parseGeometryFromDictionary=function(e){var i=t.convertDictionaryToJson(e,!0);return void 0!==i.spatialreference&&(i.spatialReference=i.spatialreference,delete i.spatialreference),void 0!==i.rings&&(i.rings=this.fixPathArrays(i.rings,i.hasZ===!0,i.hasM===!0)),void 0!==i.paths&&(i.paths=this.fixPathArrays(i.paths,i.hasZ===!0,i.hasM===!0)),void 0!==i.points&&(i.points=this.fixPointArrays(i.points,i.hasZ===!0,i.hasM===!0)),s.fromJSON(i)},t.fixPathArrays=function(t,e,i){var r=[];if(t instanceof Array)for(var s=0;s<t.length;s++)r.push(this.fixPointArrays(t[s],e,i));else if(t instanceof o)for(var s=0;s<t.length();s++)r.push(this.fixPointArrays(t.get(s),e,i));return r},t.fixPointArrays=function(t,e,i){var r=[];if(t instanceof Array)for(var s=0;s<t.length;s++){var a=t[s];a instanceof u?e&&i?r.push([a.x,a.y,a.z,a.m]):e?r.push([a.x,a.y,a.z]):i?r.push([a.x,a.y,a.m]):r.push([a.x,a.y]):r.push(a)}else if(t instanceof o)for(var s=0;s<t.length();s++){var a=t.get(s);a instanceof u?e&&i?r.push([a.x,a.y,a.z,a.m]):e?r.push([a.x,a.y,a.z]):i?r.push([a.x,a.y,a.m]):r.push([a.x,a.y]):r.push(a)}return r},t.convertDictionaryToJson=function(e,i){void 0===i&&(i=!1);var r={};for(var s in e.attributes){var n=e.attributes[s];n instanceof a&&(n=t.convertDictionaryToJson(n)),i?r[s.toLowerCase()]=n:r[s]=n}return r},t.parseAttributesFromDictionary=function(t){var e={};for(var i in t.attributes){var r=t.attributes[i];if(!n.isSimpleType(r))throw new Error("Illegal Argument");e[i]=r}return e},t.fromJson=function(e){var i=null;null!==e.geometry&&void 0!==e.geometry&&(i=s.fromJSON(e.geometry));var r={};if(null!==e.attributes&&void 0!==e.attributes)for(var a in e.attributes){var o=e.attributes[a];if(!(n.isString(o)||n.isNumber(o)||n.isBoolean(o)||n.isDate(o)))throw new Error("Illegal Argument");r[a]=o}return new t(r,i)},t.prototype.domainValueLookup=function(t,e,i){if(null===this._layer)return null;if(!this._layer.fields)return null;var r=n.getDomain(t,this._layer,this,i);if(void 0===e)try{e=this.field(t)}catch(s){return null}return n.getDomainValue(r,e)},t.prototype.domainCodeLookup=function(t,e,i){if(null===this._layer)return null;if(!this._layer.fields)return null;var r=n.getDomain(t,this._layer,this,i);return n.getDomainCode(r,e)},t}();return l});