$(document).ready(function() {
	var userAgent = window.navigator.userAgent;
	if(!userAgent.includes("Chrome")){
		alert("プラグイン機能はGoogle Chromeでのみ利用できます。");
return;
	}
	var c2 = localStorage.getItem("plugins");
	var c = [];
	try {
		var c = ary = c2.split(',');
	} catch (e) {
		c = ["https://aethernote.net/bkvc/BetterKVC.js",
			"https://aethernote.net/bkvc/BKVCLoader.js"
		];
	}
	$("#pluginlist").val(c);
	if (c == null) {
		c = ['BetterKVC', 'BetterKVC Menu Extention'];
	}
	var plist = new Array();
	for (var i = 0; i < c.length; i++) {
			var name = c[i].replace("https://hastebin.com/raw/", "").replace(".js",
				"").replace("https://aethernote.net/bkvc/", "").replace("https://paste.myftb.de/raw/", "");
		var rel = '<button id="rem" class="square_btn" name="' + c[i] +
			'">削除</button></li>';
		if (name == "AdvancedKVC") {
			rel = "";
		}
		plist.push('<li name="' + name + '">' + name + ' ' + rel); //ここにpush()がくる
	}
	document.getElementById('plugins').innerHTML = plist.join('');
});
$(document).on("click", "#add", function() {
	var c2 = localStorage.getItem("plugins");
	var c = [];
	try {
		var c = ary = c2.split(',');
	} catch (e) {
		c = ["https://aethernote.net/bkvc/BetterKVC.js",
			"https://aethernote.net/bkvc/BKVCLoader.js"
		];
	}
	$("#pluginlist").val(c);
	if (c == null) {
		c = ['BetterKVC', 'BetterKVC Menu Extention'];
	}
	var m = $("#plugin-url").val();
		c.push(m);
		localStorage.setItem("plugins", c);
		//$("#pluginlist").val(c);
	
	var plist = [];
	for (var i = 0; i < c.length; i++) {
			var name = c[i].replace("https://hastebin.com/raw/", "").replace(".js",
				"").replace("https://aethernote.net/bkvc/", "").replace("https://paste.myftb.de/raw/", "");
			var rel = '<button id="rem" class="square_btn" name="' + c[i] +
				'">削除</button></li>';
		if (name == "AdvancedKVC") {
				rel = "";
			}
			plist.push('<li name="' + name + '">' + name + ' ' + rel); //ここにpush()がくる
		
	}
	document.getElementById('plugins').innerHTML = plist.join('');
});
$(document).on("click", "#rem", function() {
	console.log("CLICKED");
	var c2 = localStorage.getItem("plugins");
	var c = [];
	try {
		var c = ary = c2.split(',');
	} catch (e) {
		c = ["https://aethernote.net/bkvc/BetterKVC.js",
			"https://aethernote.net/bkvc/BKVCLoader.js"
		];
	}
	var id = $(this).attr("name");
	//	alert("CLOCKED - "+id);
	c.some(function(v, i) {
		if (v == id) c.splice(i, 1);
	});
	console.log("REMOVED - " + id);
	localStorage.setItem("plugins", c);
	var plist = []; //ここが配列になる
	for (var i = 0; i < c.length; i++) {
			var name = c[i].replace("https://hastebin.com/raw/", "").replace(".js",
				"").replace("https://aethernote.net/bkvc/", "").replace("https://paste.myftb.de/raw/", "");
			var rel = '<button id="rem" class="square_btn" name="' + c[i] +
				'">削除</button></li>';
		if (name == "AdvancedKVC") {
				rel = "";
			}
			plist.push('<li name="' + name + '">' + name + ' ' + rel); //ここにpush()がくる
		
	}
	document.getElementById('plugins').innerHTML = plist.join('');
});
