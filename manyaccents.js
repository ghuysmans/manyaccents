"use strict";

function addAccent(id, name, url) {
	var fo = document.createElement("option");
	fo.setAttribute("title", name);
	fo.setAttribute("value", id);
	document.getElementById('accentSelection').appendChild(fo);
	var fa = document.createElement("audio");
	fa.setAttribute("id", "aud"+id);
	var fs = document.createElement("source");
	fs.setAttribute("src", url);
	fs.setAttribute("type", "audio/mpeg");
	fa.appendChild(fs);
	document.getElementById('aud0').parentNode.appendChild(fa);
}

function tryAccent(id, name, url) {
	var xhr = new XMLHttpRequest();
	xhr.responseType = "arraybuffer"; //definitely not XML...
	xhr.onload = function () {
		if (xhr.status == 200)
			addAccent(id, name, url);
	}
	xhr.open("GET", url, true);
	xhr.send(null);
}


var word = location.href.substr(location.href.lastIndexOf("/") + 1)
if (word == "settings") {
	var url = browser.runtime.getURL("options.html");
	//settings.html would have to be web-accessible (so, no browser object)
	//location.href = url;
	//doesn't work, even with the tabs permission
	//tabs.create({url: url});
	console.log(url); //for an old version of Firefox
}
chrome.storage.local.get("ta", function (config) {
	if (config.ta) {
		var process = function (i, line) {
			var p = line.indexOf(",");
			if (p != -1) {
				var title = line.substr(0, p);
				var url = line.substr(p + 1) + word + ".mp3";
				tryAccent("x" + i, title, url);
			}
			return i + 1;
		}
		config.ta.split("\n").reduce(process, 0);
	}
});
