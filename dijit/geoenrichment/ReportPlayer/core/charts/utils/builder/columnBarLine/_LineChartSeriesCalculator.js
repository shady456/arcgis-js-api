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
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.

define(["dojo/_base/lang","../../ThemeCalculator","../../ChartTypes","../../ChartLineStyles","../../ChartLineMarkers","../../AxisUtil","../utils/ChartDataUtil","../utils/TooltipInfoBuilder","../ChartPlots","esri/dijit/geoenrichment/utils/ColorUtil","./_AxisBuilder","./_PointLabelUtil"],function(e,a,i,t,s,r,n,l,o,u,m,c){var p={calcLineStyle:function(e,r,n,l){var o=l.comparisonInfo,m=l.themeSettings,c=l.visualProperties,p=a.calcColorForPoint({point:null,seriesItem:e,pointIndex:0,seriesIndex:r,numSeries:n.length,chartType:i.LINE,themeSettings:m,isComparisonSeries:e.isComparisonSeries,comparisonInfo:o,isMultiFeature:l.isMultiFeatureChart}),S=c.lineThickness||1,h=c.fillLineArea?c.lineAreaOpacity:1,d=t.SOLID,V=void 0;if(e.isComparisonSeries&&o&&(o.lineThickness&&(S=o.lineThickness),o.lineStyle&&(d=o.lineStyle),V=o.lineMarker?s.getMarkerPath(o.lineMarker):a.getComparisonSymbol()),h<1&&p){var p=u.toColor(p);p.a=h}return{color:p,width:S,style:t.toGFXValue(d),marker:V}}};return{calcSeriesLine:function(a){function s(e){return v?2*e+1:e}var n=a.chart,u=a.chartType,S=a.visualProperties,h=a.seriesItems,d=1===h.length,V=a.seriesItemsWithComparison||h,v=a.isSecondaryPlot,I=a.reverseXY||u===i.VERTICAL_LINE,x=a.comparisonInfo,f=a.themeSettings,y=a.viewModel,g=[],C={minYValue:1/0,maxYValue:-1/0,stackedValues:S.isStacked?[]:null,crossSeriesStats:null},k=a.primaryPlotStat&&a.primaryPlotStat.pointIndexToTooltipsHash||{},M=V.map(function(e,i){return this._collectStatisticsForSeries(a,e,s(i),C)},this);if(C.crossSeriesStats=a.isMultiFeatureChart&&this._collectCrossSeriesStats(M),V.forEach(function(e,i){if(e.points.length){var r=p.calcLineStyle(e,s(i),V,a),m={name:e.label,data:[],isComparisonSeries:e.isComparisonSeries,params:{plot:v?o.SECONDARY:void 0,stroke:{color:r.color,width:r.width,style:r.style},fill:r.color,outline:!1}},h=M[i];e.points.forEach(function(s,o){function p(){return v&&a.oppositeDirections&&1===i?-1:1}function V(){return v&&!a.oppositeDirections&&2===a.primarySeries.length?0===i?-.15:.15:0}var f=h.values[o],g=f||0,M=o+1;c.updatePointIndexToLabelMap(n,M,s,y);var P=a.isMultiFeatureChart&&C.crossSeriesStats[o],T=l.getTooltipInfo({yValue:f,pointLabel:c.getPointLabel(s,y),seriesLabel:e.label,minInSeriesValue:h.minInSeries,maxInSeriesValue:h.maxInSeries,sumInSeriesValue:h.valuesSum,absSumInSeriesValue:h.absValuesSum,avgInSeriesValue:h.avgInSeries,minInAreasValue:P&&P.min,maxInAreasValue:P&&P.max,sumInAreasValue:P&&P.sum,absSumInAreasValue:P&&P.absSum,avgInAreasValue:P&&P.avg,visualProperties:S,chartType:u,isMultiFeature:a.isMultiFeatureChart,color:r.color,conditionalStyling:null,fieldInfo:s.fieldInfo,isThisAreaSpecific:x&&!a.isMultiFeatureChart?!e.isComparisonSeries:void 0,isThisAreaSingleSeries:d,decimals:s.value&&s.value.decimals}),b=k[M]=k[M]||[];b.push(T),T.getGroup=function(){return b};var A={originalValue:f,isUnavailableData:isNaN(f),unsortedIndex:o,seriesIndex:i,name:c.getPointLabel(s,y),_valuesSumsInSeries:h.absValuesSum,point:s,fill:"#FFFFFF",stroke:{color:r.color,width:1,style:t.toGFXValue(t.SOLID)},outline:!1,tooltip:T};y.isGraphicStyle?r.marker&&(A.marker=r.marker):A.marker=void 0,I?(A.x=g*p(),A.y=M+V(),A.valueProp="x"):(A.x=M+V(),A.y=g*p(),A.valueProp="y"),S.yAxis.showValuesAsWeightsInSeries&&(A[I?"x":"y"]/=h.absValuesSum/100),m.data.push(A)}),g.push(m)}},this),C.stackedValues&&(C.stackedValues.sort(function(e,a){return a-e}),C.minYValue=C.stackedValues[C.stackedValues.length-1],C.maxYValue=C.stackedValues[0]),v){if(a.primaryPlotStat){var P=r.getPrettifyYAxisParameters(Math.min(C.minYValue,a.primaryPlotStat.minYValue),Math.max(C.maxYValue,a.primaryPlotStat.maxYValue),{baseLineValue:S.yAxis.baseLineValue,renderColumnBarsInOppositeDirections:a.oppositeDirections,previewBelowZero:!y.dynamicReportInfo});e.mixin(n.axes.y.opt,{majorTickStep:P.majorTickStep,minorTickStep:P.minorTickStep,min:P.min,max:P.max})}if(1===a.primarySeries.length){var T=I?"y":"x",b=[];a.primarySeries[0].data.forEach(function(e){var a=g[0].data[e.unsortedIndex];a[T]=e.x,b.push(a)}),g[0].data=b}}else m.prettifyYAxis(C.minYValue,C.maxYValue,S.yAxis.baseLineValue,n,S,u,f,y);return g},_collectStatisticsForSeries:function(e,a,i,t){var s=e.chartType,r=e.viewModel,l=e.visualProperties,o=e.seriesItems,u=e.currentFeatureIndex,m=e.isMultiFeatureChart,c=e.comparisonFeatureIds,p=e.isSecondaryPlot,S=e.ge,h=[],d=0,V=0,v=1e6,I=-1e6,x=2===o.length&&e.oppositeDirections&&p?n.CHART_DATA_SMOOTH:null;return a.points.forEach(function(e,t){var o=n.getPointValue({point:e,index:t,seriesIndex:i,maxValue:!1,chartType:s,visualProperties:l,viewModel:r,currentFeatureIndex:m?i:u,chartData:x,isComparisonSeries:a.isComparisonSeries,comparisonFeatureId:c&&c[0],ge:S,allowNegativeValuesInPreview:!1});h[t]=o,o=o||0,d+=o,V+=Math.abs(o),v=Math.min(v,o),I=Math.max(I,o)}),a.points.forEach(function(e,a){var i=h[a],i=l.yAxis.showValuesAsWeightsInSeries?i/V*100:i;t.stackedValues?(t.stackedValues[a]=t.stackedValues[a]||0,t.stackedValues[a]+=i):(t.minYValue=Math.min(i,t.minYValue),t.maxYValue=Math.max(i,t.maxYValue))}),{values:h,valuesSum:d,absValuesSum:V,minInSeries:v,maxInSeries:I,avgInSeries:d/a.points.length}},_collectCrossSeriesStats:function(e){return e.length?e[0].values.map(function(a,i){var t=0,s=0,r=1e6,n=-1e6;return e.forEach(function(e){var a=e.values[i]||0;t+=a,s+=Math.abs(a),r=Math.min(r,a),n=Math.max(n,a)}),{sum:t,absSum:s,min:r,max:n,avg:t/e.length}}):[]}}});