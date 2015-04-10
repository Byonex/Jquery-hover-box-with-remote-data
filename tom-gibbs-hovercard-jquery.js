//Free to use Jquery hovercard/hoverbox plugin by Tom Gibbs http://byonex.co.uk/projects/hovercard
(function($) {

    $.fn.tghovercard = function(options) {

        // Default options
        var settings = $.extend({
            delayShow: "300",
            delayHide: "300",
            height: "150",
			width: "300",
            fadeOut: "300",
            fadeIn: "300",
            defaultcss: "yes",
            url: "/hovercards.php?user=",
            top: "30",
			menuHeight: "0",
			calculation: "left",
        }, options);
var loaded = "defined";

        //defualt CSS if set to true
        if (settings.defaultcss == 'yes') {
            $("<style>")
                .prop("type", "text/css")
                .html(
                    "\
    .hovercardShow {\
        color:#000;\
        box-shadow: 0px 1px 7px -1px rgba(0,0,0,0.75);\
		border: 1px solid;\
  		border-color: #e5e6e9 #dfe0e4 #d0d1d5;\
		background:#FFF;\
		cursor: default;\
    }"
                )
                .appendTo("head");
        }
		var loaded = "non";
							$(this).addClass('hovercard');
 
				        $(this)
            .mouseenter(function() {
                var offset = $(this)
                    .offset();
                var top = offset.top - $(window)
                    .scrollTop();
					var left2 = offset.left - $(window)
                    .scrollLeft();
                var left = $(this).offset().left - $(this).parent().offset().left - $(this).parent().scrollLeft();
                	var p = $(this);
					var position = p.position();
					var positionL = position.left;

                /*console.log(top);
				console.log(left);
				console.log(p);
				console.log(position);
				console.log(positionL);*/

                var margin = parseInt(settings.height) + parseInt(
                    settings.top);
				var marginMenu = parseInt(margin)+parseInt(settings.menuHeight);
				if (settings.calculation == 'left'){
				var marg = $(this).offset().left - $(this).parent().offset().left - $(this).parent().scrollLeft();
			}
			else{
				marg = offset.left - $(window)
                    .scrollLeft();
			}
			
			
	
			                //Checks to see if a hover card already is open to avoid multiple hovercards on screen at once
                if ($('.hovercardShow')
                    .length) {}
                else {

                    if (marginMenu < top) {
                        $(this)
                            .append(
                                '<div class="hovercardShow" style="height:' +
                                settings.height + 'px;margin-top:-' +
                                margin +
                                'px;width:'+settings.width+'px;position:absolute;z-index:1000;display:none;left:'+marg+'px;">Loading...</div>'
                            )
                    }
                    else {
                        $(this)
                            .append(
                                '<div class="hovercardShow" style="height:' +
                                settings.height +
                                'px;margin-top:10px;width:'+settings.width+'px;position:absolute;z-index:1000;display:none;left:'+marg+'px;">Loading...</div>'
                            )
                    }
                }
				
				loaded = "non";
				
			setTimeout(
  function() 
  {
	 
     loaded = "oui";
	  
  }, settings.delayShow);
  $(this)
            .mouseout(function() {
				
				/*console.log(loaded);*/
				if(loaded == "non"){
					$('.hovercardShow').hide().remove();
					loaded = "non";
					return this;
				}
				
			}); 

                $('.hovercardShow')
                    .delay(settings.delayShow)
                    .fadeIn(settings.fadeIn);
                $('.hovercardShow')
                    .load(settings.url + $(this)
                        .data("uid"));
                return this;
				var inArr = {
            hovercard: false,
            hovercardShow: false
        };
            });
			
        var inArr = {
            hovercard: false,
            hovercardShow: false
        };

        $('.hovercard, .hovercardShow')
            .mouseover(function() {
                inArr[$(this)
                    .attr('class')] = true;
            });


        $('.hovercard, .hovercardShow')
            .mouseout(function() {
                inArr[$(this)
                    .attr('class')] = false;

                setTimeout(function() {
                    if (!inArr.hovercard && !inArr.hovercardShow)
                        $('.hovercardShow')
                        .fadeOut(settings.fadeOut, function() {
                            $(this)
                                .remove();
                        });
                }, settings.delayHide);
            });


    };

}(jQuery));
