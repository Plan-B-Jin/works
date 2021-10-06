$(function() {

	var $wrap = $('#wrap'),
		$header = $('header'),
		$navi = $('#navi'),
		$gnb = $('#gnb > ul'),
		$gnbHover = $('#navi #gnb > ul > li'),
		$gnbHover_a = $('#navi #gnb > ul > li a'),
		$gnbSub = $('#navi #gnb > ul > li > ul'),
		$bnt_all = $('.allmenu'),
		$gnb_bg = $('header .gnb_bg'),
		$btn_all = $('.btn_all'),
		$lnb_p = $('#lnb p.sub_title'),
		$lnbul = $('#lnb ul'),
		$lnbli = $('#lnb li'),
		$btn_top = $('.btn_top'),
		$allmenu = $('.allmenu'),
		$searchTop = $('.searchTop'),
		$allmenuBox = $('#allmenuBox');


	$(window).on('scroll', function() {
		bodyScroll = $(document).scrollTop();
		if (bodyScroll > 0) {
			$header.addClass('fix');
			$header.parent().parent().addClass('fix');
		} else {
			$header.removeClass('fix');
			$header.parent().parent().removeClass('fix');
		}
	});
	var menuCont = function() {

		/* web gnb menu */
		$searchTop.on('mouseenter', function() {
			$(this).addClass('on');
		});
		/*
        $gnbHover.each(function() {

          if ($wrap.is('.web')) {
            $(this).on('mouseenter', function() {
                $header.addClass('on');
              $navi.addClass('over');
              $(this).addClass('on');
              $(this).find('ul').stop().slideDown();
            });
            $(this).on('mouseleave', function() {
                //$header.removeClass('on');
              $navi.removeClass('over');
              $(this).removeClass('on');
              $(this).find('ul').stop().slideUp();
            });
          } else {
            $(this).off('mouseenter mouseleave');
          }
        });
        */

		$gnbHover.each(function() {
			if ($wrap.is('.web')) {
				$(this).on('mouseenter', function() {
					$header.addClass('on');
					$navi.addClass('over');
					$('#navi #gnb > ul > li').removeClass('on');
					$(this).addClass('on');
					$gnb_bg.addClass('on');
				});
			} else {
				$(this).off('mouseenter mouseleave');
			}
		});
		$header.on('mouseleave', function() {
			$header.removeClass('on');
			$navi.removeClass('over');
			$(this).removeClass('on');
			$gnb_bg.removeClass('on');

		});

	}


	var windowSize = function() {

		var winWidth = $(window).width();
		if (winWidth > 1023) {
			$wrap.addClass('web');
			$wrap.removeClass('mobile');
			if ($wrap.is('.web')) {
				$('#rightBox .family').each(function(){
					var $list = $(this);
					var $btn = $list.find('.box > a');
					var menuTime;
					$btn.off('click');
					$btn.click(function() {
						if ($list.is('.on')) {
							$(".family").removeClass('on');
						}else{
							$(".family").addClass('on');
						}
					});
					$btn.mouseenter(function(){
						$(this).parent().parent().addClass('on');
					});
					$(document).on('click','header, #container',function(){
						$(".family").removeClass('on');
					});
					$list.mouseleave(function(){
						clearTimeout(menuTime);
						menuTime = setTimeout(mTime, 1);
					});
					function mTime() {
						$(".family").removeClass('on');
					}
				});
			}
		} else {
			$wrap.removeClass('web');
			$wrap.addClass('mobile');
			$bnt_all.removeClass('active');
			if ($wrap.is('.mobile')) {
				$('.allmenu_bottom').on('click','.family .box a',function(){
					$(".family").toggleClass('on');
				});
				$(document).on('click','header, .menuBox',function(){
					$(".family").removeClass('on');
				});
			}
		}

		$bnt_all.off('click');
		$bnt_all.click(function() {
			$header.removeClass('on');
			$navi.removeClass('over');
			$('#navi #gnb > ul > li').removeClass('on');
			$gnb_bg.removeClass('on');
			$header.toggleClass('ov');
			$allmenu.toggleClass('on');
			$allmenuBox.toggleClass('on');
			$searchTop.removeClass('on');
			if ($(this).is('.on')) {
				$('.menuTop').clone().appendTo('#allmenuBox .menuBox');
				$('#rightBox .mbox').clone().appendTo('.allmenu_bottom');
				$(".family").removeClass('on');
				$allmenu.addClass('on');
				$wrap.parent().addClass('hidden');
				$wrap.parent().parent().addClass('hidden');
				$('#rightBox').addClass('on');

				$('#allmenuBox #gnb > ul > li').each(function() {
					$(this).not('.link').children("a").off("click").on("click", function(e) {
						e.preventDefault(); //a 태그 막기
						var depth2 = $(this).siblings('.depth2');
						if (!depth2.is(':visible')) {
							$('#gnb > ul').find('.depth2').stop().slideUp();
							depth2.stop().slideDown();
							$('#gnb > ul li').removeClass('hover');
							$(this).parent().addClass('hover');
						} else {
							$('#gnb > ul').find('.depth2').stop().slideUp();
							$('#gnb > ul li').removeClass('hover');
						};
					});
				});

			} else {
				$('#allmenuBox .menuBox').empty();
				$('.allmenu_bottom').empty();
				$(this).removeClass('on');
				$('#rightBox').removeClass('on');
				$wrap.parent().removeClass('hidden');
				$wrap.parent().parent().removeClass('hidden');
				$header.removeClass('ov');
				$allmenu.removeClass('on');
			}
		});

		$(document).on('click','#allmenuBox #gnb > ul > li > ul > li a',function(){// 복제
			$('#allmenuBox .menuBox').empty();
			$('.allmenu_bottom').empty();
			$('#rightBox').removeClass('on');
			$wrap.parent().removeClass('hidden');
			$wrap.parent().parent().removeClass('hidden');
			$header.removeClass('ov');
			$allmenu.removeClass('on');
			$allmenuBox.removeClass('on');
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					event.preventDefault();
					$('html, body').animate({
						scrollTop: target.offset().top - 100
					}, 700);
				}
			}
		});

		menuCont();
	}
	var headerRe = function() {
		if (!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)) {
			if ($bnt_all.is('.active')) {
				$bnt_all.click();
			}
		}
	}
	$(window).load(function() {
		windowSize();
		headerRe();
		menuCont;
	});

	$(window).resize(function() {
		windowSize();
		headerRe();
		menuCont;
	});

	$(window).on("orientationchange", function(event) {
		windowSize();
		headerRe();
		menuCont;
	});
	// 탑버튼
	$btn_top.click(function() {
		$("html,body").stop().animate({
			scrollTop: 0
		});
	});

	//서브페이지
	for (var i = 1; i <= 10; i++) {
		$("#navi #gnb .menu"+i).clone().appendTo(".lnbM"+ i);
	};
	$("#lnb p").click(function() {
		$(this).next('ul').stop().slideToggle();
		$(this).toggleClass('ov');
	})
	var subTit = $("#lnb .depth2").children("li.on").children().text();
	$("#lnb p").text(subTit);


	//animation
	var $section = $('.ani'),
		bodyScroll, windowHeight;

	function sectionAni(){
		bodyScroll = $(document).scrollTop(),
			windowHeight = $(window).height() / 1.3;
		$section.each(function(){
			if(bodyScroll >= $(this).offset().top - windowHeight && bodyScroll < $(this).offset().top + $(this).height() + 10){
				$(this).addClass('on');
				/*
				$('.company-business .listbox .cbox:nth-of-type(1) circle').animate({
					'stroke-dashoffset':'0'
				},1000);
				$('.company-business .listbox .cbox:nth-of-type(2) circle').animate({
					'stroke-dashoffset':'0'
				},2000);
				$('.company-business .listbox .cbox:nth-of-type(3) circle').animate({
					'stroke-dashoffset':'0'
				},3000);
				*/

				var agent = navigator.userAgent.toLowerCase();
				if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {

					$('.company-business .listbox .circleBox').each(function() {
						var $list = $(this);
						var $circle = $list.find('circle');
						if ($(this).is('.on')) {
							$circle.animate({
								'stroke-dashoffset':'0'
							},3000);
						}
					});

				}

			}else{
				$(this).removeClass('on');
				/*
				var agent = navigator.userAgent.toLowerCase();
				if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
			    $('.company-business .listbox').each(function() {
						var $list = $(this);
			    	var $circle = $list.find('circle');
			      if ($(this).is('.on')) {
							$circle.animate({
								'stroke-dashoffset':'900'
							},1);
							$circle.css('stroke-dashoffset:','900');
			      }
			    });
				}
				*/
			}
		});
	}
	$(function(){
		sectionAni();
	});
	$(window).on('scroll', function(){
		sectionAni();
	});

	//file upload
	var fileTarget = $(".file-hidden");
	fileTarget.on('change',function(){
		if(window.FileReader){
			var filename=$(this)[0].files[0].name;
		}else{
			var filename = $(this).val().split('/').pop().split('\\').pop();
		}
		$(this).siblings('.upload-name').val(filename);
	});


	/* scroll mov */
	var top_space = 0;
	if ($('header').length) {
		top_space = $('header').outerHeight();
	}
	/*
      var page_url = window.location.href;
      var page_id = page_url.substring(page_url.lastIndexOf("#") + 1);
      if (page_id == 'section1') {
        $('html, body').animate({
          scrollTop: $('#' + page_id).offset().top - top_space
        }, 500);
      } else if (page_id == 'section2') {
        $('html, body').animate({
          scrollTop: $('#' + page_id).offset().top - top_space
        }, 500);
      } else if (page_id == 'section3') {
        $('html, body').animate({
          scrollTop: $('#' + page_id).offset().top - top_space
        }, 500);
      } else if (page_id == 'section4') {
        $('html, body').animate({
          scrollTop: $('#' + page_id).offset().top - top_space
        }, 500);
      } else if (page_id == 'section5') {
        $('html, body').animate({
          scrollTop: $('#' + page_id).offset().top - top_space
        }, 500);
      } else if (page_id == 'section6') {
        $('html, body').animate({
          scrollTop: $('#' + page_id).offset().top - top_space
        }, 500);
      }
    */
	$('#gnb > ul > li > ul > li a').click(function(event) {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			if (target.length) {
				event.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top - top_space
				}, 500);
				return false;
			}
		}
	});

	var hash = window.location.hash;
	if (hash && document.getElementById(hash.slice(1))) {
		var $this = $(hash);
		$('html, body').animate({
			scrollTop: $this.offset().top - top_space
		}, 500, function () {
			window.history.pushState ? window.history.pushState(null, null, hash) : window.location.hash = hash;
		});
		console.log($this.offset().top);
	}


	// 이용안내 팝업
	$('.customerBox .ipbox .chbox a, .customerBox-ip .ipbox .chbox a').click(function() {
		$('.layerPrivacy').addClass('on');
	});
	$('.layerPrivacy .btn_close, .layerPrivacy .bg').click(function() {
		$('.layerPrivacy').removeClass('on');
	});

});
