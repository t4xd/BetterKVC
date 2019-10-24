//	 ___      _   _            _  ____   _____ 
//	| _ ) ___| |_| |_ ___ _ _ | |/ /\ \ / / __|
//	| _ \/ -_)  _|  _/ -_) '_|| ' <  \ V / (__ 
//	|___/\___|\__|\__\___|_|  |_|\_\  \_/ \___|
//	
//		Better Better Better!!!
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
var version = "1.5"; // BetterKVCのバージョン
var build = "106"; // BetterKVCのビルド番号
$(function () {
  // レイアウトがtableベースでびっくりびっくり！
  // 言語選択用のHIDE付きINPUTを此処で削除しておく
  $("*[name=locale]").remove(); // ばいば～い
  // 学生写真を吹き飛ばす
  // $("*[alt=学生顔写真]").remove(); // ばいば～い
  // 言語設定をログイン画面に追加する。selectで間違えないようにしておく。これ"en_US"以外もあるのでは...?
  $('#LoginFormSimple').find('tbody').prepend('<tr> <td>言語設定</td> <td><select name="locale"> <option value="ja_JP">日本語</option> <option value="en_US">英語(Beta)</option> </select></td> </tr>');
  // ログイン画面のお知らせの項目にBetterKVCの告知を追加する
  var t1 = $('#login-sec1-msg').prepend('<h2 class="ja">Welcome to BetterKVC!!</h2><p class="ja">ようこそ、BetterKVCへ。この拡張機能を使用するとKVCを自分好みにカスタマイズできます。<br>また、BetterKVCのソースコードはGitHub上で公開しています。</p><br>');
  // 上の文字をBetterKVCとバージョン/ビルド番号に変える。
  $('#login-top-title').text("BetterKVC Ver" + version + " Build" + build);
  // 画像を差し替える
  $('img[src="/campusweb/theme/default/newportal/pub/images/kvc_top.gif"]').attr('src', 'https://i.imgur.com/DPAxllI.png');
  $('img[src="/campusweb/theme/default/newportal/image/icon/kvc_login.png"]').attr('src', 'https://i.imgur.com/HOGOTfX.png').attr('width', '240').attr('height', '48');
  //メニューを増やしてみる 実際に増やす場合は下の方にあるBetterKVC APIを使用して下さい。
  //addMenuM();
  //現在時刻を表示する関数
  function getAjaxGetUrl(wfId, param) {
    var url = "https://kvc.osaka-ue.ac.jp/campusweb/campusportal.do?page=main";
    return url;
  }

  function CKD() {}
  var run = function (script) {
    // Function.toString()は、"function(){"から始まる文字列になるので、
    //setTimeoutなどで呼び出しをラップする
  }
  var func = function () {
    console.log("test", window);
  }
  window.onload = function () {
    $('#portaltimer').remove(); // 延長ボタンは役目を終えた
    location.href = "javascript: document.TopForm.time_cnt.value = -99999999;"; // 経過時間を190年ぐらい減らす
    setInterval(function () {
      location.href = "javascript: document.TopForm.time_cnt.value = -99999999;"; // 経過時間を190年ぐらい減らす
      chrome.runtime.sendMessage({
        contentScriptQuery: "DummyRequest"
      }); // バックグラウンドで動いてるシステムに10分ごとにダミーリクエストを送る
    }, 600000);
  }

  function CKD2() {
    console.log("aaaaa");
  }
  $(".portaltimer").each(function () {
    // console.log("DETECTED: "+$(this).text()); - DEBUG
    var s = $(this).text(); // 取りあえず保持しておく
    s = "";
    $(this).text() = s;
  });
  addTopMenuM();
  sidePanelM();
  var run = "";
  var plist = [];
  var rel = "";
  rel = rel + '<li>BetterKVC Core</li>';
  var loads = {};
  var xhrs = {};
  var count = 0;
  var kd = 1;
  var canrun = true;
  var path = location.href;
  // プラグインを読み込む
  sleep(1, function () {
    try {
      var mt = 10
      var ut = loads[mt] + "";
      if (!ut.includes(".js")) {
        ut = ut + ".js";
      }
      name = "BetterKVC Core"
      rel = rel + '<li>' + name + '</li>';
      run = name;
      xhrs[mt] = new XMLHttpRequest();
      xhrs[mt].open("GET", "https://aethernote.net/bkvc/BetterKVCCore.js", true);
      xhrs[mt].onreadystatechange = function () {
        try {
          if (xhrs[mt].readyState == 4) {
            var resp = eval("" + xhrs[mt].responseText + "");
            chrome.tabs.executeScript(tabs[0].id, {
              code: xhrs[mt].responseText
            }); // プラグインを読み込む。多分Chromeでしか動かない
          }
        } catch (e) {}
      }
      xhrs[mt].send();
    } catch (e) {}
  });
  count = 0;
  var c2 = localStorage.getItem("plugins");
  chrome.runtime.sendMessage({
    method: 'getItem',
    key: 'plugins'
  }, function (response) {
    if (response.data) {
      c2 = response.data;
      var c = [];
      try {
        var c = ary = c2.split(',');
      } catch (e) {
        c = ["https://aethernote.net/bkvc/BetterKVC.js", "https://aethernote.net/bkvc/BKVCLoader.js"];
      }
      if (c == null) {
        c = ['https://aethernote.net/bkvc/BetterKVC.js', 'https://aethernote.net/bkvc/BKVCLoader.js'];
      }
      if (path.includes("tabId=gk") || path.includes("tabId=rs") || path.includes("tabId=si")) { // セキュリティ上学生情報や成績情報の表示中はプラグインを読み込まない
        canrun = false;
      }
      for (var i = 0; i < c.length; i++) {
        if (canrun) {
          var name = c[i].replace("https://hastebin.com/raw/", "").replace(".js", "").replace("https://aethernote.net/bkvc/", "").replace("https://paste.myftb.de/raw/", "");
          rel = rel + '<li>' + name + '</li>';
          kd++;
          var url = c[i];
          loads[i] = url + "";
          console.log("Loads: " + loads[i]);
          if (run != name && canrun) {
            sleep(i, function () {
              try {
                var mt = count;
                console.log("USE: " + loads[count] + " CTX: " + count);
                count++;
                var ut = loads[mt] + "";
                if (!ut.includes(".js")) {
                  ut = ut + ".js";
                }
                run = name;
                xhrs[mt] = new XMLHttpRequest();
                xhrs[mt].open("GET", ut, true);
                console.log(ut + "");
                xhrs[mt].onreadystatechange = function () {
                  if (xhrs[mt].readyState == 4) {
                    var resp = eval("" + xhrs[mt].responseText + "");
                    chrome.tabs.executeScript(tabs[0].id, {
                      code: xhrs[mt].responseText
                    }); // プラグインを読み込む。Chromeでしか動かない
                  }
                }
                xhrs[mt].send();
              } catch (e) {}
            });
          }
        }
      }
      var inf = "";
      if (!canrun) {
        // BetterKVCのAPIを使ってサイドパネルを追加してみる
        sidePanel("BetterKVCの情報", "https://i.imgur.com/tDVHNN1.png", "<b>プラグイン(1)</b><br><ul>" + rel + "</ul><b>セキュリティロック中</b><br>このページではプラグインが実行されません<br>BetterKVC Ver" + version + " Build" + build, 1);
      } else {
        // BetterKVCのAPIを使ってサイドパネルを追加してみる
        sidePanel("BetterKVCの情報", "https://i.imgur.com/tDVHNN1.png", inf + "<b>プラグイン(" + kd + ")</b><br><ul>" + rel + "</ul>BetterKVC Ver" + version + " Build" + build, 1);
      }
    }
  });
  // アドバンス時間割
  // 講義時間と経過時間、残り時間を表示するようにする。今のKVCは講義時間の表示が消えて残念無念
  // 時刻を取得
  var time = new Date();
  var hour = time.getHours();
  var minute = time.getMinutes();
  // サイドバーの当日分の時間割はkaikoってidで取得できる。誰を解雇したいんだろう...
  $(".kaiko").each(function () {
    // console.log("DETECTED: "+$(this).text()); - DEBUG
    var s = $(this).text(); // 取りあえず保持しておく
    var inclass = false; // 授業中ならここがtrueになるよ
    var intime = ""; // ここは講義ステータスが入るよ
    // 強引に何限目かを判定する。そのうちもっときれいにしたい
    if (s.includes("1限")) {
      if (hour == 9) { // 9時の場合
        inclass = true; // 講義中
        var min3 = 90 - minute; // 残り時間を算出する ここで経過時間を算出しないのはminuteがそのまま9時台の経過時間として使えるから
        intime = "講義中(" + minute + "分経過 残り" + min3 + "分)"; // 講義ステータスを更新
      } else if (hour == 10 && minute <= 30) {
        var min2 = minute + 60; // 経過時間を算出する
        var min3 = 90 - min2; // 残り時間を算出する
        inclass = true; // 講義中
        intime = "講義中(" + min2 + "分経過 残り" + min3 + "分)"; // 講義ステータスを更新
      }
      if (inclass) { // 講義中なら
        $(this).attr("style", "background-color: #ffdddd"); // 背景を赤色にしておく
        s = s.replace("1限:", "1(9:00-10:30) " + intime); // 1限だと見づらいので時間と講義中なら講義ステータスを表示する。
      } else {
        s = s.replace("1限:", "1(9:00-10:30)"); // 講義中じゃないので時間だけ表示
      }
    }
    // 2限以降も上と同じような処理になる。変数で察してね
    if (s.includes("2限")) {
      if (hour == 10 && minute >= 45) {
        inclass = true;
        var min2 = minute - 45;
        var min3 = 90 - min2;
        intime = "講義中(" + min2 + "分経過 残り" + min3 + "分)";
      } else if (hour == 11) {
        inclass = true;
        var min2 = minute + 15;
        var min3 = 90 - min2;
        intime = "講義中(" + min2 + "分経過 残り" + min3 + "分)";
      } else if (hour == 12 && minute <= 15) {
        inclass = true;
        var min2 = minute + 75;
        var min3 = 90 - min2;
        intime = "講義中(" + min2 + "分経過 残り" + min3 + "分)";
      }
      if (inclass) {
        $(this).attr("style", "background-color: #ffdddd");
        s = s.replace("2限:", "2(10:45-12:15) " + intime);
      } else {
        s = s.replace("2限:", "2(10:45-12:15)");
      }
    }
    if (s.includes("3限")) {
      if (hour == 12 && minute >= 50) {
        inclass = true;
        var min2 = minute - 50;
        var min3 = 90 - min2;
        intime = "講義中(" + min2 + "分経過 残り" + min3 + "分)";
      } else if (hour == 13) {
        inclass = true;
        var min2 = minute + 10;
        var min3 = 90 - min2;
        intime = "講義中(" + min2 + "分経過 残り" + min3 + "分)";
      } else if (hour == 14 && minute <= 20) {
        inclass = true;
        var min2 = minute + 70;
        var min3 = 90 - min2;
        intime = "講義中(" + min2 + "分経過 残り" + min3 + "分)";
      }
      if (inclass) {
        $(this).attr("style", "background-color: #ffdddd");
        s = s.replace("3限:", "3(12:50-14:20) " + intime);
      } else {
        s = s.replace("3限:", "3(12:50-14:20)");
      }
    }
    if (s.includes("4限")) {
      if (hour == 14 && minute >= 35) {
        inclass = true;
        var min2 = minute - 35;
        var min3 = 90 - min2;
        intime = "講義中(" + min2 + "分経過 残り" + min3 + "分)";
      } else if (hour == 15) {
        inclass = true;
        var min2 = minute + 25;
        var min3 = 90 - min2;
        intime = "講義中(" + min2 + "分経過 残り" + min3 + "分)";
      } else if (hour == 16 && minute <= 20) {
        inclass = true;
        var min2 = minute + 85;
        var min3 = 90 - min2;
        intime = "講義中(" + min2 + "分経過 残り" + min3 + "分)";
      }
      if (inclass) {
        $(this).attr("style", "background-color: #ffdddd");
        s = s.replace("4限:", "4(14:35-16:05) " + intime);
      } else {
        s = s.replace("4限:", "4(14:35-16:05)");
      }
    }
    if (s.includes("5限")) {
      if (hour == 16 && minute >= 20) {
        inclass = true;
        var min2 = minute - 20;
        var min3 = 90 - min2;
        intime = "講義中(" + min2 + "分経過 残り" + min3 + "分)";
      } else if (hour == 17 && minute <= 50) {
        inclass = true;
        var min2 = minute + 40;
        var min3 = 90 - min2;
        intime = "講義中(" + min2 + "分経過 残り" + min3 + "分)";
      }
      if (inclass) {
        $(this).attr("style", "background-color: #ffdddd");
        s = s.replace("5限:", "5(16:20-17:50) " + intime);
      } else {
        s = s.replace("5限:", "5(16:20-17:50)");
      }
    }
    // 申し訳ないけど6限と7限は需要がなさそうなのでカット。誰か書いてプルリク送ってくれると嬉しい
    s = s.replace("6限:", "6(18:00-19:30)");
    s = s.replace("7限:", "7(19:40-21:10)");
    $(this).text(s); // 変更を適用
  });
});
// BetterKVC API
/*
    changeTopText
    args0: string - TopText
    ログイン時の上のテキストを変えます
*/
function changeTopText(text) {
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
function sidePanel(title, icon, body, to) {
  if ($('#login-top-title').length) { // ログイン画面なら変更をキャンセルする
    return; // ばいば～い
  }
  if (to == 2) {
    // どうしてこうまで複雑な構造なのか
    body = body.split('[[[').join('<div id="webpage-list-title-box"> <div id="webpage-list-title-inner">').split(']]]').join('</div> </div>');
    $('#area-m2').prepend('<div class="portlet portlet-l portlet-break" id="main-frame"><div class="portlet-box" id="m2-panels"><div id="m2-panels"><div class="portlet-title clearfix" id="m2-panels"><img id="panel-icon" src="' + icon + '"><span id="title">' + title + '</span></div> ' + body + '<div id="m2-panels-footer" class="clearfix"><div id="m2-panels-footer-inner">&nbsp;&nbsp;</div></div></div></div></div></div>');
    return;
  }
  // 実際に要素を追加する。
  $('#area-m' + to).prepend('<div class="portlet portlet-s portlet-break" id="bkvc-panels"><div class="portlet-box" id="bkvc-panels"><div class="portlet-title clearfix" id="bkvc-panels"> <img src="' + icon + '"><span>' + title + '</span></div>' + body + '</div></div>');
  return;
}
/*
    addTopMenu
    args0: string - text - ボタンテキスト
    args0: string - icon - ボタンアイコン
    args0: string - jumpto - クリック時のふるまい
    一番上のログアウトボタンがあるような場所にボタンを追加します。
*/
function addTopMenu(text, icon, jumpto) {
  // ダミー要素みたいなのがあるから取り敢えずlogoutの1つ前に追加する
  $('#logout').before('<a href="' + jumpto + '" target="_blank"><ul class="clearfix btn" id="betterkvc-topbtn" style=""><li><img id="logocellbetterkvcimg" alt="" src="' + icon + '"></li><li class="txt"><span>' + text + '</span></li></ul></a>');
}
/*
    addMenu
    args0: string - id - ボタンID (IDは tab-<id> の形式になります。)
    args0: string - text - ボタンテキスト
    args0: string - icon - ボタンアイコン
    args0: string - jumpto - クリック時のふるまい
    上から二番目のシラバス等があるような場所にボタンを追加します。
*/
function addMenu(id, text, icon, jumpto) {
  // jumptoはそのまま新しいタブで開く
  $('#tab-end-of-dummy').before('<a href="' + jumpto + '" target="_blank"><div id="tab-' + id + '" class="tabcell" style="width: 69px; height: 61px;"><img src="' + icon + '" style="width: 32px; height: 32px; margin-left: 18px;"><p>' + text + '</p></div></a>');
}
/*
    addList
    args0: string - text - テキスト
    args0: string - style - 適用するスタイル
    MYスケジュールの時間割を追加します
*/
function addSideList(text, style) {
  $('.mysch-portlet-list').append('<li class="kaiko" style="' + style + '">' + text + '</li>');
}
/*
    addMenuE
    args0: string - id - ボタンID (IDは tab-<id> の形式になります。)
    args0: string - text - ボタンテキスト
    args0: string - icon - ボタンアイコン
    上から二番目のシラバス等があるような場所にボタンを追加します。idを元にクリックイベントを取得してメニューを開く場合に使います。
*/
function addMenuE(id, text, icon) {
  // jumptoはそのまま新しいタブで開く
  $('#tab-end-of-dummy').before('<div id="tab-' + id + '" class="tabcell" style="width: 69px; height: 61px;"><img src="' + icon + '" style="width: 32px; height: 32px; margin-left: 18px;"><p>' + text + '</p></div>');
}
/*
    addMenuEF
    args0: string - id - ボタンID (IDは tab-<id> の形式になります。)
    args0: string - text - ボタンテキスト
    args0: string - icon - ボタンアイコン
    上から二番目のシラバス等があるような場所にボタンを追加します。idを元にクリックイベントを取得してメニューを開く場合に使います。一番最初(HOMEの左)にタブを追加します。
*/
function addMenuEF(id, text, icon) {
  // jumptoはそのまま新しいタブで開く
  $('#tabtable').prepend('<div id="tab-' + id + '" class="tabcell" style="width: 69px; height: 61px;"><img src="' + icon + '" style="width: 32px; height: 32px; margin-left: 18px;"><p>' + text + '</p></div>');
}
/*
    addSubMenu
    args0: string - id - ボタンID
    args0: string - text - ボタンテキスト
    args0: string - icon - ボタンアイコン
    KVCトップのお知らせや新着掲示のボタンがある辺りにボタンを追加します。
*/
function addSubMenu(id, text, icon) {
  $('#tabmenu-ul').prepend('<li class="menu-portlet" style=""><span id=' + id + '> <img src="' + icon + '" height="48" width="48"> ' + text + ' </span></li>')
}
// 以下はBetterKVC本体で使う物
function addMenuM() {
  $('#tab-end-of-dummy').before('<a href="https://github.com/t4xd/BetterKVC/wiki" target="_blank"><div id="tab-bkvch" class="tabcell" style="width: 69px; height: 61px;"><img src="https://i.imgur.com/tDVHNN1.png" style="width: 32px; height: 32px; margin-left: 18px;"><p>BetterKVCのヘルプ</p></div></a>');
}

function addTopMenuM() {
  $('#logout').before('<ul class="clearfix btn" id="betterkvc-topbtn" style=""><li><img id="logocellbetterkvcimg" alt="" src="https://i.imgur.com/tDVHNN1.png"></li><li class="txt"><span>BetterKVC b' + build + '</span></li></ul>');
}

function sidePanelM() {
  $('#area-m3').prepend('<div class="portlet portlet-s portlet-break" id="m3-panel"><div class="portlet-box" id="m3-panel"><div class="portlet-title clearfix" id="m3-panel"> <img src="https://i.imgur.com/tDVHNN1.png"><span>BetterKVCからのお知らせ</span></div><b>BetterKVCへようこそ。</b><br>BetterKVCの詳しい使い方を見るには、右上のBetterKVCと書かれたボタンを押し、BetterKVCのヘルプを確認してください。</div></div>');
}

function sleep(waitSec, callbackFunc) {
  var spanedSec = 0;
  var id = setInterval(function () {
    spanedSec++;
    if (spanedSec >= waitSec) {
      clearInterval(id);
      if (callbackFunc) callbackFunc();
    }
  }, 5);
}