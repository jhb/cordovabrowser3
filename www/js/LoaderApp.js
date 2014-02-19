var LoaderApp = function(){
    this.setup();
    this.addHistory();
}

LoaderApp.prototype = {
    setup: function(){
        this.transitioner = new Transitioner();
        this.savedHistory = new SavedHistory();
        this.createUrlDialog = new CreateUrlDialog(this.transitioner);
        this.settingsView = new SettingsView(this.transitioner, 
                                    this.restoreUrlView.bind(this));
        this.urlSettingsDialog = new UrlSettingsDialog(this.transitioner,
                                    this.editItem.bind(this),
                                    this.deleteItem.bind(this));
        this.browserHistoryManager = new BrowserHistoryManager(this);

        this.moreButton = $('#moreButton');
        this.moreButton.onAndroidTap(
            function(){
                this.transitioner.fadeAway(this.moreButton);
                this.transitioner.slideLeft(this.urlView, this.settingsView.div);
                this.browserHistoryManager.toSettingsView();
        }.bind(this));

        this.urlView = $('#urls');
        this.appendUrlButton = $('#appendUrl');
        this.appendUrlButton.onAndroidTap(this.requestAppendUrl.bind(this));
    },
    requestAppendUrl: function(){
        this.createUrlDialog.showCreateUrlDialog(this.appendUrl.bind(this))
        this.browserHistoryManager.toCreateUrlDialog();
    },
    appendUrl: function(url){
        if (url !== undefined){
            this.slideUrlToView(url);
            this.savedHistory.addUrlToHistory(url);
        }
    },
    restoreUrlView: function(result){
        this.transitioner.fadeIn(this.moreButton);
        this.transitioner.slideRight(this.urlView, this.settingsView.div, function(){
            if (result.deletedAll){
                for (var i = 0; i < this.urlView.children().size() - 1; i++){
                    var child = this.urlView.children().eq(i);
                    this.deleteItem(child);
                }
            }
        }.bind(this));
    },
    createUrlButton: function(url){
        var listItem = $('<li>');
        var urlButton = $('<button>');
        urlButton.html(url);
        urlButton.addClass('urlButton'); 
        urlButton.addClass('androidButton');
        listItem.append(urlButton);
        var callGotoUrl = function(){
            this.gotoUrl(urlButton.text());
        };
        var callUrlSettings = function(){
            this.urlSettingsDialog.showUrlSettingsDialog(listItem);
            this.browserHistoryManager.toUrlSettingsDialog();
        };
        urlButton.onAndroidTap(callGotoUrl.bind(this), callUrlSettings.bind(this))
        return listItem;
    },
    addUrlToView: function(url){
        var item = this.createUrlButton(url);
        this.urlView.prepend(item);
    },
    slideUrlToView: function(url){
        var item = this.createUrlButton(url);
        this.transitioner.slideListItemDown(this.urlView, item);
    },
    gotoUrl: function(url){
    	cordova.exec(function(winParam) {}, function(error) {}, "Loader",
                "load", [url]);
    },
    listItemToHistoryIndex: function(item){
        var index = item.index();
        var size = item.parent().find('li').size() - 1;
        return size - index - 1;
    },
    editItem: function(item){
        setTimeout(function(){
            var button = item.children();
            this.browserHistoryManager.toCreateUrlDialog();
            this.createUrlDialog.showCreateUrlDialog(function(url){
                button.text(url);
                var index = this.listItemToHistoryIndex(item);
                this.savedHistory.editUrlInHistory(index, url);
            }.bind(this), button.text());
        }.bind(this), 250);
    },
    deleteItem: function(item){
        var index = this.listItemToHistoryIndex(item);
        this.savedHistory.removeIndexFromHistory(index);
        this.transitioner.removeListItem(item);
    },
    addHistory: function() {
        var history = this.savedHistory.getHistory();
        if (history !== undefined){
            for (var i = 0; i < history.length; i++){
                this.addUrlToView(history[i]);
            }
        }
    }
}



