YUI.add("gallery-overlay-box",function(A){var B="overlay-box";A.OverlayBox=A.Base.create(B,A.Base,[],{initializer:function(F){F=F||{};var C,G,E,D;C=A.Node.create('<div class="yui3-overlaybox yui3-overlaybox-hidden"></div>');if(!F.container){E=A.Node.create('<div class="yui3-overlaybox-close-button"></div>');E.on("click",function(H){H.halt();this.hide();},this);C.append(E);C.append('<div class="content" />');if(F.url){C.addClass("yui3-overlay-loading");}else{}}else{G=A.one("#"+F.container);C.insert(G.cloneNode(true),"replace");C.get("firstChild").removeClass("yui3-overlaybox-hidden");G.remove();this._set("loadedContent",true);}A.one(document.body).append(C);this.set("container",C);if(!F.greyOverlay){D=A.Node.create('<div class="yui3-overlaybox-mask yui3-overlaybox-hidden"></div>');D.on("click",this.hide,this);A.one(document.body).append(D);this.set("greyOverlay",D);}},destructor:function(){this.hide();if(this.get("overlay")){this.get("overlay").destroy();}if(this.get("greyOverlay")){this.get("greyOverlay").remove();}this.get("container").remove();},show:function(){var C,D;C=this.get("overlay");if(false===this.get("loadedContent")){this.get("container").addClass("yui3-overlaybox-invisible");D=new A.Dispatcher({node:this.get("container").one(".content")});D.on("ready",function(){this.refresh();this.get("container").removeClass("yui3-overlaybox-invisible");},this);D.set("uri",this.get("url"));this._set("loadedContent",true);}if(this.get("toggleHidden")){this.get("container").removeClass("yui3-overlaybox-hidden");}if(A.Lang.isUndefined(C)){C=new A.Overlay({srcNode:this.get("container"),zIndex:this.get("zIndex"),centered:true,plugins:[A.Plugin.OverlayKeepaligned]});C.render();this.set("overlay",C);}this.get("greyOverlay").removeClass("yui3-overlaybox-hidden");C.show();},hide:function(){if(this.get("toggleHidden")){this.get("container").addClass("yui3-overlaybox-hidden");}this.get("greyOverlay").addClass("yui3-overlaybox-hidden");if(this.get("overlay")){this.get("overlay").hide();}},refresh:function(){if(!A.Lang.isUndefined(this.get("overlay"))){this.get("overlay").syncUI();}},setContent:function(C){this.get("container").insert(C);this.refresh();},bindClick:function(C){return C.on("click",function(D){D.halt();this.show();},this);}},{ATTRS:{container:{readOnly:true},url:{writeOnce:"initOnly",validator:A.Lang.isString},greyOverlay:{writeOnce:true},toggleHidden:{value:true,validator:A.Lang.isBoolean},reload:{value:false,validator:A.Lang.isBoolean},loadedContent:{value:false,readOnly:true},overlay:{writeOnce:true},zIndex:{writeOnce:"initOnly",value:99}}});},"@VERSION@",{requires:["base","node-base","gallery-overlay-extras","gallery-dispatcher"],skinnable:true});