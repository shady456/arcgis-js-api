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

define(["../core/domUtils","../symbols/PictureMarkerSymbol","../symbols/support/symbolPreview","./ColorPicker","./support/colorUtils","./SymbolStyler/_DelayedUpdate","./SymbolStyler/IconSelect","./SymbolStyler/MarkerSymbolPicker","./SymbolStyler/support/schemeUtils","./SymbolStyler/support/stylerUtils","./SymbolStyler/support/symbolUtils","dijit/_TemplatedMixin","dijit/_WidgetBase","dijit/_WidgetsInTemplateMixin","dijit/a11yclick","dijit/form/CheckBox","dijit/form/ComboBoxMixin","dijit/form/NumberTextBox","dojo/dom-class","dojo/dom-construct","dojo/keys","dojo/number","dojo/on","dojo/i18n!./SymbolStyler/nls/SymbolStyler","dojo/text!./SymbolStyler/templates/SymbolStyler.html","./HorizontalSlider","./SymbolStyler/MarkerSymbolPicker","./SymbolStyler/ColorRampPicker","dijit/form/Button","dijit/form/ComboBox","dijit/form/NumberSpinner","dijit/form/Select","dijit/form/TextBox","dijit/layout/BorderContainer","dijit/layout/ContentPane","dijit/layout/StackController","dijit/layout/StackContainer"],function(e,t,i,o,l,s,n,r,a,d,h,p,c,_,m,u,g,b,C,S,y,f,P,x,I){function T(t){C.remove(e.getNode(t),z.hidden)}function k(t){C.add(e.getNode(t),z.hidden)}var v=h.is3d,z={root:"esri-symbol-styler",symbolPreviewContainer:"esri-symbol-preview-container",symbolPreview:"esri-symbol-preview",tabBar:"esri-tab-bar",content:"esri-content",link:"esri-link",label:"esri-label",shapeImageUrlContainer:"esri-shape-image-url-container",urlInput:"esri-url-input",addIcon:"esri-add-icon",errorDisplay:"esri-error-display",symbolSizeInput:"esri-symbol-size-input",inlineInput:"esri-inline-input",inlineInputContainer:"esri-symbol-styler__inline-input-container",text:"esri-text",hidden:"esri-hidden",lineWidthInput:"esri-line-width-input",linePattern:"esri-line-pattern",linePatternInput:"esri-line-pattern-input",alt:"esri-alt",disabled:"esri-disabled"},O=c.createSubclass([p,_,s],{declaredClass:"esri.widgets.SymbolStyler",baseClass:z.root,templateString:I,labels:x,css:z,constructor:function(){this._tabOptions={},this._delayedCommitPropsTrigger=this.createUpdateTrigger(this._commitProperties,this),this._initOptimizationControls()},postCreate:function(){this.inherited(arguments),this._setUpComboBox();var e=n.prototype.baseClass,t=new n({baseClass:e+" "+z.root+" "+z.linePatternInput},this.dap_linePatternSelect);this._linePatternSelect=t,k(this.dap_shapeImageUrlContainer),this.dap_shapeImageUrlInput.set("placeholder",x.imageUrlInputPlaceholder),this._lineWidthTextBox.selectOnClick=!0,this.dap_shapeSizeTextBox.selectOnClick=!0,this.dap_lineWidthSlider.intermediateChanges=!0,this._lineWidthTextBox.intermediateChanges=!0,this.dap_shapeSizeSlider.intermediateChanges=!0,this.dap_shapeSizeTextBox.intermediateChanges=!0,this.dap_fillColorPicker.trackColors=!1,this.dap_outlineColorPicker.trackColors=!1,this._linePatternSelect.addIconOptions(["solid","dot","dash","dash-dot","long-dash-dot-dot"],z.linePattern),this._importRecentColors(),this.dap_outlineColorPicker._enableTransparencySlider=function(){},this.dap_outlineColorPicker._disableTransparencySlider=function(){}},startup:function(){this.inherited(arguments);var e=new r(this._getSymbolPickerParams(),this.dap_symbolPicker);e.startup(),this._symbolPicker=e,this._addHandlers()},destroy:function(){S.empty(this.dap_symbolPreview),S.destroy(this._optimizationSection),this._optimizationCheckBox.destroy(),this.dap_shapeContainer.destroy(),this.dap_fillContainer.destroy(),this.dap_outlineContainer.destroy(),this.inherited(arguments)},_RECENT_FILL_COLORS_ITEM_KEY:"symbolStyler/recent/fill/colors",_RECENT_OUTLINE_COLORS_ITEM_KEY:"symbolStyler/recent/outline/colors",_defaultMinLineWidthInPx:0,_defaultMinShapeSizeInPx:1,_defaultMaxLineWidthInPx:18,_defaultMaxShapeSizeInPx:120,_originalSymbol:null,_editedSymbol:null,_activeTabName:null,_externalSizing:!1,_delayedCommitPropsTrigger:null,_linePatternSelect:null,_symbolPicker:null,_customImageSymbol:null,_optimizationSection:null,_optimizationCheckBox:null,_isPreppingEdit:null,shapeSymbol:null,_setShapeSymbolAttr:function(e){this._adjustOutlineProperties(this._editedSymbol,e),this._set("shapeSymbol",e),this._editedSymbol=e,this._updateTabs(e),this._toggleOutlineColorControls(e),this._delayedCommitPropsTrigger()},shapeSize:null,_setShapeSizeAttr:function(e){this._set("shapeSize",e),this._delayedCommitPropsTrigger()},_shapeImageUrl:null,_setShapeImageUrlAttr:function(e){this._set("shapeImageUrl",e),this._delayedCommitPropsTrigger()},fillColor:null,_setFillColorAttr:function(e){this._set("fillColor",e),this._delayedCommitPropsTrigger()},fillColorRamp:null,_setFillColorRampAttr:function(e){this._set("fillColorRamp",e),this._delayedCommitPropsTrigger()},outlineColorRamp:null,_setOutlineColorRampAttr:function(e){this._set("outlineColorRamp",e),this._delayedCommitPropsTrigger()},outlineWidth:null,_setOutlineWidthAttr:function(e){this._set("outlineWidth",e),this._delayedCommitPropsTrigger()},outlineColor:null,_setOutlineColorAttr:function(e){var t=!!this._optimizationOptions&&this._optimizationCheckBox.checked;e&&t&&(e.a=.5,this.dap_outlineColorPicker.set("color",e,!1)),this._set("outlineColor",e),this._delayedCommitPropsTrigger()},outlinePattern:null,_setOutlinePatternAttr:function(e){this._set("outlinePattern",e),this._delayedCommitPropsTrigger()},mode:"2d",_setModeAttr:function(e){var t="2d"===e;this._set("mode",e),this.dap_linePatternSelect.hidden=!t,this.dap_linePatternSelectLabel.hidden=!t,this.dap_useImageContent.hidden=!t},portal:null,previewVisible:!0,_setPreviewVisibleAttr:function(e){this._set("previewVisible",e),this.dap_symbolPreviewContainer.hidden=!e,this._delayedCommitPropsTrigger()},edit:function(e,t){h.ensureProps(e.clone()).then(function(i){var o;if(t=t||{},o=t.colorRamp,v(i)&&"3d"!==this.mode||!v(i)&&"2d"!==this.mode)throw new Error("symbol-styler:incompatible-symbol-edit","tried to edit a symbol with an incompatible mode",{symbol:i,mode:this.mode});this._isPreppingEdit=!0,this._colorRamp=o,this._originalSymbol=e,this._editedSymbol=i,this._activeTabName=t.activeTab,this._externalSizing=t.externalSizing,this._tabOptions=t.tabOptions||{},this._optimizationOptions="boolean"==typeof t.optimizeOutline?{value:t.optimizeOutline}:void 0,this._setUpColorControls(t.schemes,o),this._assimilateSymbol(i),this._toggleSizingControls(this._externalSizing),this._updateSymbolPicker(t),this._toggleOutlineColorControls(i),this._toggleOptimizationOptions();var l=h.hasExtrudeSymbolLayer(i)||h.hasTextSymbolLayer(e)?this.dap_fillContainer:this.dap_shapeContainer;S.place(this.dap_shapeSizeControls,l.domNode,"last")}.bind(this))},getStyle:function(){var e,t,i=this._editedSymbol.clone(),o={symbol:i};return this._colorRamp&&(e=h.isLine(i,"2d")||h.isPoint(i,"2d")&&h.hasPureOutlineStyle(i),t=e?this.dap_outlineColorRampPicker:this.dap_fillColorRampPicker,o.colorRamp=t.get("selected").colors),this._optimizationOptions&&(o.optimizeOutline=this._optimizationCheckBox.checked),o},storeColors:function(){this._storeRecentColors(this.dap_fillColorPicker,this._RECENT_FILL_COLORS_ITEM_KEY),this._storeRecentColors(this.dap_outlineColorPicker,this._RECENT_OUTLINE_COLORS_ITEM_KEY)},_initOptimizationControls:function(){var e=new u,t=S.create("div",{className:o.prototype.css.section});S.create("label",{"for":e.id,className:z.label,innerHTML:x.autoAdjustOutline},t),e.on("change",function(e){var t=this.dap_outlineColorPicker.get("color");t.a=e?.5:1,this.dap_outlineColorPicker.set("color",t),this._delayedCommitPropsTrigger()}.bind(this)),e.placeAt(t,"first"),this._optimizationSection=t,this._optimizationCheckBox=e},_toggleOutlineColorControls:function(e){var t=this.dap_outlineColorRampPicker,i=this.dap_outlineColorPicker;this._shouldShowOutlineColorRamp(e)?(T(t),k(i)):(T(i),k(t))},_shouldShowOutlineColorRamp:function(e){var t=h;return this._colorRamp&&(t.isLine(e,"2d")||t.isPoint(e,"2d")&&t.hasPureOutlineStyle(e))},_setUpColorControls:function(e,t){var i,o=this.dap_outlineColorRampPicker,l=this.dap_outlineColorPicker,s=this.dap_fillColorRampPicker,n=this.dap_fillColorPicker;return t?(i={colors:t.colors},t.scheme&&(i.scheme=t.scheme),h.isLine(this._editedSymbol,"2d")?(o.set({numStops:t.numStops,schemes:e,selected:i}),k(l),T(o)):(h.isPoint(this._editedSymbol,"2d")&&o.set({numStops:t.numStops,schemes:e,selected:i}),s.set({numStops:t.numStops,schemes:e,selected:i}),T(s),T(l),k(n),k(o)),void l.set("suggestedColors",a.getOutlineColors(e))):(T(n),T(l),k(s),k(o),this._updateSuggestedColors(n,a.getFillColors(e)),void this._updateSuggestedColors(l,a.getOutlineColors(e)))},_toggleOptimizationOptions:function(){var e=this._optimizationOptions,t=this._optimizationSection;h.isPolygon(this._editedSymbol,"2d")&&e?(this._optimizationCheckBox.set("value",e.value),S.place(t,this.dap_outlineColorPicker.dap_recentColorSection)):t.parentNode&&S.empty(t.parentNode)},_importRecentColors:function(){this.dap_fillColorPicker.loadRecentColors(this._RECENT_FILL_COLORS_ITEM_KEY),this.dap_outlineColorPicker.loadRecentColors(this._RECENT_OUTLINE_COLORS_ITEM_KEY)},_toggleSizingControls:function(e){var t=!1,i=!1;e&&(h.isLine(this._editedSymbol)?i=!0:t=!0),this._toggleLabeledControls({labels:this.dap_lineWidthLabel,controls:[this._lineWidthTextBox,this.dap_lineWidthSlider],disabled:i}),this._toggleLabeledControls({labels:this.dap_shapeSizeLabel,controls:[this.dap_shapeSizeTextBox,this.dap_shapeSizeSlider],disabled:t})},_toggleLabeledControls:function(e){var t=[].concat(e.labels),i=[].concat(e.controls),o=e.disabled;t.forEach(function(e){C.toggle(e,z.disabled,o)}),i.forEach(function(e){d.toggleControl(e,o)})},_updateSymbolPicker:function(e){var t=!!this._tabOptions.symbolDisplayMode,i=t?this._tabOptions.symbolDisplayMode:h.isPoint(this._editedSymbol,"2d")&&this._colorRamp?"default":"portal";this.dap_useImageContent.hidden="3d"===this.mode||"portal"!==i,this._symbolPicker.set({displayMode:i,symbolSource:h.getSymbolSource(this._editedSymbol),filters:e.filters}),this._symbolPicker.refresh({freshStorage:e.freshStorage})},_adjustOutlineProperties:function(e,t){var i,o,s,n=this.dap_fillColorPicker,r=this.dap_outlineColorPicker,a=this.dap_fillColorRampPicker,d=this.dap_outlineColorRampPicker,p=.1,c=.2;if(h.switchedFromRasterToVectorSymbol(e,t))return n.set("color",t.color),i=h.getOutline(t),r.set("color",i.color),this._lineWidthTextBox.set("value",i.size),void this._linePatternSelect.set("value",i.style);if(h.switchedFromPureOutline(e,t)&&this._colorRamp)return void a.set("selected",d.get("selected"));if(h.switchedToPureOutline(e,t)){if(this._colorRamp)return void d.set("selected",a.get("selected"));if(i=h.getOutline(e),s=r.get("color"),!i.color)return void r.set("color",t.color);o=l.isBright(i.color),o&&i.color.a<c?(s.a=c,r.set("color",s)):!o&&i.color.a<p&&(s.a=p,r.set("color",s))}},_getTabContainer:function(e){return"fill"===e?this.dap_fillContainer:"outline"===e?this.dap_outlineContainer:this.dap_shapeContainer},_storeRecentColors:function(e,t){var i=e;i.addRecentColor(i.get("color")),i.saveRecentColors(t)},_addHandlers:function(){this._linePatternSelect.on("change",function(e){this.set("outlinePattern",e)}.bind(this)),this.own(P(this.dap_loadShapeImageUrl,m,function(){this._loadImage(this.dap_shapeImageUrlInput.get("value"))}.bind(this))),this.own(P(this.dap_addImage,m,function(){T(this.dap_shapeImageUrlContainer),this.dap_shapeImageUrlInput.focus()}.bind(this))),this.dap_shapeImageUrlInput.on("input",function(e){e.keyCode===y.ENTER&&this._loadImage(this.dap_shapeImageUrlInput.get("value"))}.bind(this)),this.dap_shapeImageUrlInput.on("change",function(e){this.set("shapeImageUrl",e)}.bind(this)),this.dap_fillColorPicker.on("color-change",function(e){this.set("fillColor",e.color)}.bind(this)),this.dap_fillColorRampPicker.on("color-ramp-change",function(e){this.set("fillColorRamp",e.colors)}.bind(this)),this.dap_outlineColorRampPicker.on("color-ramp-change",function(e){this.set("outlineColorRamp",e.colors)}.bind(this)),this.dap_outlineColorPicker.on("color-change",function(e){var t=e.color;!this.outlineColor&&t&&0===this.outlineWidth||null===this.outlineWidth?this._lineWidthTextBox.set("value",1):this.outlineColor&&!t&&this._lineWidthTextBox.set("value",0),this.set("outlineColor",t)}.bind(this)),d.bindSliderAndTextBox(this.dap_lineWidthSlider,this._lineWidthTextBox),d.bindSliderAndTextBox(this.dap_shapeSizeSlider,this.dap_shapeSizeTextBox),this._symbolPicker.on("symbol-select",function(e){this._hideImageUrlInput(),this.set("shapeSymbol",e.selection)}.bind(this)),this.dap_shapeSizeTextBox.on("change",function(e){this.set("shapeSize",e)}.bind(this)),this.dap_fillColorPicker.on("color-change",function(e){this.set("fillColor",e.color)}.bind(this)),this.dap_outlineColorPicker.on("color-change",function(e){this.set("outlineColor",e.color)}.bind(this)),this._lineWidthTextBox.on("change",function(e){this.set("outlineWidth",e)}.bind(this))},_setUpComboBox:function(){var e=b.createSubclass([g]),t=[1,1.2,1.5,2,3,4,5,6,7,8,9,10],i=document.createDocumentFragment();t.forEach(function(e){i.appendChild(S.create("option",{innerHTML:f.format(e)}))}),this.dap_lineWidthTextBox.appendChild(i),this._lineWidthTextBox=new e({},this.dap_lineWidthTextBox)},_loadImage:function(e){this._clearUrlImageErrorDisplay(),h.testImageUrl(e).then(function(i){var o=this._customImageSymbol,l=this.shapeSize;i=h.preserveAspectRatio({dimensions:i,targetDimension:"width",targetSize:l}),o?(o.url=e,o.height=i.height,o.width=i.width):(o=new t(e,i.width,i.height),this._customImageSymbol=o),this._symbolPicker.addCustomImageSymbol(o),this.set("shapeSymbol",o)}.bind(this)).otherwise(function(){this.dap_shapeImageUrlErrorDisplay.innerHTML=x.imageLoadError}.bind(this))},_clearUrlImageErrorDisplay:function(){this.dap_shapeImageUrlErrorDisplay.innerHTML=""},_getActiveTabAttr:function(){var e=this.dap_stackContainer.selectedChildWidget;return e===this.dap_outlineContainer?"outline":e===this.dap_fillContainer?"fill":"shape"},_updateTabs:function(e){var t=h.getApplicableTabs(e,this._tabOptions.excluded),i=this.dap_stackContainer,o=0;Object.keys(t).forEach(function(e,l){var s=t[e],n=this._getTabContainer(e);"disabled"===s.state&&d.disable(n),"enabled"===s.state&&d.enable(n),"excluded"===s.state?n.domNode.parentNode&&i.removeChild(n):(n.domNode.parentNode||i.addChild(n,o),o++)},this);var l=1===i.getChildren().length;l?k(this.dap_stackController.domNode):T(this.dap_stackController.domNode),this._supportsPattern(e)?(T(this.dap_linePatternSelectLabel),T(this._linePatternSelect.domNode)):(k(this.dap_linePatternSelectLabel),k(this._linePatternSelect.domNode));var s=this._getTabContainer(this._activeTabName),n=this.dap_stackContainer.getIndexOfChild(s)>-1;n&&this.dap_stackContainer.selectChild(s),d.ensureEnabledChildSelection(this.dap_stackContainer)},_supportsPattern:function(e){return h.isLine(e,"2d")||h.isPolygon(e,"2d")},_syncControls:function(e){var t,i;this._hideImageUrlInput(),this._updateSizingControls();var o=h.getApplicableTabs(e,this._tabOptions.excluded);if("enabled"===o.shape.state&&(t=h.getMarkerLength(e),this.set("shapeSize",t),d.silentlyUpdateIntermediateChangingValueWidget(this.dap_shapeSizeSlider,t),d.silentlyUpdateIntermediateChangingValueWidget(this.dap_shapeSizeTextBox,t)),"enabled"===o.fill.state){var l=h.getFillColor(e);this.set("fillColor",l),this.dap_fillColorPicker.set("color",l,!1),(h.hasExtrudeSymbolLayer(e)||h.hasTextSymbolLayer(e))&&(t=h.getMarkerLength(e),this.set("shapeSize",t),d.silentlyUpdateIntermediateChangingValueWidget(this.dap_shapeSizeSlider,t),d.silentlyUpdateIntermediateChangingValueWidget(this.dap_shapeSizeTextBox,t))}"enabled"===o.outline.state&&(i=h.getOutline(e),i&&(this.set({outlineColor:i.color,outlineWidth:i.size,outlinePattern:i.style}),this.dap_outlineColorPicker.set("color",i.color,!1),d.silentlyUpdateIntermediateChangingValueWidget(this.dap_lineWidthSlider,i.size),d.silentlyUpdateIntermediateChangingValueWidget(this._lineWidthTextBox,i.size),this._linePatternSelect.set("value",i.style,!1)))},_updateSizingControls:function(){var e=this._editedSymbol,t=h.is3d(e),i=h.getOutlineUnit(e),o=h.getSizeUnit(e),l=h.getOutline(e),s=h.getMarkerLength(e),n=99999999,r=t&&"meters"===i?n:l&&l.size>this._defaultMaxLineWidthInPx?Math.ceil(l.size):this._defaultMaxLineWidthInPx,a=t&&"meters"===o?n:s>this._defaultMaxShapeSizeInPx?Math.ceil(s):this._defaultMaxShapeSizeInPx,p=t?"meters"===i?.001:0:this._defaultMinLineWidthInPx,c=t?"meters"===o?.001:1:this._defaultMinShapeSizeInPx;d.updateSliderAndTextBoxConstraints({textBox:this._lineWidthTextBox,slider:this.dap_lineWidthSlider,minimum:p,maximum:r}),this.dap_lineWidthUnitLabel.innerHTML="meters"===i?x.meters:x.px,d.updateSliderAndTextBoxConstraints({textBox:this.dap_shapeSizeTextBox,slider:this.dap_shapeSizeSlider,minimum:c,maximum:a}),this.dap_sizeUnitLabel.innerHTML="meters"===o?x.meters:x.px,C.toggle(this.dap_lineWidthSlider.domNode,z.hidden,"meters"===i),C.toggle(this.dap_shapeSizeSlider.domNode,z.hidden,"meters"===o)},_assimilateSymbol:function(e){this._updateTabs(e),this._syncControls(e)},_getSymbolPickerParams:function(){return{portal:this.portal,symbolSource:"2d"===this.mode?"symbol-set":"web-style"}},_hideImageUrlInput:function(){this._clearUrlImageErrorDisplay(),k(this.dap_shapeImageUrlContainer),this.dap_shapeImageUrlInput.set("value","")},_getFillColor:function(){var e=this._editedSymbol;return v(e)||h.isLine(e)||!this._colorRamp?this.fillColor:this._getMiddleItem(this.fillColorRamp)},_getMiddleItem:function(e){var t=Math.floor(.5*(e.length-1));return e[t]},_getOutlineColor:function(){return this._shouldShowOutlineColorRamp(this._editedSymbol)?this._getMiddleItem(this.outlineColorRamp):this.outlineColor},_commitProperties:function(){var e=this._editedSymbol,t=h.getApplicableTabs(e,this._tabOptions.excluded);"enabled"!==t.shape.state||this._externalSizing||h.updateShape({symbol:e,size:this.shapeSize}),"enabled"===t.fill.state&&(h.updateFill({symbol:e,color:this._getFillColor()}),(h.hasExtrudeSymbolLayer(e)||h.hasTextSymbolLayer(e))&&h.updateShape({symbol:e,size:this.shapeSize}),this._isPreppingEdit||h.ensureSupportedSimpleFillSymbolStyle(e)),"enabled"===t.outline.state&&h.updateOutline({symbol:e,color:this._getOutlineColor(),pattern:this.outlinePattern,size:this.outlineWidth}),this.previewVisible&&this._updatePreviewSymbol(),this._toggleOutlineOptions(),this._isPreppingEdit=!1,this.emit("style-update")},_toggleOutlineOptions:function(){var e=!!this._optimizationOptions&&this._optimizationCheckBox.checked,t=this.outlineColor,i=h.isLine(this._editedSymbol),o=this._externalSizing&&i||!t||e,l=e||!t,s=!t;this._toggleLabeledControls({labels:this.dap_lineWidthLabel,controls:[this._lineWidthTextBox,this.dap_lineWidthSlider],disabled:o}),this._toggleLabeledControls({labels:this.dap_linePatternSelectLabel,controls:this._linePatternSelect,disabled:s}),this._toggleLabeledControls({labels:[this.dap_outlineColorPicker.dap_transparencyLabel],controls:[this.dap_outlineColorPicker.dap_transparencySlider],disabled:l})},_updatePreviewSymbol:function(){var e=this._editedSymbol,t=this.dap_symbolPreview;if(S.empty(t),!h.hasTextSymbolLayer(e)){var o=24;i.renderPreviewHTML(e,{node:t,size:o}).then(function(){C.toggle(t,z.alt,h.blendsIntoBackground(e))})}},_updateSuggestedColors:function(e,t){e.set("suggestedColors",t)}});return O});