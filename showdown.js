/*
* Showdown
* Simple modal jQuery 1.6,
* !! use $('body') with live binding
*
* @author Devric
*

- basic template

        #id.modal-overlay            // this is the overlay
            .modal-container
                h1.modal-title
                .modal-content
*/

/*
<div class="modal-header">
    <h1 id="basic-modal-dialog-title"></h1>
    <a href="#" title="Close" class="modal-close"><i class="icon icon-remove"></i></a>
</div>
<div class="modal-content" id="basic-modal-dialog-content" style="clear:both;"></div>
*/

var showdown = (function showdown(){

    function showdown(name, args) {
        /**
            * privates
            */
        var _id = this.id = 'showdown'
            , _args = name
            , self = this
        ;
        if ( typeof name === 'string' ) {
            _id = this.id = name;
            _args = args
        }

        var defaults = {
            height: 200
            , width: 200
            , base : [
                '<div class="modal" style="position: fixed; left: 0; top:0; z-index:100000000; height: 100%; width:100%; display:none">'
                    ,'<div class="modal-overlay modal-close close" style="position: fixed; left: 0; top:0; height: 100%; width:100%"></div>'
                    , '__TPL__'
                , '</div>'
            ].join('')
            , template : [
                        ,'<div class="modal-container">'
                            ,'<i class="icon icon-remove modal-close close btn-close">x</i>'
                            //,'<h1>__TITLE__</h1>'
                            ,'<div class="modal-content">__CONTENT__</div>'
                        ,'</div>'
            ].join('')
        }

        // combine options
        this.opts = $.extend(defaults, _args);

        // replace itself, !! careful of nested objects, you should have it as properties anyway
        // after it is been merged with new template if there is one parsed in the constructor
        this.opts.template = this._templateReplace(this.opts, this.opts.template);

        // the base template
        this.opts.base     = (this.opts.base).replace('__TPL__', this.opts.template);

        // Register Action
        // ===============
        $(document).on('click', '.modal-close', function(){
            self.close();
        });
    };

    showdown.prototype = {
        /**
        * modal open */
        open: function open() {

            // TODO, change content
            // TODO, creating id

            // show content
            $('body').append(this.opts.base);
            $('.modal').fadeIn('slow');
            $('body').trigger('showdown:open', this.opts.id)
        }

        /**
        * modal close */
        , close : function close(cb) {
            // TODO close on id

            $('.modal').fadeOut('slow', function(){
                $('body').find('.modal').remove();
            });
            if (cb) cb();
            $('body').trigger('showdown:close', this.opts.id)
        }

        /**
            * replacing template placeholders
            */
        , _templateReplace : function templateReplace(arr, temp){
            var template = temp // local copy of the template
            ;

            for ( key in arr ) {
                template = template.replace('__' + key.toUpperCase() + '__' , arr[key]);
            } 

            return template;
        }
    };

    return showdown;
    // TODO create public function
})();
