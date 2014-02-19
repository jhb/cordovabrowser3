var Transitioner = function(){
    
}

Transitioner.prototype.slideRight = function(oldLeft, oldRight, cb){
        oldLeft.removeClass('transition');
        oldLeft.addClass('left');
        setTimeout(function(){
            oldRight.addClass('transition');
            oldRight.removeClass('center');
            oldRight.addClass('right');

            oldLeft.addClass('transition');
            oldLeft.removeClass('left');
            oldLeft.addClass('center');
            oldLeft.one('webkitTransitionEnd', function(){
                if (cb !== undefined)
                    cb();
            });
        }, 0);
}

Transitioner.prototype.slideLeft = function(oldCenter, oldRight, cb){
        oldRight.removeClass('transition');
        oldRight.addClass('right');
        setTimeout(function(){
            oldCenter.addClass('transition');
            oldCenter.removeClass('center');
            oldCenter.addClass('left');

            oldRight.addClass('transition');
            oldRight.removeClass('right');
            oldRight.addClass('center');
            oldRight.one('webkitTransitionEnd', function(){
                if (cb !== undefined)
                    cb();
            });
        }, 0);
}

Transitioner.prototype.fadeAway = function(elem, cb){
    elem.addClass('transition');
    elem.addClass('faded');
    elem.one('webkitTransitionEnd', function(){
        elem.removeClass('transition');
        elem.hide();
        if (cb !== undefined)
            cb();
    });
}

Transitioner.prototype.fadeIn = function(elem, cb){
    elem.show();
    elem.addClass('faded');
    setTimeout(function(){
        elem.addClass('transition');
        elem.removeClass('faded');
        elem.one('webkitTransitionEnd', function(){
            elem.removeClass('transition');
            if (cb !== undefined)
                cb();
        });
    }, 0);
}

Transitioner.prototype.downDialog = function(dialog, cb){
        dialog.addClass('transition');
        dialog.removeClass('up');
        dialog.addClass('down');
        dialog.one('webkitTransitionEnd', function(){
            if (cb !== undefined)
                cb();
        });
}

Transitioner.prototype.upDialog = function(dialog, cb){
        dialog.addClass('transition');
        dialog.removeClass('down');
        dialog.addClass('up');
        dialog.one('webkitTransitionEnd', function(){
            if (cb !== undefined)
                cb();
        });
}

Transitioner.prototype.slideListItemDown = function(list, item, cb){
        list.prepend(item);
        list.removeClass('transition');
        list.css('transform', 'translate(0px, -' + item.height() + 'px)');
        setTimeout(function(){
            list.addClass('transition');
            list.css('transform', 'none');
            list.one('webkitTransitionEnd', function(){
                if (cb !== undefined)
                    cb();
            });
        }, 0);
}

Transitioner.prototype.removeItems = function(items, cb){
    items.each(function(){
        this.remove();
    });
}

Transitioner.prototype.removeListItem = function(item, cb){
        item.css('height', item.height());
        setTimeout(function(){
            item.addClass('transition');
            item.css('height', 0);
            item.one('webkitTransitionEnd', function(){
                item.remove();
                if (cb !== undefined)
                    cb();
            });
        }, 0);
}
