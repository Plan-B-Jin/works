/*format_date*/
function fd_day(day){
	return moment( day,dFormat_2 ).format("MMMM Do (dd)");
}
function thisMonthReturn(date){
	return moment( date,dFormat_2 ).format("M");
}
function showEventDurDay(event){
	
	if( moment( event.endDate ).isAfter( event.startDate ) ){
		return moment(event.startDate).format("LL")
		+"("+ moment(event.startDate).format("ddd") +")" 
		+ "-" + moment(event.endDate).format("LL")
		+"("+ moment(event.endDate).format("ddd") +")" 
	}else if( moment(event.endDate).isSame(event.startDate) ){
		return moment(event.startDate).format("LL")
		+"("+ moment(event.startDate).format("ddd") +")"
	}
	
}

function showEventDurTime(event){
	if(event.fullday != 1){
		return event.startTime
		+ "~" + event.endTime; 
	} return "";
}


function defTagClass(type){
		  if(type == 1){
		return "tag_blue";
	}else if(type == 2){
		return "tag_purple";
	}else if(type == 3){
		return "tag_red";
	}else if(type == 4){
		return "tag_emerald"; 
	}
}

function defineEventClass(type){
		  if(type == 1){
		return "jobEvent";
	}else if(type == 2){
		return "casEvent";
	}else if(type == 3){
		return "holiday";
	}else if(type == 4){
		return "program"; 
	}
}
function typeToKr(type){
		  if(type == 1){
		return "취업행사 ";
	}else if(type == 2){
		return "행사";
	}else if(type == 3){
		return "휴일";
	}else if(type == 4){
		return "프로그램"; 
	}
}

function fd_monthDay(day){
	moment.updateLocale('ko');
	return moment( day,dFormat_2 ).format("ll");
}
const defaultFormat = "YYYY-MM-DD"
//const dFormat_2 	= "YYYYMMDD"
const dFormat_2 	= "YYYY-MM-DD"