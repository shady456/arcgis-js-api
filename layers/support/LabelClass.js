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

define(["../../core/date","../../core/JSONSupport","../../core/lang","../../core/kebabDictionary","dojo/_base/lang","dojo/number","./types","../../support/arcadeUtils","../../symbols/support/jsonUtils","../../symbols/support/typeUtils"],function(e,r,n,t,l,i,a,s,o,c){function u(e){var r=e.match(L);return r&&r[1].trim()||null}function p(e){var r=s.createSyntaxTree(e),n=r&&r.body&&r.body[0]&&r.body[0].body&&r.body[0].body.body;if(!n||1!==n.length)return null;var t="ExpressionStatement"===n[0].type&&n[0].expression;if(!t||"MemberExpression"!==t.type)return null;var l=t.object;if(!l||"Identifier"!==l.type||"$feature"!==l.name)return null;var i=t.property;if(!i)return null;switch(i.type){case"Literal":return i.value;case"Identifier":return i.name}return null}function b(e){return e?"service"===e.origin?!1:!e.layer||!a.isOfType(e.layer,"map-image"):!0}var f="__begin__",v="__end__",m=new RegExp(f,"ig"),d=new RegExp(v,"ig"),x=new RegExp("^"+f,"i"),g=new RegExp(v+"$","i"),h='"',S=h+" + ",y=" + "+h,w=t({esriServerPointLabelPlacementAboveCenter:"above-center",esriServerPointLabelPlacementAboveLeft:"above-left",esriServerPointLabelPlacementAboveRight:"above-right",esriServerPointLabelPlacementBelowCenter:"below-center",esriServerPointLabelPlacementBelowLeft:"below-left",esriServerPointLabelPlacementBelowRight:"below-right",esriServerPointLabelPlacementCenterCenter:"center-center",esriServerPointLabelPlacementCenterLeft:"center-left",esriServerPointLabelPlacementCenterRight:"center-right",esriServerLinePlacementAboveAfter:"above-after",esriServerLinePlacementAboveAlong:"above-along",esriServerLinePlacementAboveBefore:"above-before",esriServerLinePlacementAboveStart:"above-start",esriServerLinePlacementAboveEnd:"above-end",esriServerLinePlacementBelowAfter:"below-after",esriServerLinePlacementBelowAlong:"below-along",esriServerLinePlacementBelowBefore:"below-before",esriServerLinePlacementBelowStart:"below-start",esriServerLinePlacementBelowEnd:"below-end",esriServerLinePlacementCenterAfter:"center-after",esriServerLinePlacementCenterAlong:"center-along",esriServerLinePlacementCenterBefore:"center-before",esriServerLinePlacementCenterStart:"center-start",esriServerLinePlacementCenterEnd:"center-end",esriServerPolygonPlacementAlwaysHorizontal:"always-horizontal"}),E=r.createSubclass({declaredClass:"esri.layers.support.LabelClass",properties:{name:{type:String,value:null,json:{write:!0}},labelExpression:{type:String,value:null,json:{read:function(e,r,n,t){var l=r.labelExpressionInfo;if(!l||!l.value&&!l.expression)return e},write:{allowNull:!0,writer:function(e,r,n,t){if(this.labelExpressionInfo&&b(t))if(null!=this.labelExpressionInfo.value)e=this._templateStringToSql(this.labelExpressionInfo.value);else if(null!=this.labelExpressionInfo.expression){var l=p(this.labelExpressionInfo.expression);l&&(e="["+l+"]")}null!=e&&(r[n]=e)}}}},labelExpressionInfo:{value:null,json:{read:function(e,r,n,t){return e&&e.value&&(e=l.mixin(l.clone(e),{expression:this._convertTemplatedStringToArcade(e.value)}),delete e.value),e},write:{target:{"labelExpressionInfo.expression":{type:String}},overridePolicy:function(e,r,n){return b(n)?{allowNull:!0}:{enabled:!1}},writer:function(e,r,t,i){if(null==e&&null!=this.labelExpression&&b(i))e={expression:this.getLabelExpressionArcade()};else{if(!e)return;e=n.fixJson(l.clone(e))}null!=e.value&&(e.expression=this._convertTemplatedStringToArcade(e.value)),e.expression&&(delete e.value,r[t]=e)}}}},labelPlacement:{type:String,value:null,json:{read:function(e,r){return w.fromJSON(e)},write:function(e,r){var n=w.toJSON(e);n&&(r.labelPlacement=n)}}},maxScale:{type:Number,value:0,json:{write:function(e,r){(e||this.minScale)&&(r.maxScale=e)}}},minScale:{type:Number,value:0,json:{write:function(e,r){(e||this.maxScale)&&(r.minScale=e)}}},requiredFields:{readOnly:!0,dependsOn:["labelExpression","labelExpressionInfo","where"],get:function(){var e=Object.create(null);return this._collectRequiredFields(e),Object.keys(e)}},symbol:{value:null,types:c.types,json:{origins:{"web-scene":{read:o.read,write:{target:{symbol:{types:c.types3D}},writer:o.writeTarget}}},read:o.read,write:o.writeTarget}},useCodedValues:{type:Boolean,value:null,json:{write:!0}},where:{type:String,value:null,json:{write:!0}}},getLabelExpression:function(){var e={expression:"",type:"none"};return this.labelExpressionInfo?this.labelExpressionInfo.value?(e.expression=this.labelExpressionInfo.value,e.type="conventional"):this.labelExpressionInfo.expression&&(e.expression=this.labelExpressionInfo.expression,e.type="arcade"):null!=this.labelExpression&&(e.expression=this._sqlToTemplateString(this.labelExpression),e.type="conventional"),e},getLabelExpressionArcade:function(){var e=this.getLabelExpression();if(!e)return null;switch(e.type){case"conventional":return this._convertTemplatedStringToArcade(e.expression);case"arcade":return e.expression}return null},getOptions:function(){var e={},r=this.labelExpressionInfo;if(r){var n=r.expression;n&&!r.value&&(e.hasArcadeExpression=!0,e.compiledArcadeFunc=s.createFunction(n))}return e},getLabelExpressionSingleField:function(){var e=this.getLabelExpression();if(!e)return null;switch(e.type){case"conventional":return u(e.expression);case"arcade":return p(e.expression)}return null},clone:function(){return new E({labelExpression:this.labelExpression,labelExpressionInfo:l.clone(this.labelExpressionInfo),labelPlacement:this.labelPlacement,maxScale:this.maxScale,minScale:this.minScale,name:this.name,symbol:this.symbol.clone(),where:this.where,useCodedValues:this.useCodedValues})},_collectRequiredFields:function(e){this._collectLabelExpressionRequiredFields(this.getLabelExpression(),e),this._collectWhereRequiredFields(this.where,e)},_sqlToTemplateString:function(e){return e.replace(new RegExp("\\[","g"),"{").replace(new RegExp("\\]","g"),"}")},_templateStringToSql:function(e){return e.replace(new RegExp("\\{","g"),"[").replace(new RegExp("\\}","g"),"]")},_collectWhereRequiredFields:function(e,r){if(null!=e){var n=e.split(" ");3===n.length&&(r[n[0]]=!0),7===n.length&&(r[n[0]]=!0,r[n[4]]=!0)}},_collectLabelExpressionRequiredFields:function(e,r){if("arcade"===e.type){var n=s.extractFieldNames(e.expression);n.forEach(function(e){r[e]=!0})}else{var t=e.expression.match(/{[^}]*}/g);t&&t.forEach(function(e){r[e.slice(1,-1)]=!0})}},_convertTemplatedStringToArcade:function(e){var r;return e?(r=l.replace(e,function(e,r){return f+'$feature["'+r+'"]'+v}),r=x.test(r)?r.replace(x,""):h+r,r=g.test(r)?r.replace(g,""):r+h,r=r.replace(m,S).replace(d,y)):r='""',r}});E.evaluateWhere=function(e,r){var n=function(e,r,n){switch(r){case"=":return e==n?!0:!1;case"<>":return e!=n?!0:!1;case">":return e>n?!0:!1;case">=":return e>=n?!0:!1;case"<":return n>e?!0:!1;case"<=":return n>=e?!0:!1}return!1};try{if(null==e)return!0;var t=e.split(" ");if(3===t.length)return n(r[t[0]],t[1],t[2]);if(7===t.length){var l=n(r[t[0]],t[1],t[2]),i=t[3],a=n(r[t[4]],t[5],t[6]);switch(i){case"AND":return l&&a;case"OR":return l||a}}return!1}catch(s){console.log("Error.: can't parse = "+e)}},E.buildLabelText=function(e,r,n,t){var l="";if(t&&t.hasArcadeExpression){if(t.compiledArcadeFunc){var i=s.createExecContext(r),a=s.executeFunction(t.compiledArcadeFunc,i);null!=a&&(l=a.toString())}}else{var o=r&&r.attributes||{};l=e.replace(/{[^}]*}/g,function(e){return E.formatField(e.slice(1,-1),e,o,n,t)})}return l},E.formatField=function(r,t,a,s,o){var c,u,p=t,b=r.toLowerCase();for(c=0;c<s.length;c++)if(s[c].name.toLowerCase()===b){p=a[s[c].name];var f=s[c].domain;if(f&&l.isObject(f)){if("codedValue"==f.type)for(u=0;u<f.codedValues.length;u++)f.codedValues[u].code==p&&(p=f.codedValues[u].name);else"range"==f.type&&f.minValue<=p&&p<=f.maxValue&&(p=f.name);return null==p?"":p}var v=s[c].type;if("date"==v){var m=e.fromJSON(o&&o.dateFormat||"shortDate"),d="DateFormat"+e.getFormat(m);d&&(p=n.substitute({myKey:p},"{myKey:"+d+"}"))}else("integer"==v||"small-integer"==v||"long"==v||"double"==v)&&o&&o.numberFormat&&o.numberFormat.digitSeparator&&o.numberFormat.places&&(p=i.format(p,{places:o.numberFormat.places}))}return null==p?"":p};var L=/^\s*\{([^}]+)\}\s*$/i;return E});