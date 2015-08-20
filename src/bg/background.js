chrome.storage.sync.get("global-cb", function(res){	
	if(res["global-cb"])
		chrome.browserAction.setIcon({path:{
			19: "icons/icon19-on.png",
			38: "icons/icon38-on.png"
		}});
	else 
		chrome.browserAction.setIcon({path:{
			19: "icons/icon19-off.png",
			38: "icons/icon38-off.png"
		}});
});