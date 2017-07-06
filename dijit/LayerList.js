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
// See http://js.arcgis.com/3.21/esri/copyright.txt for details.

define(["dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/_base/kernel","../kernel","dojo/uacss","dojo/Deferred","dojo/on","dojo/query","dojo/dom-class","dojo/dom-style","dojo/dom-construct","dojo/dom-attr","dojo/i18n!../nls/jsapi","dijit/a11yclick","dijit/_WidgetBase","dijit/_TemplatedMixin","../promiseList","../layerUtils","dojo/text!./LayerList/templates/LayerList.html"],function(e,s,t,i,a,r,l,n,o,c,h,d,y,b,u,v,f,g,L,_){var p=e.some(["ar","he"],function(e){return-1!==i.locale.indexOf(e)}),m=s([v,f],{templateString:_,defaults:{theme:"esriLayerList",map:null,layers:null,showSubLayers:!0,showOpacitySlider:!1,showLegend:!1,removeUnderscores:!0,visible:!0},constructor:function(e){var s=t.mixin({},this.defaults,e);this.set(s),this.css={container:"esriContainer",noLayers:"esriNoLayers",noLayersText:"esriNoLayersText",slider:"esriSlider",sliderLabels:"esriSliderLabels",legend:"esriLegend",tabContainer:"esriTabContainer",tabs:"esriTabs",tabMenu:"esriTabMenu",tabMenuItem:"esriTabMenuItem",tabMenuSelected:"esriTabMenuSelected",tabMenuVisible:"esriTabMenuVisible",tab:"esriTab",tabSelected:"esriTabSelected",toggleButton:"esriToggleButton",iconCollapse:"esri-icon-down",iconExpand:p?"esri-icon-left":"esri-icon-right",list:"esriList",listExpand:"esriListExpand",subListExpand:"esriSubListExpand",listVisible:"esriListVisible",subList:"esriSubList",hasSubList:"esriHasSubList",hasButton:"esriHasButton",hasTabContent:"esriHasTabContent",subListLayer:"esriSubListLayer",layer:"esriLayer",layerScaleInvisible:"esriScaleInvisible",title:"esriTitle",titleContainer:"esriTitleContainer",checkbox:"esriCheckbox",label:"esriLabel",button:"esriButton",content:"esriContent",clearFix:"esriClearFix",clear:"esriClear"}},postCreate:function(){this.inherited(arguments);var e=this;this.own(n(this._layersNode,n.selector("."+this.css.checkbox,"change"),function(){var s,t;s=y.get(this,"data-layer-index"),t=y.get(this,"data-sublayer-index"),e._toggleLayer(s,t),e._toggleState(s,t)})),this.own(n(this._layersNode,n.selector("."+this.css.tabMenuItem,u.press),function(){var s=y.get(this,"data-layer-index"),t=y.get(this,"data-tab-id");e._toggleTab(s,t)})),this.own(n(this._layersNode,n.selector("."+this.css.toggleButton,u.press),function(){var s=y.get(this,"data-layer-index");e._toggleExpand(s)}))},startup:function(){this.inherited(arguments),this._mapLoaded(this.map).then(t.hitch(this,this._init))},destroy:function(){this._removeEvents(),this.inherited(arguments)},refresh:function(){var e=this.layers;this._nodes=[];var s=[];if(e&&e.length)for(var i=0;i<e.length;i++)s.push(this._layerLoaded(i));return g(s).always(t.hitch(this,function(e){this._loadedLayers=e,this._removeEvents(),this._createLayerNodes(),this._setLayerEvents(),this.emit("refresh")}))},_mapLoaded:function(e){var s=new l;return e?e.loaded?s.resolve():n.once(e,"load",t.hitch(this,function(){s.resolve()})):s.resolve(),s.promise},_toggleExpand:function(e){e=parseInt(e,10);var s=this._nodes[e];if(s){var t=s.layer;c.toggle(t,this.css.listExpand);var i=c.contains(t,this.css.listExpand);y.set(s.toggle,"title",i?b.widgets.layerList.collapse:b.widgets.layerList.expand),c.toggle(s.toggle,this.css.iconCollapse,i),c.toggle(s.toggle,this.css.iconExpand,!i)}},_toggleTab:function(e,s){e=parseInt(e,10);var t=this._nodes[e];if(t){var i,a=t.tabs,r=t.tabMenu,l=o("[data-tab-id]",a),n=o("[data-tab-id]",r);for(i=0;i<l.length;i++){var h=y.get(l[i],"data-tab-id");c.toggle(l[i],this.css.tabSelected,s===h)}for(i=0;i<n.length;i++){var d=y.get(n[i],"data-tab-id");c.toggle(n[i],this.css.tabMenuSelected,s===d)}}},_layerLoaded:function(e){var s=this.layers,i=s[e],a=i.layer,r={layer:a,layerInfo:i,layerIndex:e},o=new l;if(a)if(a.loaded)o.resolve(r);else if(a.loadError)o.reject(a.loadError);else{var c,h;c=n.once(a,"load",t.hitch(this,function(){h.remove(),o.resolve(r)})),h=n.once(a,"error",t.hitch(this,function(e){c.remove(),o.reject(e)}))}else o.resolve(r);return o.promise},_checkboxStatus:function(e){return!!e.visibility},_WMSVisible:function(s,t){var i=[];return s&&s.layer&&(i=s.layer.visibleLayers),e.indexOf(i,t.name)>-1},_subCheckboxStatus:function(e,s){var t,i=e.layer.declaredClass;switch(i){case"esri.layers.KMLLayer":t=s.visible;break;case"esri.layers.WMSLayer":t=this._WMSVisible(e,s);break;default:t=s.defaultVisibility}return!!t},_getLayerTitle:function(e){var s="",t=e.layer,i=e.layerInfo;return i&&i.title?s=i.title:t&&t.arcgisProps&&t.arcgisProps.title?s=t.arcgisProps.title:t&&t.name?s=t.name:i&&i.id?s=i.id:t&&t.id&&(s=t.id),this.removeUnderscores?s.replace(/_/g," "):s},_showSublayers:function(e){return e.hasOwnProperty("showSubLayers")?e.showSubLayers:this.showSubLayers},_opacityChange:function(e){if(this.layer)this.layer.setOpacity(e);else if(this.layers)for(var s=0;s<this.layers.length;s++)this.layers[s].layerObject&&this.layers[s].layerObject.setOpacity(e)},_legend:function(e,s,i){var a=d.create("div",{role:"tabpanel","data-tab-id":"legend",className:this.css.tab+" "+this.css.legend},e);require(["esri/dijit/Legend"],t.hitch(this,function(e){var t=[s];if(s&&s.featureCollection&&s.featureCollection.layers){t=s.featureCollection.layers;for(var r=0;r<t.length;r++)t[r].layer=t[r].layerObject}var l=new e({map:this.map,layerInfos:t},d.create("div"));d.place(l.domNode,a),l.startup(),this._nodes[i].legend=l}))},_slider:function(e,s,i,a){var r=d.create("div",{role:"tabpanel","data-tab-id":"opacity",className:this.css.tab+" "+this.css.slider},e),l=d.create("div",{},r),n=d.create("div",{},r);require(["dijit/form/HorizontalSlider","dijit/form/HorizontalRuleLabels"],t.hitch(this,function(e,t){var r=new e({showButtons:!1,minimum:.1,maximum:1,layer:s,layers:i,discreteValues:.1,intermediateChanges:!0,value:a,onChange:this._opacityChange},l),o=new t({container:"bottomDecoration",count:0,className:this.css.sliderLabels,labels:["0","50","100"]},n);r.startup(),o.startup()}))},_createLayerNodes:function(){this._layersNode.innerHTML="",this._noLayersNode.innerHTML="",c.remove(this._container,this.css.noLayers);var e=this._loadedLayers;if(e&&e.length)for(var s=0;s<e.length;s++){var t=e[s];if(t){var i=t.layer,a=t.layerIndex,r=t.layerInfo;if(r){if(r.featureCollection&&!r.hasOwnProperty("visibility")){var l=r.featureCollection.layers[0];l&&l.layerObject&&(r.visibility=l.layerObject.visible)}i&&!r.hasOwnProperty("visibility")&&(r.visibility=r.layer.visible),i&&!r.hasOwnProperty("id")&&(r.id=r.layer.id);var n,h=d.create("li",{role:"menuitem",className:this.css.layer});d.place(h,this._layersNode,"first");var u,v=d.create("div",{className:this.css.title},h),f=d.create("div",{className:this.css.tabContainer},h),g=d.create("ul",{role:"tablist",className:this.css.tabMenu+" "+this.css.clearFix},f),L=d.create("div",{className:this.css.tabs},f),_=[];i&&(u=i.declaredClass);var p=this._checkboxStatus(r),m=d.create("div",{className:this.css.titleContainer},v),x=this.id+"_checkbox_"+a,S=d.create("input",{type:"checkbox",id:x,"data-layer-index":a,className:this.css.checkbox},m);y.set(S,"checked",p),i&&!i.visibleAtMapScale&&(c.add(h,this.css.layerScaleInvisible),y.set(h,"aria-disabled","true"),y.set(S,"disabled","disabled"));var I,C=d.create("div",{tabindex:0,role:"button","data-layer-index":a,title:b.widgets.layerList.expand,className:this.css.toggleButton+" "+this.css.iconExpand},m);r.button&&(I=r.button,c.add(h,this.css.hasButton),c.add(I,this.css.button),d.place(I,m));var w=this._getLayerTitle(t),N=d.create("label",{className:this.css.label,textContent:w},m);y.set(N,"for",x);var M,E=d.create("div",{className:this.css.clear},m);r.content&&(M=r.content,c.add(M,this.css.content),d.place(M,v));var V={checkbox:S,title:v,tabMenu:g,tabs:L,titleContainer:m,label:N,layer:h,toggle:C,clear:E,button:I,content:M,subNodes:_};if(this._nodes[a]=V,c.toggle(h,this.css.listVisible,p),i){n=i.layerInfos,"esri.layers.KMLLayer"===u&&(n=i.folders);var k=this._showSublayers(r);if("esri.layers.ArcGISTiledMapServiceLayer"!==u&&n&&n.length){var T,j,O,A;if(k){d.create("li",{tabindex:0,"data-tab-id":"sublayers","data-layer-index":a,role:"tab",className:this.css.tabMenuItem,textContent:b.widgets.layerList.sublayers},g),c.add(h,this.css.hasSubList),c.toggle(h,this.css.subListExpand,p);var P,B=d.create("div",{className:this.css.tab,"data-tab-id":"sublayers",role:"tabpanel"},L),D=d.create("ul",{role:"group",className:this.css.subList},B),G=[];for(T=0;T<n.length;T++){j=n[T];var F;O=-1;var H=null;if("esri.layers.ArcGISDynamicMapServiceLayer"===u?(F=j.id,O=j.parentLayerId,A=n[O],j.subLayerIds||(j.defaultVisibility=i&&i.visibleLayers&&-1!==i.visibleLayers.indexOf(j.id)?!0:!1)):"esri.layers.KMLLayer"===u?(F=j.id,O=j.parentFolderId):"esri.layers.WMSLayer"===u&&(F=j.name,O=-1),-1!==O){var U=this._nodes[a].subNodes[O];if(G[O])H=G[O];else{var W=U.subLayer;H=d.create("ul",{role:"group",className:this.css.subList},W),c.add(W,this.css.hasSubList),c.toggle(W,[this.css.listVisible,this.css.subListExpand],K),G[O]=H}}var K=this._subCheckboxStatus(r,j);K&&!P&&(P=!0);var q=this.id+"_checkbox_sub_"+a+"_"+F,z=d.create("li",{role:"menuitem",className:this.css.subListLayer},H||D),R=d.create("div",{className:this.css.title},z),J=d.create("div",{className:this.css.titleContainer},R),Q=d.create("input",{type:"checkbox",id:q,"data-layer-index":a,"data-sublayer-index":F,className:this.css.checkbox},J);y.set(Q,"checked",K);var X=j.title||j.name||"",Y=d.create("label",{className:this.css.label,textContent:X},J);y.set(Y,"for",q);var Z=d.create("div",{className:this.css.clear},J),$={subList:D,subSubList:H,subLayer:z,subTitle:R,subTitleContainer:J,subCheckbox:Q,subLabel:Y,subClear:Z};_[F]=$}}else for(T=0;T<n.length;T++)j=n[T],O=-1,"esri.layers.ArcGISDynamicMapServiceLayer"===u&&(O=j.parentLayerId,A=n[O],j.subLayerIds||(j.defaultVisibility=i&&i.visibleLayers&&-1!==i.visibleLayers.indexOf(j.id)?!0:!1))}}if((r.hasOwnProperty("showLegend")?r.showLegend:this.showLegend)&&(d.create("li",{tabindex:0,role:"tab",className:this.css.tabMenuItem,"data-layer-index":a,"data-tab-id":"legend",textContent:b.widgets.layerList.legend},g),this._legend(L,r,a)),r.hasOwnProperty("showOpacitySlider")?r.showOpacitySlider:this.showOpacitySlider){var ee,se;!i&&r.featureCollection?(ee=r.featureCollection.layers,se=r.featureCollection.layers[0].opacity):se=i.opacity,d.create("li",{tabindex:0,"data-tab-id":"opacity",role:"tab",className:this.css.tabMenuItem,"data-layer-index":a,textContent:b.widgets.layerList.opacity},g),this._slider(L,i,ee,se)}var te=o("."+this.css.tab,L),ie=te.length;if(ie&&(c.add(h,[this.css.hasTabContent]),c.add(te[0],this.css.tabSelected)),ie>1){c.add(h,this.css.tabMenuVisible);var ae=o("li",g);ae.length&&c.add(ae[0],this.css.tabMenuSelected)}}}}else c.add(this._container,this.css.noLayers),y.set(this._noLayersNode,"textContent",b.widgets.layerList.noLayers)},_removeEvents:function(){if(this._layerEvents&&this._layerEvents.length)for(var e=0;e<this._layerEvents.length;e++)this._layerEvents[e].remove();this._layerEvents=[]},_emitToggle:function(e,s,t){this.emit("toggle",{layerIndex:e,subLayerIndex:s,visible:t})},_toggleVisible:function(e,s){var t=this._nodes[e].checkbox;c.toggle(this._nodes[e].layer,this.css.listVisible,s);var i=y.get(t,"checked");c.contains(this._nodes[e].layer,this.css.hasSubList)&&c.toggle(this._nodes[e].layer,this.css.subListExpand,i),i!==s&&(y.set(t,"checked",s),this._emitToggle(e,null,s))},_layerVisChangeEvent:function(e,s,i){var a;if(s){var r=e.layerInfo.featureCollection.layers;a=r[i].layer}else a=e.layer;var l=n(a,"visibility-change",t.hitch(this,function(t){var i=this.layers&&this.layers[e.layerIndex];i&&(i.visibility=t.visible),s?this._featureCollectionVisible(e.layerIndex,t.visible):this._toggleVisible(e.layerIndex,t.visible)}));if(this._layerEvents.push(l),!s){var o=n(a,"scale-visibility-change",t.hitch(this,function(s){var t=s.target.visibleAtMapScale,i=this._nodes[e.layerIndex].checkbox,a=this._nodes[e.layerIndex].layer;c.toggle(a,this.css.layerScaleInvisible,!t),t?(y.remove(a,"aria-disabled"),y.remove(i,"disabled")):(y.set(a,"aria-disabled","true"),y.set(i,"disabled","disabled"))}));if(this._layerEvents.push(o),"esri.layers.ArcGISDynamicMapServiceLayer"===a.declaredClass){var h=n(this.map,"zoom-end",t.hitch(this,function(){this._subLayerScale(e)}));this._layerEvents.push(h),this._subLayerScale(e)}}},_subLayerScale:function(s){var i=s.layer,a=i.createDynamicLayerInfosFromLayerInfos(),r=L._getLayersForScale(this.map.getScale(),a);e.forEach(a,t.hitch(this,function(t){if(!t.subLayerIds){var i=t.id,a=this._nodes[s.layerIndex].subNodes[i];if(a){var l=a.subLayer,n=a.subCheckbox,o=!1;-1===e.indexOf(r,i)&&(o=!0),c.toggle(l,this.css.layerScaleInvisible,o),o?(y.set(l,"aria-disabled","true"),y.set(n,"disabled","disabled")):(y.remove(l,"aria-disabled"),y.remove(n,"disabled"))}}}))},_layerEvent:function(e){var s=e.layerInfo;if(s.featureCollection&&s.featureCollection.layers&&s.featureCollection.layers.length){var t=s.featureCollection.layers;if(t&&t.length)for(var i=0;i<t.length;i++)this._layerVisChangeEvent(e,!0,i)}else this._layerVisChangeEvent(e)},_getVisibleLayers:function(s,t){var i,a=s.layerInfos,r=[-1];if("undefined"!=typeof t){var l=!a[t].defaultVisibility;a[t].defaultVisibility=l}for(i=0;i<a.length;i++){var n=a[i];if(n.defaultVisibility){r.push(n.id);var o=e.lastIndexOf(r,-1);-1!==o&&r.splice(o,1)}}var c=[];for(i=0;i<r.length;i++){var h=r[i],d=this._allIdsPresent(s,h,r);d&&c.push(h)}for(var y=[],b=0;b<c.length;b++){var u=this._getLayerInfo(s,c[b]);u&&null===u.subLayerIds&&y.push(c[b])}return y.length||(y=[-1]),y},_toggleState:function(e,s){var t,i;e=parseInt(e,10);var a=this._nodes[e];a.legend&&a.legend.refresh(),null!==s?(s=parseInt(s,10),t=a.subNodes[s].subLayer,i=a.subNodes[s].subCheckbox):(t=a.layer,i=a.checkbox);var r=y.get(i,"checked");c.contains(t,this.css.hasSubList)&&c.toggle(t,this.css.subListExpand,r),c.toggle(t,this.css.listVisible,r)},_toggleLayer:function(s,t){if(this.layers&&this.layers.length){var i;s=parseInt(s,10);var a,r=this.layers[s],l=r.layer,n=l&&l.layerInfos;l&&(a=l.declaredClass);var o,c,h=r.featureCollection;if(h)for(i=!r.visibility,r.visibility=i,c=0;c<h.layers.length;c++){var d=h.layers[c].layerObject;d.setVisibility(i)}else if(l)if(null!==t){if("esri.layers.ArcGISDynamicMapServiceLayer"===a)t=parseInt(t,10),o=this._getVisibleLayers(l,t),l.setVisibleLayers(o);else if("esri.layers.KMLLayer"===a){t=parseInt(t,10);var y=l.folders;for(c=0;c<y.length;c++){var b=y[c];if(b.id===t){l.setFolderVisibility(b,!b.visible);break}}}else if("esri.layers.WMSLayer"===a){o=l.visibleLayers;var u=e.indexOf(o,t);-1===u?o.push(t):o.splice(u,1),l.setVisibleLayers(o)}n&&(i=n[t].defaultVisibility)}else"esri.layers.ArcGISDynamicMapServiceLayer"===a&&(o=this._getVisibleLayers(l),l.setVisibleLayers(o)),i=!l.visible,r.visibility=i,l.setVisibility(i);else i=!r.visible,r.setVisibility(i);this._emitToggle(s,t,i)}},_featureCollectionVisible:function(s,t){var i,a=this.layers[s],r=a.visibleLayers,l=a.featureCollection.layers;i=r&&r.length?e.every(r,function(e){return l[e].layer.visible===t}):e.every(l,function(e){return e.layer.visible===t}),i&&this._toggleVisible(s,t)},_setLayerEvents:function(){var e=this._loadedLayers;if(e&&e.length)for(var s=0;s<e.length;s++){var t=e[s];t.layer&&this._layerEvent(t)}},_allIdsPresent:function(s,t,i){var a=this._walkUpLayerIds(s,t);return e.every(a,function(s){return e.indexOf(i,s)>-1})},_walkUpLayerIds:function(e,s){var t,i=this._getLayerInfo(e,s),a=[];if(i)for(;-1!==i.parentLayerId;)t=this._getLayerInfo(e,i.parentLayerId),t&&a.push(t.id),i=t;return a},_getLayerInfo:function(e,s){for(var t,i=0;i<e.layerInfos.length;i++){var a=e.layerInfos[i];if(a.id===s){t=a;break}}return t},_isSupportedLayerType:function(e){return e&&!e._basemapGalleryLayerType||e&&"basemap"!==e._basemapGalleryLayerType},_createLayerInfo:function(e){return{layer:e}},_updateAllMapLayers:function(){if(this.map&&(!this.layers||!this.layers.length)){var s=[];e.forEach(this.map.layerIds,function(e){var t=this.map.getLayer(e);this._isSupportedLayerType(t)&&s.push(this._createLayerInfo(t))},this),e.forEach(this.map.graphicsLayerIds,function(e){var t=this.map.getLayer(e);this._isSupportedLayerType(t)&&t._params&&t._params.drawMode&&s.push(this._createLayerInfo(t))},this),this._set("layers",s)}},_init:function(){this._visible(),this._updateAllMapLayers(),this.refresh().always(t.hitch(this,function(){this.set("loaded",!0),this.emit("load")}))},_visible:function(){this.visible?h.set(this.domNode,"display","block"):h.set(this.domNode,"display","none")},_setThemeAttr:function(e){this.domNode&&(c.remove(this.domNode,this.theme),c.add(this.domNode,e)),this._set("theme",e)},_setMapAttr:function(e){this._set("map",e),this._created&&this._mapLoaded(this.map).then(t.hitch(this,function(){this._updateAllMapLayers(),this.refresh()}))},_setLayersAttr:function(e){this._set("layers",e),this._created&&this.refresh()},_setRemoveUnderscoresAttr:function(e){this._set("removeUnderscores",e),this._created&&this.refresh()},_setShowSubLayersAttr:function(e){this._set("showSubLayers",e),this._created&&this.refresh()},_setShowOpacitySliderAttr:function(e){this._set("showOpacitySlider",e),this._created&&this.refresh()},_setShowLegendAttr:function(e){this._set("showLegend",e),this._created&&this.refresh()},_setVisibleAttr:function(e){this._set("visible",e),this._created&&this._visible()}});return r("extend-esri")&&t.setObject("dijit.LayerList",m,a),m});