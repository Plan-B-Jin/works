
function displayMap(locationCd, posX, posY, fairName) {
	// 지도		
	var container = document.getElementById(locationCd);
	var options = { //지도를 생성할 때 필요한 기본 옵션
		center : new daum.maps.LatLng(posX, posY), //지도의 중심좌표.
		level : 3
	//지도의 레벨(확대, 축소 정도)
	};
	var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴

	var imgUrl = 'resources/images/main/icon/map-dot_03.png'
	var imgSize = new daum.maps.Size(34, 50);
	var markerImage = new daum.maps.MarkerImage(imgUrl, imgSize);
	var markerPosition = new daum.maps.LatLng(posX, posY); // 마커가 표시될 위치
	var marker = new daum.maps.Marker({ // 마커를 생성
		position : markerPosition,
		//clickable: true,
		image : markerImage
	});

	marker.setMap(map);// 마커 생성

	var overlayContent = '<div class="customoverlay">'
			+ '<a target="_blank" href="https://map.daum.net/link/map/'+ fairName +','+posX+','+posY+'">'
			+ '<span class="title">' + fairName + '</span></a>'
			+ '</div>';

	var overlayPosition = new daum.maps.LatLng(posX, posY);
	var customOverlay = new daum.maps.CustomOverlay({
		map : map,
		position : overlayPosition,
		content : overlayContent,
		yAnchor : 1
	});
}
var icoordx = '35.16107286231004';
var icoordy = '129.14055569820204';
$(document).ready(function () {
//지도
/*	displayMap('kakaoMapArea', 35.16107286231004,129.14055569820204, '');*/

});

$(window).on('load', function (){

	var owl4 = $('#owlBannerSet4');
	var prev4 = $('.main4 .brand-button-prev');
	var next4 = $('.main4 .brand-button-next');
	owl4.owlCarousel({
    margin:35,
    loop:true,
    dots:false,
   	//autoWidth:true,
    items:3,
		responsive:{
			0:{
				margin:15,
				items:1,
    		dots:true,
			},
			640:{
				margin:20,
				items:2,
    		dots:true,
			},
			759:{
    		dots:false
			},
			960:{
				margin:20,
				items:2,
    		dots:false
			},
			1400:{
				margin:35,
				items:3,
    		dots:false
			}
		},
	});
	
	owl4.on('mousewheel', '.owl-stage', function (e) {
    if (e.deltaY<0) {
        owl4.trigger('next.owl');
    } else {
        owl4.trigger('prev.owl');
    }
    e.preventDefault();
	});
	
	prev4.on('click',function(){
		$('.main4 .owl-prev').click()
	});
	next4.on('click',function(){
		$('.main4 .owl-next').click()
	});
	$('.btn_play').on('click',function(){
		owl4.trigger('play.owl.autoplay',[1000])
	});
	$('.btn_stop').on('click',function(){
		owl4.trigger('stop.owl.autoplay')
	});



	var owl5 = $('#owlBannerFoot');
	var prev5 = $('.main5 .brand-button-prev');
	var next5 = $('.main5 .brand-button-next');
	owl5.owlCarousel({
    margin:35,
    loop:true,
    dots:false,
   	//autoWidth:true,
    items:5,
	responsive:{
		0:{
			margin:10,
			items:2,
		},
		640:{
			margin:10,
			items:2,
		},
		
		1024:{
			margin:25,
			items:4,
		},
		1400:{
			margin:25,
			items:5,
		}
	},
	});
	prev5.on('click',function(){
		$('.main5 .owl-prev').click()
	});
	next5.on('click',function(){
		$('.main5 .owl-next').click()
	});

	
	moveToPosition();
});

$(window).resize(function() {
	moveToPosition();
});
// moveTo.top
function moveToPosition(){
	var footbox_h = $('#section5').height() - 35;
	$('#moveTo').css('bottom', footbox_h+'px');
}