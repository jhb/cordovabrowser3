var SettingsView = function(transitioner, restoreCB){

    this.div = $('#settings');

    this.restoreCB = restoreCB;
    this.deleteAllButton = $('#deleteAll');
    this.deleteAllButton.onAndroidTap(this.deleteAll.bind(this));

    this.back = $('#settingsBack');
    this.back.onAndroidTap(this.cancel.bind(this));
}

SettingsView.prototype = {
    cancel: function() {
        this.restoreCB({'deletedAll': false});
    },
    deleteAll: function(){
        this.restoreCB({'deletedAll': true});
    }
}
