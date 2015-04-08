//Free to use Jquery hovercard/hoverbox plugin by Tom Gibbs http://byonex.co.uk/projects/hovercard
(function($) {

    $.fn.tghovercard = function(options) {

        // Default options
        var settings = $.extend({
            delayShow: "300",
            delayHide: "300",
            height: "150",
            fadeOut: "300",
            fadeIn: "300",
            defaultcss: "yes",
            url: "/hovercards.php?user=",
            top: "30",
            menuHeight: "0",
        }, options);


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

        $(this)
            .mouseenter(function() {
                var offset = $(this)
                    .offset();
                var top = offset.top - $(window)
                    .scrollTop();
                var left = offset.left - $(window)
                    .scrollLeft();
                console.log(top);

                var margin = parseInt(settings.height) + parseInt(
                    settings.top);
                var marginMenu = parseInt(margin) + parseInt(
                    settings.menuHeight);

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
                                'px;width:300px;position:absolute;z-index:1000;display:none;">Loading...</div>'
                            )
                    }
                    else {
                        $(this)
                            .append(
                                '<div class="hovercardShow" style="height:' +
                                settings.height +
                                'px;margin-top:10px;width:300px;position:absolute;z-index:1000;display:none;">Loading...</div>'
                            )
                    }
                }

                $('.hovercardShow')
                    .delay(settings.delayShow)
                    .fadeIn(settings.fadeIn);
                $('.hovercardShow')
                    .load(settings.url + $(this)
                        .data("uid"));
                return this;
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