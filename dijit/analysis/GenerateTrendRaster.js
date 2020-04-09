// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.32/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/json","dojo/_base/connect","dojo/has","dojo/dom-class","dojo/dom-style","dojo/string","dojo/dom-construct","dojo/query","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/CheckBox","dijit/form/Select","../../kernel","../../lang","./RasterAnalysisMixin","./utils","./AnalysisRegistry","./ItemTypes","dojo/i18n!../../nls/jsapi","dojo/i18n!./nls/GenerateTrendRaster","dojo/text!./templates/GenerateTrendRaster.html"],(function(e,t,i,n,s,a,r,o,l,u,h,d,c,m,y,p,L,_,f,g,v,b,T,N,A,j,I,D){var M=e([d,c,m,y,p,b],{declaredClass:"esri.dijit.analysis.GenerateTrendRaster",templateString:D,widgetsInTemplate:!0,inputLayers:null,inputLayer:null,dimension:null,dimensions:null,trendLineType:"LINEAR",frequency:1,variables:null,variableList:null,ignoreNoData:!0,toolName:"GenerateTrendRaster",helpFileName:"GenerateTrendRaster",toolNlsName:j.generateTrendRasterTool,rasterGPToolName:"GenerateTrendRaster",resultParameter:"outputMultidimensionalRaster",browseType:[A.IS],hasCustomCheck:!0,customCheckFailureMessage:j.customCheckFailureMessage.integerService,constructor:function(e,t){this._pbConnects=[],e.containerNode&&(this.container=e.containerNode),e.rerun&&(e.inputMultidimensionalRaster=e.inputLayer)},postMixInProperties:function(){this.inherited(arguments),t.mixin(this.i18n,I)},_getJobParameters:function(){return{inputMultidimensionalRaster:n.toJson(T.constructAnalysisInputLyrObj(this.get("inputLayer"))),dimension:this.get("dimension"),variables:this.get("variables"),trendLineType:this.get("trendLineType"),frequency:this.get("frequency"),ignoreNoData:this.get("ignoreNoData")}},_setDefaultInputs:function(){this.dimension&&this.dimensions&&this._dimensionSelect.set("value",this.dimension),this.variables&&this._variables.set("value",this.variables),this.trendLineType&&this._loadTrendLineType(!0),this.frequency&&this._frequencyValue.set("value",this.frequency),this._ignoreNoDataCheck.set("checked",this.ignoreNoData)},_resetUI:function(){this.inputLayer&&(this.outputLayerName=l.substitute(this.i18n.outputLayerName,{layername:this.inputLayer.name}),this._outputLayerInput.set("value",this.outputLayerName),this.inputLayer.getMultidimensionalInfo().then(t.hitch(this,(function(e){this.variableList=e.variables,this.set("variables",this.variableList)}))))},_loadTrendLineType:function(e){this._trendLineTypeSelect.removeOption(this._trendLineTypeSelect.getOptions());var t=e&&this.trendLineType;this._trendLineTypeSelect.addOption([{value:"LINEAR",label:this.i18n.linear,selected:"LINEAR"===t},{value:"HARMONIC",label:this.i18n.harmonic,selected:"HARMONIC"===t},{value:"POLYNOMIAL",label:this.i18n.polynomial,selected:"POLYNOMIAL"===t}])},_handleDimensionChange:function(e){if(this.dimension!==e&&(this.dimension=e,this.variableList)){var t=this.variableList.filter((function(t){return t.dimensions.some((function(t){return t.name===e}))}));this.set("variables",t)}},_handleTrendLineTypeChange:function(e){this._showDiv(this._frequencyLabelRow,"HARMONIC"===e),this._showDiv(this._polynomialOrderLabelRow,"POLYNOMIAL"===e),this._showDiv(this._frequencyValueRow,"HARMONIC"===e||"POLYNOMIAL"===e),"POLYNOMIAL"===e&&this.frequency<2&&this.set("frequency",2)},isMultidimensionalLayer:function(e){return e.hasMultidimensions},_showDiv:function(e,t){o.set(e,"display",t?"block":"none")},_setInputLayersAttr:function(e){this.inputLayers=i.filter(e,t.hitch(this,(function(e){return this.isMultidimensionalLayer(e)})))},isValidInputLayer:function(e){return this.isMultidimensionalLayer(e)},_getInputLayersAttr:function(){return this.inputLayers},_setDimensionAttr:function(e){this.dimension=e,this._loadAggregationDefinition(this.AggregationDefinition)},_getDimensionAttr:function(){return this._dimensionSelect&&this._dimensionSelect.get("value")&&(this.dimension=this._dimensionSelect.get("value")),this.dimension},_setDimensionsAttr:function(e){this.dimensions!==e&&this.inputLayer&&(this._dimensionSelect.removeOption(this._dimensionSelect.getOptions()),i.forEach(e,(function(e){this._dimensionSelect.addOption({value:e.name,label:e.name})}),this),this.dimension?this._dimensionSelect.set("value",this.dimension):(this.dimension=this._dimensionSelect.get("value"),this._dimensionSelect.get("value")))},_getDimensionsAttr:function(){return this.dimensions},_setVariablesAttr:function(e){var t=!1,n=" checked";this._variablesList.innerHTML="",i.forEach(e,(function(e){var s,a,r,o="",l=e.dimensions;l&&l.length>0&&(s=null,i.forEach(l,(function(e){s=e.name+"="+e.values.length+",",o+=s})),o=o.slice(0,-1),a=e.name+" ["+o+"] ("+e.description+")",r=u.toDom("<tr><td colspan='3'><label class='esriLeadingMargin1 esriSelectLabel'><input type='checkbox' data-dojo-type='dijit/form/CheckBox' value="+e.name+n+">"+a+"</label></td></tr>"),u.place(r,this._variablesList),n="",t||this.dimensions===l||(this.set("dimensions",l),t=!0))}),this),this._showDiv(this._variablesListLabel,this.variableList.length>0)},_getVariablesAttr:function(){var e=this._variablesList.querySelectorAll("input:checked");if(e&&e.length>0){var t=[];return e.forEach((function(e){t.push(e.value)})),t.join(",")}return""},_setTrendLineTypeAttr:function(e){this.trendLineType=e},_getTrendLineTypeAttr:function(){return this._trendLineTypeSelect&&this._trendLineTypeSelect.get("value")&&(this.trendLineType=this._trendLineTypeSelect.get("value")),this.trendLineType},_setFrequencyAttr:function(e){this.frequency=e,this._frequencyValue.set("value",e)},_getFrequencyAttr:function(){return"LINEAR"===this.trendLineType?null:(this._frequencyValue&&this._frequencyValue.get("value")&&(this.frequency=this._frequencyValue.get("value")),this.frequency)},_setIgnoreNoDataAttr:function(e){this.ignoreNoData=e},_getIgnoreNoDataAttr:function(){return this._ignoreNoDataCheck&&(this.ignoreNoData=this._ignoreNoDataCheck.get("checked")),this.ignoreNoData}});return a("extend-esri")&&t.setObject("dijit.analysis.GenerateTrendRaster",M,g),M}));