"use strict";

function save(e) {
	e.preventDefault();
	var ta = document.getElementById("ta").value;
	var process = function (s, line) {
		var p = line.indexOf(",");
		if (p == -1) return {
			i: s.i + 1,
			errors: s.errors + "\nSyntax error at line " + s.i
		}; else return {
			i: s.i + 1,
			errors: s.errors
		};
	}
	var errors = ta.split("\n").reduce(process, {i: 1, errors: ""}).errors;
	document.getElementById("err").innerHTML = errors.substr(1);
	if (!errors)
		chrome.storage.local.set({ta: ta});
}

function load() {
	chrome.storage.local.get("ta", function (config) {
		document.getElementById("ta").value = config.ta || "";
	});
}


document.addEventListener("DOMContentLoaded", load);
document.querySelector("form").addEventListener("submit", save);
