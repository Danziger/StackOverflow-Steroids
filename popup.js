var ops = new TouchOptions({
	storage: "sync"
});

window.onload = function() {

	ops.add(document.getElementById("global-cb"), false, document.getElementById("options-list"));
	
	ops.add(document.getElementById("navbar-cb"), false);
	ops.add(document.getElementById("fixed-cb"), false);
	ops.add(document.getElementById("black-cb"), false);
	
	ops.add(document.getElementById("editor-cb"), false);
	ops.add(document.getElementById("scroll-cb"), false);
	ops.add(document.getElementById("code-cb"), false);
	
	ops.add(document.getElementById("help-cb"), false);
	ops.add(document.getElementById("overlay-cb"), false);

	document.onclick = function(e) {
	
		var classes = e.target.classList;
		var checkbox = false;
		
		if(classes.contains("switch-label") || classes.contains("switch-handle")) {
			checkbox = e.target.parentNode;
			checkbox.classList.toggle("checked");
		}
		else if(classes.contains("switch")) {
			checkbox = e.target;
			classes.toggle("checked");
		}
		
		if(checkbox) {
			
			var id = checkbox.id;
			
			switch(id) {
				case "global-cb":
						if(ops.touch("global-cb"))
							chrome.browserAction.setIcon({path:{
								19: "icon19-on.png",
								38: "icon38-on.png"
							}});
						else 
							chrome.browserAction.setIcon({path:{
								19: "icon19-off.png",
								38: "icon38-off.png"
							}});
					break;

				default: ops.touch(id);
			}	
		}
		else if(e.target.id === "all") {
			ops.reset(0, false);
			ops.clear();

			chrome.browserAction.setIcon({path:{
				19: "icon19-off.png",
				38: "icon38-off.png"
			}});
		}
	}
}