YUI.add('gallery-overlay-box', function(Y) {

/*global Y*/
var OVERLAYBOX = 'overlay-box';

Y.OverlayBox = Y.Base.create(OVERLAYBOX, Y.Base, [], {
    initializer: function (config) {
        config = config || {};
        var container, originalNode, closeButton, greyOverlay;

        //Setting up the container
        container = Y.Node.create('<div class="yui3-overlaybox yui3-overlaybox-hidden"></div>');
        if (! config.container) {
            //No container is given so it should be an ajax overlaybox
            closeButton = Y.Node.create('<div class="yui3-overlaybox-close-button"></div>');
            closeButton.on('click', function (event) {
                event.halt();
                this.hide();
            }, this);
            container.append(closeButton);
            container.append('<div class="content" />');
            if (config.url) {
                container.addClass('yui3-overlay-loading');
            } else {
            }
        } else {
            //Loadstuff from the given container into a more awesome one
            originalNode = Y.one('#' + config.container);
            container.insert(originalNode.cloneNode(true), 'replace');
            container.get('firstChild').removeClass('yui3-overlaybox-hidden');
            originalNode.remove();
            this._set('loadedContent', true);
        }
        Y.one(document.body).append(container);
        this.set('container', container);

        //Setup the overlay
        if (! config.greyOverlay) {
            greyOverlay = Y.Node.create('<div class="yui3-overlaybox-mask yui3-overlaybox-hidden"></div>');
            greyOverlay.on('click', this.hide, this);
            Y.one(document.body).append(greyOverlay);
            this.set('greyOverlay', greyOverlay);
        }
    },

    destructor: function () {
        this.hide();

        if (this.get('overlay')) {
            this.get('overlay').destroy();
        }

        if (this.get('greyOverlay')) {
            this.get('greyOverlay').remove();
        }

        this.get('container').remove();
    },

    /**
    * Shows the lightbox in the current viewport
    *
    * @return void
    */
    show: function () {
        var overlay, dispatcher;
        overlay = this.get('overlay');
        if (false === this.get('loadedContent')) {
            this.get('container').addClass('yui3-overlaybox-invisible'); //Used to prevent refresh flickering
            dispatcher = new Y.Dispatcher({
                node: this.get('container').one('.content')
            });
            dispatcher.on('ready', function () {
                this.refresh();
                this.get('container').removeClass('yui3-overlaybox-invisible');
            }, this);
            dispatcher.set('uri', this.get('url'));
            this._set('loadedContent', true);
        }
        if (this.get('toggleHidden')) {
            this.get('container').removeClass('yui3-overlaybox-hidden');
        }

        if (Y.Lang.isUndefined(overlay)) {
            overlay = new Y.Overlay({
                srcNode: this.get('container'),
                zIndex: this.get('zIndex'),
                centered: true,
                plugins: [ Y.Plugin.OverlayKeepaligned ]
            });
            overlay.render();
            this.set('overlay', overlay);
        }
        this.get('greyOverlay').removeClass('yui3-overlaybox-hidden');
        overlay.show();
    },

    /**
     * Hides the lightbox from the current viewport.
     *
     * @return void
     */
    hide: function () {
        if (this.get('toggleHidden')) {
            this.get('container').addClass('yui3-overlaybox-hidden');
        }
        this.get('greyOverlay').addClass('yui3-overlaybox-hidden');
        if (this.get('overlay')) {
            this.get('overlay').hide();
        }
    },

    /**
     * Refreshs the positioning etc. of the lightbox in the current viewport.
     *
     * @return void
     */
    refresh: function () {
        if (! Y.Lang.isUndefined(this.get('overlay'))) {
            this.get('overlay').syncUI();
        }
    },

    /**
     * Sets the content to whatever you pass into it.
     * WATCHOUT: It will not be reset if you don't specify reload: true when
     * the user opens it next time.
     *
     * @param string the HTML to put in
     * @return void
     */
    setContent: function (content) {
        this.get('container').insert(content);
        this.refresh();
    },

    /**
     * Binds a click event and prevents the default action
     *
     * @param YUINode the Element to bind on
     * @return the event handler
     */
    bindClick: function (element) {
        return element.on('click', function (event) {
            event.halt();
            this.show();
        }, this);
    }
}, {
    ATTRS: {
        container: {
            readOnly: true
        },
        url: {
            writeOnce: 'initOnly',
            validator: Y.Lang.isString
        },
        greyOverlay: {
            writeOnce: true
        },
        toggleHidden: {
            value: true,
            validator: Y.Lang.isBoolean
        },
        reload: {
            value: false,
            validator: Y.Lang.isBoolean
        },
        loadedContent: {
            value: false,
            readOnly: true
        },
        overlay: {
            writeOnce: true
        },
        zIndex: {
            writeOnce: 'initOnly',
            value: 99
        }
    }
});


}, '@VERSION@' ,{requires:['base', 'node-base', 'gallery-overlay-extras', 'gallery-dispatcher'], skinnable:true});
