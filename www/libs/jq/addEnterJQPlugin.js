function addEnterJQPlugin(){
    $.fn.onenter = function(cb){
        cb = cb.bind(this);
        this.keypress(function(e){
            if (e.which === 13){
                e.preventDefault();
                cb();
            }
        });
    }
}

window.addEventListener('load', function(){
    addEnterJQPlugin();
});
