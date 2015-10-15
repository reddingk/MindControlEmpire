$(document).ready(function() {    
    //Events that reset and restart the timer animation when the slides change
    $("#transition-timer-carousel").on("slide.bs.carousel", function(event) {
        //The animate class gets removed so that it jumps straight back to 0%
        $(".transition-timer-carousel-progress-bar", this)
            .removeClass("animate").css("width", "0%");
    }).on("slid.bs.carousel", function(event) {
        //The slide transition finished, so re-add the animate class so that
        //the timer bar takes time to fill up
        $(".transition-timer-carousel-progress-bar", this)
            .addClass("animate").css("width", "100%");
    });
    
    //Kick off the initial slide animation when the document is ready
    $(".transition-timer-carousel-progress-bar", "#transition-timer-carousel")
        .css("width", "100%");

    /*Animation*/
    (function( $ ) {
    
    	//Function to animate slider captions 
    	function doAnimations( elems ) {
    		//Cache the animationend event in a variable
    		var animEndEv = 'webkitAnimationEnd animationend';
    		
    		elems.each(function () {
    			var $this = $(this),
    				$animationType = $this.data('animation');
    			$this.addClass($animationType).one(animEndEv, function () {
    				$this.removeClass($animationType);
    			});
    		});
    	}
    	
    	//Variables on page load 
    	var $myCarousel = $('.carousel-animate'),
    		$firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
    		
    	//Initialize carousel 
    	$myCarousel.carousel();
    	
    	//Animate captions in first slide on page load 
    	doAnimations($firstAnimatingElems);
    	
    	//Pause carousel  
    	$myCarousel.carousel('pause');
    	
    	
    	//Other slides to be animated on carousel slide event 
    	$myCarousel.on('slide.bs.carousel', function (e) {
    		var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
    		doAnimations($animatingElems);
    	});  
    	
    })(jQuery);
    
    /*Release*/
    $('#releaseCarousel').carousel({
    	interval: 0
	});
	
	var clickEvent = false;
	$('#releaseCarousel').on('click', '.nav a', function() {
			clickEvent = true;
			$('.nav li').removeClass('active');
			$(this).parent().addClass('active');		
	}).on('slid.bs.carousel', function(e) {
		if(!clickEvent) {
			var count = $('.nav').children().length -1;
			var current = $('.nav li.active');
			current.removeClass('active').next().addClass('active');
			var id = parseInt(current.data('slide-to'));
			if(count == id) {
				$('.nav li').first().addClass('active');	
			}
		}
		clickEvent = false;
	});

});

