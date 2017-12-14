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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/accessorSupport/decorators","../../core/Accessor","../../core/now","dojo/has","./keys","./recognizers","../../core/Logger","./handlers/LatestPointerType"],function(e,t,r,n,i,o,a,s,d,l,p,h){Object.defineProperty(t,"__esModule",{value:!0});var u=p.getLogger("esri.views.input.InputManager"),c=function(e){function t(t,r){var n=e.call(this)||this;return n._pointerCaptures=new Map,n._nameToGroup={},n._handlers=[],n._currentPropagation=null,n._sourceEvents=new Set,n._keyModifiers=new Set,n._activeKeyModifiers=new Set,n.primaryKey=d.primaryKey,n.latestPointerType="mouse",n._installRecognizers(),n}return r(t,e),t.prototype.normalizeCtorArgs=function(e,t){return this._browserEvents=e,this._browserEvents.onEventReceived=this._onEventReceived.bind(this),this._recognizers=t,this._recognizers||(this._recognizers=l.defaults.map(function(e){return new e})),{}},t.prototype.destroy=function(){for(var e=Object.keys(this._nameToGroup),t=0,r=e;t<r.length;t++){var n=r[t];this.uninstallHandlers(n)}},t.prototype.installHandlers=function(e,t){var r=this;if(this._nameToGroup[e])return void u.error("There is already an InputHandler group registered under the name `"+e+"`");if(0===t.length)return void u.error("Can't register a group of zero handlers");var n={name:e,handlers:t.map(function(e,t){return{handler:e,active:!0,removed:!1,priorityIndex:0,eventCallback:null,uninstallCallback:null}})};this._nameToGroup[e]=n;for(var i=function(e){var t=n.handlers[e];o._handlers.push(t),t.handler.onInstall({updateDependencies:function(){r.updateDependencies()},emit:function(e,n,i,o){r._emitInputEvent(t.priorityIndex,e,n,i,o)},setPointerCapture:function(e,i){r._setPointerCapture(n,t,e,i)},setEventCallback:function(e){t.eventCallback=e},setUninstallCallback:function(e){t.uninstallCallback=e}})},o=this,a=n.handlers.length-1;a>=0;a--)i(a);this.updateDependencies()},t.prototype.uninstallHandlers=function(e){var t=this._nameToGroup[e];return t?(t.handlers.forEach(function(e){e.removed=!0,e.uninstallCallback()}),delete this._nameToGroup[e],void(this._currentPropagation?this._currentPropagation.needsHandlerGarbageCollect=!0:this._garbageCollectRemovedHandlers())):void u.error("There is no InputHandler group registered under the name `"+e+"`")},t.prototype.hasHandlers=function(e){return void 0!==this._nameToGroup[e]},t.prototype.updateDependencies=function(){var e=new Set,t=new Set;this._handlersPriority=[];for(var r=this._handlers.length-1;r>=0;r--){var n=this._handlers[r];n.priorityIndex=r,this._handlersPriority.push(n)}this._handlersPriority=this._sortHandlersPriority(this._handlersPriority);for(var r=this._handlersPriority.length-1;r>=0;r--){var i=this._handlersPriority[r];i.priorityIndex=r;var o=i.handler.hasSideEffects;if(!o)for(var a=0,s=i.handler.outgoingEventTypes;a<s.length;a++){var l=s[a];if(e.has(l)){o=!0;break}}if(o)for(var p=0,h=i.handler.incomingEventMatches;p<h.length;p++){var u=h[p];e.add(u.eventType);for(var c=0,v=u.keyModifiers;c<v.length;c++){var f=v[c];d.isSystemModifier(f)||t.add(f)}}i.active=o}this._sourceEvents=e,this._keyModifiers=t,this._pointerCaptures.size>0&&this._sourceEvents.add("pointer-capture-lost"),this._keyModifiers.size>0&&(this._sourceEvents.add("key-down"),this._sourceEvents.add("key-up")),this._browserEvents&&(this._browserEvents.activeEvents=this._sourceEvents)},t.prototype._setLatestPointerType=function(e){this._set("latestPointerType",e)},t.prototype._onEventReceived=function(e,t){if("pointer-capture-lost"===e){var r=t;this._pointerCaptures["delete"](r["native"].pointerId)}this._updateKeyModifiers(e,t);var n=t["native"].timestamp;this._emitInputEventFromSource(e,t,n)},t.prototype._updateKeyModifiers=function(e,t){var r=this;if(t){var n=!1,i=function(){if(!n){var e=new Set;r._activeKeyModifiers.forEach(function(t){e.add(t)}),r._activeKeyModifiers=e,n=!0}},o=function(e,t){t&&!r._activeKeyModifiers.has(e)?(i(),r._activeKeyModifiers.add(e)):!t&&r._activeKeyModifiers.has(e)&&(i(),r._activeKeyModifiers["delete"](e))};if("key-down"===e||"key-up"===e){var a=t,s=a.key;this._keyModifiers.has(s)&&o(s,"key-down"===e)}var d=t["native"];o("Alt",!(!d||!d.altKey)),o("Ctrl",!(!d||!d.ctrlKey)),o("Shift",!(!d||!d.shiftKey)),o("Meta",!(!d||!d.metaKey)),o("Primary",this._activeKeyModifiers.has(this.primaryKey))}},t.prototype._installRecognizers=function(){var e=this;this._latestPointerTypeHandler=new h.LatestPointerType(function(t){return e._setLatestPointerType(t)}),this._recognizers.length>0&&this.installHandlers("default",this._recognizers),this.installHandlers("input-manager-logic",[this._latestPointerTypeHandler])},t.prototype.allowPointerCapture=function(e){return 2!==e.button?!0:!(s("mac")&&s("chrome"))},t.prototype._setPointerCapture=function(e,t,r,n){var i=e.name+"-"+t.priorityIndex,o=this._pointerCaptures.get(r.pointerId)||new Set;this._pointerCaptures.set(r.pointerId,o),n&&this.allowPointerCapture(r)?(o.add(i),1===o.size&&this._browserEvents&&this._browserEvents.setPointerCapture(r,!0)):!n&&o.has(i)&&(o["delete"](i),0===o.size&&(this._pointerCaptures["delete"](r.pointerId),this._browserEvents&&this._browserEvents.setPointerCapture(r,!1)))},t.prototype._garbageCollectRemovedHandlers=function(){this._handlers=this._handlers.filter(function(e){return!e.removed}),this.updateDependencies()},t.prototype._emitInputEventFromSource=function(e,t,r){this._emitInputEvent(0,e,t,r)},t.prototype._emitInputEvent=function(e,t,r,n,i){var o=void 0!==n?n:this._currentPropagation?this._currentPropagation.timestamp:a(),s=new v(t,r,o,i||this._activeKeyModifiers);return this._currentPropagation?void this._currentPropagation.addedEvents.push(s):void this._doNewPropagation(e,s)},t.prototype._doNewPropagation=function(e,t){this._currentPropagation={events:[t],addedEvents:[],currentHandler:this._handlersPriority[e],needsHandlerGarbageCollect:!1,timestamp:t.timestamp};for(var r=this._currentPropagation;r.currentHandler;){if(r.currentHandler.removed)r.needsHandlerGarbageCollect=!0;else{var n=r.events,i=[];r.addedEvents=[];for(var o=0;o<n.length;o++){var a=n[o];r.currentHandler.active&&r.currentHandler.eventCallback(a),a.shouldStopPropagation()||i.push(a)}r.events=i.concat(r.addedEvents)}r.currentHandler=this._handlersPriority[r.currentHandler.priorityIndex+1]}r.needsHandlerGarbageCollect&&this._garbageCollectRemovedHandlers(),this._currentPropagation=null},t.prototype._compareHandlerPriority=function(e,t){if(e.handler.hasSideEffects!==t.handler.hasSideEffects)return e.handler.hasSideEffects?1:-1;for(var r=0,n=e.handler.incomingEventMatches;r<n.length;r++)for(var i=n[r],o=function(e){if(i.eventType!==e.eventType)return"continue";var t=i.keyModifiers.filter(function(t){return-1!==e.keyModifiers.indexOf(t)}),r=t.length===i.keyModifiers.length,n=t.length===e.keyModifiers.length;return r!==n?{value:i.keyModifiers.length>e.keyModifiers.length?-1:1}:void 0},a=0,s=t.handler.incomingEventMatches;a<s.length;a++){var d=s[a],l=o(d);if("object"==typeof l)return l.value}return e.priorityIndex>t.priorityIndex?-1:1},t.prototype._sortHandlersPriority=function(e){for(var t=[],r=0,n=e;r<n.length;r++){for(var i=n[r],o=0;o<t.length&&this._compareHandlerPriority(i,t[o])>=0;)o++;t.splice(o,0,i)}return t},n([i.property({readOnly:!0})],t.prototype,"latestPointerType",void 0),t=n([i.subclass("esri.views.input.InputManager")],t)}(i.declared(o));t.InputManager=c;var v=function(){function e(e,t,r,n){this.type=e,this.data=t,this.timestamp=r,this.modifiers=n,this._stopPropagation=!1}return e.prototype.stopPropagation=function(){this._stopPropagation=!0},e.prototype.shouldStopPropagation=function(){return this._stopPropagation},e}()});