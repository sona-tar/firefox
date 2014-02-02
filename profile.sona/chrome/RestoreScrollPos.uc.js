/* リロード時にスクロール位置を復元するかもしれないもの */
(function() {
  const Ci = Components.interfaces;
  function rspListener(aContent) {
    this.startflag = false;
    this.preX = 0;
    this.preY = 0;
    this.content = aContent;
  }
  rspListener.prototype = {
    OnHistoryReload : function(aURI, aFlags) {
      this.preX = this.content.scrollX;
      this.preY = this.content.scrollY;
      this.startflag = true;
      return true;
    },
    OnHistoryGoBack : function(aURI) { return true; },
    OnHistoryGoForward : function(aURI) { return true; },
    OnHistoryGotoIndex : function(aIndex, aURI) { return true; },
    OnHistoryNewEntry : function(aURI) { return 0; },
    OnHistoryPurge : function(aParam) { return true; },

    onStateChange: function(aWebProgress, aRequest, aStateFlags, aStatus) {
      if (aStateFlags & Ci.nsIWebProgressListener.STATE_STOP &&
          aStateFlags & Ci.nsIWebProgressListener.STATE_IS_DOCUMENT) {
        if (this.startflag) {
          this.content.scrollTo(this.preX, this.preY);
          this.startflag = false;
        }
      }
    },
    onLocationChange: function() { },
    onProgressChange: function() { },
    onStatusChange: function() { },
    onSecurityChange: function() { },
    onLinkIconAvailable: function() { },
    QueryInterface: function(aIID) {
     if (aIID.equals(Ci.nsISHistoryListener) ||
         aIID.equals(Ci.nsIWebProgressListener) ||
         aIID.equals(Ci.nsISupportsWeakReference) ||
         aIID.equals(Ci.nsISupports))
       return this;
     throw Components.results.NS_NOINTERFACE;
    }
  };
  function rspRegister(aBrowser) {
    aBrowser.rspListener = new rspListener(aBrowser.contentDocument.defaultView);
    aBrowser.addProgressListener(aBrowser.rspListener, Ci.nsIWebProgress.NOTIFY_STATE_DOCUMENT);
    aBrowser.sessionHistory.addSHistoryListener(aBrowser.rspListener);
  }
  function rspUnRegister(aBrowser) {
    aBrowser.removeProgressListener(aBrowser.rspListener);
    aBrowser.sessionHistory.removeSHistoryListener(aBrowser.rspListener);
  }
  gBrowser.browsers.forEach(rspRegister);
  window.addEventListener("unload", function(){ gBrowser.browsers.forEach(rspUnRegister); }, false);
  gBrowser.addEventListener("TabOpen", function(event) {
    var browser = event.originalTarget.linkedBrowser;
    if (browser && !browser.rspListener) {
      rspRegister(browser);
    }
  }, false);
  gBrowser.addEventListener("TabClose", function(event) {
    var browser = event.originalTarget.linkedBrowser;
    if (browser && browser.rspListener) {
      rspUnRegister(browser);
    }
  }, false);
})();