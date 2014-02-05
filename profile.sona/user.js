/// いろいろ

// FirefoxのGUIで設定できるオプション
user_pref("browser.download.manager.closeWhenDone", true);
user_pref("browser.preferences.advanced.selectedTabIndex", 3);
user_pref("browser.startup.homepage", "http://google.co.jp/");
user_pref("browser.tabs.loadInBackground", false);
user_pref("browser.tabs.warnOnClose", false);
user_pref("xpinstall.whitelist.required", false);

// 1行テキストボックスに改行を含む文字列を張り付けするときの動作を設定 [2]
// 0: 改行も含めてそのまま貼り付ける
// 1: 最初の行だけを貼り付ける
// 2: 改行をスペースに置き換える
// 3: 改行を削除する
// 4: 改行をコンマに置き換える
user_pref("editor.singleLine.pasteNewlines", 2);


/* ===== タブ制御 ==============================*/
// ブラウザの起動時に開くページ [1]
// 0: 空白
// 1: ホームページ
// 2: 最後に表示していたページ
// 3: 最後に開いていたタブ全部
user_pref("browser.startup.page", 3);

// タブが1つの時にタブバーを隠す [true]
user_pref("browser.tabs.autoHide", false);

// タブの閉じるボタンの表示 [1]
// 0: アクティブなタブだけ表示
// 1: すべてのタブに表示
// 2: すべてのタブに非表示
// 3: 一番端っこに表示
user_pref("browser.tabs.closeButtons", 2);

// タブを閉じた時、元のタブにフォーカスするか [true]
user_pref("browser.tabs.selectOwnerOnClose", true);

// タブ復元の記憶数 [10]
user_pref("browser.sessionstore.max_tabs_undo", 25);

// リンクを中クリックしたときにタブで開くか [true]
user_pref("browser.tabs.opentabfor.middleclick", true);

// 検索バーの結果を新しいタブで開くか [false]
user_pref("browser.search.openintab", true);

// 新しいタブをバックグラウンドで開くか [true]
user_pref("browser.tabs.loadInBackground", false);

// 新しいタブでブックマークを開くとき、そのタブはバックグラウンドで開くか [false]
user_pref("browser.tabs.loadBookmarksInBackground", false);

// ブックマークフォルダを開く場合にタブを置き換えるか [true]
user_pref("browser.tabs.selectOwnerOnClose", false);


// 外部アプリケーションからのリンク挙動 [3]
// 1: 現在のタブ(ウィンドウ)に開く
// 2: 新しいウインドウで開く
// 3: 新しいタブで開く
user_pref("browser.link.open_external", 3);

// 新しいウインドウを開くリンクの挙動(JS含む) [3]
// 1: 現在のタブ(ウィンドウ)に開く
// 2: 新しいウインドウで開く
// 3: 新しいタブで開く
user_pref("browser.link.open_newwindow", 3);

// 新しいウィンドウの制限を変更 [2]
// 0: 新しいウィンドウをすべて現在のタブ(ウィンドウ)または新しいタブに開く
// 1: JavaScript によって開かれるウィンドウは対象外とする
// 2: サイズ・位置・ツールバーの指定が含まれる JavaScript ウィンドウは対象外とする
user_pref("browser.link.open_newwindow.restriction", 0);


// メモリキャッシュの最大容量

user_pref("browser.cache.memory.capacity", 65536);

// diskキャッシュをオフにする
user_pref("browser.cache.disk.enable" , false);

// キャッシュの保存先を変更(RAMDISK上に置いてる Qsoft Enterprise Liteを使ってRAMDISKを作成

// user_pref("browser.cache.disk.parent_directory","B:\\Temp");

// SSL通信で受け取ったデータをキャッシュするか否か

user_pref("browser.cache.disk_cache_ssl", true);

// 接続がエラーの時、うるさいダイアログでなくエラーページを表示させる

user_pref("browser.xul.error_pages.enabled", true);

// (時折)ソフト側でイベントがループしてしまったときに解析を中断させるか?

user_pref("content.interrupt.parsing", true);

// ページのレンダリング中の基準時間の有効化(?)

user_pref("content.notify.ontimer", true);

// 不明

//user_pref("content.maxtextrun", 8191);

user_pref("content.maxtextrun", 4095);

// 不明

user_pref("signed.applets.codebase_principal_support", true);

// about:pluginsでプラグインの完全な位置を示します

user_pref("plugin.expose_full_path", true);

// サブメニューの表示待機時間の設定。

user_pref("ui.submenuDelay", 0);

// ページの大まかなレイアウトの計算がすんだ時に、基準時間でのレンダリングが始まるまでのページの再処理時間(?)

user_pref("content.notify.backoffcount", 5);

// ipv6検索を無効にする

user_pref("network.dns.disableIPv6",true);

///速度変わるらしいからググって色々な値を参考にして試してみて

// ソフト側でイベントがループして、解析を中断させたとき、その処理までの時間

user_pref("content.max.tokenizing.time", 250000);

// content.notify.backoffcountで決めた初期量の時間の間隔(?)

user_pref("content.notify.interval", 500000);

// ページをレンダリングする前の待ち時間

user_pref("nglayout.initialpaint.delay", 500);

// ここで指定した時間、マウス又はキー操作をしないと high frequency mode から low frequency mode に切り替わる

user_pref("content.switch.threshold", 500000);


///パイプ設定(user_pref("network.http.pipelining", false);をtrueにしないと以下の設定は意味ありません

//パイプ有効

user_pref("network.http.pipelining", false);

// 通信のうちの最初の要求でパイプライン処理を使うか

user_pref("network.http.pipelining.firstrequest", true);

//パイプの最高本数

user_pref("network.http.pipelining.maxrequests", 8);

// 接続数の上限

user_pref("network.http.max-connections", 48);

// 1サーバ毎の接続数の上限

user_pref("network.http.max-connections-per-server", 16);

// 1プロキシ毎の持続的接続数の上限

user_pref("network.http.max-persistent-connections-per-proxy", 8);

// 1サーバ毎の持続的接続数の上限

user_pref("network.http.max-persistent-connections-per-server", 8);


/// その他高速化とは関係ない設定
// アンチウィルススキャンの無効化
user_pref("browser.download.manager.scanWhenDone",false);

// Fx 終了時にダウンロード履歴をクリアする (デフォ：2)
user_pref("browser.download.manager.retention",1);

// 文字列をダブルクリックしたときに半角スペースを取り除く
user_pref("layout.word_select.eat_space_to_next_word", false);

// ICCプロファイル設定
//user_pref("gfx.color_management.enabled", true);
//user_pref("gfx.color_management.display_profile", "D:\Software\L567INF_W\L567D65.icm");



// フレームを常にリサイズ可能に
user_pref("layout.frames.force_resizability", true);

// ソースの表示で長い行を自動的に折り返す
user_pref("view_source.wrap_long_lines", true);

// 右クリックを禁止にさせない
user_pref("nglayout.events.dispatchLeftClickOnly", true);

// URLバー・スクロールバーは隠すの禁止
user_pref("dom.disable_window_open_feature.location", true);
user_pref("dom.disable_window_open_feature.scrollbars",true);

// 拡張のインストールにいちいち許可するのがメンドクサイ
user_pref("xpinstall.whitelist.required", false);

// スクロールバー上での中クリックでその位置まで一気にスクロール
user_pref("middlemouse.scrollbarPosition", true);

// マウスの中クリックで、クリップボードの内容を張り付け
user_pref("middlemouse.paste", true);