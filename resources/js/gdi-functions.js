const regexEmail 	= /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;
const regexInt 		= /^-?[0-9]*$/;
const imgTag 		= /<img[^>]*>/g;
const comma 		= /,/g;
const regexAlpha	= /^[a-zA-Z ]*$/;

function hideCanvasImage() {
	$('#thumbnailCanvas').hide();
}

function showCanvasImage() {
	$('#thumbnailCanvas').show();
}

function escapeComma(str){
	console.log(str);
	return str.toString().replace(comma, '');
}
//FUNCs to be used during validation - GENERAL VALIDATION FUNCs

function regex(value, exp) {
  if (exp.test(value)) {
    return true;
  } else {
    return false;
  }
}

function checklength(value) {
  if (Array.isArray(value)) return value.length;
  if (typeof value === "object") {
    return Object.keys(value).length;
  }
  return String(value).length;
}
/**/
function validArrayMinLength(value, len) {
  if (validRequire(value)) {
    if (checklength(value) <= len) {
      return true;
    }
    return false;
  } else {
    return true;
  }
}
function validMaxLength(value, len) {
  if (validRequire(value)) {
    if (checklength(value) <= len) {
      return true;
    }
    return false;
  } else {
    return true;
  }
}
function validMinLength(value, len) {
  if (validRequire(value)) {
    if (checklength(value) >= len) {
      return true;
    }
    return false;
  } else {
    return true;
  }
}
// (value) => !req(value) || len(value) <= length
function validInt(value) {
  if (regex(value, regexInt)) {
    return true;
  }
  return false;
}

function validEmail(value) {
  if (regex(value, regexEmail)) {
    return true;
  }
  return false;
}
function validAlpha(value) {
  if (regex(value, regexAlpha)) {
    return true;
  }
  return false;
}

function validRequire(value) {
  if (Array.isArray(value)) return !!value.length;
  if (value === undefined || value === null) {
    return false;
  }

  if (value === false) {
    return true;
  }

  if (value instanceof Date) {
    // invalid date won't pass
    return !isNaN(value.getTime());
  }

  if (typeof value === "object") {
    for (let _ in value) return true;
    return false;
  }

  return !!String(value).length;
}
function isNotEmpty(value) {
  if (Array.isArray(value)) return !!value.length;
  if (value === undefined || value === null) {
    return false;
  }

  if (value === false) {
    return true;
  }

  if (value instanceof Date) {
    // invalid date won't pass
    return !isNaN(value.getTime());
  }

  if (typeof value === "object") {
    for (let _ in value) return true;
    return false;
  }

  return !!String(value).length;
}
// VALIDATION - start
function validate(validation, data) {
  var errors = {};

  var len = Object.keys(validation).length;
  for (var i = 0; i < len; i++) {
    var key = Object.keys(validation)[i];

    filter = validation[key]; //name,email etc
    var filterLen = Object.keys(filter).length;
    for (var j = 0; j < filterLen; j++) {
      var vi_name = Object.keys(filter)[j];
      var vi_value = filter[vi_name];
      //REQUIRED FIELD
      if (vi_name == "required") {
        if (vi_value) {
          if (!validRequire(data[key])) {
            errors[key] = key + " is required";
          }
        }
      }
      //EMAIL FIELD
      if (vi_name == "email") {
        if (!validEmail(data[key])) {
          errors[key] = key + " is invalid address";
        }
      }
      //ALPHABET ONLY
      if (vi_name == "alpha") {
        if (!validAlpha(data[key])) {
          errors[key] = key + " must be alphabet";
        }
      }
      //INTEGER FIELD
      if (vi_name == "mustInteger") {
        if (vi_value) {
          if (!validInt(data[key])) {
            errors[key] = key + " must be integer";
          }
        }
      }
      //MINLENGTH FIELD
      if (vi_name == "minLength") {
        var test = data[key];
        if (!validMinLength(data[key], vi_value)) {
          errors[key] = key + " must be greater than" + vi_value;
        }
      }
      //MAXLENGTH FIELD
      if (vi_name == "maxLength") {
        if (!validMaxLength(data[key], vi_value)) {
          errors[key] = vi_value + "자리이상 입력이 불가합니다.";
        }
      }
      //      //REQUIRED-IF FIELD
      //      if (vi_name == "requiredIf") {
      //        if (!validRequire(data[vi_value])) {
      //        } else {
      //          if (!validRequire(data[key])) {
      //            errors[key] = key + " is required when " + vi_value + " is chosen";
      //          }
      //        }
      //      }

      //REQUIRED-MANY FIELD
      if (vi_name == "requiredIf") {
        var vi_valueArr = vi_value.split(",");
        let err = 0;

        for (var o = 0; o < vi_valueArr.length; o++) {
          if (!isNotEmpty(data[vi_valueArr[o]])) {
            err++;
          }
        }
        if (!isNotEmpty(data[key])) {
          if (err > 0) {
          }
        }
        if (err == vi_valueArr.length) {
          //if all required fields are empty          
        } else if (err > 0) {
          errors[key] = key + " is required when " + vi_value + " is chosen";
        } else {
          if (!isNotEmpty(data[key])) {
            errors[key] = key + " is required when " + vi_value + " is chosen";
          }
        }
      }
      //REQUIRED IF VALUE

      if (vi_name == "requiredIfVal") {
        let arr = vi_value.split(",");
        let prop = arr[0];
        let value = arr[1];
        if (data[prop] == value) {
          if (!isNotEmpty(data[key])) {
            errors[key] =
              key + " is required when " + vi_value + " is " + value;
          }
        }
        
      }
    }
  }
  return errors;
}
// VALIDATION - end
function jsonToArr(json_data) {
  var result = [];
  for (var i in json_data) {
    result.push([i, json_data[i]]);
  }
  return result;
}
function delFromArrByCode(arr, value) {

   return arr.filter(function(ele){
       return ele.code != value;
   });

}
function delFromArrByValue(arr, value){
	for( var i = 0; i < arr.length; i++){ 
	   if ( arr[i] === value) {
	     arr.splice(i, 1); 
	   }
	}
	return arr;
}
function jsonToForm(json){
	var form_data = new FormData();	
	for ( var key in json ) {		
		if(json[key] != null || json[key] != ""){
			form_data.set(key, json[key]);
		}
	}	
	return form_data;
}
/*COURSE insert,update,detail huudsand ashiglav*/

function triggerPicker(){
	var today = moment().format(dFormat_2);
	$(".datepicker").datepicker({
		orientation: "auto",
		autoclose:true,
		format:"yyyy-mm-dd",
		todayHighlight: true,
	})
	$(".timepicker").timepicker({
		defaultTime:'09:00',
		minuteStep:30,
		showMeridian:false,
	})
}
function triggerTimePicker(){
	$(".timepicker2").timepicker({
		defaultTime:'08:00',
		minuteStep:30,
		todayHighlight:true,
		showMeridian:false,
		maxHours:21,
		timeFormat: 'HH:mm'
	})
}
function userDatePicker(){
	$(".startdate").datepicker({
		showOn: "both",
		buttonImage: "/resources/images/common/ico_day.png",
		buttonImageOnly: true,
		buttonText: "Select date",
		dateFormat: 'yy-mm-dd',
		showOtherMonths: true,
		selectOtherMonths: true,
		changeMonth: true,
		changeYear: true,
		yearRange: "1921:" + year,
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
	});
}
function openPP(id){
	$(".layer_popup_wrap").addClass("show");
	$(id).addClass("show");
	$("html, body").css("overflow", "hidden");
}
function closePP(){
	$(".layer_popup_wrap").removeClass("show");
	$(".layer_popup_window").removeClass("show");
	$("html, body").css("overflow", "visible");
}
function triggerPopupTrigger(){
	/* Layer Popup Open */
	$(".open_popup").each(function(){
		$(this).click(function(e){
			e.preventDefault();
			var window_id = $(this).attr("href");
			$(".layer_popup_wrap").addClass("show");
			$(window_id).addClass("show");
			$("html, body").css("overflow", "hidden");
		});
	});


	/* Layer Popup Close */
	$(".close_popup").each(function(){
		$(this).click(function(e){
			e.preventDefault();
			$(".layer_popup_wrap").removeClass("show");
			$(this).parents(".layer_popup_window").removeClass("show");
			$("html, body").css("overflow", "visible");
		});
	});
}
function dateTimePickerInit(){
	setTimeout(function(){
		triggerPicker()
	},10)
}

function userDatePickerInit(){
	setTimeout(function(){
		userDatePicker()
	},10)
}
function timePickerInit(){
	setTimeout(function(){
		triggerTimePicker()
	},10)
}
function arrayFilter(array,keyword){
	return array.filter(function(a){
	    return a[0].startsWith(keyword);
	});
}



/*Vue @change couldnt catch the timepicker event
 * so used normal element onChange func to catch the event and assign the value to vue model*/

//Generic function for DateTimePicker onChange

//On value change COURSE DATE LIST
function editListDate(e){
	app.editListDate($(e).attr('index'),e.value)
}
function editListStartTime(e){	
	app.editListStartTime($(e).attr('index'),e.value)
}
function editListEndTime(e){	
	app.editListEndTime($(e).attr('index'),e.value)
}
function editArea(e){	
	app.editArea($(e).attr('index'),e.value)
}
function editCount(e){	
	app.editCount($(e).attr('index'),e.value)
}
moment.updateLocale('ko');
var daytime = moment().format("YYYY-MM-DD HH:mm:ss");
var today = moment().format("YYYY-MM-DD");
var year  = moment().format('YYYY');
var timeNow  = moment().format('HH:mm');
/*datepicker deer aldaa garwal shalgah*/
function editModel(e){
	var vueName = $(e).attr('vName');
	if(vueName == undefined){
		vueName = "app";
	}
	var list = $(e).attr('list');
	var i = $(e).attr('index');
	var modelName = $(e).attr('model')
	if(list != undefined && list != undefined){
	        window[vueName][list][i][modelName] = e.value;
	}else{	        	
    	modelName = modelName.split(".")
    	if(modelName.length > 1){
    		if(modelName.length == 2){
    			this[vueName][modelName[0]][modelName[1]] = e.value
    		}else if(modelName.length == 3){
    			this[vueName][modelName[0]][modelName[1]][modelName[2]] = e.value
    		}
    	}else{
    		this[vueName][modelName] = e.value
    	}
	}
	
}

function resetDate(modelName){
	modelName = modelName.split(".")
	if(modelName.length > 1){
		if(modelName.length == 2){			
			app[modelName[0]][modelName[1]] = today
		}else if(modelName.length == 3){
			app[modelName[0]][modelName[1]][modelName[2]] = today
		}
	}else{
		app[modelName] = today
	}
}
function resetTime(modelName){
	modelName = modelName.split(".")
	if(modelName.length > 1){
		if(modelName.length == 2){			
			app[modelName[0]][modelName[1]] = "0:00"
		}else if(modelName.length == 3){
			app[modelName[0]][modelName[1]][modelName[2]] = "0:00"
		}
	}else{
		app[modelName] = "0:00"
	}
}

/*COURSE insert,update,detail END*/
function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}
function pad5(d) {
    return (d < 10000) ? '0' + d.toString() : d.toString();
}
function splitCategory(categoryStr){
	return categoryStr.split(">>");
}
/*worknet timeStr*/
function formatStartDate(timeStr){ 
	
	var origStr = timeStr
	var timeArr = timeStr.split("  ");
	if(timeArr.length > 1){
		return timeArr[0];
	}    		
	var newStr = moment("20" + origStr).format('YYYYMMDD');
	return moment(newStr, "YYYYMMDD").fromNow();
};
function formatStartDate3(timeStr){
	
	var origStr = timeStr
	var timeArr = timeStr.split("  ");
	if(timeArr.length > 1){
		var newStr = moment("20" + timeArr[1]).format('YYYYMMDD');
		return moment(newStr, "YYYYMMDD").format("YYYY-MM-DD HH:mm:ss");
	}    		
	var newStr = moment("20" + origStr).format('YYYYMMDD');
	return moment(newStr, "YYYYMMDD").format("YYYY-MM-DD HH:mm:ss");
};
function formatDate4(timeStr){
	
	var origStr = timeStr
	var timeArr = timeStr.split("  ");
	if(timeArr.length > 1){
		return timeArr[0];
	}
	
	var newStr = moment("20" + origStr).format('YYYY-MM-DD HH:mm:ss');
	return newStr;
	
};
function formatDate(timeStr){
	
	var origStr = timeStr
	var timeArr = timeStr.split("  ");
	if(timeArr.length > 1){
		return timeArr[0];
	}
	
	var newStr = moment("20" + origStr).format('YYYY MMMM Do');
	return newStr;
	
};
function formatStartDate2(timeStr){
	return moment(timeStr, "YYYY-MM-DD HH:mm:ss").fromNow();
};
function formatDate2(timeStr){
	var newStr = moment(timeStr).format('~MM/D(dd)');
	return newStr;
};
function formatCreatedDt(time){	
	return moment(time, "YYYY-MM-DD HH:mm:ss").fromNow();
};
/*jobkorea timeStr*/
/*Enterprise Swiper*/
function swipeSmallEp(){
	var pagination = {
		el: '#swiperSmallEpPage',
		clickable: true,
	}
	/* Open Employment Banner Slide */
	if($('#swiperSmallEp .swiper-slide').length>=2){
		var swiperSmallEp = new Swiper ('#swiperSmallEp', {
			slidesPerView: 1,
			pagination: pagination,
			autoplay: {
				delay: 5000,
			},
		})
	}else{
		var swiperSmallEp = new Swiper ('#swiperSmallEp', {
			slidesPerView: 1,
			pagination: pagination,
			autoplay: {
				delay: 5000,
			},
		})
	}

	$("#swiperSmallEp .swiper-slide").hover(function(){
		swiperSmallEp.autoplay.stop();
	}, function(){
		swiperSmallEp.autoplay.start();
	});
	swiperSmallEp.update();
}
function swipeMeduimEp(){
	var pagination = {
		el: '#swiperMediumEpPage',
		clickable: true,
	}
	/* Open Employment Banner Slide */
	if($('#swiperMediumEp .swiper-slide').length>=2){
		var swiperMediumEp = new Swiper ('#swiperMediumEp', {
			slidesPerView: 1,
			loop: true,
			pagination: {
				el: '#swiperMediumEpPage',
				clickable: true,
			},
			autoplay: {
				delay: 5000,
			},
		})
	}else{
		var swiperMediumEp = new Swiper ('#swiperMediumEp', {
			slidesPerView: 1,
			pagination: {
				el: '#swiperMediumEpPage',
				clickable: true,
			},
			autoplay: {
				delay: 5000,
			},
		})
	}
	
	$("#swiperMediumEp .swiper-slide").hover(function(){
		swiperMediumEp.autoplay.stop();
	}, function(){
		swiperMediumEp.autoplay.start();
	});
}
function swipeLargeEp(){
	var pagination = {
		el: '#swiperLargeEpPage',
		clickable: true,
	};
	/* Open Employment Banner Slide */
	if($('#swiperLargeEp .swiper-slide').length>=2){
		var swiperLargeEp = new Swiper ('#swiperLargeEp', {
			slidesPerView: 1,
			loop: true,
			pagination:pagination,
			autoplay: {
				delay: 5000,
			},
		})
	}else{
		var swiperLargeEp = new Swiper ('#swiperLargeEp', {
			slidesPerView: 1,
			pagination: pagination,
			autoplay: {
				delay: 5000,
			},
		})
	}

	$("#swiperLargeEp .swiper-slide").hover(function(){
		swiperLargeEp.autoplay.stop();
	}, function(){
		swiperLargeEp.autoplay.start();
	});
}
/*Enterprise Swiper END*/
function checkResponse(response, successUrl) {
	console.log(response.data, "return response data");
	if(response.status == 200 && response.data.status != null && response.data.status == 200){
		alert('삭제되었습니다')
		window.location.replace(successUrl);
	}else{
		alert("Error occured");
	}
}
function validURL(str) {
	var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
	    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
	return !!pattern.test(str);
}
function printElem(elem){
	var mywindow = window.open('', 'PRINT', 'height=800px,width=800px');

    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('</head><body>');
    mywindow.document.write('<div id="print">');
    mywindow.document.write('<h1>' + document.title  + '</h1>');
    mywindow.document.write(elem.innerHTML);
    mywindow.document.write('</div>');
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}
function toNum(num){
	if(num != "" && num != null){
		return parseInt(num);
	}
	return 0;
};
function skipNeg(num){
	if(num == -1){
		return 0;
	}
	return num;
};

function saveFilter(section,filter){
	window.localStorage.setItem( section, JSON.stringify(filter) );
}

function checkLocalStorage(section){
	return window.localStorage.getItem(section);
}

function clearFilterOnDifferentPage(){
	// ->/jobs/openapi.do
	// ->/jobs/viewworknet.do
	var url = location.pathname
	var filters = Constants.Storage.Filter;

	for(var i = 0; i<Object.keys(filters).length; i++){
		/*console.log("-------------------S-------------------------");
		console.log("name", filters[ Object.keys(filters)[i] ].name);
		console.log("safeUrl", filters[ Object.keys(filters)[i] ].safeUrl);
		console.log("url", url);*/
		if( !filters[ Object.keys(filters)[i] ].safeUrl.includes(url) ){
			/*console.log("-------------------DELETING-" + filters[ Object.keys(filters)[i] ].name + "------------------------");*/
			window.localStorage.removeItem( filters[ Object.keys(filters)[i] ].name );
		}
		/*console.log("-------------------E-------------------------");*/
	}
}

clearFilterOnDifferentPage();

function processProgress(max,count){
	var proc = count*100/max;
	if(proc > 100) return 100;
	return proc;
}

function countChar(val,limit) {
	var len = val.length;	
	if (len >= limit) return false;
	return true;
};
function byteCount(char) {
	if(char == undefined) return "";
    //return encodeURI(char).split(/%..|./).length - 1;
	var byte = 0;
    var str = char;
    var one_char = '';
    for(var i=0; i<str.length; i++){
        one_char = str.charAt(i);
        if(escape(one_char).length>4){
            byte += 3;
        }else if(escape(one_char)==='%0A' ){
            byte = byte;
        }else{
            byte++;
        }
    }
    return byte;
}
function getMimetype(hex){
    switch (hex) {
        case '89504E47':
            return 'image/png'
        case '424DD8F3':
        	return 'image/bmp'
        case '47494638':
            return 'image/gif'
        case '25504446':
            return 'application/pdf'
        case 'FFD8FFDB':
        case 'FFD8FFE0':
        case 'FFD8FFE1':
        case 'FFD8FFE2':
            return 'image/jpeg'
        case 'FFD8FFDB':
        case 'FFD8FFE0':
        case 'FFD8FFE1':
        case 'FFD8FFE2':
        	return 'image/jpg'
        case '504B0304':
            return 'application/zip'
        case '4C6F7265':
        case '61736461':
        case '613B6C73':
        	return 'text/plain'
        	
        case 'D0CF11E0':
        	return 'application/x-hwp'
        	
        case 'D0CF11E0':
        	return 'application/msword'
        case 'D0CF11E0':
        	return ' application/vnd.ms-excel'
        case 'D0CF11E0':
        	return 'application/vnd.ms-powerpoint'
        	
        
        case '504B34':
        	return 'application/zip'
        case '504B34':
        	return 'application/octet-stream'
        case '504B34':
        	return 'application/x-zip-compressed'
        case '504B34':
        	return 'multipart/x-zip'
        case '504B34':
        	return 'application/vnd.ms-powerpoint'
        	
        default:
            return 'invalid'
    }
}

function getFileMimeType(file){
	return new Promise(function(resolve, reject) {
		var hex = "";
		const filereader = new FileReader()

	    filereader.onload = function(evt) {
	        if (evt.target.readyState === FileReader.DONE) {
	            const uint = new Uint8Array(evt.target.result)
	            let bytes = []
	            for(var i = 0;i<uint.length;i++){	                	
	                bytes.push(uint[i].toString(16))
	            }	
	            hex = bytes.join('').toUpperCase();
	            //debugger;
	            console.log("hex",hex)
	            
	            resolve( getMimetype(hex) );
	        }
	    }
		
		const blob = file.slice(0, 4);
	    filereader.readAsArrayBuffer(blob);
	});
}

function isValidImageFile(file, ext){
	return new Promise(function(resolve, reject) { 
			var mime = ""
			getFileMimeType(file).then(function(response){
				mime = response
				if( ext.includes(mime) ){
					resolve(true);
				}
				resolve(false);
			}).catch(function(){
				reject(false)
			});
	});
}




function limitCharByByteSize(str, limit){	
	var lenByte = byteCount(str);
	
	if(lenByte > limit) return false;
	return true;
}
function contentViewCounter (category,id){
	var now = moment().format(dFormat_3)
    console.log("Put a message here.11")
	return new Promise(function(resolve, reject) { 
		var url = window.location.href+id;

		var visitPage = [];
		var jsonData = {
			id			: id,
			category	: category,
			date		: now,
			url 		: url
		}

		if(checkLocalStorage(Constants.Storage.Section.USERVIEWUL) != null){
			var isCounter = 1;
			
			visitPage = JSON.parse(checkLocalStorage(Constants.Storage.Section.USERVIEWUL));
			for(var i = 0; i < visitPage.length; i++){
				
				if(visitPage[i].url == url){
					var lastVisited = moment(visitPage[i].date)
					var checkTime = lastVisited.clone().add( Constants.Storage.Section.SAVEHOUR , "hour" );
					if( moment(now).isAfter(checkTime) ){
                        isCounter = 1;
					}
					else {isCounter = 0;}
				}
			}
			if(isCounter == 1){
                visitPage.push( jsonData );
                saveFilter(Constants.Storage.Section.USERVIEWUL, visitPage );
                sendCommunityViewUpdate( prepUrl(jsonData) ).then(function(response){
                    resolve(response);
                });
			}

		}else{
			visitPage.push( jsonData );
			saveFilter(Constants.Storage.Section.USERVIEWUL, visitPage );
			sendCommunityViewUpdate( prepUrl(jsonData) ).then(function(response){
				resolve(response);
			});
		}
	});
	
		
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function isNull(item){
	if(typeof item === "undefined") return true;
	return false;
}

function validateObjectFromParent(obj,child){
	if( !isNull(obj) && !isEmpty(obj[child]) && !isNull(obj[child]) ){
		return true;
	}
	return false;
}
/*program detail*/
function applyStatusClass(status) {
	if(status == "신청") {
		return "applied"
	} else if(status == "선발"){
		return "picked"
	} else if(status == "탈락"){
		return "dropped"
	} else if(status == "수료"){
		return "finished"
	} else if(status == "미수료"){
		return "unfinished"
	} else if(status == "불참"){
		return "absence"
	} else if(status == "취소"){
		return "canceled"
	} else {
		return ""
	}
}
 function applyStatusText(status) {
	 if(status == "신청") {
		return "지원완료"
	} else if(status == "선발"){
		return "선발"
	} else if(status == "탈락"){
		return "탈락"
	} else if(status == "수료"){
		return "수료"
	} else if(status == "미수료"){
		return "미수료"
	} else if(status == "불참"){
		return "불참"
	} else if(status == "취소"){
		return "취소"
	} else {
		return ""
	}
}
function isStopped(str){
	if(str == "stopped") return true;
	return false;
}

function isOffline(str){
	if(str == "offline") return true;
	return false;
}

function isExpired(date,date1){
	var endDate 	= moment(date).format('YYYY-MM-DD');
	var startDate 	= moment(date1).format('YYYY-MM-DD');
	
	var today 		= moment().format('YYYY-MM-DD');
	var tomorrow 	= moment(today).add(1,'day');
	var frmNw 		= moment(endDate).diff(today, 'days');
	
	if(moment(endDate).isSame(today)) {
		return false;
	} else if(moment(endDate).isAfter(today) == false) {
		return true;
	} else {
		return false;
	}
	
}
function isStarted(date){
	var startDate = moment(date);
	var now = moment();
	if(now.isBefore(startDate)){
		return false;
	}
	return true;
}
//전기졸업
function isAcceptedType(acceptedTypes,curType){
	if(acceptedTypes == "전체"){
		return true;
	}else{
		if(!isNull(acceptedTypes) && acceptedTypes != ""){
			var accTypes = acceptedTypes.split(",");
			if(accTypes.length > 0){
				if(accTypes.includes(curType)){
					return true;
				}
			}return false;
		}
	}
}
function isExceptedStudent(acceptedStudents,student){
	
//	console.log(acceptedStudents + " == " + student)
	if( !isNull(acceptedStudents) && acceptedStudents != ""){
		var arrStudents = acceptedStudents.split(",");
		if(arrStudents.length > 0){
			if(arrStudents.includes(student)){
				return true;
			}
			return false;
		}
	}else{
		return false;
	}
}
function dateTypeRegister(date,date1,type) {
	if(type == "stopped") {
		return "접수마감"
	}
	var today = moment().format(dFormat_3);
	var endDate = moment(date, dFormat_3).format(dFormat_3);
	var startDate = moment(date1, dFormat_3).format(dFormat_3);
	var tomorrow = moment(today).add(1);
		if(moment(endDate).isAfter(today) == false) {
			return "접수마감";
		} else if(moment(startDate).isAfter(tomorrow) == true){
			return "접수예정";
		} else {
			return "신청진행중";
		}
}
var dFormat_3 = 'YYYY-MM-DD HH:mm:ss';
var dFormat_4 = "HH:mm:ss";
var dFormat_5 = "YYYY.MM.DD";
function dtReturnText(date,date1,type) {
	console.log("end", date);
	console.log("start", date1);
	if(type == "stopped") {
		return "접수마감"
	}
	var today = moment().format(dFormat_2);
	var endDate = moment(date, dFormat_2).format(dFormat_2);
	var startDate = moment(date1, dFormat_2).format(dFormat_2);
	var tomorrow = moment(today).add(1,'day');
	var frmNw = moment(endDate).diff(today,'day',true);
		if(moment(endDate).isSame(today)) {
			return "오늘 마감";
		} else if(moment(endDate).isAfter(today) == false) {
			return "접수마감";
		} else if(moment(startDate).isAfter(tomorrow) == true){
			return "접수예정";
		} else if(frmNw) {
			var str = Math.ceil(frmNw) + "일 남음";
			return str;
		}
}
function dtReturnClass(date,date1,type) {
	if(type == "stopped") {
		return "deadline_closed"
	}
	var today = moment().format(dFormat_2);
	var endDate = moment(date,dFormat_2).format(dFormat_2);
	var startDate = moment(date1,dFormat_2).format(dFormat_2);
	var tomorrow = moment(today,dFormat_2).add(1,'day');
	var frmNw = moment(endDate).diff(today,'day',true);
		if(moment(endDate).isSame(today)) {
			return "deadline_today";
		} else if(moment(endDate).isAfter(today) == false) {
			return "off";
		} else if(moment(startDate).isAfter(tomorrow) == true) {
			return "deadline_waiting";
		} else if(frmNw) {
			return "";
		}
}
/**
 * @author user0
 * @param phoneNumberString
 * @returns
 * @decription convert phone number format
 */
function formatPhoneNumber(phoneNumberString) {
	  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
	  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
      var match2 = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/)
	  if (match) {
	    return  match[1] + '-' + match[2] + '-' + match[3]
	  } else if(match2){
	      return  match2[1] + '-' + match2[2] + '-' + match2[3]
	  }
	  return null
	}
/**
 * @author user0
 * @param formatBusiNumber
 * @returns
 * @decription convert Business number format
 */
function formatBusiNumber(phoneNumberString) {
	  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
	  var match = cleaned.match(/^(\d{3})(\d{2})(\d{5})$/)
	  if (match) {
	    return  match[1] + '-' + match[2] + '-' + match[3]
	  }
	  return null
	}

/*Recruit Date*/ 
function formatDeadline(str) {
		var today = moment().format('YYYY-MM-DD HH:mm');
		var endDate = moment(str).format('YYYY-MM-DD HH:mm');
		
		if(moment(endDate).isAfter(today) == true) {
			var deadline = moment(endDate).diff(today, 'days', true);
			var txt = 'D - ' +  Math.ceil(deadline);
			return txt;
		} else if(moment(endDate).isSame(today) == true) {
			var txt = '오늘 마감';
			return txt;
		} else {
		return "접수마감"
	}
}

function textMonth(month){
	if(month == 0){ 	return "1월" 	}else
	if(month == 1){ 	return "2월" 	}else
	if(month == 2){ 	return "3월" 	}else
	if(month == 3){ 	return "4월" 	}else
	if(month == 4){ 	return "5월" 	}else
	if(month == 5){ 	return "6월" 	}else
	if(month == 6){ 	return "7월" 	}else
	if(month == 7){ 	return "8월" 	}else
	if(month == 8){ 	return "9월" 	}else
	if(month == 9){ 	return "10월" 	}else
	if(month == 10){ 	return "11월"	}else
	if(month == 11){ 	return "12월"	}
}

function initGdiTimePicker(){
	var elList = document.getElementsByClassName("gdiTimePicker");
	for(var i = 0;i<elList.length;i++){
		makeGdiTimePicker( elList[i] )
	}
}

function initGdiPhoneMask(){
	var elList = document.getElementsByClassName("phoneMask");
	for(var i = 0;i<elList.length;i++){
		makePhoneInput( elList[i] )
	}
}

//GDI TIME PICKER START

function makeGdiTimePicker(input){
	
	
		
	var refresh = document.createElement("a");
		refresh.classList.add("btn_md");
		refresh.classList.add("btn_refresh");
		refresh.innerHTML = "초기화"		
	
	//CREATING TABLE
	var anchorUp = document.createElement("a");
		anchorUp.classList.add("glyphicon")
		anchorUp.classList.add("glyphicon-chevron-up")
	var anchorUpClone = anchorUp.cloneNode(true);
		
	var anchorDown = document.createElement("a");
		anchorDown.classList.add("glyphicon")
		anchorDown.classList.add("glyphicon-chevron-down")
	var anchorDownClone = anchorDown.cloneNode(true);
	
	var table = document.createElement("table");
		table.classList.add("gtp_con");
		
	var row_1 = document.createElement("tr");
		var tdHourUp = document.createElement("td");
			tdHourUp.appendChild(anchorUp);
		var midSpace = document.createElement("td");
		var tdMinUp  = document.createElement("td");
			tdMinUp.appendChild(anchorUpClone);
		
		row_1.appendChild(tdHourUp);
		row_1.appendChild(midSpace);
		row_1.appendChild(tdMinUp);
	
	var row_2 = document.createElement("tr");
		var tdHour = document.createElement("td");
			var inputHour = document.createElement("input");
				inputHour.setAttribute("type","text")
				inputHour.maxLength = 2;
				inputHour.value = "08";
			tdHour.appendChild(inputHour);
		var tdColon = document.createElement("td");
			tdColon.innerHTML = ":";
		var tdMin = document.createElement("td");
			var inputMin = document.createElement("input");
				inputMin.setAttribute("type","text");
				inputMin.maxLength = 2;
				inputMin.value = "00";
			tdMin.appendChild(inputMin);
		
		row_2.appendChild(tdHour)
		row_2.appendChild(tdColon)
		row_2.appendChild(tdMin)
		
	
	var row_3 = document.createElement("tr");
		var tdHourDown = document.createElement("td");
			tdHourDown.appendChild(anchorDown);
		var midSpace2 = document.createElement("td");
		var tdMinDown = document.createElement("td");
			tdMinDown.appendChild(anchorDownClone);
			
		row_3.appendChild(tdHourDown);
		row_3.appendChild(midSpace2);
		row_3.appendChild(tdMinDown);
	
	table.appendChild(row_1);
	table.appendChild(row_2);
	table.appendChild(row_3);
	
	//table.style.cssText = "top:"+($(input).offset().top + input.clientHeight)+"px;left:"+$(input).offset().left+"px";
	
	$(input).after(table);
	$(input).after(refresh);
	table.style.cssText = "top:"+input.clientHeight+"px;left:0px";
	//GENERAL
	var times = Constants.Time
	var isNum = /^[0-9]+$/;
	
	var model = input.getAttribute("model");
	var vName = "app";	
	if(input.getAttribute("vName") != undefined){
		vName = input.getAttribute("vName");
	}
	
	input.readOnly = true;
	input.value = times[0];
	
	//REFRESH LISTENER
	refresh.addEventListener("click",function(){
		input.value = ""
			
		var arr = model.split(".");
		if(arr.length > 1){
			window[vName][arr[0]][arr[1]] = ""
		}else{
			window[vName][model] = ""
		}
	})
	//CHEVRON LISTENER
	tdHourUp.addEventListener("click",function(e){
		var hour = times[0].split(":")[0];
		if(inputHour.value != ""){
			hour = parseInt(inputHour.value);
		}
		var i;
		for(i = 0; i<times.length;i++){
			var time = times[i];
			var h = parseInt(time.split(":")[0]);
			if(hour == h){
				break;
			}
		}
		
		if((i+2) >= times.length){
			hour = times[0].split(":")[0];
		}else{
			hour = times[i+2].split(":")[0];
		}
		
		inputHour.value = hour;
		
		var arr = model.split(".");
		if(arr.length > 1){
			window[vName][arr[0]][arr[1]] = combineVal(hour,"hour");			
		}else{
			window[vName][model] = combineVal(hour,"hour");
		}
	})
	tdHourDown.addEventListener("click",function(e){
		var hour = times[0].split(":")[0];
		if(inputHour.value != ""){
			hour = parseInt(inputHour.value);
		}
		var i;
		for(i = 0; i<times.length;i++){
			var time = times[i];
			var h = parseInt(time.split(":")[0]);
			if(hour == h){
				break;
			}
		}
		
		if((i-2) < 0){
			hour = times[times.length-1].split(":")[0];
		}else{
			hour = times[i-2].split(":")[0];
		}
		
		inputHour.value = hour;
		
		var arr = model.split(".");
		if(arr.length > 1){
			window[vName][arr[0]][arr[1]] = combineVal(hour,"hour");
		}else{
			window[vName][model] = combineVal(hour,"hour");
		}
	})
	tdMinUp.addEventListener("click",function(e){
		
		var hour = times[0].split(":")[0];
		if(inputHour.value != ""){
			hour = parseInt(inputHour.value);
		}
		var min = times[0].split(":")[1];
		if(inputMin.value != ""){
			min = parseInt(inputMin.value);
		}
		
		var i;
		for(i = 0; i<times.length;i++){
			var time = times[i];
			var h = parseInt(time.split(":")[0]);
			if(hour == h){
				if(min >= 30){
					i++
				}
				break;
			}
		}
		
		if((i+1) >= times.length){
			hour = times[0].split(":")[0];
			min = times[0].split(":")[1];
		}else{
			hour = times[i+1].split(":")[0];
			min = times[i+1].split(":")[1];
		}
		inputHour.value = hour;
		inputMin.value = min;
		
		var arr = model.split(".");
		if(arr.length > 1){
			window[vName][arr[0]][arr[1]] = combineVal(hour,"hour");
			window[vName][arr[0]][arr[1]] = combineVal(min,"minute");
		}else{
			window[vName][model] = combineVal(hour,"hour");
			window[vName][model] = combineVal(min,"minute");
		}
		
	})
	tdMinDown.addEventListener("click",function(e){
		
		var hour = times[0].split(":")[0];
		if(inputHour.value != ""){
			hour = parseInt(inputHour.value);
		}
		var min = times[0].split(":")[1];
		if(inputMin.value != ""){
			min = parseInt(inputMin.value);
		}
		var i;
		for(i = 0; i<times.length;i++){
			var time = times[i];
			var h = parseInt(time.split(":")[0]);
			if(hour == h){
				if(min >= 30){
					i++
				}
				break;
			}
		}
		
		if((i-1) < 0){
			hour = times[times.length-1].split(":")[0];
			min = times[times.length-1].split(":")[1];
		}else{
			hour = times[i-1].split(":")[0];
			min = times[i-1].split(":")[1];
		}
		inputHour.value = hour;
		inputMin.value = min;
		
		var arr = model.split(".");
		if(arr.length > 1){
			window[vName][arr[0]][arr[1]] = combineVal(hour,"hour");
			window[vName][arr[0]][arr[1]] = combineVal(min,"minute");
		}else{
			window[vName][model] = combineVal(hour,"hour");
			window[vName][model] = combineVal(min,"minute");
		}
		
	})
	//***********************************************************************************************************************************************
	//INPUT LISTENER
	input.addEventListener("click",function(e){
		
		
		if(!table.classList.contains("active")){
			table.classList.add("active")
		}
		
		if(this.value == ""){
			this.value = times[0];
			var arr = model.split(".");
			if(arr.length > 1){
				window[vName][arr[0]][arr[1]] = times[0];
			}else{
				window[vName][model] = times[0];
			}
		}
	})
	
	
	//HOUR LISTENER	
	inputHour.addEventListener("input",function(e){ 
		var str = checkStr(this,e,"hour");
		
		var arr = model.split(".");
		if(arr.length > 1){
			window[vName][arr[0]][arr[1]] = combineVal(str,"hour");
		}else{
			window[vName][model] = combineVal(str,"hour");
		}		
	})
	
	inputHour.addEventListener("blur",function(e){
		if(this.value == ""){
			var str = times[0].split(":")[0];
			this.value = str;
			var arr = model.split(".");
			if(arr.length > 1){
				window[vName][arr[0]][arr[1]] = combineVal(str,"hour");
			}else{
				window[vName][model] = combineVal(str,"hour");
			}
		}
	})
	
	
	//MINUTE LISTENER
	inputMin.addEventListener("input",function(e){		
		var str = checkStr(this,e,"minute");
    	
		var arr = model.split(".");
		if(arr.length > 1){
			window[vName][arr[0]][arr[1]] = combineVal(str,"minute");
		}else{
			window[vName][model] = combineVal(str,"minute");
		}		
	})
	inputMin.addEventListener("blur",function(e){		
		if(this.value == ""){
			var str = times[0].split(":")[1];
			this.value = str;
			var arr = model.split(".");
			if(arr.length > 1){
				window[vName][arr[0]][arr[1]] = combineVal(str,"minute");
			}else{
				window[vName][model] = combineVal(str,"minute");
			}
		}	
	})
	
	//FUNCTIONS
	function combineVal(timeStr, type){ 
		var str = "08:00";
		if(type == "hour"){
			str = timeStr + ":" + inputMin.value
		}else if(type == "minute"){
			str = inputHour.value + ":" + timeStr
		}
		
		return str;
	}
	function checkStr(el,e,type){
		
		var str  = el.value
		var char = "";
		if(e.data != undefined){
			char = e.data
		}else{
			if(str.length > 0){
				char = str[str.length - 1];
			}
		}
		if(!isNum.test(char)){
			str = str.replace(char,'');
		}

		if(el.value.length > 1){
			if(type == "hour"){
				if(parseInt(str) < 8 || parseInt(str) > 20){
					str = "";
				}
			}else if(type == "minute"){
				if(parseInt(str) < 0 || parseInt(str) >= 60){
					str = ""
				}
			}
		}
		
		el.value = str;
		return str;
	}
}
$(document).mouseup(function(e)
{
	
    var container = $(".gtp_con");
    var container2 = $(".gdiTimePicker");
    // if the target of the click isn't the container nor a descendant of the container
    if ((!container.is(e.target) && container.has(e.target).length === 0)
    	&& (!container2.is(e.target) && container2.has(e.target).length === 0)
    ){
    	container.removeClass("active")
    }
});
// GDI TIME PICKER END

function initCounter(){
	$(".counter").each(function () {
		$(this).prop("Counter",0).animate({
			Counter: $(this).text()
		}, {
			duration: 1000,
			easing: "swing",
			step: function (now) {
				$(this).text(Math.ceil(now));
			}
		});
	});

}

function initGdiCompanyMask(){
	var elList = document.getElementsByClassName("companyMask");
	for(var i = 0;i<elList.length;i++){
		makeCompanyInput( elList[i] )
	}
}
function initNumberSepInput(){
	var elList = document.getElementsByClassName("commaSep");
	for(var i = 0;i<elList.length;i++){
		makeNumberSepInput( elList[i] )
	}
}

function initStdnoInput(){
	var elList = document.getElementsByClassName("stdno");
	for(var i = 0;i<elList.length;i++){
		makeStdnoInput( elList[i] )
	}
}

function initDateInput(){
	var elList = document.getElementsByClassName("gdiDate");
	for(var i = 0;i<elList.length;i++){
		makeDateInput( elList[i] )
	}
}

var lastKey;
var testResult;
document.onkeydown = function (e){
	e = e || event;
	
	lastKey = e.keyCode;
   	
};
function makePhoneInput(el){
	var input = el
	// input.placeholder 	= Admin.Placeholder.PHONENO;
	input.placeholder 	= "010-1111-1111";
	input.maxLength		= 13;
	input.addEventListener("input",function(e){
		var vName = "app";
		if(e.currentTarget.getAttribute("vName") != undefined){
			vName = e.currentTarget.getAttribute("vName");
		}
		
		var str  = this.value
		var char = "";
		if(e.data != undefined){
			char = e.data
		}else{
			if(str.length > 0){
				char = str[str.length - 1];
			}
		}
		var isNum = /^[0-9\.\-\/]+$/;
		
    	if(!isNum.test(char)){
    		str = str.replace(char,'');
    	}
    	if(e.inputType != undefined){
    		if(e.inputType != "deleteContentBackward"){
    	    	if(str.length == 3 || str.length == 8){
    	    		str += "-"
    	    	}
        	}
    	}else{
    		if(lastKey != 8){
    			if(str.length == 3 || str.length == 8){
    	    		str += "-"
    	    	}
    		}
    	}
    	
		var model = e.currentTarget.getAttribute("model");		
		var arr = model.split(".");
		if(arr.length > 1){
			window[vName][arr[0]][arr[1]] = str; 
		}else{
			window[vName][model] = str;
		}    	
	})
}
function makeNumberInput(el){
	var input = el
	input.addEventListener("input",function(e){
		
		var str  = this.value
		var char = "";
		if(e.data != undefined){
			char = e.data
		}else{
			if(str.length > 0){
				char = str[str.length - 1];
			}
		}
		var isNum = /^[0-9\.\-\/]+$/;
		
    	if(!isNum.test(char)){
    		str = str.replace(char,'');
    	}    	
    	
    	this.value = str; 
		 	
	})
}
function makeKrPhoneInput(el){
	var input = el
	input.placeholder 	= "010-1234-5678";
	input.addEventListener("input",function(e){
		
		var str  = this.value
		var char = "";
		if(e.data != undefined){
			char = e.data
		}else{
			if(str.length > 0){
				char = str[str.length - 1];
			}
		}
		var isNum = /^[0-9\.\-\/]+$/;
		
    	if(!isNum.test(char)){
    		str = str.replace(char,'');
    	}
    	
    	if(str.length > 1){
    		console.log(typeof str)
    		console.log( str.indexOf("02") )
    		if(str.indexOf("02") == 0 ){// 02-
    			this.maxLength = 12;
    			if(e.inputType != undefined){
    	    		if(e.inputType != "deleteContentBackward"){
    	    	    	if(str.length == 2 || str.length == 7){
    	    	    		str += "-"
    	    	    	}
    	        	}
    	    	}else{
    	    		if(lastKey != 8){
    	    			if(str.length == 2 || str.length == 7){
    	    	    		str += "-"
    	    	    	}
    	    		}
    	    	} 
        	}else{ // common
        		this.maxLength = 13;
    			if(e.inputType != undefined){
    	    		if(e.inputType != "deleteContentBackward"){
    	    	    	if(str.length == 3 || str.length == 8){
    	    	    		str += "-"
    	    	    	}
    	        	}
    	    	}else{
    	    		if(lastKey != 8){
    	    			if(str.length == 3 || str.length == 8){
    	    	    		str += "-"
    	    	    	}
    	    		}
    	    	} 
        	}
    	}
    	
    	
    	
    	
    	this.value = str; 
		 	
	})
}

function makeCompanyInput(el){
	var input = el 
	input.placeholder 	= Constants.Placeholder.COMPANYNO;
	input.maxLength		= 12;
	input.addEventListener("input",function(e){
		var vName = "app";
		if(e.currentTarget.getAttribute("vName") != undefined){
			vName = e.currentTarget.getAttribute("vName");
		}
		
		var str  = this.value
		var char = "";
		if(e.data != undefined){
			char = e.data
		}else{
			if(str.length > 0){
				char = str[str.length - 1];
			}
		}
		var isNum = /^[0-9\.\-\/]+$/;		
		
    	if(!isNum.test(char)){
    		str = str.replace(char,'');
    	}
    	if(e.inputType != undefined){
    		if(e.inputType != "deleteContentBackward"){
        		if(str.length == 3 || str.length == 6){
            		str += "-"
            	}
    		}
    	}else{
    		if(lastKey != 8){
    			if(str.length == 3 || str.length == 6){
    	    		str += "-"
    	    	}
    		}
    	}    	
    	
    	var model = e.currentTarget.getAttribute("model");		
		var arr = model.split(".");
		if(arr.length > 1){
			window[vName][arr[0]][arr[1]] = str; 
		}else{
			window[vName][model] = str;
		}
	})
}
function makeStdnoInput(el){
	var input = el
	if(Admin != undefined){
		input.placeholder 	= Admin.Placeholder.STUDENTID;
	}
	input.maxLength		= 8;
	input.addEventListener("input",function(e){
		var vName = "app";
		if(e.currentTarget.getAttribute("vName") != undefined){
			vName = e.currentTarget.getAttribute("vName");
		}
		
		var str  	= this.value
		var char = "";
		if(e.data != undefined){
			char = e.data
		}else{
			if(str.length > 0){
				char = str[str.length - 1];
			}
		}
		var isNum 	= /^[0-9\.\-\/]+$/;
    	if(!isNum.test(char)){
    		str = str.replace(char,'');
    	}
    	var model = e.currentTarget.getAttribute("model");		
		var arr = model.split(".");
		if(arr.length > 1){
			window[vName][arr[0]][arr[1]] = str; 
		}else{
			window[vName][model] = str;
		}
	})
}

function makeDateInput(el){
	var input = el
	input.placeholder 	= Admin.Placeholder.BIRTHDATE;
	input.maxLength		= 10;
	input.addEventListener("input",function(e){
		var vName = "app";
		if(e.currentTarget.getAttribute("vName") != undefined){
			vName = e.currentTarget.getAttribute("vName");
		}
		
		var str  	= this.value
		var char = "";
		if(e.data != undefined){
			char = e.data
		}else{
			if(str.length > 0){
				char = str[str.length - 1];
			}
		}
		var isNum 	= /^[0-9\.\-\/]+$/;
    	if(!isNum.test(char)){
    		str = str.replace(char,'');
    	}
    	if(e.inputType != undefined){
    		if(e.inputType != "deleteContentBackward"){
    			if(str.length == 4 || str.length == 7){
    	    		str += "/"
    	    	}
    		}
    	}else{
    		if(lastKey != 8){
    			if(str.length == 4 || str.length == 7){
    	    		str += "/"
    	    	}
    		}
    	}   
    	var model = e.currentTarget.getAttribute("model");		
		var arr = model.split(".");
		if(arr.length > 1){
			window[vName][arr[0]][arr[1]] = str; 
		}else{
			window[vName][model] = str;
		}
	})
}
function makeNumberSepInput(el){
	
	var input = el
	input.maxLength		= 15;
	input.addEventListener("input",function(e){		
		var str  = this.value
		var char = e.data
		var isNum = /^[0-9\.\-\/]+$/;
    	if(!isNum.test(char)){
    		str = str.replace(char,'');
    	}
    	
    	
    	this.value = str
	})
}

function formatNumber(e) {
	if(e !== undefined && e !== null) {
		nStr = e
		nStr += '';
		x = nStr.split('.');
		x1 = x[0].replace(/,/g,"");
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		e = x1 + x2;
		return x1 + x2;
	}
}
//fd - format date
function fd_day1(day){
	return moment( day,dFormat_2 ).format("DD");
}

function fd_day2(day){
	//5월 27일
	return moment( day,dFormat_2 ).format("MMM Do");
}
function fd_day3(day){
	//31
	return moment( day,dFormat_2 ).format("dd");
}
function fd_day4(day){
	//2019-05-31(금)
	return moment( day,dFormat_2 ).format(dFormat_2 + "(dd)");
}
function fd_day5(day){
	//2019년 5월 27일 (월)
	return moment( day,dFormat_2 ).format("LL (dd)");
}
function fd_day6(day){
	//2019-05-31
	return moment( day,dFormat_2 ).format(dFormat_2);
}
function fd_day7(day){
	//5월 27일 (월)
	return moment( day,dFormat_2 ).format("MMM Do (dd)");
}
function fd_day8(day){
	//6/10 (월)
	return moment( day,dFormat_2 ).format("M/DD (dd)");
}
function fd_day9(day){
	//6/10 (월)
	return moment( day,dFormat_2 ).format(dFormat_2 + " LT");
}
function fd_day10(day){
	//6/10 (월)
	return moment( day,dFormat_2 ).format("YYYY.MM.DD");
}
function fd_month(month){
	return moment().month(month).format("MM")
}
function showN(date){
	var now = moment();
	var date = moment(date);
	
	var isDayPast = date.clone().add( 24, "hour" );
    if ( isDayPast.isAfter(now) ) {
        return 'N'
    }
    return ''
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
//common PROMISE
function getProfessorConsultPart(vueName){
	if(vueName == undefined){
		vueName = "app";
	}
	sendReqProfessorConsultPart().then(function(response){
		this[vueName].professorConsultPart = response.data;
	})
}
function counselPart(){
	sendReqGetCounselPart().then(function(response){
		app.counselPart = response.data
	})
}
function statusApplyCounsel(vueName){
	if(vueName == undefined){
		vueName = "app";
	}
	sendReqGetCounselApplyStatus().then(function(response){
		this[vueName].statusList = response.data;
	})
}
function getCareerDepartments(vueName){
	if(vueName == undefined){
		vueName = "app";
	}
	sendReqGetCareerDepartments().then(function(response){
		this[vueName].studentDeptList = response.data.departmentList;
	})
}
function getCounsellorList(vueName){
	if(vueName == undefined){
		vueName = "app";
	}
	getAllCounsellorList().then(function(response){
		this[vueName].counsellorList = response.data.counsellorList;
	})
}
function getInterviewType(vueName){
	if(vueName == undefined){
		vueName = "app";
	}
	sendReqGetInterviewType().then(function(response){
		this[vueName].interviewTypeList = response.data;
	})
}

function getStudentProfile(id,vName){
	
	if(vName == undefined) vName = "app";
	
	sendReqGetStudentProfileStatus(id,"school").then(function(response){
		this[vName].studentProfile = response.data.studentProfile;
	})
}

function prevYear(){
	var currentYear = moment().year();
	var yearArr = [];
	for(i=0;i<4;i++) {
		var year = currentYear - i;
		yearArr.push(year)
	}
	return yearArr;
}
/*profScreen START*/
function makeProfScreen(bool){
	var val = bool;
	bool = (val == "true");
	
	if(bool){		
		$("#wrap").addClass("prof_simple_screen");
		$("html, body").animate({ scrollTop: 0 });
	        return false;
	}
	$("#wrap").removeClass("prof_simple_screen");
	if( $(".content").offset() != null ){
		var content_offset = $(".content").offset().top;
	}else{
		return false;
	}
	
	$("html, body").animate({ scrollTop: 0 });
        return false;
}

function checkIsProfScreen(){
	var isProfScreen = window.localStorage.getItem("isProfScreen");
	if(isProfScreen) makeProfScreen(isProfScreen);
}

//checkIsProfScreen();
/*profScreen END*/
function convertBodyToFrmData(body){
	var frmData = new FormData();
	for(var i = 0; i<Object.keys(body).length; i++){
		frmData.append( Object.keys(body)[i], body[ Object.keys(body)[i] ] );
	}
	return frmData;
}
function mergeObjects(objArr){
	var result = {}
	
	for(var i = 0;i<objArr.length;i++){
		var obj = objArr[i];
		for (key in obj) {			
			result[key] = obj[key];			
		}		
	}
	return result;
	
}

function isStartAfterEnd( startDate, endDate){
	if(startDate!= '' && endDate!= '' && moment(endDate).isBefore(startDate)){
		alert("시작일은 마감일보다 빨라야 합니다");
		return false
    } else {
		return true
    }
}

/*common START*/

function openPopup(el){
	var window_id = $(el).attr("href");
	$(".layer_popup_wrap").addClass("show");
	$(window_id).addClass("show");
	$("html, body").css("overflow", "hidden");
}
/*Kimchon*/
function openLayerPop(id) {

	$('#depthNav').css('z-index', 0);

	setTimeout(function(){
		preventScoll();
		var WinHeight = $(window).height();

		var pop_ = $(id).children(".layerPop_inner");
		$(".layerPop").hide();
		$(id).fadeIn(100);

		var PopHeight = $(id).children(".layerPop_inner").height();
		var Padd = WinHeight - PopHeight;

		if (WinHeight >= PopHeight) {
			$(pop_).css({
				paddingTop: Padd / 2
			});
		} else {
			$(pop_).css({
				paddingTop: "100px"
			});
		}

		$("body").addClass("fixe");
	}, 50);
}

function closePop(){
	$(".layerPop").hide();
	$("body").removeClass("fixe");
	enableScroll();
}

function confirmClose(el,msg){
	if(msg == "cancel"){
		if(confirm("cancel with message.")){
			$(".layer_popup_wrap").removeClass("show");
			$(el).parents(".layer_popup_window").removeClass("show");
			$("html, body").css("overflow", "visible");
		}
	}else{
		$(".layer_popup_wrap").removeClass("show");
		$(el).parents(".layer_popup_window").removeClass("show");
		$("html, body").css("overflow", "visible");
	}
}

/*common END*/
/*jsp test*/
/* check later*/
var admId = "";
var admRole = "";


function checkAdminId(id){
	if(id != ""){
		admId = id;
	}
}
function checkAdminRole(role){
	if(role != ""){
		admRole = role;
	}
}

function getDayName(date) {
	var weekday = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
	var d = new Date(date);
	var dayName = weekday[d.getDay()];
	
	return dayName;
}

function removeDateChar(date) {
	var d = date;
	var exploded = d.split(".");
	return exploded[0];
}
/*Axios common test*/
const headers = {
	"Content-Type" 	: "application/json; charset=utf-8",
	"Cache-Control"	: "no-cache",
	"Pragma"       	: "no-cache",
	"Authorization"	: getToken(),
	"X-CSRF-TOKEN"	: token 
}

var api = {
	getList : function(url){
		var req = axios({
			method : "GET",
			url : url
		})
		req.catch(function(){
			console.log("request failed in handler");
		})
		return req;
	},
	getDetail : function(url,option){
		var req = axios({
			method : "GET",
			url : url,
			headers : headers
		})
		req.catch(function(){
			if(option != undefined){
				console.log("error caught with option")
				if(option.hasOwnProperty("alert")){
					alert(option.alert);
				}
				if(option.hasOwnProperty("redirect")){
					window.location = option.redirect;
				}
			}else{
				console.log("error caught without option");
			}
		})
		return req;
	},
	put : function(url,data){
		var req = axios({
			url : url,
			method : "PUT",
			data : data,

		})
		req.catch(function(){
			alert("update failed");
		})
		return req;
	},
	post : function(url,data){
		var req = axios({
			url : url,
			method : "POST",
			data : data,
			headers : headers
		})
		req.catch(function(){
			alert("insert failed");
		})
		return req;
	},
	delete : function(url){
		var req = axios({
			url : url,
			method : "DELETE",
			headers : headers
		})
		req.catch(function(){
			alert("delete failed")
		})
		return req;
	}
}

/*jsp test*/


//doesnt support FormData() in IE...
/*function logForm(frmData){
	// incase of use
	console.log("u should come and uncomment me! I dont work on IE!")
	for (var pair of frmData.entries()) {
	    console.log(pair[0]+ ', ' + pair[1]);
	}
}*/

/*var ivSize = 16;
var key = "Qr5&TV!Pc9D4H?25";

function encrypt(msg, pass) {
  let key = CryptoJS.SHA256(pass);
  let iv = CryptoJS.lib.WordArray.random(16);
  let test = [0, 1, 2];

  let encrypted = CryptoJS.AES.encrypt(msg, key, {
    iv: iv
  });

  let transitmessage = iv.toString() + encrypted.toString();
  return transitmessage;
}

function decrypt(transitmessage, pass) {
  var iv = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));

  var encrypted = transitmessage.substring(32);
  var key = CryptoJS.SHA256(pass);

  var decrypteds = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv
  });
  return decrypteds.toString(CryptoJS.enc.Utf8);
}*/
//SECTION: GDi Switch
$(document).on('click','.gdiSwitchCon',function(e){
	var $this = $(this);
	var data = $this.data();
	var app = "app"
	if(data.hasOwnProperty('app')){
		app = data.app;
	}
	var onOff = window[app][data.list][data.index][data.prop] == data.val_on ? "on" : "off";

	if(onOff == 'off'){
		$this.removeClass('off');
		$this.addClass('on');
		window[app][data.list][data.index][data.prop] = data.val_on
	}else{
		$this.removeClass('on');
		$this.addClass('off');
		window[app][data.list][data.index][data.prop] = data.val_off
	}
})

//SECTION: GDi Drag Drop
Array.prototype.move = function (from, to) {
	this.splice(to, 0, this.splice(from, 1)[0]);
};
var isDragging = false;
var currentCon;
var $currentItem;
var currentApp;
$(document).on('mousedown','.gdiDragCon',function(e){
	currentCon = this
	if($(e.toElement).hasClass('dragger')){
		isDragging = true;
		$currentItem = $(e.toElement).parents('.gdiDragItem');
		$currentItem.addClass('dragging')
		currentApp = $currentItem.data('app')
	}else{
		return;
	}

	var $this = $(this);
	var $origList = $this.find('.gdiDragItem');
	var $dropToList = $this.find('.dragboard').children('.dropTo');
	$origList.each(function(indexListItem,listItem){
		$(listItem).parent('.dragRowCon').outerHeight( $(listItem).parent('.dragRowCon').outerHeight() );
		$dropToList.each(function(indexDropToItem,dropToItem){
			if(indexListItem == indexDropToItem){
				$(dropToItem).outerHeight( $(listItem).parent('.dragRowCon').outerHeight() );
			}
		})
	})

	$(currentCon).children('.dragboard').height('100%')

	$this.children('.dragBoard').css({
		height:'100%'
	});

	$currentItem.css({
		position:'absolute',
	})

	var data = $currentItem.data();
	var app = "app";
	if(data.hasOwnProperty('app')){
		app = data.app;
	}
	// console.log("window",window[app][data.list][data.index][data.model])
	//SECTION defining container height;
})

$(document).on('mousemove','.gdiDragCon',function(e){
    if(isDragging){
        var someHT = 0;
		$currentItem.parent().prevAll().each(function(index,item){
			someHT += $(item).outerHeight();
		})
		//someHT += $currentItem.outerHeight();
        $currentItem.css({
			top:e.clientY - $(this)[0].getBoundingClientRect().top - ($currentItem.outerHeight()/2) - someHT,
		})
        $('#r1c1').text("someHT")
        $('#r2c1').text(someHT)

		$('#r1c2').text("$currentItem.outerHeight()")
		$('#r2c2').text($currentItem.outerHeight())

	}
})

var currentDropTo = 0;
$(document).on('mouseover','.dropTo',function(){
	$this = $(this);
	currentDropTo = $this.data('index');
})

$(document).mouseup(function(e){
	if(isDragging){
		isDragging = false;
		$('.dragboard').height('0%')
		window[currentApp][$currentItem.data('func')]($currentItem.data('index'),currentDropTo);
	}
})
function unbind(data){
	return JSON.parse(JSON.stringify(data));
}

function reloadPg() {
	window.location.reload();
}

function getLocalStorageMessage() {
	if ("type" in localStorage) {
		$.toast({
			heading: '성공',
			text: localStorage.getItem("message"),
			icon: localStorage.getItem("isSuccess"),
			loader: true,
			position: 'top-right'
		});
	}
}

function setLocalStoreMessage(type, isSuccess, message) {
	localStorage.setItem("type", type);
	localStorage.setItem("isSuccess", isSuccess);
	localStorage.setItem("message", message);
}

function clearLocalStorageMessage() {
	localStorage.removeItem('type');
	localStorage.removeItem('isSuccess');
	localStorage.removeItem('message');
}

function setCookie(cname, cvalue, expires){
    var d = new Date();
    d.setTime(d.getTime() + (expires*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname){
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function deleteCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function getToken(){
    var token = getCookie(Constants.Cookie.TOKEN);
    if(token){
        return "Bearer " + token;
    }
}


/*tinymce start*/
var editorAppName="";
var editors;
var editorTimer = 0;
var editorTimerStarted = false;
function startEditorTimer(){
	editorTimerStarted = true;
	if (editorAppName == "") {
		editorAppName = 'app';
	}
	setInterval(function(){
		window[editorAppName].editorTimer--
	},1000);
}
function initTinymce(elList){
	var arr = [];
	elList.forEach(function(el){
		var item  = [el,makeTinymce(el)];
		arr.push(item);
	});
	return arr;
}
function makeTinymce(el){

	var csrf="";
	var type="";
	var id="";

	if($(el).data("type") != undefined && $(el).data("type") != ""){
		type = $(el).data("type");
	}else{
		console.log('image upload type not defined');
	}

	if($(el).data("id") != undefined && $(el).data("id") != ""){
		id = $(el).data("id");
	}else{
		console.log('image upload type not defined');
	}

	if($(el).data("csrf") != undefined && $(el).data("csrf") != ""){
		csrf = $(el).data("csrf");
	}else{
		console.log("csrf undefined");
	}

	var editor = tinymce.init({
		selector: el,
		width: "100%",
		height: 510,
		statubar: true,
		plugins: [
			"advlist image link lists print preview hr",
			"searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime",
			"save table contextmenu directionality emoticons paste textcolor"
		],
		toolbar: "insertfile undo redo | bold italic sizeselect fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | print preview media fullpage | forecolor backcolor | link unlink",
		style_formats: [
			{title: "Headers", items: [
				{title: "Header 1", format: "h1"},
				{title: "Header 2", format: "h2"},
				{title: "Header 3", format: "h3"},
				{title: "Header 4", format: "h4"},
				{title: "Header 5", format: "h5"},
				{title: "Header 6", format: "h6"}
			]},
			{title: "Inline", items: [
				{title: "Bold", icon: "bold", format: "bold"},
				{title: "Italic", icon: "italic", format: "italic"},
				{title: "Underline", icon: "underline", format: "underline"},
				{title: "Strikethrough", icon: "strikethrough", format: "strikethrough"},
				{title: "Superscript", icon: "superscript", format: "superscript"},
				{title: "Subscript", icon: "subscript", format: "subscript"},
				{title: "Code", icon: "code", format: "code"}
			]},
			{title: "Blocks", items: [
					{title: "Paragraph", format: "p"},
					{title: "Blockquote", format: "blockquote"},
					{title: "Div", format: "div"},
					{title: "Pre", format: "pre"}
				]},
			{title: "Alignment", items: [
				{title: "Left", icon: "alignleft", format: "alignleft"},
				{title: "Center", icon: "aligncenter", format: "aligncenter"},
				{title: "Right", icon: "alignright", format: "alignright"},
				{title: "Justify", icon: "alignjustify", format: "alignjustify"}
			]}
		],
		images_upload_url : '/froala/image.do?' + csrf,
		images_file_types: 'jpeg,jpg,png',
		file_picker_types: 'image',
		file_picker_callback: function (cb, value, meta) {
			var input = document.createElement('input');
			input.setAttribute('type', 'file');
			input.setAttribute('accept', 'image/*');
			input.onchange = function () {
				var file = this.files[0];

				var reader = new FileReader();
				reader.onload = function () {
					var id = 'blobid' + (new Date()).getTime();
					var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
					var base64 = reader.result.split(',')[1];
					var blobInfo = blobCache.create(id, file, base64);
					blobCache.add(blobInfo);

					/* call the callback and populate the Title field with the file name */
					cb(blobInfo.blobUri(), { title: file.name });
				};
				reader.readAsDataURL(file);
			};

			input.click();
		},
		images_upload_handler: function (blobInfo, success, failure) {
			var image_size = blobInfo.blob().size / 1000;  // image size in kbytes
			var max_size = 5 * 1024;         // max size in kbytes
			if (image_size > max_size) {
				failure('이미지를 등록할 수 없습니다( ' + image_size + 'kb) , ' + max_size + 'kb 이하의 이미지만 등록할 수 있습니다.');
				return;
			} else {
				var xhr, formData;

				xhr = new XMLHttpRequest();
				xhr.withCredentials = false;
				xhr.open('POST', '/froala/image.do?' + csrf);

				xhr.onload = function() {
					var json;

					if (xhr.status === 403) {
						failure('HTTP Error: ' + xhr.status, { remove: true });
						return;
					}

					if (xhr.status < 200 || xhr.status >= 300) {
						failure('HTTP Error: ' + xhr.status);
						return;
					}

					json = JSON.parse(xhr.responseText);

					if (!json || typeof json.imageurl != 'string') {
						failure('Invalid JSON: ' + xhr.responseText);
						return;
					}

					success(json.imageurl);
				};

				xhr.onerror = function () {
					failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
				};

				formData = new FormData();
				formData.append('Filedata', blobInfo.blob(), blobInfo.filename());
				formData.append('type', type);
				formData.append('id', id);

				xhr.send(formData);
			}
		},
		init_instance_callback : function(editor) {
			console.log('Editor: ' + editor.id + ' is now initialized.');
		}
	}).then(function() {
		return editor;
	}).catch(function() {
		console.log("failed");
	})
}
//kimchon
function convertStrToObj(str) {
    if (str != undefined && str != "") {
        return JSON.parse(str);
    }
    return [];
}

function calcBar(cur,max){
	return "width:"+ cur*100/max +"%"
};

function PopupCenterDual(url, title, w, h, left) {
// Fixes dual-screen position Most browsers Firefox
	var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
	var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
	width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

	var left = dualScreenLeft + left;
	/*var left = ((width / 2) - (w / 2)) + dualScreenLeft;*/
	var top = ((height / 2) - (h / 2)) + dualScreenTop;
	var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

// Puts focus on the newWindow
	if (window.focus) {
		newWindow.focus();
	}
}

function getExtensions(type) {
	if(type == 'docx' || type == 'DOCX') {
		return '/resources/images/common/ico_docx.png'
	} else if(type == 'pptx' || type == 'ppt' || type == 'PPT' || type == 'PPTX') {
		return '/resources/images/common/ico_pptx.png'
	} else if(type == 'xls' || type == 'xlsx' || type == 'XLS' || type == 'XLXS') {
		return '/resources/images/common/ico_xlsx.png'
	} else if(type == 'zip' || type == 'ZIP') {
		return '/resources/images/common/ico_zip.png'
	} else if(type == 'pdf' || type == 'PDF') {
		return '/resources/images/common/ico_pdf.png'
	} else if(type == 'hwp' || type == 'HWP') {
		return '/resources/images/common/ico_hwp.png'
	} else if(type == 'png' || type == 'jpg' || type == 'jpeg' || type == 'PNG' || type == 'JPG' || type == 'JPEG') {
		return '/resources/images/common/ico_img.png'
	} else {
		return '/resources/images/common/ico_file.png'
	}
}

function openUserPortfolio(userId,vName){

    if(vName == undefined) vName = "app";
    var VParam = "";
    if(vName != "app") {
        VParam = "?vName=" + vName
    }
    this[vName].currentUser= userId;
    window.open("/user/portfolio.do" + VParam, '학생 역량개발현황','width=1200, height=800, scrollbars=yes, left=0, top=0, test=testStr');

}

function hasAuth(id) {
	if (id != "") {
		return true
	}
	return false;
}


function setNumberOfPage(num) {
	num = parseInt(num);
	if (!num) {
		return 1
	}

	return num
}

function altFind(arr, callback) {
	for (var i = 0; i < arr.length; i++) {
		var match = callback(arr[i]);
		if (match) {
			return arr[i];
		}
	}
}
