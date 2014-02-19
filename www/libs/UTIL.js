var _UTIL = function(){ }

_UTIL.exists = function(obj){
    return obj !== undefined && obj !== null;
}

_UTIL.isIOS = function(){
    return  !!(navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/iPad/i));
}

_UTIL.isAndroid = function(){
    return !!(navigator.userAgent.match(/Android/));
}

_UTIL.isChrome = function(){
    return !!(navigator.userAgent.match(/Chrome/));
}

_UTIL.patchFnBind = function(){
    if (Function.prototype.bind === undefined){
       Function.prototype.bind = function (bind) {
            var self = this;
            return function () {
                var args = Array.prototype.slice.call(arguments);
                return self.apply(bind || null, args);
            };
        };
    }
}

_UTIL.patchRequestAnimationFrame = function(){
    window.requestAnimationFrame =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(fn){
                setTimeout(function(){
                    fn(Date.now());
                }, 1000/60);
            };
}

_UTIL.deltaTimeRequestAnimationFrame = function(toBeCalled){
    var addTimeDiff = function(time){
        if (_UTIL.lastRequestAnimationFrame !== undefined){
            toBeCalled(time - _UTIL.lastRequestAnimationFrame);
        }
        _UTIL.lastRequestAnimationFrame = time;
        window.requestAnimationFrame(addTimeDiff);
    }
    window.requestAnimationFrame(addTimeDiff);
}


