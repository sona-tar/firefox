//==UserScript==
// @name				Mouse Gestures
// @namespace	http://www.xuldev.org/
// @description	Lightweight customizable mouse gestures.
// @author			Gomita
// @include			main
//==/UserScript==

var ucjsMouseGestures={

enablePopupGestures: true,

_lastX: 0,
_lastY: 0,
_directionChain: '',
_isMouseDownL: false,
_isMouseDownR: false,
_hideFireContext: false,

POPUP_ID: 'GesturePopup',
GESTURES:{
	'L' :{name:'Back',cmd:function(){document.getElementById("Browser:Back").doCommand();}},
	'R' :{name:'Forward',cmd:function(){document.getElementById("Browser:Forward").doCommand();}},
	'D' :{name:'Close Tab',cmd:function(){document.getElementById("cmd_close").doCommand();}},
	'DU':{name: "UndoCloseTab" ,cmd:function(){document.getElementById("History:UndoCloseTab").doCommand();}},
	'UL':{name:'Left Tab',cmd:function(){gBrowser.mTabContainer.advanceSelectedTab(-1, true);}},
	'UR':{name:'Right Tab',cmd:function(){gBrowser.mTabContainer.advanceSelectedTab(+1, true);}},
	'LU':{name:'Top',cmd:function(){goDoCommand("cmd_scrollTop");}},
	'LD':{name:'Bottom',cmd:function(){goDoCommand("cmd_scrollBottom");}},
	'LR':{name:'Reload',cmd:function(){document.getElementById("Browser:Reload").doCommand();}},
	'RU':{name:'Go up',cmd:function(){
		var uri = gBrowser.currentURI;
		if (uri.path == "/")return;
		var pathList = uri.path.split("/");
		if (!pathList.pop())pathList.pop();
		loadURI(uri.prePath + pathList.join("/") + "/");
	}},

//	'RLR':{name:'Close All Tabs',cmd:function(){gBrowser.removeAllTabsBut(gBrowser.addTab("about:about"));}},
//	'LU':{name:'History',cmd:function(){toggleSidebar("viewHistorySidebar");}},
//	'LD':{name:'Title + URL',cmd:function(){ContextMenu2ch.copyToClipboard("%TITLE%%EOL%%URL%");}},
//	'RU':{name:'Bookmarks',cmd:function(){toggleSidebar("viewBookmarksSidebar");}},
//	'RUR':{name:'Chaika',cmd:function(){toggleSidebar("viewChaikaSidebar");}},
//	'RD':{name:'WebSearch Popup',cmd:function(self,event){self._buildPopup(event,"WebSearchPopup");}},
//	'UD':{name:'Close',cmd:function(){document.getElementById("cmd_closeWindow").doCommand();}},
//	'UDU':{name:'Chrome Folder',cmd:function(){uProfMenu.prefDirOpen('UChrm');}},
//	'UDL':{name:'Profiles Folder',cmd:function(){uProfMenu.prefDirOpen('ProfD');}},
//	'DU':{name:'Restart',cmd:function(){Application.restart();}},
//	'DUD':{name:'Close of Save Session',cmd:function(){gPrefService.setBoolPref("browser.sessionstore.resume_session_once", true);goQuitApplication();}},
//	'DUL':{name:'about:config',cmd:function(){openNewTabWith(delayedOpenTab("about:config"));}},
//	'UL':{name:'FoxAge2ch',cmd:function(){if (document.getElementById("viewFoxAge2chSidebar"))toggleSidebar("viewFoxAge2chSidebar");else toggleSidebar("viewFoxage2chSidebar");}},
//	'UR':{name:'Clear Serchbar',cmd:function(){document.getElementById("searchbar").value = "";}},
//	'DL':{name:'Writing Wizard',cmd:function(){ContextMenu2ch.write();}},
//	'DLD':{name:'Delete Log',cmd:function(){ContextMenu2ch.deleteLog();}},
//	'DLR':{name:'Open Log Folder',cmd:function(){ContextMenu2ch.openLogDir();}},
//	'DR':{name:'Abone Manager',cmd:function(){ContextMenu2ch.openAboneManager();}},
//	'RUD':{name:'Addons',cmd:function(){document.getElementById('Tools:Addons').doCommand();}},
//	'RDU':{name:'Options',cmd:function(){setTimeout(function(){openPreferences();}, 0);}},



},// ~GESTURES
init:function(){
	var self=this;
	var events=["mousedown","mousemove","mouseup","contextmenu"];
	function registerEvents(aAction,eventArray){
		eventArray.forEach(function(aType){
				getBrowser().mPanelContainer[aAction+"EventListener"](aType,self,aType=="contextmenu");
		});
	};
	registerEvents("add",events);
	window.addEventListener("unload",function(){
			registerEvents("remove",events);
		},false);
},
handleEvent:function(event){
	switch(event.type){
		case"mousedown":
			if(event.button==2){
				this._isMouseDownR=true;
				this._hideFireContext=false;
				this._startGesture(event);
			}
			break;
		case"mousemove":
			if(this._isMouseDownR){
				this._hideFireContext=true;
				this._progressGesture(event);
			}
			break;
		case"mouseup":
			if(event.ctrlKey&&event.button==2){
				this._isMouseDownL=false;
				this._isMouseDownR=false;
				this._shouldFireContext=false;
				this._hideFireContext=false;
				this._directionChain='';
				event.preventDefault();
				XULBrowserWindow.statusTextField.label="Reset Gesture";
				break;
			}
			if(this._isMouseDownR&&event.button==2){
				if(this._directionChain)this._shouldFireContext=false;
				this._isMouseDownR=false;
				this._stopGesture(event);
				if(this._shouldFireContext&&!this._hideFireContext){
					this._shouldFireContext=false;
					this._displayContextMenu(event);
				}
			}else if(this.enablePopupGestures&&(event.button==0||event.button==1)&&event.target.localName=='menuitem'){
				this._isMouseDownL=false;
				this._shouldFireContext=false;
				var popup=document.getElementById(this.POPUP_ID);
				var activeItem=event.target;
				switch(popup.getAttribute("gesturecommand")){
					case"WebSearchPopup":
						var selText=popup.getAttribute("selectedtext");
						var engine=activeItem.engine;
						if(!engine)break;
						var submission=engine.getSubmission(selText,null);
						if(!submission)break;
						document.getElementById('searchbar').textbox.value=selText;
						gBrowser.loadOneTab(submission.uri.spec,null,null,submission.postData,null,false);
						break;
					case"ClosedTabsPopup":
						undoCloseTab(activeItem.index);
						break;
					case"HistoryPopup":
						gBrowser.webNavigation.gotoIndex(activeItem.index);
						break;
					case"AllTabsPopup":
						gBrowser.selectedTab=gBrowser.mTabs[activeItem.index];
						break;
				}
				popup.hidePopup();
			}
			break;
	case"popuphiding":
		var popup=document.getElementById(this.POPUP_ID);
		popup.removeEventListener("popuphiding",this,true);
		document.documentElement.removeEventListener("mouseup",this,true);
		while(popup.hasChildNodes())popup.removeChild(popup.lastChild);
		break;
	case"contextmenu":
		if(this._isMouseDownL||this._isMouseDownR||this._hideFireContext){
		var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
		var contextmenu = pref.getBoolPref("dom.event.contextmenu.enabled");
		pref.setBoolPref("dom.event.contextmenu.enabled", true);
		setTimeout(function () {
		pref.setBoolPref("dom.event.contextmenu.enabled", contextmenu);
}, 10);
			event.preventDefault();
			event.stopPropagation();
			this._shouldFireContext=true;
			this._hideFireContext=false;
		}
		break;
	case"draggesture":
		this._isMouseDownL=false;
		break;
	}
},
_displayContextMenu:function(event) {
	var evt=event.originalTarget.ownerDocument.createEvent("MouseEvents");
	evt.initMouseEvent("contextmenu",true,true,event.originalTarget.defaultView,0,event.screenX,event.screenY,event.clientX,event.clientY,false,false,false,false,2,null);
	event.originalTarget.dispatchEvent(evt);
},
_startGesture:function(event){
	this._lastX=event.screenX;
	this._lastY=event.screenY;
	this._directionChain="";
},
_progressGesture:function(event){
	var x=event.screenX, y=event.screenY;
	var lastX=this._lastX, lastY=this._lastY;
	var subX=x-lastX, subY=y-lastY;
	var distX=(subX>0?subX:(-subX)),distY=(subY>0?subY:(-subY));
	var direction;
	if(distX<10&&distY<10)return;
	if(distX>distY)direction=subX<0?"L":"R";
	else direction=subY<0?"U":"D";
	var dChain = this._directionChain;
	if(direction!=dChain.charAt(dChain.length-1)){
		dChain+=direction;
		this._directionChain+=direction;
		var gesture=this.GESTURES[dChain];
		XULBrowserWindow.statusTextField.label="Gesture: "+dChain+(gesture?' ('+gesture.name+')':'');
	}
	this._lastX=x;
	this._lastY=y;
},
_stopGesture:function(event){
	try{
		if(dChain=this._directionChain)this.GESTURES[dChain].cmd(this,event);
		XULBrowserWindow.statusTextField.label="";
	}catch(e){
		XULBrowserWindow.statusTextField.label='Unknown Gesture: '+dChain;
	}
	this._directionChain="";
},
_buildPopup:function(event,gestureCmd){
	if(!this.enablePopupGestures)return;
	var popup=document.getElementById(this.POPUP_ID);
	if(!popup){
		popup=document.createElement("popup");
		popup.id=this.POPUP_ID;
	}
	document.getElementById("mainPopupSet").appendChild(popup);
	popup.setAttribute("gesturecommand",gestureCmd);
	switch(gestureCmd){
		case"WebSearchPopup":
			var searchSvc=Cc["@mozilla.org/browser/search-service;1"].getService(Ci.nsIBrowserSearchService);
			var engines=searchSvc.getVisibleEngines({});
			if(engines.length<1)throw"No search engines installed.";
			for(var i=engines.length-1;i>=0;--i){
				var engine = engines[i];
				var menuitem=document.createElement("menuitem");
				menuitem.setAttribute("label",engine.name);
				menuitem.setAttribute("class","menuitem-iconic");
				if(engine.iconURI)menuitem.setAttribute("src",engine.iconURI.spec);
				popup.insertBefore(menuitem,popup.firstChild);
				menuitem.engine=engine;
			}
			popup.setAttribute("selectedtext",getBrowserSelection().toString());
			break;
		case"ClosedTabsPopup":
			try{
				if(!gPrefService.getBoolPref("browser.sessionstore.enabled"))throw"Session Restore feature is disabled.";
			}catch(e){}
			var ss=Cc["@mozilla.org/browser/sessionstore;1"].getService(Ci.nsISessionStore);
			if(ss.getClosedTabCount(window)==0)throw"No restorable tabs in this window.";
			var undoItems=eval("("+ss.getClosedTabData(window)+")");
			for(var i=0,LEN=undoItems.length;i<LEN;i++){
				var menuitem=popup.appendChild(document.createElement("menuitem"));
				menuitem.setAttribute("label",undoItems[i].title);
				menuitem.setAttribute("class","menuitem-iconic bookmark-item");
				menuitem.index=i;
				var iconURL=undoItems[i].image;
				if(iconURL)menuitem.setAttribute("image",iconURL);
			}
			break;
		case"HistoryPopup":
			var sessionHistory=gBrowser.webNavigation.sessionHistory;
			if(sessionHistory.count<1)throw"No back/forward history for this tab.";
			var curIdx=sessionHistory.index;
			for(var i=0,shc=sessionHistory.count;i<shc;i++){
				var entry=sessionHistory.getEntryAtIndex(i,false);
				if(!entry)continue;
				var menuitem=document.createElement("menuitem");
				popup.insertBefore(menuitem,popup.firstChild);
				menuitem.setAttribute("label",entry.title);
				try{
					var iconURL=Cc["@mozilla.org/browser/favicon-service;1"].getService(Ci.nsIFaviconService).getFaviconForPage(entry.URI).spec;
					menuitem.style.listStyleImage="url("+iconURL+")";
				}catch(e){}
				menuitem.index=i;
				if(i==curIdx){
					menuitem.style.listStyleImage="";
					menuitem.setAttribute("type","radio");
					menuitem.setAttribute("checked","true");
					menuitem.className="unified-nav-current";
					activeItem=menuitem;
				}else{
					menuitem.className=i<curIdx?"unified-nav-back menuitem-iconic":"unified-nav-forward menuitem-iconic";
				}
			}
			break;
		case"AllTabsPopup":
			var tabs=gBrowser.mTabs;
			if(tabs.length<1)return;
			for(var i=0,LEN=tabs.length;i<LEN;i++){
				var menuitem=popup.appendChild(document.createElement("menuitem"));
				var tab=tabs[i];
				menuitem.setAttribute("class","menuitem-iconic bookmark-item");
				menuitem.setAttribute("label",tab.label);
				menuitem.setAttribute("crop",tab.getAttribute("crop"));
				menuitem.setAttribute("image",tab.getAttribute("image"));
				menuitem.index=i;
				if(tab.selected)activeItem=menuitem;
			}
			break;
	}
	document.popupNode=null;
	document.tooltipNode=null;
	popup.addEventListener("popuphiding",this,true);
	popup.openPopup(null,"",event.clientX,event.clientY,false,false);
	document.documentElement.addEventListener("mouseup",this,true);
},
};
ucjsMouseGestures.init();
