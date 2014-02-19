var CreateUrlDialog = function(transitioner){
    this.transitioner = transitioner;
    this.createUrlDialog = $('#createUrlDialog');
    this.createUrlInput = $('#createUrlInput');
    this.createUrlInput.onenter(this.acceptUrlInput.bind(this));
    this.createUrlCancel = $('#createUrlCancel');
    this.createUrlCancel.onAndroidTap(this.hideCreateUrlDialog.bind(this));

}
CreateUrlDialog.prototype = {
    acceptUrlInput: function(){
        var url = this.parseUrl(this.createUrlInput.val());
        this.hideCreateUrlDialog();
        this.resultCB(url);
    },
    showCreateUrlDialog: function(resultCB, initial){
        this.resultCB = resultCB;
        this.transitioner.downDialog(this.createUrlDialog, 
            this.createUrlInput.focus.bind(this.createUrlInput));  
        if (initial !== undefined)
            this.createUrlInput.val(initial);
    },
    hideCreateUrlDialog: function(){
        this.transitioner.upDialog(this.createUrlDialog);
        this.createUrlInput.val("");
    },
    parseUrl: function(url){
        if (url.length === 0)
            return;
        if (url.indexOf('http') !== 0) {
            url = 'http://' + url;
        }
        /*if (url.indexOf('.') === -1){
            url = url + '.com';
        }*/
        return url;
    }
}
