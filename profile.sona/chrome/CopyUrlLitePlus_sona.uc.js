// ==UserScript==
// @name           Copy URL Lite+　sona
// @version        0.0.1
// @description    Shinya氏作成のCopy URL Lite+ 1.4.0を元にsona向けに改変したものです。
// @author         sona
// @compatibility  Firefox 2.0 3.0
// @include        chrome://browser/content/browser.xul
// @note           
// ==/UserScript==

// ==UserScript==
// @name           Copy URL Lite+
// @version        1.4.0
// @description    Like Copy URL+ extention.
// @author         Shinya
// @homepage       http://www.code-404.net/article/2007/07/15/copy-url-lite
// @namespace      http://www.code-404.net/
// @compatibility  Firefox 2.0 3.0
// @include        chrome://browser/content/browser.xul
// @note           
// ==/UserScript==

/* Copy URL Lite
 *   nanto_vi (TOYAMA Nao), 2006-12-26
 *
 * Copy URL and extra informations from the context menu.
 *
 * http://nanto.asablo.jp/blog/2006/12/31/1083170
 */

(function(){
  
  var locale = Components.classes["@mozilla.org/preferences-service;1"].
    getService(Components.interfaces.nsIPrefBranch);
  locale = locale.getCharPref("general.useragent.locale");
  
  var mMenus = [
    {
      // タイトル
      label: locale.indexOf("ja") == -1 ? "Title" : "\u30bf\u30a4\u30c8\u30eb\u3092\u30B3\u30D4\u30FC",
      accesskey: "T",
      text: '%TITLE%'
    },
    {
      // URI
      label: locale.indexOf("ja") == -1 ? "URI" : "URI\u3092\u30B3\u30D4\u30FC",
      accesskey: "U",
      text: '%URL%'
    },
    {
      // タイトルと URI
      label: locale.indexOf("ja") == -1 ? "Title, URI" : "\u30BF\u30A4\u30C8\u30EB\u3068URI\u3092\u30B3\u30D4\u30FC",
      accesskey: "C",
      text: '%TITLE%%EOL%%URL%%EOL%'
    },
    {
      //リンクの文字列をコピー
      label: locale.indexOf("ja") == -1 ? "Link PlainText" :
        "\u30EA\u30F3\u30AF\u306E\u6587\u5B57\u5217\u3092\u30B3\u30D4\u30FC",
      accesskey: "L",
      text: '%LINK_TITLE%',
      condition: "link"
    },
    {
      // リンクのURIをコピー
      label: locale.indexOf("ja") == -1 ? "Link URI" :
        "\u30EA\u30F3\u30AF\u306EURI\u3092\u30B3\u30D4\u30FC",
      accesskey: "M",
      text: '%LINK_URL%%',
      condition: "link"
    },
    {
      //リンクの文字列とURIをコピー
      label: locale.indexOf("ja") == -1 ? "Link PlainText URI" :
        "\u30EA\u30F3\u30AF\u306E\u6587\u5B57\u5217\u3068URI\u3092\u30B3\u30D4\u30FC",
      accesskey: "K",
      text: '%LINK_TITLE%%EOL%%LINK_URL%',
      condition: "link"
    },
    {
      // HTML
      label: locale.indexOf("ja") == -1 ? "HTML" : "HTML\u3092\u30B3\u30D4\u30FC",
      accesskey: "H",
      text: '<a href="%URL_HTMLIFIED%">%TITLE_HTMLIFIED%</a>'
    },
    {
      // 画像リンク
      label: locale.indexOf("ja") == -1 ? "Image Tag" : "\u753B\u50CF\u304B\u3089img\u30BF\u30B0\u306E\u751F\u6210",
      accesskey: "B",
      text: '<img src="%IMAGE_URL_HTMLIFIED%" />',
      condition: "image"
    }

  ];
  
  init: {
    var contextMenu = document.getElementById("contentAreaContextMenu");
    var separator = document.getElementById("context-sep-properties");
    
    for(var i = 0, menu; menu = mMenus[i]; i++){
      var menuItem;
      if(menu.label == "separator"){
        menuItem = document.createElement("menuseparator");
      }
      else{
        menuItem = document.createElement("menuitem");
        menuItem.setAttribute("label", menu.label);
        if("accesskey" in menu) menuItem.setAttribute("accesskey", menu.accesskey);
        menuItem.culMenu = menu;
        menuItem.addEventListener("command", copyText, false);
      }
      menuItem.id = "copyurllite-menu-" + i;
      contextMenu.insertBefore(menuItem, separator);	
    }
  
    contextMenu.addEventListener("popupshowing", setMenuDisplay, false);
  }
  
  function copyText(aEvent){
    
    function htmlEscape(text) {
      text = text.replace(/&/g, "&amp;");
      text = text.replace(/>/g, "&gt;");
      text = text.replace(/</g, "&lt;");
      text = text.replace(/"/g, "&quot;");
      return text;
    }
    
    function convertText(text){
      text = text.replace(/%URL_HTMLIFIED%/g, url_html);
      text = text.replace(/%URL%/g, url);
      text = text.replace(/%TITLE_HTMLIFIED%/g, title_html);
      text = text.replace(/%TITLE%/g, title);

      if(gContextMenu.onLink){
        text = text.replace(/%LINK_URL%/g, link);
	text = text.replace(/%LINK_TITLE%/g, linkTitle);
      }
      if(gContextMenu.onImage){
        text = text.replace(/%IMAGE_URL_HTMLIFIED%/g, imageUriHtml);
      }

      text = text.replace(/%EOL%/g, eol);
      return text;
    }
    
    var text = aEvent.target.culMenu.text;
    var win = content.document;
    var title = win.title;
    var title_html = htmlEscape(title);
    var url = win.location.href;
    var url_html = htmlEscape(url);

    if(gContextMenu.onLink){
      var link = gContextMenu.getLinkURL().toString();
      var link_html = htmlEscape(link);
      var linkTitle = gContextMenu.linkText();
    }
    if(gContextMenu.onImage){
      var imageUri = gContextMenu.imageURL;
      var imageUriHtml = htmlEscape(imageUri);
    }

    var eol = "\r\n";
    
    Cc["@mozilla.org/widget/clipboardhelper;1"]
      .getService(Ci.nsIClipboardHelper).copyString(convertText(text));
  }
  
  function setMenuDisplay(){
    for (var i = 0, menu; menu = mMenus[i]; i++)
      document.getElementById("copyurllite-menu-" + i).hidden =
        menu.condition == null ? (gContextMenu.isTextSelected || gContextMenu.onLink || gContextMenu.onImage):
        menu.condition == "link" ?
          !gContextMenu.onLink :
	menu.condition == "image" ?
          !gContextMenu.onImage : false;
  }
  
})();