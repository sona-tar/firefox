// addMenu.uc.js の設定ファイルのサンプル
/*
◆ 利用可能な変数 ◆
%EOL%            改行(\r\n)
%TITLE%          ページタイトル
%URL%            URI
%SEL%            選択範囲の文字列
%RLINK%          リンクアンカー先の URL
%IMAGE_URL%      画像の URL
%IMAGE_ALT%      画像の alt 属性
%IMAGE_TITLE%    画像の title 属性
%LINK%           リンクアンカー先の URL
%LINK_TEXT%      リンクのテキスト
%RLINK_TEXT%     リンクのテキスト
%MEDIA_URL%      メディアの URL
%CLIPBOARD%      クリップボードの内容
%FAVICON%        Favicon の URL
%EMAIL%          リンク先の E-mail アドレス
%HOST%           ページのホスト(ドメイン)
%LINK_HOST%      リンクのホスト(ドメイン)
%RLINK_HOST%     リンクのホスト(ドメイン)

%XXX_HTMLIFIED%  HTML エンコードされた上記変数（XXX → TITLE などに読み替える）
%XXX_HTML%       HTML エンコードされた上記変数
%XXX_ENCODE%     URI  エンコードされた上記変数

◇ 簡易的な変数 ◇
%h               ページのホスト(ドメイン)
%i               画像の URL
%l               リンクの URL
%m               メディアの URL
%p               クリップボードの内容
%s               選択文字列
%t               ページのタイトル
%u               ページの URL

基本的に Copy URL Lite+ の変数はそのまま使えます。
大文字・小文字は区別しません。
*/


/**********************************************************************************
 * ページの右クリックメニューに追加
 **********************************************************************************/
 page({
	label  : "リンクの文字列をコピー",
	text   : "%LINK_TEXT%",
});

page({
	label  : "タイトルとURLコピー",
	text   : "%TITLE%\r\n%URL%",
});

page({
	label  : "タイトルとURLをMarkdown記法でコピー",
	text   : "[%TITLE%](%URL%)",
});

page({
	label  : "画像のURLをMarkdown記法でコピー",
	text   : "![%IMAGE_TITLE%](%IMAGE_URL%)",
});

/**********************************************************************************
 * コンテキストメニューの区切り線
 **********************************************************************************/
page({});

/**********************************************************************************
 * サブメニューを作成
 **********************************************************************************/
// pagesub({ ... }) でサブメニューにアイテムを追加できる
var pagesub = PageMenu({ label: "Web連携メニュー" });

// 配列を入れてもいい
pagesub([
	{
		label: "はてなブックマークに登録",
		url: "http://b.hatena.ne.jp/my/add.confirm?url=%u",
		condition: "nolink"
	},
	{
		label: "Google キャッシュで開く",
		url: "http://www.google.co.jp/search?hl=ja&=cache:%u",
		condition: "nolink"
	},
	{
		label: "Web Archive で開く",
		url: "http://wayback.archive.org/web/*/%u",
		condition: "nolink"
	}
]);


// IE などで開くメニューを作る
var execute = PageMenu({ label: "外部アプリケーションで開く", accesskey: "E", class: "exec" });
execute([
	{
		label: "Internet Explorer で開く",
		text: "%u",
		exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe",
		accesskey: "I",
		condition: "nolink"
	},

	{
		label: "Chrome で開く",
		text: "%u",
		exec: Services.dirsvc.get("LocalAppData", Ci.nsILocalFile).path + "\\Google\\Chrome\\Application\\chrome.exe",
		accesskey: "C",
		condition: "nolink"
	},
	{
		label: "Firefox再起動",
		accesskey: "R",
		oncommand: "Application.restart();"
	}
]);



/**********************************************************************************
 * ファイルメニューなどを右クリックメニューから無理矢理使えるようにする
 **********************************************************************************/
// 既存の menupopup をサブメニューとして利用する関数
// menu に subpopup 属性が必要
function subPopupshowing(event) {
	var subPopup = document.getElementById(event.currentTarget.getAttribute('subpopup'));
	if (!subPopup) return;

	var popup = event.target;
	if (!popup.hasAttribute('style')) {
		popup.style.cssText = [
			'-moz-appearance: none !important;'
			,'max-height: 1px !important;'
			,'border: none !important;'
			,'background: transparent !important;'
			,'opacity: 0 !important;'
		].join(' ');
	}
	popup.style.setProperty('min-width', (popup._width || 100)+'px', 'important');

	var { screenY, screenX, width } = popup.boxObject;
	var popupshown = function(evt) {
		var utils = window.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowUtils);
		utils.sendMouseEvent('mousemove', screenX, screenY, 0, 1, 0);
		subPopup.removeEventListener('popupshown', popupshown, false);
		popup._width = subPopup.boxObject.width;
	};
	setTimeout(function() {
		subPopup.addEventListener('popupshown', popupshown, false);
		subPopup.openPopupAtScreen(screenX-2, screenY-2, true);
	}, 0);
};

// 右クリックメニューに ファイル・ブックマークなどを作る

PageMenu({
	label: 'ツールメニュー'
	,accesskey: 'Y'
	,subpopup: 'menu_ToolsPopup'
	,onpopupshowing: subPopupshowing
});
