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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../Graphic","../../../../core/promiseUtils","../../../../core/Error","./LayerAdapter","./FeatureLayerAdapter","../../../../tasks/support/FeatureSet","../../../../core/accessorSupport/decorators","../utils","../../../../layers/support/fieldUtils"],function(e,t,r,a,s,i,n,o,u,p,l,c,d){var h=function(e){function t(t){var r=e.call(this)||this;return r._layer=t.layer,r}return r(t,e),t.prototype._hasCachedStatistics=function(e){return this._layer.hasCachedStatistics(e)},t.prototype._generateFeatureSetForCachedHistogram=function(e,t,r,a){void 0===t&&(t=e.minimum),void 0===r&&(r=e.maximum);for(var i=[],n=0;a>n;n++)i[n]=0;for(var o=e.counts.length,u=e.minimum,l=e.maximum,n=0;o>n;n++){var c=(n+.5)/o,d=(1-c)*u+c*l,h=(d-t)/(r-t)*a;h>=0&&a>=h&&(i[h===a?a-1:Math.floor(h)]+=e.counts[n])}var y=[];i.forEach(function(e,t){var r=new s({attributes:{}});r.attributes.EXPR_1=t+1,r.attributes.countOFExpr=e,y.push(r)});var f=new p;return f.features=y,f},t.prototype._getCachedStatistics=function(e,t){var r=this._layer;return e.valueExpression||e.sqlExpression||e.sqlWhere||e.minValue||e.maxValue?i.reject(new n("scene-layer-adapter:not-supported","This Layer does not support calculating statistics when 'valueExpression', 'sqlExpression', 'sqlWhere', 'minValue' or 'maxValue' is specified")):r.queryCachedStatistics(t&&t.name).then(function(e){var t=e.stats,r=t.min,a=t.max,s=t.avg,i=t.stddev,n=t.sum,o=t.variance,u=t.count;return(0!==r||0!==a)&&(s=0===s?null:s,n=0===n?null:n,i=0===i?null:i,o=0===o?null:o,u=0===u?null:u),null==u&&null!=n&&null!=s&&(u=Math.round(n/s)),{avg:s,count:u,max:a,min:r,stddev:i,sum:n,variance:o}})},t.prototype._getCachedStatisticsForUniqueValues=function(e,t){var r=this,a=this._layer,o=t&&t.name;return e.valueExpression||e.sqlExpression||e.sqlWhere?i.reject(new n("scene-layer-adapter:not-supported","This Layer does not support calculating statistics when 'valueExpression', 'sqlExpression' or 'sqlWhere' is specified")):a.queryCachedStatistics(o).then(function(i){var n=i.stats,u=i.labels&&i.labels.labels,l={},h=[];if(n.mostFrequentValues){var y="countOF"+o;n.mostFrequentValues.forEach(function(e){var r=new s({attributes:{}});r.attributes[o]=d.isNumericField(t,a)||d.isDateField(t)?Number(e.value):e.value,r.attributes[y]=e.count,h.push(r)}),u&&u.forEach(function(e){l[e.value]=e.label})}var f=new p;return f.features=h,c.getUniqueValuesFromFeatureSet(f,r,e.field,l)})},t.prototype._getCachedStatisticsForHistogram=function(e,t){var r=this,a=this._layer;return e.valueExpression||e.sqlExpression||e.sqlWhere||e.normalizationType?i.reject(new n("scene-layer-adapter:not-supported","This Layer does not support calculating statistics when 'valueExpression' or 'sqlExpression' or 'sqlWhere' or 'normalizationType' is specified")):a.queryCachedStatistics(t&&t.name).then(function(t){var a=t.stats,s=e.minValue,i=e.maxValue,n=null!=s?s:a.min,o=null!=i?i:a.max,u=e.numBins||10,p=r._generateFeatureSetForCachedHistogram(a.histogram,n,o,u);return c.getHistogramFromFeatureSet(p,n,o,u)})},t.prototype.getField=function(e){return void 0===e&&(e=""),this._layer.getField(e)},t.prototype.getFieldUsageInfo=function(e){var t=this.getField(e);if(!t)return null;var r=this._layer.getFieldUsageInfo(e);return{supportsLabelingInfo:r.supportsLabelingInfo,supportsPopupTemplate:r.supportsPopupTemplate,supportsRenderer:r.supportsRenderer,supportsLayerQuery:r.supportsLayerQuery,supportsStatistics:r.supportsLayerQuery||this._hasCachedStatistics(t.name)}},t.prototype.getFieldDomain=function(e,t){return this._featureLayerAdapter?this._featureLayerAdapter.getFieldDomain(e,t):null},t.prototype.summaryStatistics=function(e){var t=this.getField(e.field);return this._featureLayerAdapter?this._featureLayerAdapter.summaryStatistics(e):this._hasCachedStatistics(t&&t.name)?this._getCachedStatistics(e,t):i.reject(new n("scene-layer-adapter:not-supported","Layer does not support statistics query"))},t.prototype.uniqueValues=function(e){var t=this.getField(e.field);return this._featureLayerAdapter?this._featureLayerAdapter.uniqueValues(e):this._hasCachedStatistics(t&&t.name)?this._getCachedStatisticsForUniqueValues(e,t):i.reject(new n("scene-layer-adapter:not-supported","Layer does not support statistics query"))},t.prototype.histogram=function(e){var t=this.getField(e.field);return this._featureLayerAdapter?this._featureLayerAdapter.histogram(e):this._hasCachedStatistics(t&&t.name)?this._getCachedStatisticsForHistogram(e,t):i.reject(new n("scene-layer-adapter:not-supported","Layer does not support statistics query"))},t.prototype.queryFeatureCount=function(e){return this._featureLayerAdapter?this._featureLayerAdapter.queryFeatureCount(e):i.reject(new n("scene-layer-adapter:not-supported","SceneLayer without associated FeatureLayer does not support count query"))},t.prototype.generateRenderer=function(e){return this._featureLayerAdapter?this._featureLayerAdapter.generateRenderer(e):i.reject(new n("scene-layer-adapter:not-supported","SceneLayer without associated FeatureLayer does not support generateRenderer operation"))},t.prototype.getAllFeatures=function(e){return this._featureLayerAdapter?this._featureLayerAdapter.getAllFeatures(e):i.reject(new n("scene-layer-adapter:not-supported","SceneLayer without associated FeatureLayer is not supported"))},t.prototype.load=function(){var e=this,t=this._layer,r=t.load().then(function(){var r=t.associatedLayer;if(e.geometryType=t.geometryType,r){e._featureLayerAdapter=new u({layer:r});var a=e._featureLayerAdapter.load().then(function(){e.objectIdField=e._featureLayerAdapter.objectIdField,e.supportsSQLExpression=e._featureLayerAdapter.supportsSQLExpression});return a}e.objectIdField=t.objectIdField,e.supportsSQLExpression=!1});return this.addResolvingPromise(r),this.when()},t=a([l.subclass()],t)}(l.declared(o));return h});