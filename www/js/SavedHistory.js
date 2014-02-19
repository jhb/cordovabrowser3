var SavedHistory = function(){ }

SavedHistory.prototype = {
    getHistory: function(){
        if (window.localStorage.cordovaBrowserHistory !== undefined){
            var history = JSON.parse(window.localStorage.cordovaBrowserHistory);
            return history;
        }
        else {
            window.localStorage.cordovaBrowserHistory = JSON.stringify([]);
        }
    },
    editUrlInHistory: function(index, url){
        var history = JSON.parse(window.localStorage.cordovaBrowserHistory);
        history[index] = url;
        window.localStorage.cordovaBrowserHistory = JSON.stringify(history);
    },
    addUrlToHistory: function(url){
        var history = JSON.parse(window.localStorage.cordovaBrowserHistory);
        history.push(url);
        window.localStorage.cordovaBrowserHistory = JSON.stringify(history);
    },
    removeIndexFromHistory: function(index){
        var history = JSON.parse(window.localStorage.cordovaBrowserHistory);
        history.splice(index, 1);
        window.localStorage.cordovaBrowserHistory = JSON.stringify(history);
    }
}
