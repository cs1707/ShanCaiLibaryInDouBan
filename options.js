function defaultSelect() {
	chrome.storage.local.set({"school": "0"}, function() {
		console.log("school");
	});
}

function saveOptions() {
	var select = document.getElementsByTagName("input");
	for (var i=0; i<select.length; i++) {
		if (select[i].checked == true) {
			chrome.storage.local.set({"school": select[i].value}, function() {
				console.log("school", select[i]);
			});
			//localStorage["school"] = select[i].value;
		}
	}
}

function restoreOptions() {
	//var school = localStorage["school"];
	chrome.storage.local.get("school", function(result) {
		console.log("school", result);
		var school = result["school"];
		if (!school) {
			defaultSelect();
		}

		var select = document.getElementsByTagName("input");
		for (var i=0; i<select.length; i++) {
			if (select[i].value == school) {
				select[i].checked = true;
			}
		}
	});
}

function prepareSave() {
	var save = document.getElementById("save");
	save.onclick = saveOptions;
}

window.onload = function() {
	prepareSave();
	restoreOptions();
}
