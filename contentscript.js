// ___      _   _            _  ____   _____ 
//| _ ) ___| |_| |_ ___ _ _ | |/ /\ \ / / __|
//| _ \/ -_)  _|  _/ -_) '_|| ' <  \ V / (__ 
//|___/\___|\__|\__\___|_|  |_|\_\  \_/ \___|
//
//  Better Better Better!!!
//
/*

==================== [ 注意書き ] ====================
 　BetterKVCはKVCの要素を取得して上書きするとても簡単
 な内容の拡張機能です。この拡張機能はKVCの改悪(?)を
 受けて有志により開発されました。間違っても大学の方に
 問い合わせたりしないようにしましょう。

  また、この拡張機能はKVCのアップデートにより使用
 出来なくなる可能性があります。その時はアップデート
 されるのを待つか、GitHubからフォークして自力で更新
 しましょう。プルリクエストはいつでも受け付けています。

*/
var version = "1.2.0"; // BetterKVCのバージョン
var build = "20"; // BetterKVCのビルド番号

$(function(){
	// レイアウトがtableベースでびっくりびっくり！
	// 言語選択用のHIDE付きINPUTを此処で削除しておく
	$("*[name=locale]").remove(); // ばいば～い
	// 言語設定をログイン画面に追加する。selectで間違えないようにしておく。これ"en_US"以外もあるのでは...?
	$('#LoginFormSimple').find('tbody').prepend('<tr> <td>言語設定</td> <td><select name="locale"> <option value="ja_JP">日本語</option> <option value="en_US">英語(Beta)</option> </select></td> </tr>');
	// ログイン画面のお知らせの項目にBetterKVCの告知を追加する
	var t1 = $('#login-sec1-msg').prepend('<h2 class="ja">Welcome to BetterKVC!!</h2><p class="ja">ようこそ、BetterKVCへ。この拡張機能を使用するとKVCを自分好みにカスタマイズできます。<br>また、BetterKVCのソースコードはGitHub上で公開しています。</p><br>');
	// 上の文字をBetterKVCとバージョン/ビルド番号に変える。
	$('#login-top-title').text("BetterKVC Ver"+version+" Build"+build);
	// 画像を差し替える
	$('img[src="/campusweb/theme/default/newportal/pub/images/kvc_top.gif"]').attr('src','https://i.imgur.com/DPAxllI.png');
	$('img[src="/campusweb/theme/default/newportal/image/icon/kvc_login.png"]').attr('src','https://i.imgur.com/SZLyASJ.png').attr('width','240').attr('height','48');
	
	//メニューを増やしてみる 実際に増やす場合は下の方にあるBetterKVC APIを使用して下さい。
	addMenuM();	
	addTopMenuM();
	sidePanelM();
	var run = "";
	// プラグインを読み込む
	var c2 = localStorage.getItem("plugins");
	chrome.runtime.sendMessage({method: 'getItem', key: 'plugins'}, function (response) {
  	if (response.data) {
    		c2 = response.data;
		var c = [];
    		try{
			var c = ary = c2.split(',');
    		}catch (e){
			c = ["https://aethernote.net/bkvc/BetterKVC.js","https://aethernote.net/bkvc/BKVCLoader.js"];
    		}
		var count = c.length;
		if(c == null){
    			c = ['BetterKVC', 'BetterKVC Menu Extention'];
    		}
		var plist = [];
		var rel = "";
		var loads = {};
		var xhrs = {};
		var count = 0;
		var kd = 0;
		for (var i=0; i<c.length;i++){
			var name = c[i].replace("https://hastebin.com/raw/", "").replace(".js",
				"").replace("https://aethernote.net/bkvc/", "").replace("https://paste.myftb.de/raw/", "");
				rel = rel + '<li>'+name+'</li>';
				kd++;
				//alert(run+" == "+name);
				var url = c[i];
				loads[i] = url+"";
				if(run != name){
					sleep(i, function () {
						try{

						var mt = count;
						count++;
						var ut = loads[mt]+"";
						if(!ut.includes(".js")){
							ut = ut + ".js";
						}
						name = ut.replace("https://aethernote.net/bkvc/","").replace(".js","");
						rel = rel + '<li>'+name+'</li>';
						run = name;
						xhrs[mt] = new XMLHttpRequest();
						xhrs[mt].open("GET", ut, true);
						xhrs[mt].onreadystatechange = function() {
							if (xhrs[mt].readyState == 4) {
      								var resp = eval("" + xhrs[mt].responseText + "");
      								chrome.tabs.executeScript(tabs[0].id, {code: xhrs[mt].responseText}); // プラグインを読み込む。Chromeでしか動かない
							}
						}
						xhrs[mt].send();
						}catch(e){}
					});
				}
			
		}
		// BetterKVCのAPIを使ってサイドパネルを追加してみる
		sidePanel("プラグイン情報", "https://i.imgur.com/tDVHNN1.png", "<b>プラグイン("+kd+")</b><br><ul>"+rel+"</ul>", 1);
  	}});
	

	// アドバンス時間割
	// 講義時間と経過時間、残り時間を表示するようにする。今のKVCは講義時間の表示が消えて残念無念

	// 時刻を取得
	var time= new Date();
	var hour = time.getHours();
	var minute = time.getMinutes();
	// サイドバーの当日分の時間割はkaikoってidで取得できる。誰を解雇したいんだろう...
	$(".kaiko").each( function() {
		// console.log("DETECTED: "+$(this).text()); - DEBUG
        	var s = $(this).text(); // 取りあえず保持しておく
		var inclass = false; // 授業中ならここがtrueになるよ
		var intime = ""; // ここは講義ステータスが入るよ

		// 強引に何限目かを判定する。そのうちもっときれいにしたい

		if(s.includes("1限")){
			if(hour == 9){ // 9時の場合
				inclass = true; // 講義中
				var min3 = 90 - minute; // 残り時間を算出する ここで経過時間を算出しないのはminuteがそのまま9時台の経過時間として使えるから
				intime = "講義中("+minute+"分経過 残り"+min3+"分)"; // 講義ステータスを更新
			}else if(hour == 10 && minute <= 30){
				var min2 = minute + 60; // 経過時間を算出する
				var min3 = 90 - min2; // 残り時間を算出する
				inclass = true; // 講義中
				intime = "講義中("+min2+"分経過 残り"+min3+"分)"; // 講義ステータスを更新
			}
			if(inclass){ // 講義中なら
				$(this).attr("style", "background-color: #ffdddd"); // 背景を赤色にしておく
				s = s.replace("1限:","1(9:00-10:30) "+intime); // 1限だと見づらいので時間と講義中なら講義ステータスを表示する。
			}else{
				s = s.replace("1限:","1(9:00-10:30)"); // 講義中じゃないので時間だけ表示
			}
		}
		
		// 2限以降も上と同じような処理になる。変数で察してね
		
		if(s.includes("2限")){
			if(hour == 10 && minute >= 45){
				inclass = true;
				var min2 = minute - 45;
				var min3 = 90 - min2;
				intime = "講義中("+min2+"分経過 残り"+min3+"分)";
			}else if(hour == 11){
				inclass = true;
				var min2 = minute + 15;
				var min3 = 90 - min2;
				intime = "講義中("+min2+"分経過 残り"+min3+"分)";
			}else if(hour == 12 && minute <= 15){
				inclass = true;
				var min2 = minute + 75;
				var min3 = 90 - min2;
				intime = "講義中("+min2+"分経過 残り"+min3+"分)";
			}
			if(inclass){
				$(this).attr("style", "background-color: #ffdddd");
				s = s.replace("2限:","2(10:45-12:15) "+intime);
			}else{
				s = s.replace("2限:","2(10:45-12:15)");
			}
		}
		if(s.includes("3限")){
			if(hour == 12 && minute >= 50){
				inclass = true;
				var min2 = minute - 50;
				var min3 = 90 - min2;
				intime = "講義中("+min2+"分経過 残り"+min3+"分)";
			}else if(hour == 13){
				inclass = true;
				var min2 = minute + 10;
				var min3 = 90 - min2;
				intime = "講義中("+min2+"分経過 残り"+min3+"分)";
			}else if(hour == 14 && minute <= 20){
				inclass = true;
				var min2 = minute + 70;
				var min3 = 90 - min2;
				intime = "講義中("+min2+"分経過 残り"+min3+"分)";
			}
			if(inclass){
				$(this).attr("style", "background-color: #ffdddd");
				s = s.replace("3限:","3(12:50-14:20) "+intime);
			}else{
				s = s.replace("3限:","3(12:50-14:20)");
			}
		}
		if(s.includes("4限")){
			if(hour == 14 && minute >= 35){
				inclass = true;
				var min2 = minute - 35;
				var min3 = 90 - min2;
				intime = "講義中("+min2+"分経過 残り"+min3+"分)";
			}else if(hour == 15){
				inclass = true;
				var min2 = minute + 25;
				var min3 = 90 - min2;
				intime = "講義中("+min2+"分経過 残り"+min3+"分)";
			}else if(hour == 16 && minute <= 20){
				inclass = true;
				var min2 = minute + 85;
				var min3 = 90 - min2;
				intime = "講義中("+min2+"分経過 残り"+min3+"分)";
			}
			if(inclass){
				$(this).attr("style", "background-color: #ffdddd");
				s = s.replace("4限:","4(14:35-16:05) "+intime);
			}else{
				s = s.replace("4限:","4(14:35-16:05)");
			}
		}
		if(s.includes("5限")){
			if(hour == 16 && minute >= 20){
				inclass = true;
				var min2 = minute - 20;
				var min3 = 90 - min2;
				intime = "講義中("+min2+"分経過 残り"+min3+"分)";
			}else if(hour == 17 && minute <= 50){
				inclass = true;
				var min2 = minute + 40;
				var min3 = 90 - min2;
				intime = "講義中("+min2+"分経過 残り"+min3+"分)";
			}
			if(inclass){
				$(this).attr("style", "background-color: #ffdddd");
				s = s.replace("5限:","5(16:20-17:50) "+intime);
			}else{
				s = s.replace("5限:","5(16:20-17:50)");
			}
		}
		// 申し訳ないけど6限と7限は需要がなさそうなのでカット。誰か書いてプルリク送ってくれると嬉しい
		s = s.replace("6限:","6(18:00-19:30)");
		s = s.replace("7限:","7(19:40-21:10)");
		$(this).text(s); // 変更を適用
	});
});
chrome.extension.onRequest.addListener ( // 上と基本的に同じことをする。何らかの障害で上のメソッドが正常に実行されなかった場合にボタンで発動
    function(request, sender, sendResponse) {
	alert("BetterKVC v"+version+" build"+build);
    }
)

// BetterKVC API

/*
    changeTopText
    args0: string - TopText
    ログイン時の上のテキストを変えます
*/

function changeTopText(text){
	$('#login-top-title').text(text); // 簡単に変えられるようになってて良い
}

/*
    sidePanel
    args0: string - title - パネルのタイトル
    args1: string - icon - パネルのアイコン
    args2: string - body - パネルの本文
    args3: string - to - 1で左カラムに、3で右カラムに追加します
    ホームのサイドパネルを追加します。
*/

function sidePanel(title, icon, body, to){
	if($('#login-top-title').length){ // ログイン画面なら変更をキャンセルする
		return; // ばいば～い
	}
	// 実際に要素を追加する。idとかそのまんまだから問題ありそうだけど多分大丈夫かなぁ
	$('#area-m'+to).prepend('<div class="portlet portlet-s portlet-break" id="wf_PTW0005000-s_20180524134229-box"> <div class="loading" id="wf_PTW0005000-s_20180524134229-loading" style=""></div> <div class="portlet-box" id="wf_PTW0005000-s_20180524134229"><div class="portlet-title clearfix" id="wf_PTW0005000-s_20180524134229-title"> <img src="'+icon+'"><span>'+title+'</span></div>'+body+'</div></div>');
}

/*
    addTopMenu
    args0: string - text - ボタンテキスト
    args0: string - icon - ボタンアイコン
    args0: string - jumpto - クリック時のふるまい
    一番上のログアウトボタンがあるような場所にボタンを追加します。
*/

function addTopMenu(text, icon, jumpto){
	// ダミー要素みたいなのがあるから取り敢えずlogoutの1つ前に追加する
	$('#logout').before('<a href="'+jumpto+'" target="_blank"><ul class="clearfix btn" id="betterkvc-topbtn" style=""><li><img id="logocellbetterkvcimg" alt="" src="'+icon+'"></li><li class="txt"><span>'+text+'</span></li></ul></a>');
}

/*
    addMenu
    args0: string - id - ボタンID
    args0: string - text - ボタンテキスト
    args0: string - icon - ボタンアイコン
    args0: string - jumpto - クリック時のふるまい
    上から二番目のシラバス等があるような場所にボタンを追加します。
*/

function addMenu(id,text,icon,jumpto){
	// jumptoはそのまま新しいタブで開く
	$('#tab-end-of-dummy').before('<a href="'+jumpto+'" target="_blank"><div id="tab-"'+id+' class="tabcell" style="width: 69px; height: 61px;"><img src="'+icon+'" style="width: 32px; height: 32px; margin-left: 18px;"><p>'+text+'</p></div></a>');
}


// 以下はBetterKVC本体で使う物

function addMenuM(){
	$('#tab-end-of-dummy').before('<a href="https://github.com/t4xd/BetterKVC/wiki" target="_blank"><div id="tab-bkvc" class="tabcell" style="width: 69px; height: 61px;"><img src="https://i.imgur.com/tDVHNN1.png" style="width: 32px; height: 32px; margin-left: 18px;"><p>BetterKVCのヘルプ</p></div></a>');
}

function addTopMenuM(){
	$('#logout').before('<ul class="clearfix btn" id="betterkvc-topbtn" style=""><li><img id="logocellbetterkvcimg" alt="" src="https://i.imgur.com/tDVHNN1.png"></li><li class="txt"><span>BetterKVC b'+build+'</span></li></ul>');
}

function sidePanelM(){
	$('#area-m3').prepend('<div class="portlet portlet-s portlet-break" id="wf_PTW0005000-s_20180524134229-box"> <div class="loading" id="wf_PTW0005000-s_20180524134229-loading" style=""></div> <div class="portlet-box" id="wf_PTW0005000-s_20180524134229"><div class="portlet-title clearfix" id="wf_PTW0005000-s_20180524134229-title"> <img src="https://i.imgur.com/tDVHNN1.png"><span>BetterKVCからのお知らせ</span></div><b>BetterKVCへようこそ。</b><br>BetterKVCの詳しい使い方を見るには、右上のBetterKVCのヘルプと書かれたボタンを押してください。</div></div>');
}

function sleep(waitSec, callbackFunc) {
    var spanedSec = 0;
    var id = setInterval(function () {
        spanedSec++;
        if (spanedSec >= waitSec) {
            clearInterval(id);
            if (callbackFunc) callbackFunc();
        }
    }, 1000);
 
}