$(document).ready(function() {
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
		if (!c[i].includes("https://aethernote.net/bkvc/") || !c[i].includes(".js")) {
			alert("プラグイン " + m + " は非対応です。");
		}
		var name = c[i].replace("https://aethernote.net/bkvc/", "").replace(".js",
			"");
		var rel = '<button id="rem" class="square_btn" name="' + name +
			'">X</button></li>';
		if (name == "BetterKVC" || name == "BKVCLoader") {
			rel = "";
		}
		plist.push('<li name="' + name + '">' + name + ' - Ver 1.0.0 ' + rel); //ここにpush()がくる
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
	if (!m.includes("https://aethernote.net/bkvc/") || !m.includes(".js")) {
		alert("プラグイン " + m + " は非対応です。");
	} else {
		c.push(m);
		localStorage.setItem("plugins", c);
		//$("#pluginlist").val(c);
	}
	var plist = [];
	for (var i = 0; i < c.length; i++) {
		if (!c[i].includes("https://aethernote.net/bkvc/") || !c[i].includes(".js")) {
			alert("プラグイン " + m + " は非対応です。");
		} else {
			var name = c[i].replace("https://aethernote.net/bkvc/", "").replace(".js",
				"");
			var rel = '<button id="rem" class="square_btn" name="' + name +
				'">X</button></li>';
			if (name == "BetterKVC" || name == "BKVCLoader") {
				rel = "";
			}
			plist.push('<li name="' + name + '">' + name + ' - Ver 1.0.0 ' + rel); //ここにpush()がくる
		}
	}
	document.getElementById('plugins').innerHTML = plist.join('');
});
$(document).on("click", "#rem", function() {
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
	var plist = new Array(); //ここが配列になる
	for (var i = 0; i < c.length; i++) {
		if (!c[i].includes("https://aethernote.net/bkvc/") || !c[i].includes(".js")) {
			alert("プラグイン " + m + " は非対応です。");
		} else {
			var name = c[i].replace("https://aethernote.net/bkvc/", "").replace(".js",
				"");
			var rel = '<button id="rem" class="square_btn" name="' + name +
				'">X</button></li>';
			if (name == "BetterKVC" || name == "BKVCLoader") {
				rel = "";
			}
			plist.push('<li name="' + name + '">' + name + ' - Ver 1.0.0 ' + rel); //ここにpush()がくる
		}
	}
	document.getElementById('plugins').innerHTML = plist.join('');
});
