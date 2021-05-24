import{ObjectWrapper as e,ParsedURL as t,Revealer as o}from"../common/common.js";import{InspectorFrontendHost as n,InspectorFrontendHostAPI as r}from"../host/host.js";import{i18n as s}from"../i18n/i18n.js";import{Multimap as i}from"../platform/platform.js";import{TextUtils as c,TextRange as h}from"../text_utils/text_utils.js";let a;class d extends e.ObjectWrapper{constructor(){super(),this._saveCallbacks=new Map,n.InspectorFrontendHostInstance.events.addEventListener(r.Events.SavedURL,this._savedURL,this),n.InspectorFrontendHostInstance.events.addEventListener(r.Events.CanceledSaveURL,this._canceledSavedURL,this),n.InspectorFrontendHostInstance.events.addEventListener(r.Events.AppendedToURL,this._appendedToURL,this)}static instance(e={forceNew:null}){const{forceNew:t}=e;return a&&!t||(a=new d),a}save(e,t,o){const r=new Promise((t=>this._saveCallbacks.set(e,t)));return n.InspectorFrontendHostInstance.save(e,t,o),r}_savedURL(e){const t=e.data.url,o=this._saveCallbacks.get(t);this._saveCallbacks.delete(t),o&&o({fileSystemPath:e.data.fileSystemPath})}_canceledSavedURL(e){const t=e.data,o=this._saveCallbacks.get(t);this._saveCallbacks.delete(t),o&&o(null)}append(e,t){n.InspectorFrontendHostInstance.append(e,t)}close(e){n.InspectorFrontendHostInstance.close(e)}_appendedToURL(e){const t=e.data;this.dispatchEventToListeners(u.AppendedToURL,t)}}const u={AppendedToURL:Symbol("AppendedToURL")};var l=Object.freeze({__proto__:null,FileManager:d,Events:u});const m={Debugger:"debugger",Formatter:"formatter",Network:"network",FileSystem:"filesystem",ContentScripts:"contentscripts",Service:"service"};let p;class _ extends e.ObjectWrapper{constructor(){super(),this._projects=new Map,this._hasResourceContentTrackingExtensions=!1}static instance(e={forceNew:null}){const{forceNew:t}=e;return p&&!t||(p=new _),p}uiSourceCode(e,t){const o=this._projects.get(e);return o?o.uiSourceCodeForURL(t):null}uiSourceCodeForURL(e){for(const t of this._projects.values()){const o=t.uiSourceCodeForURL(e);if(o)return o}return null}uiSourceCodesForProjectType(e){const t=[];for(const o of this._projects.values())o.type()===e&&t.push(...o.uiSourceCodes());return t}addProject(e){console.assert(!this._projects.has(e.id()),`A project with id ${e.id()} already exists!`),this._projects.set(e.id(),e),this.dispatchEventToListeners(C.ProjectAdded,e)}_removeProject(e){this._projects.delete(e.id()),this.dispatchEventToListeners(C.ProjectRemoved,e)}project(e){return this._projects.get(e)||null}projects(){return[...this._projects.values()]}projectsForType(e){return this.projects().filter((function(t){return t.type()===e}))}uiSourceCodes(){const e=[];for(const t of this._projects.values())e.push(...t.uiSourceCodes());return e}setHasResourceContentTrackingExtensions(e){this._hasResourceContentTrackingExtensions=e}hasResourceContentTrackingExtensions(){return this._hasResourceContentTrackingExtensions}}const C={UISourceCodeAdded:Symbol("UISourceCodeAdded"),UISourceCodeRemoved:Symbol("UISourceCodeRemoved"),UISourceCodeRenamed:Symbol("UISourceCodeRenamed"),WorkingCopyChanged:Symbol("WorkingCopyChanged"),WorkingCopyCommitted:Symbol("WorkingCopyCommitted"),WorkingCopyCommittedByUser:Symbol("WorkingCopyCommittedByUser"),ProjectAdded:Symbol("ProjectAdded"),ProjectRemoved:Symbol("ProjectRemoved")};var g=Object.freeze({__proto__:null,ProjectSearchConfig:class{query(){throw new Error("not implemented")}ignoreCase(){throw new Error("not implemented")}isRegex(){throw new Error("not implemented")}queries(){throw new Error("not implemented")}filePathMatchesFileQuery(e){throw new Error("not implemented")}},Project:class{workspace(){throw new Error("not implemented")}id(){throw new Error("not implemented")}type(){throw new Error("not implemented")}isServiceProject(){throw new Error("not implemented")}displayName(){throw new Error("not implemented")}requestMetadata(e){throw new Error("not implemented")}requestFileContent(e){throw new Error("not implemented")}canSetFileContent(){throw new Error("not implemented")}setFileContent(e,t,o){throw new Error("not implemented")}fullDisplayName(e){throw new Error("not implemented")}mimeType(e){throw new Error("not implemented")}canRename(){throw new Error("not implemented")}rename(e,t,o){}excludeFolder(e){}canExcludeFolder(e){throw new Error("not implemented")}createFile(e,t,o,n){throw new Error("not implemented")}canCreateFile(){throw new Error("not implemented")}deleteFile(e){}remove(){}searchInFileContent(e,t,o,n){throw new Error("not implemented")}findFilesMatchingSearchRequest(e,t,o){throw new Error("not implemented")}indexContent(e){}uiSourceCodeForURL(e){throw new Error("not implemented")}uiSourceCodes(){throw new Error("not implemented")}},projectTypes:m,ProjectStore:class{constructor(e,t,o,n){this._workspace=e,this._id=t,this._type=o,this._displayName=n,this._uiSourceCodesMap=new Map,this._uiSourceCodesList=[],this._project=this}id(){return this._id}type(){return this._type}displayName(){return this._displayName}workspace(){return this._workspace}createUISourceCode(e,t){return new v(this._project,e,t)}addUISourceCode(e){const t=e.url();return!this.uiSourceCodeForURL(t)&&(this._uiSourceCodesMap.set(t,{uiSourceCode:e,index:this._uiSourceCodesList.length}),this._uiSourceCodesList.push(e),this._workspace.dispatchEventToListeners(C.UISourceCodeAdded,e),!0)}removeUISourceCode(e){if(!this.uiSourceCodeForURL(e))return;const t=this._uiSourceCodesMap.get(e);if(!t)return;const o=this._uiSourceCodesList[this._uiSourceCodesList.length-1];this._uiSourceCodesList[t.index]=o;const n=this._uiSourceCodesMap.get(o.url());n&&(n.index=t.index),this._uiSourceCodesList.splice(this._uiSourceCodesList.length-1,1),this._uiSourceCodesMap.delete(e),this._workspace.dispatchEventToListeners(C.UISourceCodeRemoved,t.uiSourceCode)}removeProject(){this._workspace._removeProject(this._project),this._uiSourceCodesMap=new Map,this._uiSourceCodesList=[]}uiSourceCodeForURL(e){const t=this._uiSourceCodesMap.get(e);return t?t.uiSourceCode:null}uiSourceCodes(){return this._uiSourceCodesList}renameUISourceCode(e,t){const o=e.url(),n=e.parentURL()?e.parentURL()+"/"+t:t,r=this._uiSourceCodesMap.get(o);this._uiSourceCodesMap.set(n,r),this._uiSourceCodesMap.delete(o)}},WorkspaceImpl:_,Events:C});const y={index:"(index)",thisFileWasChangedExternally:"This file was changed externally. Would you like to reload it?"},S=s.registerUIStrings("workspace/UISourceCode.js",y),w=s.getLocalizedString.bind(void 0,S);class v extends e.ObjectWrapper{constructor(e,o,n){super(),this._project=e,this._url=o;const r=t.ParsedURL.fromString(o);r?(this._origin=r.securityOrigin(),this._parentURL=this._origin+r.folderPathComponents,this._name=r.lastPathComponent,r.queryParams&&(this._name+="?"+r.queryParams)):(this._origin="",this._parentURL="",this._name=o),this._contentType=n,this._requestContentPromise=null,this._decorations=null,this._hasCommits=!1,this._messages=null,this._contentLoaded=!1,this._content=null,this._forceLoadOnCheckContent=!1,this._checkingContent=!1,this._lastAcceptedContent=null,this._workingCopy=null,this._workingCopyGetter=null,this._disableEdit=!1}requestMetadata(){return this._project.requestMetadata(this)}name(){return this._name}mimeType(){return this._project.mimeType(this)}url(){return this._url}parentURL(){return this._parentURL}origin(){return this._origin}fullDisplayName(){return this._project.fullDisplayName(this)}displayName(e){if(!this._name)return w(y.index);let t=this._name;try{t=this.project().type()===m.FileSystem?unescape(t):decodeURI(t)}catch(e){}return e?t:t.trimEndWithMaxLength(100)}canRename(){return this._project.canRename()}rename(e){let t;const o=new Promise((e=>{t=e}));return this._project.rename(this,e,function(e,o,n,r){e&&this._updateName(o,n,r);t(e)}.bind(this)),o}remove(){this._project.deleteFile(this)}_updateName(e,t,o){const n=this._url;this._url=this._url.substring(0,this._url.length-this._name.length)+e,this._name=e,t&&(this._url=t),o&&(this._contentType=o),this.dispatchEventToListeners(k.TitleChanged,this),this.project().workspace().dispatchEventToListeners(C.UISourceCodeRenamed,{oldURL:n,uiSourceCode:this})}contentURL(){return this.url()}contentType(){return this._contentType}async contentEncoded(){return await this.requestContent(),this._contentEncoded||!1}project(){return this._project}requestContent(){return this._requestContentPromise?this._requestContentPromise:this._contentLoaded?Promise.resolve(this._content):(this._requestContentPromise=this._requestContentImpl(),this._requestContentPromise)}async _requestContentImpl(){try{const e=await this._project.requestFileContent(this);this._contentLoaded||(this._contentLoaded=!0,this._content=e,this._contentEncoded=e.isEncoded)}catch(e){this._contentLoaded=!0,this._content={content:null,error:e?String(e):"",isEncoded:!1}}return this._content}async checkContentUpdated(){if(!this._contentLoaded&&!this._forceLoadOnCheckContent)return;if(!this._project.canSetFileContent()||this._checkingContent)return;this._checkingContent=!0;const e=await this._project.requestFileContent(this);if("error"in e)return;if(this._checkingContent=!1,null===e.content){const e=this.workingCopy();return this._contentCommitted("",!1),void this.setWorkingCopy(e)}if(this._lastAcceptedContent===e.content)return;if(this._content&&"content"in this._content&&this._content.content===e.content)return void(this._lastAcceptedContent=null);if(!this.isDirty()||this._workingCopy===e.content)return void this._contentCommitted(e.content,!1);await o.reveal(this),await new Promise((e=>setTimeout(e,0)));window.confirm(w(y.thisFileWasChangedExternally))?this._contentCommitted(e.content,!1):this._lastAcceptedContent=e.content}forceLoadOnCheckContent(){this._forceLoadOnCheckContent=!0}_commitContent(e){this._project.canSetFileContent()&&this._project.setFileContent(this,e,!1),this._contentCommitted(e,!0)}_contentCommitted(e,t){this._lastAcceptedContent=null,this._content={content:e,isEncoded:!1},this._contentLoaded=!0,this._requestContentPromise=null,this._hasCommits=!0,this._innerResetWorkingCopy();const o={uiSourceCode:this,content:e,encoded:this._contentEncoded};this.dispatchEventToListeners(k.WorkingCopyCommitted,o),this._project.workspace().dispatchEventToListeners(C.WorkingCopyCommitted,o),t&&this._project.workspace().dispatchEventToListeners(C.WorkingCopyCommittedByUser,o)}addRevision(e){this._commitContent(e)}hasCommits(){return this._hasCommits}workingCopy(){return this._workingCopyGetter&&(this._workingCopy=this._workingCopyGetter(),this._workingCopyGetter=null),this.isDirty()?this._workingCopy:this._content&&"content"in this._content&&this._content.content||""}resetWorkingCopy(){this._innerResetWorkingCopy(),this._workingCopyChanged()}_innerResetWorkingCopy(){this._workingCopy=null,this._workingCopyGetter=null}setWorkingCopy(e){this._workingCopy=e,this._workingCopyGetter=null,this._workingCopyChanged()}setContent(e,t){this._contentEncoded=t,this._project.canSetFileContent()&&this._project.setFileContent(this,e,t),this._contentCommitted(e,!0)}setWorkingCopyGetter(e){this._workingCopyGetter=e,this._workingCopyChanged()}_workingCopyChanged(){this._removeAllMessages(),this.dispatchEventToListeners(k.WorkingCopyChanged,this),this._project.workspace().dispatchEventToListeners(C.WorkingCopyChanged,{uiSourceCode:this})}removeWorkingCopyGetter(){this._workingCopyGetter&&(this._workingCopy=this._workingCopyGetter(),this._workingCopyGetter=null)}commitWorkingCopy(){this.isDirty()&&this._commitContent(this.workingCopy())}isDirty(){return null!==this._workingCopy||null!==this._workingCopyGetter}extension(){return t.ParsedURL.extractExtension(this._name)}content(){return this._content&&"content"in this._content&&this._content.content||""}loadError(){return this._content&&"error"in this._content&&this._content.error||null}searchInContent(e,t,o){const n=this.content();return n?Promise.resolve(c.performSearchInContent(n,e,t,o)):this._project.searchInFileContent(this,e,t,o)}contentLoaded(){return this._contentLoaded}uiLocation(e,t){return new L(this,e,t)}messages(){return this._messages?new Set(this._messages):new Set}addLineMessage(e,t,o,n,r){return this.addMessage(e,t,new h.TextRange(o,n||0,o,n||0),r)}addMessage(e,t,o,n){const r=new E(this,e,t,o,n);return this._messages||(this._messages=new Set),this._messages.add(r),this.dispatchEventToListeners(k.MessageAdded,r),r}removeMessage(e){this._messages&&this._messages.delete(e)&&this.dispatchEventToListeners(k.MessageRemoved,e)}_removeAllMessages(){if(this._messages){for(const e of this._messages)this.dispatchEventToListeners(k.MessageRemoved,e);this._messages=null}}addLineDecoration(e,t,o){this.addDecoration(h.TextRange.createFromLocation(e,0),t,o)}addDecoration(e,t,o){const n=new j(e,t,o);this._decorations||(this._decorations=new i),this._decorations.set(t,n),this.dispatchEventToListeners(k.LineDecorationAdded,n)}removeDecorationsForType(e){if(!this._decorations)return;const t=this._decorations.get(e);this._decorations.deleteAll(e),t.forEach((e=>{this.dispatchEventToListeners(k.LineDecorationRemoved,e)}))}allDecorations(){return this._decorations?this._decorations.valuesArray():[]}removeAllDecorations(){if(!this._decorations)return;const e=this._decorations.valuesArray();this._decorations.clear(),e.forEach((e=>this.dispatchEventToListeners(k.LineDecorationRemoved,e)))}decorationsForType(e){return this._decorations?this._decorations.get(e):null}disableEdit(){this._disableEdit=!0}editDisabled(){return this._disableEdit}}const k={WorkingCopyChanged:Symbol("WorkingCopyChanged"),WorkingCopyCommitted:Symbol("WorkingCopyCommitted"),TitleChanged:Symbol("TitleChanged"),MessageAdded:Symbol("MessageAdded"),MessageRemoved:Symbol("MessageRemoved"),LineDecorationAdded:Symbol("LineDecorationAdded"),LineDecorationRemoved:Symbol("LineDecorationRemoved")};class L{constructor(e,t,o){this.uiSourceCode=e,this.lineNumber=t,this.columnNumber=o}linkText(e){let t=this.uiSourceCode.displayName(e);return"application/wasm"===this.uiSourceCode.mimeType()?"number"==typeof this.columnNumber&&(t+=":0x"+this.columnNumber.toString(16)):"number"==typeof this.lineNumber&&(t+=":"+(this.lineNumber+1)),t}id(){return"number"==typeof this.columnNumber?this.uiSourceCode.project().id()+":"+this.uiSourceCode.url()+":"+this.lineNumber+":"+this.columnNumber:this.lineId()}lineId(){return this.uiSourceCode.project().id()+":"+this.uiSourceCode.url()+":"+this.lineNumber}toUIString(){return this.uiSourceCode.url()+":"+(this.lineNumber+1)}static comparator(e,t){return e.compareTo(t)}compareTo(e){return this.uiSourceCode.url()!==e.uiSourceCode.url()?this.uiSourceCode.url()>e.uiSourceCode.url()?1:-1:this.lineNumber!==e.lineNumber?this.lineNumber-e.lineNumber:this.columnNumber===e.columnNumber?0:"number"!=typeof this.columnNumber?-1:"number"!=typeof e.columnNumber?1:this.columnNumber-e.columnNumber}}class E{constructor(e,t,o,n,r){this._uiSourceCode=e,this._level=t,this._text=o,this._range=n,this._clickHandler=r}uiSourceCode(){return this._uiSourceCode}level(){return this._level}text(){return this._text}range(){return this._range}clickHandler(){return this._clickHandler}lineNumber(){return this._range.startLine}columnNumber(){return this._range.startColumn}isEqual(e){return this._uiSourceCode===e._uiSourceCode&&this.text()===e.text()&&this.level()===e.level()&&this.range().equal(e.range())}remove(){this._uiSourceCode.removeMessage(this)}}E.Level={Error:"Error",Issue:"Issue",Warning:"Warning"};class j{constructor(e,t,o){this._range=e,this._type=t,this._data=o}range(){return this._range}type(){return this._type}data(){return this._data}}var b=Object.freeze({__proto__:null,UIStrings:y,UISourceCode:v,Events:k,UILocation:L,Message:E,LineMarker:j,UISourceCodeMetadata:class{constructor(e,t){this.modificationTime=e,this.contentSize=t}}});export{l as FileManager,b as UISourceCode,g as Workspace};
