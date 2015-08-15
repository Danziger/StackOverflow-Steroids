var hasLoaded = false;
var initialClasses = "";
var previousInjection = null;
var devMode = !('update_url' in chrome.runtime.getManifest());

function preventDefault(e) {

	var delta = e.wheelDelta;
	var target = e.target;
	var position = target.scrollTop;
	
	if((position === 0 && delta > 0) || (delta < 0 && target.offsetHeight + position >= target.scrollHeight)) {
		e = e || window.event;
		if (e.preventDefault) e.preventDefault();
		e.returnValue = false;  
	}
}

function preventDefaultCodeEditor(e) {
	
	var target = e.target;
	
	while(target.tagName != "BODY") {
		if(target.className === "popup popup-snippet esc-remove") {
			target = true;
			break;
		}
	
		try { target = target.parentNode; } catch(e) { break; }
	}
	
	if(target === true) {	
		var delta = e.wheelDelta;
		var target = e.target;
		var position = target.scrollTop;
		
		if((position === 0 && delta > 0) || (delta < 0 && target.offsetHeight + position >= target.scrollHeight)) {
			e = e || window.event;
			if (e.preventDefault) e.preventDefault();
			e.returnValue = false;  
		}
	}
}

function updateInjection() {
	chrome.storage.sync.get(["global-cb", "navbar-cb", "fixed-cb", "black-cb", "editor-cb", "scroll-cb", "code-cb", "help-cb", "overlay-cb"], function(res){
	
		// Are the injections enabled?
	
		if(res["global-cb"]) delete res["global-cb"]; // YES, injections enabled!
		else { // NO, so nothing to do here...
			devMode ? console.log("SOS: Extension disabled :(") : null;
			previousInjection = null;
			document.body.className = initialClasses;
			return false; // Return early!
		}
		
		// Is the "editor block scroll" feature enabled?

		if(res["scroll-cb"]) { // YES, editor block scroll enabled!
			delete res["scroll-cb"];
			
			try {
				document.getElementById("wmd-input").addEventListener("wheel", preventDefault);
				document.getElementById("wmd-preview").addEventListener("wheel", preventDefault);
			} catch (err) {}
		}
		else { // NO, disable editor block scroll!
			try {
				document.getElementById("wmd-input").removeEventListener("wheel", preventDefault);
				document.getElementById("wmd-preview").removeEventListener("wheel", preventDefault);
			} catch (err) {}
		}
		
		// Is the "code block scroll" feature enabled?

		if(res["code-cb"]) { // YES, code block scroll enabled!
			delete res["code-cb"];
			
			try {
				document.addEventListener("wheel", preventDefaultCodeEditor);
			} catch (err) {}
		}
		else { // NO, disable code block scroll!
			try {
				document.removeEventListener("wheel", preventDefaultCodeEditor);
			} catch (err) {}
		}
		
		// Rest of features:
		
		var className = "";

		for(key in res)
			if(res[key]) className += " " + "sos-" + key.replace("-cb", "");
		
		// Update injection?
		
		if(previousInjection === null || previousInjection !== className) {
			document.body.className = initialClasses + className;
			previousInjection = className;
			devMode ? console.log("SOS: Injection updated!") : null;
		}
		else devMode ? console.log("SOS: Injection NOT updated. Nothing has changed.") : null;
	});
};

window.addEventListener('focus', function() {
    devMode ? console.log("SOS: onFocus") : null;
	updateInjection();
});


function load() {
	if(!hasLoaded) {
		hasLoaded = true;
		devMode ? console.log("SOS: Loading...") : null;	
		initialClasses = document.body.className;
		updateInjection();
	}
}

window.addEventListener('load', load);

if(document.readyState === "complete") {
	load();
}

devMode ? console.log("SOS: Hello developer (:") : null;