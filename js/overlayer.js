(function ( $ ) {

    $.fn.overlayer = function( options ) {

        var settings = $.extend({
            inactive: []
        }, options );

        return this.each(function() {

                var doc = this;

		$(doc).delegate('a.overlayLink', 'click', function(evt) {

   			evt.stopPropagation();
    			evt.preventDefault();

    			// open overlay box
    			$('body', window.top.document).append("<div class='overlayBackground overlayBoxclose' id='overlayBackground'></div>"+
   			"<div class='overlayBox' id='overlayBox'>"+
    			"<a class='overlayBoxclose' id='overlayBoxclose' title='Close box'>close</a>"+
    			"<div id='overlayBoxContent'>"+
    			"<img height='30' src='/hzsk/sites/default/files/images/icons/spinner-small.gif' alt='Please wait while loading...'/>"+
    			"</div>"+
    			"</div>");

			// avoid scrolling on body
                        $('body', window.top.document).toggleClass("noscroll");

			// register handler for closing the box
    			$('.overlayBoxclose', window.top.document).click(function(){
      				$('#overlayBoxContent', window.top.document).html('');
     				$('#overlayBox', window.top.document).remove();
      				$('#overlayBackground', window.top.document).remove();
    				$('body', window.top.document).toggleClass("noscroll");
			});

    			var hrefAttr = $(this).attr('href');
    			if (typeof hrefAttr !== typeof undefined && hrefAttr !== false) {
     				if (hrefAttr.match("^#")) {
        				// href value refers to #id
    		    			$('#overlayBoxContent', window.top.document).css("height", "100%");
        				$('#overlayBoxContent', window.top.document).html($(hrefAttr).html());
      				} else{
        				// href value understood to refer to url
        				$('#overlayBoxContent', window.top.document).css("height", "100%");
        				
					//don't show spinner
					//$('#overlayBoxContent', window.top.document).css("background", "url(https://corpora.uni-hamburg.de/hzsk/sites/default/files/images/icons/spinner-small.gif) center center no-repeat");
        				
					// test if href attribute refers to audio file (e.g. mp3)
					if(hrefAttr.split('.').pop() == 'mp3'){
						$('#overlayBoxContent', window.top.document).html('<div style="height: 100%; display: flex; justify-content: center; align-items: center;">'
							+'<audio controls="controls">'
							+'<source src="'+hrefAttr+'" />'
							+'</audio></div>');
					} else{
						$('#overlayBoxContent', window.top.document).html('<iframe width="100%" height="99%" src="'+hrefAttr+'" style="background-color:white;"></iframe>');
      					}
				}

      				var dataOverlayMargin = $(this).data('overlay-top-bottom-margin');
      				if(typeof dataOverlayMargin !== typeof undefined && dataOverlayMargin !== false){
        				if (dataOverlayMargin.match("^.+$")) {
          					$('#overlayBox', window.top.document).css("top", dataOverlayMargin);
          					$('#overlayBox', window.top.document).css("bottom", dataOverlayMargin);
        				}
      				}

     				var dataOverlayMargin = $(this).data('overlay-left-right-margin');
      				if(typeof dataOverlayMargin !== typeof undefined && dataOverlayMargin !== false){
       					if (dataOverlayMargin.match("^.+$")) {
          					$('#overlayBox', window.top.document).css("right", dataOverlayMargin);
          					$('#overlayBox', window.top.document).css("left", dataOverlayMargin);
        				}
      				}

    			}
  		});
		
                return this;
        });

    }


}( jQuery ));


