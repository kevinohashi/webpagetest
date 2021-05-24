import{PaintProfilerView as e,LayerViewHost as t,LayerTreeOutline as i,Layers3DView as r,LayerDetailsView as a}from"../layer_viewer/layer_viewer.js";import{SplitWidget as s,Geometry as n,Panel as l,TabbedPane as o}from"../ui/ui.js";import{Throttler as h}from"../common/common.js";import{i18n as d}from"../i18n/i18n.js";import{SDKModel as _,PaintProfiler as y,ResourceTreeModel as c,LayerTreeBase as u}from"../sdk/sdk.js";class P extends s.SplitWidget{constructor(t){super(!0,!1),this._logTreeView=new e.PaintProfilerCommandLogView,this.setSidebarWidget(this._logTreeView),this._paintProfilerView=new e.PaintProfilerView(t),this.setMainWidget(this._paintProfilerView),this._paintProfilerView.addEventListener(e.Events.WindowChanged,this._onWindowChanged,this),this._logTreeView.focus()}reset(){this._paintProfilerView.setSnapshotAndLog(null,[],null)}profile(e){function t(e,t){this._logTreeView.setCommandLog(t||[]),this._paintProfilerView.setSnapshotAndLog(e,t||[],null),e&&e.release()}e.commandLog().then((i=>t.call(this,e,i)))}setScale(e){this._paintProfilerView.setScale(e)}_onWindowChanged(){this._logTreeView.updateWindow(this._paintProfilerView.selectionWindow())}}var p,w=Object.freeze({__proto__:null,LayerPaintProfilerView:P});class f extends _.SDKModel{constructor(e){super(e),this._layerTreeAgent=e.layerTreeAgent(),e.registerLayerTreeDispatcher(new T(this)),this._paintProfilerModel=e.model(y.PaintProfilerModel);const t=e.model(c.ResourceTreeModel);t&&t.addEventListener(c.Events.MainFrameNavigated,this._onMainFrameNavigated,this),this._layerTree=null,this._throttler=new h.Throttler(20)}async disable(){this._enabled&&(this._enabled=!1,await this._layerTreeAgent.invoke_disable())}enable(){this._enabled||(this._enabled=!0,this._forceEnable())}async _forceEnable(){this._lastPaintRectByLayerId=new Map,this._layerTree||(this._layerTree=new g(this)),await this._layerTreeAgent.invoke_enable()}layerTree(){return this._layerTree}async _layerTreeChanged(e){this._enabled&&this._throttler.schedule(this._innerSetLayers.bind(this,e))}async _innerSetLayers(e){const t=this._layerTree;await t.setLayers(e),this._lastPaintRectByLayerId||(this._lastPaintRectByLayerId=new Map);for(const e of this._lastPaintRectByLayerId.keys()){const i=this._lastPaintRectByLayerId.get(e),r=t.layerById(e);r&&(r._lastPaintRect=i)}this._lastPaintRectByLayerId=new Map,this.dispatchEventToListeners(p.LayerTreeChanged)}_layerPainted(e,t){if(!this._enabled)return;const i=this._layerTree.layerById(e);if(!i)return this._lastPaintRectByLayerId||(this._lastPaintRectByLayerId=new Map),void this._lastPaintRectByLayerId.set(e,t);i._didPaint(t),this.dispatchEventToListeners(p.LayerPainted,i)}_onMainFrameNavigated(){this._layerTree=null,this._enabled&&this._forceEnable()}}_.SDKModel.register(f,_.Capability.DOM,!1),function(e){e.LayerTreeChanged="LayerTreeChanged",e.LayerPainted="LayerPainted"}(p||(p={}));class g extends u.LayerTreeBase{constructor(e){super(e.target()),this._layerTreeModel=e}async setLayers(e){if(!e)return void this._innerSetLayers(e);const t=new Set;for(let i=0;i<e.length;++i){const r=e[i].backendNodeId;r&&!this.backendNodeIdToNode().has(r)&&t.add(r)}await this.resolveBackendNodeIds(t),this._innerSetLayers(e)}_innerSetLayers(e){if(this.setRoot(null),this.setContentRoot(null),!e)return;let t;const i=this.layersById;this.layersById=new Map;for(let r=0;r<e.length;++r){const a=e[r].layerId;let s=i.get(a);s?s._reset(e[r]):s=new m(this._layerTreeModel,e[r]),this.layersById.set(a,s);const n=e[r].backendNodeId;n&&s._setNode(this.backendNodeIdToNode().get(n)||null),!this.contentRoot()&&s.drawsContent()&&this.setContentRoot(s);const l=s.parentId();if(l){const e=this.layersById.get(l);if(!e)throw new Error(`Missing parent ${l} for layer ${a}`);e.addChild(s)}else t&&console.assert(!1,"Multiple root layers"),t=s}t&&(this.setRoot(t),t._calculateQuad(new WebKitCSSMatrix))}}class m{constructor(e,t){this._layerTreeModel=e,this._reset(t)}id(){return this._layerPayload.layerId}parentId(){return this._layerPayload.parentLayerId||null}parent(){return this._parent}isRoot(){return!this.parentId()}children(){return this._children}addChild(e){const t=e;t._parent&&console.assert(!1,"Child already has a parent"),this._children.push(t),t._parent=this}_setNode(e){this._node=e}node(){return this._node||null}nodeForSelfOrAncestor(){let e=this;for(;e;e=e._parent)if(e._node)return e._node;return null}offsetX(){return this._layerPayload.offsetX}offsetY(){return this._layerPayload.offsetY}width(){return this._layerPayload.width}height(){return this._layerPayload.height}transform(){return this._layerPayload.transform||null}quad(){return this._quad}anchorPoint(){return[this._layerPayload.anchorX||0,this._layerPayload.anchorY||0,this._layerPayload.anchorZ||0]}invisible(){return this._layerPayload.invisible||!1}paintCount(){return this._paintCount||this._layerPayload.paintCount}lastPaintRect(){return this._lastPaintRect||null}scrollRects(){return this._scrollRects}stickyPositionConstraint(){return this._stickyPositionConstraint||null}async requestCompositingReasonIds(){return(await this._layerTreeModel._layerTreeAgent.invoke_compositingReasons({layerId:this.id()})).compositingReasonIds||[]}drawsContent(){return this._layerPayload.drawsContent}gpuMemoryUsage(){return this.drawsContent()?this.width()*this.height()*4:0}snapshots(){return[this._layerTreeModel._paintProfilerModel.makeSnapshot(this.id()).then((e=>e?{rect:{x:0,y:0,width:this.width(),height:this.height()},snapshot:e}:null))]}_didPaint(e){this._lastPaintRect=e,this._paintCount=this.paintCount()+1,this._image=null}_reset(e){this._node=null,this._children=[],this._parent=null,this._paintCount=0,this._layerPayload=e,this._image=null,this._scrollRects=this._layerPayload.scrollRects||[],this._stickyPositionConstraint=this._layerPayload.stickyPositionConstraint?new u.StickyPositionConstraint(this._layerTreeModel.layerTree(),this._layerPayload.stickyPositionConstraint):null}_matrixFromArray(e){return new WebKitCSSMatrix("matrix3d("+e.map((function(e){return e.toFixed(9)})).join(",")+")")}_calculateTransformToViewport(e){let t=(new WebKitCSSMatrix).translate(this._layerPayload.offsetX,this._layerPayload.offsetY);if(this._layerPayload.transform){const e=this._matrixFromArray(this._layerPayload.transform),i=new n.Vector(this._layerPayload.width*this.anchorPoint()[0],this._layerPayload.height*this.anchorPoint()[1],this.anchorPoint()[2]),r=n.multiplyVectorByMatrixAndNormalize(i,t),a=(new WebKitCSSMatrix).translate(-r.x,-r.y,-r.z);t=a.inverse().multiply(e.multiply(a.multiply(t)))}return t=e.multiply(t),t}_createVertexArrayForRect(e,t){return[0,0,0,e,0,0,e,t,0,0,t,0]}_calculateQuad(e){const t=this._calculateTransformToViewport(e);this._quad=[];const i=this._createVertexArrayForRect(this._layerPayload.width,this._layerPayload.height);for(let e=0;e<4;++e){const r=n.multiplyVectorByMatrixAndNormalize(new n.Vector(i[3*e],i[3*e+1],i[3*e+2]),t);this._quad.push(r.x,r.y)}this._children.forEach((function(e){e._calculateQuad(t)}))}}class T{constructor(e){this._layerTreeModel=e}layerTreeDidChange({layers:e}){this._layerTreeModel._layerTreeChanged(e||null)}layerPainted({layerId:e,clip:t}){this._layerTreeModel._layerPainted(e,t)}}var L=Object.freeze({__proto__:null,LayerTreeModel:f,get Events(){return p},AgentLayerTree:g,AgentLayer:m});const b={details:"Details",profiler:"Profiler"},V=d.registerUIStrings("layers/LayersPanel.ts",b),C=d.getLocalizedString.bind(void 0,V);class S extends l.PanelWithSidebar{constructor(){super("layers",225),this._model=null,_.TargetManager.instance().observeTargets(this),this._layerViewHost=new t.LayerViewHost,this._layerTreeOutline=new i.LayerTreeOutline(this._layerViewHost),this._layerTreeOutline.addEventListener(i.Events.PaintProfilerRequested,this._onPaintProfileRequested,this),this.panelSidebarElement().appendChild(this._layerTreeOutline.element),this.setDefaultFocusedElement(this._layerTreeOutline.element),this._rightSplitWidget=new s.SplitWidget(!1,!0,"layerDetailsSplitViewState"),this.splitWidget().setMainWidget(this._rightSplitWidget),this._layers3DView=new r.Layers3DView(this._layerViewHost),this._rightSplitWidget.setMainWidget(this._layers3DView),this._layers3DView.addEventListener(r.Events.PaintProfilerRequested,this._onPaintProfileRequested,this),this._layers3DView.addEventListener(r.Events.ScaleChanged,this._onScaleChanged,this),this._tabbedPane=new o.TabbedPane,this._rightSplitWidget.setSidebarWidget(this._tabbedPane),this._layerDetailsView=new a.LayerDetailsView(this._layerViewHost),this._layerDetailsView.addEventListener(a.Events.PaintProfilerRequested,this._onPaintProfileRequested,this),this._tabbedPane.appendTab(v.Details,C(b.details),this._layerDetailsView),this._paintProfilerView=new P(this._showImage.bind(this)),this._tabbedPane.addEventListener(o.Events.TabClosed,this._onTabClosed,this),this._updateThrottler=new h.Throttler(100)}focus(){this._layerTreeOutline.focus()}wasShown(){super.wasShown(),this._model&&this._model.enable()}willHide(){this._model&&this._model.disable(),super.willHide()}targetAdded(e){this._model||(this._model=e.model(f),this._model&&(this._model.addEventListener(p.LayerTreeChanged,this._onLayerTreeUpdated,this),this._model.addEventListener(p.LayerPainted,this._onLayerPainted,this),this.isShowing()&&this._model.enable()))}targetRemoved(e){this._model&&this._model.target()===e&&(this._model.removeEventListener(p.LayerTreeChanged,this._onLayerTreeUpdated,this),this._model.removeEventListener(p.LayerPainted,this._onLayerPainted,this),this._model.disable(),this._model=null)}_onLayerTreeUpdated(){this._updateThrottler.schedule(this._update.bind(this))}_update(){if(this._model){this._layerViewHost.setLayerTree(this._model.layerTree());const e=this._model.target().model(c.ResourceTreeModel);if(e){const t=e.mainFrame;if(t){const e=t.url;this.element.setAttribute("test-current-url",e)}}}return Promise.resolve()}_onLayerPainted(e){if(!this._model)return;const t=e.data,i=this._layerViewHost.selection();i&&i.layer()===t&&this._layerDetailsView.update(),this._layers3DView.updateLayerSnapshot(t)}_onPaintProfileRequested(e){const t=e.data;this._layers3DView.snapshotForSelection(t).then((e=>{e&&(this._layerBeingProfiled=t.layer(),this._tabbedPane.hasTab(v.Profiler)||this._tabbedPane.appendTab(v.Profiler,C(b.profiler),this._paintProfilerView,void 0,!0,!0),this._tabbedPane.selectTab(v.Profiler),this._paintProfilerView.profile(e.snapshot))}))}_onTabClosed(e){e.data.tabId===v.Profiler&&this._layerBeingProfiled&&(this._paintProfilerView.reset(),this._layers3DView.showImageForLayer(this._layerBeingProfiled,void 0),this._layerBeingProfiled=null)}_showImage(e){this._layerBeingProfiled&&this._layers3DView.showImageForLayer(this._layerBeingProfiled,e)}_onScaleChanged(e){this._paintProfilerView.setScale(e.data)}}const v={Details:"details",Profiler:"profiler"};var M=Object.freeze({__proto__:null,UIStrings:b,LayersPanel:S,DetailsViewTabs:v});export{w as LayerPaintProfilerView,L as LayerTreeModel,M as LayersPanel};
