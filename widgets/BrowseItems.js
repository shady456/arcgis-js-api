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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/window","dojo/_base/event","dojo/dom-class","dojo/dom-style","dojo/dom-attr","dojo/string","dojo/on","dojo/aspect","dojo/dom","dojo/dom-construct","dojo/mouse","dojo/topic","dojo/query","dojo/parser","dijit/registry","dijit/TooltipDialog","dijit/popup","dojo/promise/all","dojo/Deferred","dgrid/Grid","dgrid/extensions/Pagination","dgrid/extensions/DijitRegistry","dgrid/OnDemandGrid","dgrid/Selection","dgrid/Selector","dgrid/Keyboard","dgrid/util/touch","dstore/Memory","dstore/QueryResults","dstore/Trackable","dstore/legacy/StoreAdapter","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","../portal/Portal","../portal/PortalItem","../portal/PortalQueryResult","../portal/PortalQueryParams","../core/Evented","../core/PluginTarget","./BrowseItems/_AppTemplateFiltersMixin","../core/lang","../config","../request","../geometry/support/webMercatorUtils","../tasks/GeometryService","../geometry/SpatialReference","dojo/i18n!./BrowseItems/nls/BrowseItems","dojo/NodeList-dom"],function(t,e,i,s,n,r,o,h,a,l,d,c,u,g,p,m,f,_,y,v,b,w,x,T,q,P,I,j,k,N,D,A,C,L,S,E,O,M,$,R,U,B,Q,F,H,G,W,K,z,J,V){var X=t([D,C],{idProperty:"id",constructor:function(e){t.safeMixin(this,e)},get:function(t,i){return this.portal.queryItems(new U({query:"id:"+t})).then(function(t){return new $(e.mixin(t,{portal:this.portal}))})},getIdentity:function(t){return t[this.idProperty]},fetchRange:function(t){var e=t.start,i=t.end,s=this.fetch();return new A(s.then(function(t){return t.slice(e,i)}),{totalLength:s.then(function(t){return t.length})})},fetch:function(){var t,i,s,n=new w;if(this.query&&this.queryOptions||n.reject("query parameters missing for ItemStore"),t=e.isObject(this.query)?this.query:{query:m},i=this.queryOptions){if(t=e.mixin(t,{num:i.count,start:(i.start||0)+1}),i.sort&&i.sort.length){var r=i.sort[0];t=e.mixin(t,{sortField:"created"===r.attribute?"uploaded":r.attribute,sortOrder:r.descending?"desc":"asc"})}i.useExtent&&i.extent&&(t.extent=i.extent)}return s=new U(t),this.portal.queryItems(s).then(function(t){n.resolve(t.results)}),new A(n)}}),Y={base:"esri-browseitems",button:"esri-button",close:"esri-button esri-close",loader:"esri-loaderthrob",templatePanel:"template-info-panel"},Z=t([S,E,O,Q],{templateString:'<div><div class="top-bar"><div  class="instructions"><span class="messageLeft hide" data-dojo-attach-point="messageNodeLeft"></span><span class="messageRight hide" data-dojo-attach-point="messageNodeRight"></span><a tabIndex="-1" data-dojo-attach-point="helpLink" class="esriHelpIcon hide" title="${i18n.learnMoreConfigurableApps}" href="#" target="_blank"></a></div><div data-dojo-attach-point="_searchBox" class="searchBar"><input tabIndex="1" placeholder="${i18n.searchTitle}" class="esriSearchBox dijitTextBox" type="search"></div></div><div class="gallery"><div class="gallery-left  quiet-scroll"><ul class="filters"></ul></div><div class="templates gallery-right"><p id="${id}_filterTitle" class="filter-title hide" data-dojo-attach-point="filterDescription"></p><div id="${id}_grid"class="dgrid-autoheight quiet-scroll"></div></div><div  class="${_css.loader}"></div><div  data-dojo-attach-point="infoPanel" class="${_css.templatePanel}"></div></div></div>',galleryTemplate:"<div style='opacity:1;' class='grid-item gallery-view'>${item:_formatThumbnail}${item:_formatItemTitle}"+'<p class="template-overlay" style="display:none;">${i18n.selectDetails}</p></div>',infoPanelTemplate:'<div><div class="template-info-showing"><div class="thumbnail"><img src="${item:_formatInfoPanelImage}"></div><h4>${item.title}</h4><div class="template-info"><p class="quiet-scroll">${item.snippet}</p></div></div><div class="panel-actions"><button class="${_css.button}" id="on-next">${i18n.configure}</button><button class="${_css.close}" id="close-panel">${i18n.close}</button></div><div>',showInfoPanel:!0,i18n:V,baseClass:Y.base,_css:Y,postMixInProperties:function(){this.inherited(arguments)},postCreate:function(){this.inherited(arguments),this.self?(this._portal=new M({url:this.portalUrl,self:this.self}),this._init(),this._portal.on("load",e.hitch(this,this._fetchData))):(this._portal=new M({url:this.portalUrl,authMode:"immediate"}),this._portal.load().then(e.hitch(this,function(t){this._user=this._portal.user,this._init(),this._fetchData()})))},_init:function(){this._canSearchPublic=this.self?this.self.canSearchPublic:this._portal.canSearchPublic,this.query=e.mixin(this.query||{},{get:function(t){return this[t]&&this[t].length?"("+this[t].join(" OR ")+") ":""},toString:function(){return{query:this.get("groups")+this.get("tags")+this.get("persistentTypekeywords")+this.get("typekeywords")+this.get("types")+this.get("custom")+(this.query||"")+(this.search||"")+' -type:"Attachment"'}}}),this.self?this.self.canSearchPublic=!0:this._portal.canSearchPublic=!0,this.galleryTemplate=this.plugin&&this.plugin.galleryTemplate||this.galleryTemplate,this.infoPanelTemplate=this.plugin&&this.plugin.infoPanelTemplate||this.infoPanelTemplate,this.helpLinkUrl=this.plugin&&this.plugin.helpLinkUrl||"",this.helpLinkUrl&&(h.set(this.helpLink,"href",this.helpLinkUrl),r.remove(this.helpLink,"hide")),m(".templates",this.domNode).addClass("fade"),m(".dgrid-footer",this.domNode).addClass("hide")},destroy:function(){this.inherited(arguments),this._grid&&this._grid.destroy(),this._img_connect&&(this._img_connect.remove(),this._img_connect_error.remove()),this._queryTimer&&clearTimeout(this._queryTimer),this._grid=this._portal=null},_setItemQueryAttr:function(t){this.itemQuery=t},_setPluginIdAttr:function(t){this.addPlugin(t)},_setMessageAttr:function(t){this.set("messageRight",t)},_setMessageRightAttr:function(t){h.set(this.messageNodeRight,"innerHTML",t),r.remove(this.messageNodeRight,"hide")},_setMessageLeftAttr:function(t){h.set(this.messageNodeLeft,"innerHTML",t),r.remove(this.messageNodeLeft,"hide")},_setDisabledAttr:function(t){var e=_.findWidgets(this.domNode).concat(_.findWidgets(this._content));i.forEach(e,function(e){e.set("disabled",t)}),r[t?"add":"remove"](this._interval.domNode,"dijitTextBoxDisabled")},_setSortAttr:function(t){this.sortAttribute=t},_setSortDescendingAttr:function(t){this.sortDescending=t},_getSelectionAttr:function(){var t=this._grid.selection;for(var e in t)if(t.hasOwnProperty(e))break;return e&&this._grid.row(e).data},_setGalleryTemplateAttr:function(t){H.isDefined(t)&&(this.galleryTemplate=t)},_setFormatThumbnailAttr:function(t){H.isDefined(t)&&"function"==typeof t&&(this._formatThumbnail=t)},_setFormatItemTitleAttr:function(t){H.isDefined(t)&&"function"==typeof t&&(this._formatItemTitle=t)},_setRowsPerPageAttr:function(t){this._set("rowsPerPage",t)},_setPagingLinksAttr:function(t){this._set("pagingLinks",t)},_getQueryAttr:function(){return this.query},_setQueryAttr:function(t){this._set("query",t),this._grid&&(this._grid.collection.query=t.toString(),this._grid.refresh())},_setExtentAttr:function(t){t&&this._set("extent",t)},_setUseExtentAttr:function(t){this._set("useExtent",t)},_setFetchTimeoutAttr:function(t){this._set("fetchTimeout",t)},_setShowInfoPanelAttr:function(t){this._set("showInfoPanel",t)},_setFilterTypeAttr:function(t){this._set("filterType",t)},_validate:function(){var t=this.get("selection");return!!t},_getPortalAttr:function(){return this._portal},reset:function(){if(m(".esriSearchBox",this._searchBox).forEach(function(t){h.set(t,"value","")}),this.query.search="",this.plugin.filters){var t=[],e=[];m("li.active",this.domNode).forEach(function(s){r.remove(s,"active");var n=s.childNodes[0].id,o=this.plugin.filters[n],h=i.map(o.tags,function(t){return'tags:"'+t+'"'},this),a=i.map(o.typekeywords,function(t){return'typekeywords:"'+t+'"'},this);t.push(h),e.push(a)},this),this.query.tags=i.filter(this.query.tags,function(e){return-1!==i.indexOf(t,e)}),this.query.typekeywords=i.filter(this.query.typekeywords,function(t){return-1!==i.indexOf(e,t)}),c.byId("all").click()}},_clearQueryTimeout:function(){clearTimeout(this._queryTimer),this._queryTimer=null},_clearClosePanelTimeout:function(){clearTimeout(this._panelClosing),this._panelClosing=null,i.forEach(this._panelClickHandles,"item.remove();"),u.empty(this.infoPanel)},_createGrid:function(){var s,d=t([x,T,I,q]),f=this.query,_=e.hitch(this,function(t){t.snippet=t.snippet||"";var e=u.create("div"),i=a.substitute(this.galleryTemplate,{item:t,i18n:this.i18n},null,this);return u.place(i,e),e}),y={sort:[{attribute:this.sortAttribute||"title",descending:this.sortDescending||!1}]};this.get("useExtent")&&(y.extent=this.get("extent"),y.useExtent=this.get("useExtent")),s=new X({portal:this._portal,query:f.toString(),queryOptions:y}),this._grid=new d({collection:s,selectionMode:"single",pagingLinks:this.get("pagingLinks")||2,rowsPerPage:this.get("itemsPerPage")||this.plugin&&this.plugin.rowsPerPage||6,loadingMessage:"Loading items...",showLoadingMessage:!1,renderRow:_,noDataMessage:this.i18n.noItemsToDisplay},this.id+"_grid"),this._grid.startup(),this.own(l(this.domNode,"click",e.hitch(this,function(t){c.byId("close-panel")&&c.byId("close-panel").click()})),this._grid.on(l.selector(".dgrid-content .dgrid-row",g.enter),e.hitch(this,function(t){r.contains(this.domNode,"showing")===!1&&this.showInfoPanel&&this._showOverlay(!0,t)})),this._grid.on(l.selector(".dgrid-content .dgrid-row",g.leave),e.hitch(this,function(t){this._showOverlay(!1,t)})),this._grid.on(".dgrid-row:click",e.hitch(this,function(t){var s,l;r.contains(this.domNode,"showing")===!1&&this.showInfoPanel&&(t.preventDefault(),n.stop(t),this._clearClosePanelTimeout(),l=this.get("selection"),this._showOverlay(!1,t),this.showInfoPanel&&this.infoPanelTemplate?u.place(a.substitute(this.infoPanelTemplate,{item:l,i18n:this.i18n,_css:this._css},function(t){return H.isDefined(t)?t:""},this),this.infoPanel):o.set(this.infoPanel,"display","none"),r.add(this.domNode,"showing"),this._panelClickHandles=[m(".template-info-showing .thumbnail img",this.domNode).on("error",e.hitch(this,function(t){h.set(t.target,"src",l.thumbnailUrl)})),m(".panel-actions ."+this._css.button).on("click",e.hitch(this,function(t){t.preventDefault(),n.stop(t),"close-panel"===t.target.id?(r.remove(this.domNode,"showing"),this._panelClosing=setTimeout(e.hitch(this,function(){i.forEach(s,"item.remove();")},250))):p.publish("/esri/browseitems/close",t.target.id,this.get("selection"))})),m("."+this._css.templatePanel).on("click",e.hitch(this,function(t){t.preventDefault(),n.stop(t)}))])})),this._grid.on("dgrid-refresh-complete",e.hitch(this,function(t){m(".templates",this.domNode).removeClass("fade"),m("."+this._css.loader,this.domNode).addClass("hide"),m(".dgrid-footer",this.domNode)[this._grid._total<=this._grid.rowsPerPage?"addClass":"removeClass"]("hide")})),this._grid.on("refresh",e.hitch(this,function(){this._img_connect&&(this._img_connect.remove(),this._img_connect_error.remove(),this._img_connect=null,this._img_connect_error=null),this._img_connect=m(".grid-item-thumb",this._grid.domNode).on("load",e.hitch(this,function(t){var e=this._grid.row(t);e&&e.element&&m(".grid-item",e.element).addClass("fadeIn").style("opacity","1")})),this._img_connect_error=m(".grid-item-thumb",this._grid.domNode).on("error",e.hitch(this,function(t){h.set(t.target,"src",this._portal.staticImagesUrl+"/desktopapp.png")}))})),l(this._searchBox,"keyup",e.hitch(this,function(t){t.preventDefault(),this._clearQueryTimeout(),this._queryTimer=setTimeout(e.hitch(this,function(){this.query.search=h.get(t.target,"value"),this._fetchItems(this.query).then(e.hitch(this,function(){this._clearQueryTimeout()}))}),this.searchKeypressDelay||450)})),l(this._searchBox,"search",e.hitch(this,function(t){this._queryTimer||(t.preventDefault(),this.query.search=h.get(t.target,"value"),this._fetchItems(this.query))}))),this.useExtent&&this.own(this.watch("extent",e.hitch(this,function(t,e,i){this._grid.queryOptions.extent=this.get("extent"),this._grid.queryOptions.useExtent=this.get("useExtent"),this._grid.query.bbox=this._grid.queryOptions.useExtent?this._grid.queryOptions.extent:"",this._grid.refresh()})),this.watch("useExtent",e.hitch(this,function(t,e,i){this._grid.queryOptions.extent=this.get("extent"),this._grid.queryOptions.useExtent=i,this._grid.query.bbox=this._grid.queryOptions.useExtent?this._grid.queryOptions.extent:"",this._grid.refresh()}))),this.showInfoPanel||this.own(this._grid.on("dgrid-select,dgrid-deselect",e.hitch(this,function(t){var e={selection:this.get("selection")};this.emit("select-change",e)})))},_createFilters:function(){if(this.plugin&&this.plugin.filters){var t,s,n=this.plugin.filters,o=this.plugin.filterStrings,a=m(".filters",this.domNode)[0];for(t in n)u.create("li",{"class":"all"===t?"active":"",innerHTML:"<a id='"+t+"'  href='#'>"+o[t].title+"</a>"},a);this.own(l(a,"li a:click",e.hitch(this,function(t){t.preventDefault();var l=t.target;m(".active",a).removeClass("active"),r.add(l.parentNode,"active"),m(".templates",this.domNode).addClass("fade"),setTimeout(e.hitch(this,function(){r["all"===l.id?"add":"remove"](this.filterDescription,"hide"),h.set(this.filterDescription,"innerHTML",o[l.id].description||"")}),225);var d=e.mixin({},n[l.id]||{});this.query.tags=i.map(d.tags||[],function(t){return'tags:"'+t+'"'}),this.query.typekeywords=(s||[]).concat(i.map(d.typekeywords||[],function(t){return'typekeywords:"'+t+'"'})),this._fetchItems(this.query)}))),r.add(this.domNode,"filters")}else r.add(this.domNode,"nofilters"+(this.plugin&&this.plugin.extraClasses?" "+this.plugin.extraClasses.join(" "):""))},_showOverlay:function(t,e){var i=this._grid.row(e);i&&m(".template-overlay",i.element).style("display",t?"":"none")},_fetchData:function(){return this.plugin&&this.plugin.fetchData?this.plugin.fetchData():this._fetchItems(this.itemQuery)},_fetchItems:function(t,i){var s={sort:[{attribute:this.sortAttribute||"title",descending:this.sortDescending||!1}]},n=new w;return this.get("useExtent")&&(s.extent=this.get("extent"),s.useExtent=this.get("useExtent")),m(".templates",this.domNode).addClass("fade"),m(".dgrid-footer",this.domNode).addClass("hide"),m("."+this._css.loader,this.domNode).removeClass("hide"),setTimeout(e.hitch(this,function(){this.query=e.mixin(this.query,t),this._grid?(this._grid.collection.query=this.query.toString(),this._grid.collection.queryOptions=s,this._grid.refresh()):(this._createFilters(),this._createGrid()),n.resolve(this._grid)}),60),n},_formatThumbnail:function(t){var e=t.thumbnailUrl||this._portal.staticImagesUrl+"/desktopapp.png";return"<img class='grid-item-thumb' width='187px' height='125px' alt='' src='"+e+"'>"},_formatInfoPanelImage:function(t){var e=t.screenshots&&t.screenshots.length?t.screenshots[0]:null;return e?t.itemUrl+"/info/"+e:t.thumbnailUrl},_formatItemTitle:function(t){return"<h5>"+(t.title||t.name||"<No Title>")+"</h5>"},clear:function(){this._grid.clearSelection()}});return Z});