
$(window).on('load', function() {
	/*
	if (matchMedia("screen and (max-width:1024px)").matches) {
	  $('#status').fadeOut();
	  $('#preloader').delay(350).fadeOut('slow');
	  $('body').delay(350).css({'overflow':'visible'});
	}
	*/
	
	var swiper = new Swiper('#mainVisual .swiper-container', {
		effect : 'fade',// "slide", "fade", "cube", "coverflow" or "flip"
		navigation : { 
			nextEl : '.swiper-button-next',
			prevEl : '.swiper-button-prev',
		},
	  pagination: {
	    el: '.swiper-pagination',
	    clickable: true,
	  },
    autoplay: {
      //delay:5000,
      disableOnInteraction: false,
    },
    lazy : {
			loadPrevNext : true // ����, ���� �̹����� �̸� �ε�
		},
		speed: 1500,
		loop:true,
		centeredSlides: true,
		simulateTouch: true,
		autoplayDisableOnInteraction: false,
    paginationClickable: true,
		on:{
	    init: function () {
	      console.log('swiper initialized');
	      var currentVideo =  $("[data-swiper-slide-index=" + this.realIndex + "]").find("video");
	      currentVideo.trigger('play');
	    },
		},
	});	
	/* GET ALL VIDEOS */
	var sliderVideos = $(".swiper-slide video");
	
	swiper.on('slideChange', function () {
	  console.log('slide changed');
	  sliderVideos.each(function( index ) {
	    this.currentTime = 0;
	  });
	
	  var prevVideo =  $("[data-swiper-slide-index=" + this.previousIndex + "]").find("video");
	  var currentVideo =  $("[data-swiper-slide-index=" + this.realIndex + "]").find("video");
	  prevVideo.trigger('stop');
	  currentVideo.trigger('play');
	  
	});	
	/*
	var swiper = new Swiper('#mainVisual .swiper-container', {
		effect : 'fade',// "slide", "fade", "cube", "coverflow" or "flip"
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    pagination: '.swiper-pagination',
    paginationType: 'fraction',
		loop:true,
    centeredSlides: true,
    autoplay: 5000,
		speed: 500,
		delay: 500,
		simulateTouch: false,
    autoplayDisableOnInteraction: false
	});	
	var menuSwiper = new Swiper('.SmenuBox .swiper-container', {
		effect : 'fade',// "slide", "fade", "cube", "coverflow" or "flip"
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
		loop:true,
		centeredSlides: false,
		simulateTouch: false,
		autoplayDisableOnInteraction: false,
    paginationClickable: true,
	});
	*/
	
	var brand = new Swiper('.swiper-brand', {
		pagination: '.brand-pagination',
		paginationClickable: true,
		nextButton: '.brand-button-next',
		prevButton: '.brand-button-prev',
		autoplay:3000,
		loop:true,
		centeredSlides: false,
		simulateTouch: true,
		slidesPerView :'auto',
		//roundLengths: true,
		spaceBetween:35,
		autoHeight: true,
		mousewheelControl: true,
		//loopFillGroupWithBlank : true,
		autoplayDisableOnInteraction: false,
		/*
		breakpoints: {
	    640: {
	      slidesPerView: 3,
	      spaceBetween: 35,
				mousewheelControl: false,
	    },
	    1024: {
	      slidesPerView: 3,
	      spaceBetween: 35,
				mousewheelControl: false,
	    },
		}
		*/
	});
	$('.swiper-brand').on('mouseenter', function(e) {
	  console.log('stop autoplay');
	  brand.stopAutoplay();
	})
	$('.swiper-brand').on('mouseleave', function(e) {
	  console.log('start autoplay');
	  brand.startAutoplay();
	})
	
});

$(window).on('load', function (){
	
});


$(document).ready(function() {
	resizeContent();
});

$(window).resize(function() {
	resizeContent();
});
function resizeContent() {
	var windowHeight = $(window).height();
	$('#mainVisual, #mainVisual .swiper-container, #mainVisual .swiper-container .swiper-slide, .main1.section, .main1.fp-slide, .main1 .fp-tableCell').css({'height':(windowHeight)});
	console.log(windowHeight);
}