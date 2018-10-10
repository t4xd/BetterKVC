// Icon clicked.
chrome.browserAction.onClicked.addListener(function(tab) {
var c2 = localStorage.getItem("plugins");
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
		var plist = [];　//ここが配列になる
		var rel = "";
		for (var i=0; i<c.length;i++){
				var name = c[i].replace("https://aethernote.net/bkvc/","").replace(".js","");
				rel = rel + '<li>'+name+'</li>';
				chrome.tabs.executeScript(null,{file: c[i]}, function(){});
		
		}

});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.method) {
    case 'reloadscript': // 保存されているデータ数を取得

	break;
    case 'getLength': // 保存されているデータ数を取得
      sendResponse({data: localStorage.length});
      break;
    case 'getKeyName': // 指定されたn番目のkey名を取得
      sendResponse({data: localStorage.key(request.number)});
      break;
    case 'getItem': // 指定されたkeyの値を取得
      sendResponse({data: localStorage.getItem(request.key)});
      break;
    case 'setItem': // 指定されたkeyと値を保存（更新）
      sendResponse({data: localStorage.setItem(request.key, request.value)});
      break;
    case 'removeItem': // 指定されたkeyの値を削除
      sendResponse({data: localStorage.removeItem[request.key]});
      break;
    case 'clearAll': //　すべてのデータを削除
      sendResponse({data: localStorage.clear()});
      break;
    default:
      console.log('no method');
      break;
  }
});