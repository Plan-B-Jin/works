
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
	displayMap('kakaoMapArea', 35.16107286231004,129.14055569820204, '');
});

$(window).on('load', function (){
	var owl = $('#owlBannerFoot');
	var prev = $('.main5 .brand-button-prev');
	var next = $('.main5 .brand-button-next');
	owl.owlCarousel({
    margin:35,
    loop:true,
    dots:false,
   	//autoWidth:true,
    items:5,
	responsive:{
		0:{
			margin:20,
			items:1,
		},
		640:{
			margin:20,
			items:2,
		},
		759:{
		},
		960:{
			margin:15,
			items:2,
		},
		1400:{
			margin:15,
			items:2,
		}
	},
	})

	prev.on('click',function(){
		owl.trigger('prev.owl');
	})
	next.on('click',function(){
		owl.trigger('next.owl');
	})

	
});

