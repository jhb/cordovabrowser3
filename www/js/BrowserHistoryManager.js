var BrowserHistoryManager = function(loaderApp){
	window.onpopstate = function(event) {
        if (event.state == null) {
            //just ignore
        }
		else if (event.state.toRevert === 'hideCreateUrlDialog'){
			loaderApp.createUrlDialog.hideCreateUrlDialog();
		}
		else if (event.state.toRevert === 'hideUrlSettingsDialog'){
			loaderApp.urlSettingsDialog.hideUrlSettingsDialog();
		}
		else if (event.state.toRevert === 'slideFromSettingsView'){
			loaderApp.settingsView.cancel();
		}
	}
}

BrowserHistoryManager.prototype = {
		toCreateUrlDialog: function(){
			if (!window.history.replaceState)
				return;
			window.history.replaceState({'toRevert': 'hideCreateUrlDialog' }, 
					document.title, location.href);
			window.history.pushState('createUrlView', document.title, location.href);
		},
		toUrlSettingsDialog: function(){
			if (!window.history.replaceState)
				return;
			window.history.replaceState({'toRevert': 'hideUrlSettingsDialog' }, 
					document.title, location.href);
			window.history.pushState('urlSettings', document.title, location.href);
		},
		toSettingsView: function(){
	    	if (!window.history.replaceState)
	    		return;
			window.history.replaceState({'toRevert': 'slideFromSettingsView' }, 
					document.title, location.href);
			window.history.pushState('settingsView', document.title, location.href);
		}
}
