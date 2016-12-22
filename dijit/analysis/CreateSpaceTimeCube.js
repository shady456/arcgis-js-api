// COPYRIGHT © 2016 Esri
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
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/json","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","dijit/Dialog","../../kernel","../../lang","./AnalysisBase","./utils","./CreditEstimator","./_AnalysisOptions","dojo/i18n!../../nls/jsapi","dojo/text!./templates/CreateSpaceTimeCube.html"],function(e,t,i,s,a,n,o,r,l,h,c,d,u,m,y,p,g,_,S,f,v,w,b,L,A,C,I,x,R,T,j,F,N,P,k,U,G){var D=t([y,p,g,_,S,k,F],{declaredClass:"esri.dijit.analysis.CreateSpaceTimeCube",templateString:G,widgetsInTemplate:!0,pointLayer:null,summaryFields:null,outputLayerName:null,i18n:null,toolName:"CreateSpaceTimeCube",helpFileName:"CreateSpaceTimeCube",resultParameter:"outputCube",distanceDefaultUnits:"Miles",constructor:function(e){this._pbConnects=[],this._statsRows=[],e.containerNode&&(this.container=e.containerNode)},destroy:function(){this.inherited(arguments),s.forEach(this._pbConnects,a.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),i.mixin(this.i18n,U.aggregatePointsTool),i.mixin(this.i18n,U.createSpaceTimeCubeTool)},postCreate:function(){this.inherited(arguments),m.add(this._form.domNode,"esriSimpleForm"),this._outputLayerInput.set("validator",i.hitch(this,this.validateServiceName)),this._timeIntervalValue.set("isInRange",i.hitch(this._timeIntervalValue,N.isGreaterThanZero)),this._timeIntervalValue.set("rangeMessage",this.i18n.greaterThanZeroMsg),this._distanceIntervalValue.set("rangeMessage",this.i18n.greaterThanZeroMsg),this._distanceIntervalValue.set("isInRange",i.hitch(this._distanceIntervalValue,N.isGreaterThanZero)),this._buildUI()},startup:function(){},_onClose:function(e){this._aspectHandle&&(this._aspectHandle.remove(),this._aspectHandle=null),e&&(this._save(),this.emit("save",{save:!0})),this.emit("close",{save:e})},_buildJobParams:function(){var e,t={},i=N.constructAnalysisInputLyrObj(this.pointLayer,!0);return t.pointLayer=i,t.binSize=this._distanceIntervalValue.get("value"),t.binSizeUnit=this._distanceIntervalUnitSelect.get("value"),t.timeStepInterval=this._timeIntervalValue.get("value"),t.timeStepIntervalUnit=this._timeIntervalUnitsSelect.get("value"),t.timeStepAlignment=this._timeAlignmentSelect.get("value"),"ReferenceTime"===t.timeStepAlignment&&(t.timeStepReference=this.get("timeReference")),this.get("summaryFields").length>0&&(t.summaryFields=n.toJson(this.get("summaryFields"))),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.context=n.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(e={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(e.extent=this.map.extent._normalize(!0)),t.context=n.toJson(e)),this.showGeoAnalyticsParams&&(e={},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(e.extent=this.map.extent._normalize(!0)),t.context=n.toJson(e)),this.returnFeatureCollection||(t.OutputName=n.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),t},_handleSaveBtnClick:function(){if(this._form.validate()){this._saveBtn.set("disabled",!0);var e={};e.jobParams=this._buildJobParams(),console.log(e),this.execute(e)}},_handleShowCreditsClick:function(e){e.preventDefault(),this._form.validate()&&this.getCreditsEstimate(this.toolName,this._buildJobParams()).then(i.hitch(this,function(e){this._usageForm.set("content",e),this._usageDialog.show()}))},_handleBrowseItemsSelect:function(e){e&&e.selection&&N.addAnalysisReadyLayer({item:e.selection,layers:this.pointLayers,layersSelect:this._analysisSelect,browseDialog:e.dialog||this._browsedlg,widget:this}).always(i.hitch(this,function(){this._isAnalysisSelect&&this._handleAnalysisLayerChange(this._analysisSelect.get("value"))}))},_handleAttrSelectChange:function(e){var t,s,a,n,o;"0"!==e&&(t=this.get("statisticSelect"),o=this.get("fillSelect"),n=this.getOptions(e),n&&n.type&&(N.addStatisticsOptions({selectWidget:t,type:n.type,showGeoAnalyticsParams:!0}),N.addFillOptions({selectWidget:o,showGeoAnalyticsParams:!0})),"0"!==t.get("value")&&(t.get("isnewRowAdded")||(s=t.get("removeTd"),h.set(s,"display","block"),a=t.get("referenceWidget"),i.hitch(a,a._createStatsRow()),t.set("isnewRowAdded",!0))))},_handleStatsValueUpdate:function(e,t,s){var a,n,o;this.get("attributeSelect")&&(a=this.get("attributeSelect"),a.get("value")&&"0"!==a.get("value")&&s&&"0"!==s&&(this.get("isnewRowAdded")||(n=this.get("removeTd"),h.set(n,"display","block"),o=this.get("referenceWidget"),i.hitch(o,o._createStatsRow()),this.set("isnewRowAdded",!0))))},_handleTimeAlignmentChange:function(e){N.updateDisplay([this._timeRefLabelRow,this._timeRefRow],"ReferenceTime"===e,"table-row")},_save:function(){},_buildUI:function(){var e=!0;N.initHelpLinks(this.domNode,this.showHelp),this.get("showSelectAnalysisLayer")&&(!this.get("pointLayer")&&this.get("pointLayers")&&this.set("pointLayer",this.pointLayers[0]),N.populateAnalysisLayers(this,"pointLayer","pointLayers")),N.addReadyToUseLayerOption(this,[this._analysisSelect]),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),e=!1),this._timeIntervalUnitsSelect.addOption([{value:"Seconds",label:this.i18n.seconds},{value:"Minutes",label:this.i18n.minutes},{value:"Hours",label:this.i18n.hours},{value:"Days",label:this.i18n.days},{value:"Weeks",label:this.i18n.weeks},{value:"Months",label:this.i18n.months},{value:"Years",label:this.i18n.years}]),this.timeIntervalAlignment&&this._timeAlignmentSelect.set("value",this.timeIntervalAlignment),this._handleTimeAlignmentChange(this._timeAlignmentSelect.get("value")),s.forEach(this.summaryFields,function(e){this._currentAttrSelect.set("value",e.onStatisticField),i.hitch(this._currentAttrSelect,this._handleAttrSelectChange,e.onStatisticField)(),this._currentStatsSelect.set("value",e.statisticType),i.hitch(this._currentStatsSelect,this._handleStatsValueUpdate,"value","",e.statisticType)()},this),h.set(this._chooseFolderRow,"display",this.showSelectFolder===!0?"block":"none"),this.distanceDefaultUnits&&this._distanceIntervalUnitSelect.set("value",this.distanceDefaultUnits),this.showSelectFolder&&this.getFolderStore().then(i.hitch(this,function(e){this.folderStore=e,N.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})})),h.set(this._chooseExtentDiv,"display",this.showChooseExtent===!0?"inline-block":"none"),this.set("groupBySelect",this.groupByField),h.set(this._showCreditsLink,"display",this.showCredits===!0?"block":"none"),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),e=!1),this._updateAnalysisLayerUI(e),this._loadConnections()},_loadConnections:function(){this.on("start",i.hitch(this,"_onClose",!0)),this._connect(this._closeBtn,"onclick",i.hitch(this,"_onClose",!1))},_createStatsRow:function(){var t,s,n,o,r,l,h,c,u;return t=d.create("tr",null,this._afterStatsRow,"before"),n=d.create("td",{style:{width:"30%",maxWidth:"100px"}},t),s=d.create("td",{style:{width:"30%",maxWidth:"100px"}},t),c=d.create("td",{style:{width:"30%",maxWidth:"100px"}},t),o=new L({maxHeight:200,"class":"esriLeadingMargin05 mediumInput esriTrailingMargin025 attrSelect",style:{tableLayout:"fixed",overflowX:"hidden"}},d.create("select",null,n)),N.addAttributeOptions({selectWidget:o,layer:this.pointLayer,allowStringType:!1}),r=new L({"class":"mediumInput statsSelect",style:{tableLayout:"fixed",overflowX:"hidden"}},d.create("select",null,s)),u=new L({"class":"mediumInput attrSelect",style:{tableLayout:"fixed",overflowX:"hidden"}},d.create("select",null,c)),N.addStatisticsOptions({selectWidget:r,showGeoAnalyticsParams:!0}),N.addFillOptions({selectWidget:u,showGeoAnalyticsParams:!0}),r.set("disabled",!this.pointLayer||0===this.pointLayer.fields.length),u.set("disabled",!this.pointLayer||0===this.pointLayer.fields.length),o.set("statisticSelect",r),o.set("fillSelect",u),o.set("showGeoAnalyticsParams",this.showGeoAnalyticsParams),a.connect(o,"onChange",this._handleAttrSelectChange),h=d.create("td",{"class":"shortTextInput removeTd",style:{display:"none",maxWidth:"12px"}},t),l=d.create("a",{title:this.i18n.removeAttrStats,"class":"closeIcon statsRemove",innerHTML:"<img src='"+e.toUrl("./images/close.gif")+"' border='0''/>"},h),a.connect(l,"onclick",i.hitch(this,this._removeStatsRow,t)),this._statsRows.push(t),r.set("attributeSelect",o),r.set("removeTd",h),r.set("isnewRowAdded",!1),r.set("referenceWidget",this),r.watch("value",this._handleStatsValueUpdate),this._currentStatsSelect=r,this._currentAttrSelect=o,!0},_removeStatsRow:function(e){s.forEach(f.findWidgets(e),function(e){e.destroyRecursive()}),d.destroy(e)},_removeStatsRows:function(){s.forEach(this._statsRows,this._removeStatsRow,this),this._statsRows=[]},_handleAnalysisLayerChange:function(e){var t;"browse"===e?(this._analysisquery||(this._analysisquery=this._browsedlg.browseItems.get("query")),this._browsedlg.browseItems.set("query",this._analysisquery+' AND tags:"point"'),this._isAnalysisSelect=!0,this._browsedlg.show()):"browselayers"===e?(this.showGeoAnalyticsParams&&(t=this._browseLyrsdlg.browseItems.get("query"),t.types.push('type:"Big Data File Share"'),this._browseLyrsdlg.browseItems.set("query",t)),this._browseLyrsdlg.browseItems.plugIn.geometryTypes=["esriGeometryPoint"],this._browseLyrsdlg.browseItems.plugIn.checkTimeFilter=!0,this._isAnalysisSelect=!0,this._browseLyrsdlg.show()):this.pointLayer!==this.pointLayers[e]&&(this.pointLayer=this.pointLayers[e],this._updateAnalysisLayerUI(!0))},_updateAnalysisLayerUI:function(e){this._removeStatsRows(),this._createStatsRow(),this.pointLayer&&e&&(this.outputLayerName=l.substitute(this.i18n.outputLayerName,{pointLayername:this.pointLayer.name}),this._outputLayerInput.set("value",this.outputLayerName))},_handleRefTimeChange:function(e){this._timeRefDay.set("required",!this._timeRefDay.get("value"))},_setAnalysisGpServerAttr:function(e){e&&(this.analysisGpServer=e,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setPointLayerAttr:function(e){!j.isDefined(e)||"esriGeometryPoint"!==e.geometryType&&"esriGeometryMultipoint"!==e.geometryType&&"esriGeometryPolygon"!==e.geometryType||(this.pointLayer=e)},_getSummaryFieldsAttr:function(){var e,t,i=[];return u(".statsSelect",this.domNode).forEach(function(s){if(e=f.byNode(s),t=e.get("attributeSelect"),"0"!==t.get("value")&&"0"!==e.get("value")){var a={};a.statisticType=e.get("value"),a.onStatisticField=t.get("value"),i.push(a)}}),i},_setDisableRunAnalysisAttr:function(e){this._saveBtn.set("disabled",e)},validateServiceName:function(e){return N.validateServiceName(e,{textInput:this._outputLayerInput})},_setPointLayersAttr:function(e){j.isDefined(e)&&(e=s.filter(e,function(e){return-1!==s.indexOf(["esriGeometryPoint","esriGeometryMultipoint","esriGeometryPolygon"],e.geometryType)}),this.pointLayers=e)},_connect:function(e,t,i){this._pbConnects.push(a.connect(e,t,i))}});return o("extend-esri")&&i.setObject("dijit.analysis.CreateSpaceTimeCube",D,T),D});