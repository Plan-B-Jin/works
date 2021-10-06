var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");

const config = {
	headers: {
	    "Content-Type" 	: "application/json; charset=utf-8",
	    "Cache-Control"	: "no-cache",
	    "Pragma"       	: "no-cache",
	    "X-CSRF-TOKEN"	: token 
	}
};
const configMultipart = {
	headers: {
		"Content-Type": "multipart/form-data",
		"Cache-Control"	: "no-cache",
	    "Pragma"       	: "no-cache",
	    "X-CSRF-TOKEN"	: token 
	}
};
function getDepartments() {
	//alert('test')
}
/*chart data*/
function getReqChartData(url) {
	return axios.get('/career/student/graduation/report.json?timeStamp=' + getStamp() + url, config);
}
function sendReqDeleteApplicationFileUrl(url) {
	return axios.get(url, config);
}
//USER
function getLoginIdCheck(url) {
	return axios.get(Constants.User.CHECKID + url, config);
}
function sendRequestUserData(data) {
    return axios.post(Constants.User.POSTDATA, data, config)
}

function sendRequestUserDataUpdate(id, data) {
    return axios.post(Constants.User.UPDATEDATA + id + ".json", data, config)
}

function sendReqUserAttach(id, data) {
    return axios.post(Constants.User.UPDATEATTACH + id + ".json", data, config)
}

function sendAgreement(data) {
    return axios.post(Constants.User.AGREEMENT, data, config)
}

function sendRequestUserDetail(data, type) {
    return axios.post(Constants.User.POSTDETAIL + type, data, config);
}

//SCHOOL API
function getSchoolList(url){
	return axios.get(Constants.SchoolApi.GET_SCHOOLS + url, config);
}


//PROFESSOR
function sendReqGetStudentListProfessor(url){
	return axios.get(Constants.Professor.STUDENTLIST + url, config)
}
function sendReqProfessorConsultPart(){
	return axios.get(Constants.Professor.CONSULTPART, config)
}
function sendReqProfessorStats(url){
	return axios.get(Constants.Professor.STATS + url, config);
}
/* Employment Statistics */
function getGraduationList(url) {
	return axios.get(Constants.Statistics.LIST + url, config);
}
/*consult insert*/
function sendReqInsertProfessorConsult(body){
	return axios.post(Constants.Professor.CONSULT, body, config)
}
/*consult update*/
function sendReqUpdateProfessorConsult( id, frmData ){
	return axios.post(Constants.Professor.CONSULTUPDATE + id + ".json", frmData, config);
}
/*consult delete*/
function sendReqDeleteProfessorConsult( id ){
	return axios.delete(Constants.Professor.CONSULTUPDATE + id + ".json", config);
}
/*consult list*/
function sendReqGetProfessorConsultList(url){
	return axios.get(Constants.Professor.CONSULT + url, config)
}
function sendReqGetProfessorCounsel(url){
	return axios.get(Constants.Professor.CONSULTPROF + url, config)
}
/*consult list*/
function sendReqGetProfessorConsultDetail(id){
	return axios.get(Constants.Professor.CONSULTUPDATE + id + ".json", config);
}

/*interview insert*/
function sendReqInsertInterview(body){
	return axios.post(Constants.Professor.INTERVIEW, body, config)
}
/*interview update*/
function sendReqUpdateInterview( id, frmData ){
	return axios.post(Constants.Professor.INTERVIEWUPDATE + id + ".json", frmData, config);
}
/*interview get*/
function sendReqGetInterview(stdno){
	return axios.get( Constants.Professor.INTERVIEWUPDATE + stdno + ".json", config);
}
function sendReqGetInterviewSelf(stdno){
	return axios.get( Constants.Professor.INTERVIEW, config);
}

function sendReqGetInterviewType(){
	return axios.get( Constants.Professor.INTERVIEWTYPE, config)
}

//INTERN DOCUMENT VIEW
function getInternDocumentTypeList() {
	return axios.get(Constants.Career.DOCUMENTTYPE, config);
}
function getInsertDocumentById(id) {
	return axios.get('/career/intern/document/'+id+'.json', config);
}
function insertReqInternDocument(data) {
	return axios.post(Constants.Career.DOCUMENTINSERT, data, configMultipart);
}
function intertStudentFileAccept(data) {
	return axios.post(Constants.Career.FILEACCEPT, data, config);
}
//CAREER
function sendReqGetInternList(url){
	return axios.get(Constants.Career.INTERNLIST + url, config);
}
function sendReqInternInsert(data) {
	return axios.post(Constants.Career.INTERNINSERT, data, config);
}
function sendReqInternUpdate(data) {
	return axios.post(Constants.Career.INTERNUPDATE, data, config);
}
function sendReqInternDetail(id) {
	return axios.get(Constants.Career.INTERNDETAIL+ id+ ".json", config);
}
function sendReqGetCompanyList(url){
	return axios.get(Constants.Career.COMPANYLIST + url, config);
}
function sendReqGetCompanyDetail(id){
	return axios.get(Constants.Career.COMPANYDETAIL + id+ ".json", config);
}
function sendReqGetCompanyDetailIntern(id){
	return axios.get(Constants.Career.COMPANYDETAIL + id+ "/intern.json", config);
}
function sendReqGetCareerDepartments(){
	return axios.get(Constants.Career.DEPARTMENTS, config)
}
function sendReqGetCareerClasses(code){
	return axios.get(Constants.Career.CLASSES + code + "/class.json", config)
}
function sendReqGetStudentList(url){
	return axios.get(Constants.Career.STUDENTLIST + url, config);
}
function sendReqGetStudentCareer(url){
	return axios.get(Constants.Career.STUDENTCAREER + url, config);
}
function sendReqGetDocConfigNow(){
	return axios.get(Constants.Career.DOCUMENTCONFIGNOW, config);
}
function sendReqGetDocumentType(){
	return axios.get(Constants.Career.DOCUMENTTYPE, config);
}
function sendReqPostDocumentInsert(data){
	return axios.post(Constants.Career.DOCUMENTINSERT, data, config);
}
function sendReqPostDocumentUpdate(data){
	return axios.post(Constants.Career.DOCUMENTUPDATE, data, config);
}
function sendReqGetDocumentList(id){
	return axios.get(Constants.Career.DOCUMENTLIST + id + ".json", config);
}
function sendReqGetDocCountDepartment(url){
	return axios.get(Constants.Career.FILECOUNTDEPT + url, config);
}
function sendReqDeleteDocument(data){
	return axios.post(Constants.Career.DOCUMENTDELETE, data, config);
}
function getDepartmentListByYearAndDepartmentId(year, departmentId) {
	return axios.get(Constants.Department.DETAIL+"?year="+year+"&departmentId="+departmentId, config);
}
//CAREER END
/*APPLICATION*/
function sendReqApplicationList(){
	return axios.get(Constants.Application.LIST, config);
}
function sendReqDefaultApplication(url){
	return axios.get(Constants.Application.DEFAULT + url, config);
}
function sendReqApplicationInsert(data) {
	return axios.post(Constants.Application.INSERT, data, config);
}
function sendReqDeleteApplication(id) {
	return axios.post(Constants.Application.DELETE, id, config);
}
function sendReqApplicationDetail(id){
	return axios.get(Constants.Application.DETAIL + id + ".json", config);
}
function sendReqApplicationUpdate(data){
	return axios.post(Constants.Application.UPDATE, data, config);
}
function sendReqApplicationSetDefault(data){
	return axios.post(Constants.Application.SETDEFAULT, data, config);
}
function sendReqStudentDepartment(code){
	if(code == undefined || code == null) {
		code = '';
	}	
	return axios.get(Constants.Application.DEPARTMENT + "&code=" + code, config);
}
/*APPLICATIONEND*/
/*COUNSELLOR*/
/*Get single*/
//function sendReqGetCounsellor(id){
//	return axios.post(Constants.Counsellor.COUNSELLORSINGLE + id + ".json", configAdm);
//}
/**List*/
function sendReqGetCounsellorList(url){
	return axios.get(Constants.Counsellor.LIST + url, config);
}

function getAllCounsellorList(url){
    return axios.get(Constants.Counsellor.LIST_COUNSELLOR + url, config);
}
/*COUNSEL*/
function sendReqGetCounsel(id){
	return axios.get(Constants.Counsel.LIST + "&counsellorId=" + id, config );
}
function sendReqGetCounselApplyList(url){
	return axios.get( Constants.Counsel.APPLY + url, config )
}

function sendReqDeleteCounselApply(id){
	return axios.delete( Constants.Counsel.COUNSELAPPLY + id + ".json", config )
}
function sendReqUpdateCounselApply(id, frmData){
	return axios.post( Constants.Counsel.APPLYUPDATE + id + ".json", frmData, configMultipart);
}
/*applyStatus*/
function sendReqGetCounselApplyStatus(){
	return axios.get( Constants.Counsel.APPLYSTATUS, config )
}
function sendReqDeleteProgramAttachFileUrl(url) {
	return axios.get(url, config);
}
/*get*/
function sendReqGetCounselApply(id){
	return axios.get(Constants.Counsel.COUNSELAPPLY + id + ".json?timeStamp=" + getStamp(), configMultipart );
}
/*insert*/
function sendReqReserveCounsel(id, data){
	return axios.post(Constants.Counsel.COUNSELAPPLY + id + ".json", data, configMultipart );
}
/*update*/
function sendReqUpdateCounsel ( id, frmData ){
	return axios.post( Constants.Counsel.APPLYUPDATE + id + ".json", frmData, configMultipart )
}
function sendReqGetCounselPart(){
	return axios.get(Constants.Counsel.COUNSELPART, config)
}

/*Consult QNA*/
function sendReqInsertConsultQna(data) {
	return axios.post(Constants.ConsultQna.INSERTQNA, data, configMultipart);
}
function deleteConsultQna(id) {
	return axios.delete(Constants.ConsultQna.DELETEQNABYUSER + id + '.json', config);
}
function sendReqConsultQnaGetNewFileList(data) {
	return axios.post(Constants.ConsultQna.UPDATEFILES+'.json', data, config);
}
function sendReqUpdateConsultQna(id,data) {
	return axios.post(Constants.ConsultQna.UPDATECONSULTQNA + id + ".json", data, configMultipart);
}

/*STUDENT*/
/**profile*/
function sendReqGetStudentProfile(){
	return axios.get(Constants.Common.PROFILE, config)
}
function sendReqGetSpecialStudent(url){
	return axios.get(Constants.Common.SPECIAL + url, config)
}
function sendReqDeleteSpecialStudent(data){
	return axios.post(Constants.Common.SPECIALDELETE, data, config)
}
function sendReqSpecialStudentInsert(data){
	return axios.post(Constants.Common.SPECIAL, data, config)
}
function sendReqSpecialStudentUpdate(data){
	return axios.post(Constants.Common.SPECIALUPDATE, data, config)
}
function sendReqOfflineCounselStatistic(){
	return axios.get(Constants.Common.OFFLINECOUNSELSTAT, config)
}
function sendReqOfflineCounselTotalStat(url){
	return axios.get(Constants.Common.OFFLINECOUNSELTOTALSTAT + url, config)
}
function sendReqGetStudentProfileStatus(stdno, type){
	if(type == "school"){
		return axios.get(Constants.Common.STUDENTPROFILE + stdno + ".json?school=1", config)
	}
	return axios.get(Constants.Common.STUDENTPROFILE + stdno + ".json", config)
}
function sendReqGetScholarship(url){
	return axios.get(Constants.Common.SCHOLARSHIP + url, config)
}
function sendReqGetSubject(url){
	return axios.get(Constants.Common.SUBJECT + url, config)
}
function sendReqInsertStudentInfo(data) {
	return axios.post(Constants.Common.STUDENT_INSERT, data, config);
}

function sendReqUpdateStudentInfo(data) {
	return axios.post(Constants.Common.STUDENT_UPDATE, data, config);
}

/*profileImage*/
function sendReqInsertProfileImage(frmData){
	return axios.post("/popup/student/image.do?type=insert", frmData, configMultipart);
}

//
function sendReqUpdateProfileImage(frmData){
	return axios.post("/popup/student/updateImage.json?type=update", frmData, configMultipart);
}

function sendReqUrlToDeleteImage(url) {
	return axios.get(url, config);
}
function sendReqDeleteUpdateStudentImage(frmData) {
	return axios.post('/popup/student/deleteUpdateImage.json', frmData, config);
}

/*COUNSELLOR*/
/*Detail*/
function sendReqGetCounsellor(id){
	return axios.get(Constants.Counsellor.COUNSELLORSINGLE + id + ".json", config);
}
/*COMMON*/
function sendReqProgramApplyStatusList(){
	return axios.get(Constants.Common.PROGRAMAPPLYSTATUSLIST, config);
}
function sendReqRecruitApplyStatusList(){
	return axios.get(Constants.Common.RECRUITAPPLYSTATUSLIST, config);
}
function sendReqStudentDept(){
	return axios.get(Constants.Common.STUDENTDEPT, config);
}
function sendReqProgramCategory(){
	return axios.get(Constants.Common.PROGRAMCATEGORY, config);
}
//"Content-Type": "multipart/form-data; charset=utf-8"
function sendReqAgreement(){
	return axios.post(Constants.Common.AGREEMENT, {}, config);
}

/**
 * 
 * @author user0
 * @param url
 * @returns
 */
function sendCommunityViewUpdate(url){
	return axios.get("/update/viewCount.json?" + url, config)
}
/*FEEDBACK*/
/**insert*/
function sendReqInsertProgramFeedback(body){
	return axios.post(Constants.Program.PROGRAMFEEDBACK, body, config)
}
/*REQUEST*/
/**insert*/
function sendReqProgramApply(body){
	return axios.post(Constants.Program.REQUEST, body, config)
}
function sendReqRecruitApply(body){
	return axios.post(Constants.Recruit.REQUEST, body, config)
}
/**delete*/
function sendReqDeleteApply(url){
	return axios.delete(Constants.Program.REQUESTUPDATE + url + ".json", config);
}
function sendReqDeleteRecruitApply(url){
	return axios.delete(Constants.Recruit.REQUESTUPDATE + url + ".json", config);
}
	
/*Enterprise
 *  Get*/
function sendReqGetEnterprise(url){
	return axios.get(Constants.JobAPI.ENTERPRISE + url, config)
}
/*CAREER GUIDE*/
/**insert*/
function sendRegInsertResultCareerGuide(body){
	return axios.post(Constants.Survey.CAREERGUIDE, body, config)
}
/**Detail*/
function sendRegGetDetailResultCareerGuide(url){
	if(url == undefined || url == null) {
		url = '';
	}
	return axios.get(Constants.Survey.CAREERGUIDE + url, config)
}

/*AWARENESS COURSE
 *  Get*/
function sendReqGetCourseResult(url){
	return axios.get(Constants.Survey.AWARENESSCOURSE + url, config)
}
function sendReqGetCourseResult2(url){
	if(url == undefined || url == null) {
		url = '';
	}
	return axios.get(Constants.Survey.AWARENESSCOURSE+ url, config)
}

function sendReqGetCourseResultTemp(){
	return axios.get(Constants.Survey.AWARENESSCOURSETEMP, config)
}

function sendReqGetCourseResultTemp2(){
	return axios.get(Constants.Survey.AWARENESSCOURSETEMP, config)
}


/**Insert*/
function sendReqInsertCourseResult(body){
	return axios.post(Constants.Survey.AWARENESSCOURSE, body, config);
}
function sendReqInsertCourseResult2(body){
	return axios.post(Constants.Survey.AWARENESSCOURSE, body, config);
}	
/*AWARENESS EMPLOYMENT
 *  Get*/
function sendReqGetEmploymentResult(url){
	if(url == undefined || url == null) {
		url = '';
	}
	return axios.get(Constants.Survey.AWARENESSEMPLOYMENT + url,config)
}
function sendReqGetEmploymentResultTemp(){
	return axios.get(Constants.Survey.AWARENESSEMPLOYMENTTEMP,config)
}
/**Insert*/
function sendReqInsertEmploymentResult(body){
	return axios.post(Constants.Survey.AWARENESSEMPLOYMENT, body, config);
}
/*SCRAP*/
/**Insert*/
function sendReqScrap(body,type){
	if(common.role == Constants.Role.STUDENT) {
		return axios.post(Constants.Scrap.SCRAP + type, body, config);
	} else {
		alert('해당 기능은 학생만 이용이 가능합니다.');
		return new Promise(function(resolve, reject) { 
			resolve("해당 기능은 학생만 이용이 가능합니다.")
		});
	}
	
}
/**Get*/
function sendReqScrapList(type,url){
	return axios.get(Constants.Scrap.SCRAP + type + url, config);
}
/**Delete*/
function sendReqScrapDelete(code,type){
	return axios.delete( Constants.Scrap.UPDATESCRAP + code + ".json?type="+type, config );
}
function sendReqScrapDeleteMany(codes,type){
	return axios.post( Constants.Scrap.DELETEMANY + "?type="+type,codes, config );
}
/**Update*/
function sendReqScrapOrderUp(code,type){
	return axios.put( Constants.Scrap.UPDATESCRAP + code + "/moveUp.json?type=" + type + "&_csrf=" + token, config);
}
function sendReqScrapOrderDown(code,type){
	return axios.put( Constants.Scrap.UPDATESCRAP + code + "/moveDown.json?type=" + type + "&_csrf=" + token, config);
}

/* COMMUNITY */
function getReqBoard(url, type) {
	if(type === 'NOTICE') {
		return axios.get( Constants.Board.BOARD_NOTICE + url, config);
	} else if (type === 'CAREER') {
		return axios.get( Constants.Board.BOARD_CAREER + url, config);
	} else if (type === 'MANAGEMENT') {
		return axios.get( Constants.Board.BOARD_MANAGEMENT + url, config);
	}
}
function getReqBoardDetail(id, type, lang) {
	var category = type;
	
	return axios.get("/"+ category.toLowerCase() + "/" + lang + "/detail.json?id=" + id, config)
	
}
function getReqMainPageNotice(lang) {
	return axios.get("/" + lang + "/main/notice.json", config);
}
function sendReqBoardDetail(id) {
	return axios.get( Constants.Community.NOTICESINGLE + id + ".json", config);
}
function sendReqDeleteBoard(id) {
    return axios.delete(Constants.Community.BOARD +id + ".json",config);
}
function getReqFaq(url) {
	return axios.get( Constants.Community.FAQ + url, config );
}
function getReqNotice(url) {
	return axios.get( Constants.Community.NOTICE + url ,config );
}
function sendReqNoticeDetail(id) {
	return axios.get( Constants.Community.NOTICESINGLE + id + ".json", config);
}
function getReqQna(url) {
	return axios.get( Constants.Community.QNA + url, config );
}
function getReqQnaAdmin(url) {
	return axios.get( Constants.Community.QNA_ADMIN + url, config );
}
function sendReqGetQna(id) {
	return axios.get(Constants.Community.QNA_SINGLE_BY_USER + id + ".json", config);
}
function sendReqUpdateQnaUser(id,data) {
	return axios.post(Constants.Community.UPDATEQNA + id + ".json", data, configMultipart);
}
function sendReqInsertQna(data) {
	return axios.post(Constants.Community.INSERTQNA, data, configMultipart);
}
function deleteUserQna(id) {
	return axios.delete(Constants.Community.DELETEQNABYUSER + id + '.json', config);
}
function sendReqDeleteQnaAttachFileUrl(url) {
	return axios.get(url, config);
}
function sendReqQnaGetNewFileList(data) {
	return axios.post(Constants.Community.UPDATEFILES+'.json', data, config);
}
/* Study Cafe */
function sendReqInsertStudyCafe(data) {
	return axios.post(Constants.Community.STUDY_CAFE_INSERT, data, config);
}
/* Study Cafe End*/

/*TEST*/
function getReqQnaTest(url) {
	return axios.get( Constants.Community.QNATEST + url, config );
}
function getReqQnaTestAdmin(url) {
	return axios.get( Constants.Community.QNA_ADMINTEST + url, config );
}
function sendReqGetQnaTest(id) {
	return axios.get(Constants.Community.QNATEST_SINGLE_BY_USER + id + ".json", config);
}
function sendReqUpdateQnaTest(id,data) {
	return axios.post(Constants.Community.UPDATEQNATEST + id + ".json", data, configMultipart);
}
function deleteUserQnaTest(id) {
	return axios.delete(Constants.Community.DELETEQNABYUSERTEST + id + '.json', config);
}

function sendReqDeleteQnaTestAttachFileUrl(url) {
	return axios.get(url, config);
}
function sendReqQnaTestGetNewFileList(data) {
	return axios.post(Constants.Community.UPDATEFILESTEST+'.json', data, config);
}
// END QNA

function getReqGallery(url) {
	return axios.get( Constants.Community.GALLERY + url, config );
}

/*PROGRAM*/
/*Insert*/
//function sendReqInsertProgram(data) {
//	return axios.post(Constants.Program.PROGRAM, data, configMultipart);
//}
///**Update*/
//function sendReqUpdateProgram(id,data) {
//	return axios.post(Constants.Program.PROGRAMUPDATE + id + ".json", data,configMultipart);
//}
/**Delete*/
//function sendReqDeleteProgram(id) {
//	return axios.delete(Constants.Program.PROGRAMUPDATE +id + ".json",config);
//}
/**List*/
function sendReqProgram(url) {
	return axios.get(Constants.Program.PROGRAM + url, config);
}
/**Detail*/
function sendReqProgramDetail(id) {
    return axios.get(Constants.Program.PROGRAMUPDATE + id + ".json", config);
}
function sendReqProgramListLog(id) {
    return axios.get(Constants.Log.PROFILE + id + ".json", config);
}

/*PROGRAM END*/

/*RECRUIT
/**List*/
function sendReqJob(url) {
	return axios.get(Constants.Recruit.RECRUIT + url, config);
}
/**Recruit apply*/
function sendReqCheckRecruitApply(url){
	return axios.get(Constants.Recruit.REQUEST + url, config)
}
/**Program apply*/
function sendReqCheckProgramApply(url){
	return axios.get(Constants.Program.REQUEST + url, config)
}
/**Detail*/
function sendReqRecruitDetail(id) {
	return axios.get( Constants.Recruit.RECRUITUPDATE + id + ".json?timeStamp="+getStamp(), config );
}

/*PSY*/
function sendReqPsyRslt_9(url) {
  return axios.get(Constants.Survey.PSY_9 + url, config);
}
function sendReqPsyRslt_S(url) {  
  return axios.get(Constants.Survey.PSY_S + url, config);
}
function sendReqPsyRslt_A(url) { 
  return axios.get(Constants.Survey.PSY_A + url, config);
}
function sendReqPsyRslt_W(url) {
  return axios.get(Constants.Survey.PSY_W + url, config);
}
/*USERS - ?*/

function sendReqList(filter) {
  data = JSON.stringify(filter);
  return axios.post(apiUrl + "/users.json", data, config);
}
function reqUser(id) {
  return axios.post(apiUrl + "/user.json", id, config);
}
/*SARAMIN*/
function sendReqSaramin(url) {
	return axios.get(Constants.JobAPI.SARAMIN + url, config);
}
/*CAREER*/
function sendReqCareer(url) {
	return axios.get(Constants.JobAPI.CAREER + url, config);
}
/*WORKNET*/
function sendReqWorknet(url) {
  return axios.get(Constants.JobAPI.WORKNET + url, config);
}
function sendReqWorknetProfDetail(url) {
  return axios.get(Constants.JobAPI.WORKNETPROFDETAIL + url, config);
}
function sendReqWorknetJobDetail(jobId) {
  return axios.get(Constants.JobAPI.WORKNETJOBDETAIL + jobId, config);
}

/*WN SEARCHBY*/
function sendReqWorknetKeyword(url) {
  return axios.get(Constants.JobAPI.WORKNETKEYWORD + url, config);
}
function sendReqWorknetSearchByKnowledge(url) {
  return axios.get(Constants.JobAPI.WORKNETKNOWLEDGE + URL, config);
}
function sendReqWorknetSearchByBusinessAbility(url) {
  return axios.get(Constants.JobAPI.WORKNETBISUNESSABILITY + url, config);
}
function sendReqWorknetSearchByJobCode(url) {
  return axios.get(Constants.JobAPI.WORKNETJOBCODE + url, config);
}
/*JOBKOREA*/
function sendReqJobKorea(url) {
  return axios.get(Constants.JobAPI.JOBKOREA + url, config);
}
function sendReqJobKorea_gi(url) {
  return axios.get(Constants.JobAPI.JOBKOREAGI + url, config);
}

/*NCS*/
function sendReqNcs_1() {
  return axios.get(Constants.Ncs.NCS_1, config);
}
function sendReqNcs_2(cd) {
  return axios.get( Constants.Ncs.NCS_2 + cd, config);
}
function sendReqNcs_3(cd) {
  return axios.get(Constants.Ncs.NCS_3 + cd, config);
}
/**Detail*/
function sendReqNcsDetail(id) {
  return axios.get(Constants.Ncs.NCSDETAIL + id, config);
}
function sendReqNcs_4(cd) {  
  return axios.get(Constants.Ncs.NCS_4 + cd, config);
}
function sendReqNcs_5(cd) {
  return axios.get(Constants.Ncs.NCS_5 + cd, config);
}
function sendReqNcs_K(url) {
  return axios.get(Constants.Ncs.NCSKEYWORD + url, config);
}
/*SMALLGIANTS*/
function sendReqSmallGiants(url) {
  return axios.get(Constants.Organization.SMALLGIANTS + url, config);
}
function sendReqCompanyDetail(companyId){
  return axios.get(Constants.Organization.SMALLGIANTSDETAIL+companyId+".json", config);
}
/*OCCUPATION*/
function sendReqParentRegion() {
  return axios.get(Constants.RegionOccupationPicker.REGIONPARENT, config);
}
function sendReqRegions(code) {
  return axios.get(Constants.RegionOccupationPicker.REGION + code, config);
}
function sendReqGParentOccupation() {
  return axios.get(Constants.RegionOccupationPicker.OCCUPATIONGRANDPARENT, config);
}
function sendReqChildOccupation(code) {
  return axios.get(Constants.RegionOccupationPicker.OCCUPATIONPARENT + code, config);
}
function sendReqOccupation(code) {
  return axios.get(Constants.RegionOccupationPicker.OCCUPATION + code, config);
}
/*INDUSTRIALTYPE*/
function sendReqParentIndTp() {
  return axios.get(Constants.RegionOccupationPicker.INDUSTRIALTYPEPARENT, config);
}
function sendReqIndTps(code) {
  return axios.get(Constants.RegionOccupationPicker.INDUSTRIALTYPE + code, config);
}
function sendReqAllEvents() {
  return axios.get("/eventsCalendar.json", config);
}
function sendEventList(url) {
  return axios.get("/events.json?" + url, config);
}
function sendReqEventDetail(id) {
  return axios.get("/events/" + id + ".json?timeStamp="+getStamp(), config);
}

/*Demand*/
/**Insert*/
function sendReqInsertDemand(body){
	return axios.post(Constants.Survey.Demand.INSERT, body, config);
}
/**Get*/
function sendReqGetDemand(){
	return axios.get(Constants.Survey.Demand.GET, config);
}

/*POPUP*/
function sendReqGetPopup(){
	return axios.get(Constants.Popup.LIST, config);
}

/*MBTI*/
/**Insert*/
function sendReqInsertMbti(body){
	return axios.post(Constants.Survey.MBTI,body, config);
}
/**Get*/
function sendReqMbti(url){
	if(url == undefined || url == null) {
		url = '';
	}
	return axios.get(Constants.Survey.MBTI + url, config);
}
//Delete
function sendReqDeleteMbti(id) {
	return axios.delete('/survey/mbti/' + id + '.json', config);
}
/*EMPLOYMENT*/
/*Insert Update*/
function sendReqInsertEmplSurvey(id, frmData){
	return axios.post(Constants.Employment.SINGLE + id + ".json", frmData, config);
}
function sendReqGetEmplSurvey(id){
	return axios.get(Constants.Employment.SINGLE + id + ".json", config);
}
function sendReqGetNationalLicense (url){
	return axios.get(Constants.Employment.LICENSE + url, config);
}
function sendReqGetUniversityLocal(url){
	return axios.get(Constants.Employment.Univ.LOCAL + url, config);
}
function sendReqGetUniversityInternational(url){
	return axios.get(Constants.Employment.Univ.INTERNATIONAL + url, config);
}
function sendReqGetCountry(url){
	return axios.get(Constants.Employment.COUNTRY + url, config);
}
function sendReqGetConfig(url){
	return axios.get(Constants.Employment.CONFIG + url, config);
}
/*MBTI*/
/*General Functions*/
function prepUrlOld(filter) {
  // actually dont know why old, must see if there difference
  // var authKey = "WNISK6AXF7Q4LQO98COAL2VR1HJ";
  var fullUrl = "";
  // var debugUrl =
  //   "http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=" +
  //   authKey +
  //   "&returnType=xml&callTp=L";
  var url = "";
  var filterLength = Object.keys(filter).length;
  //  debugger;
  var urlSuffix = "";
  for (var i = 0; i < filterLength; i++) {
    var str = "";
    var prop = Object.keys(filter)[i];
    var value = filter[prop];
    if (Array.isArray(value)) {
      //gdiArrStr = "[" + gdiArr.join("|") + "]"; [] wasnt necessary
      var valueArr = value.join("%7C");
      // console.log(gdiArrStr);
      if (value.length > 0) {
        str = prop + "=" + valueArr;
      }
    } else if (value != "") {
      str = prop + "=" + value;
    }
    if (str != "") {
      urlSuffix += "&" + str;
    }
  }
  //  debugger;
  //  debugUrll = debugUrl + urlSuffix;
  // console.log(debugUrll);

  fullUrl = url + urlSuffix;
  // console.log(fullUrl);

  return fullUrl;
}

function getMessageEncoding() {
const messageBox = document.querySelector(".rsa-oaep #message");
let message = messageBox.value;
let enc = new TextEncoder();
return enc.encode(message);
}

function prepUrl(filter , joinType) {
	
	
	var fullUrl = "";
	
	var url = "";
	var filterLength = Object.keys(filter).length;
	
	var urlSuffix = "";
	
	for (var i = 0; i < filterLength; i++) {
		
		var str = "";
		var prop = Object.keys(filter)[i];
		var value = filter[prop];
		
		if (Array.isArray(value)) {
			//gdiArrStr = "[" + gdiArr.join("|") + "]"; [] wasnt necessary
			if(joinType == "arr"){
				
				for(var j = 0; j< value.length; j++){
					
					if(j > 0){
						str += "&" + prop + "=" + encodeURIComponent(value[j]);
					}else{
						str = prop + "=" + encodeURIComponent(value[j]);
					}
				}
				
			}else{
				var valueArr = value.join("|");
				// console.log(gdiArrStr);
				if (value.length > 0) {
					str = prop + "=" + encodeURIComponent(valueArr);    	  
				}
			}
			
		} else if (value != "") {
			str = prop + "=" + encodeURIComponent(value);
		}
		
		if (str != "") {
			urlSuffix += "&" + str;
		}
	}
	//  debugger;
	//  debugUrll = debugUrl + urlSuffix;
	// console.log(debugUrll);
	
	fullUrl = url + urlSuffix;
	// console.log(fullUrl);
	
	return fullUrl;
}

function sendFile(data) {
	var returnData = [];
  	axios.post( '/gdiFileTest.json',
    	data,
    	{
	      	headers: {
	          	"Content-Type": "multipart/form-data"
	      	}
    	}
  	).then(function(response){
  		//console.log(response, 'SUCCESS!!');
  		this.app.fileList = response.data;
  	})
  	.catch(function(error){
    	console.log('FAILURE!!');
    	alert('error');
  	});
  	
  	
}

function prepEncUrl(filter) {
	
	
	var fullUrl = "";
	
	var url = "?";
	var filterLength = Object.keys(filter).length;
	
	var urlSuffix = "";
	
	for (var i = 0; i < filterLength; i++) {
		
		var str = "";
		var prop = Object.keys(filter)[i];
		var value = filter[prop];
		
		console.log("btoa(value)", btoa(value));
		
		str = prop + "=" + btoa(value);
		
		if (str != "") {
			urlSuffix += "&" + str;
		}
	}
	//  debugger;
	//  debugUrll = debugUrl + urlSuffix;
	// console.log(debugUrll);
	
	fullUrl = url + urlSuffix;
	// console.log(fullUrl);
	
	return fullUrl;
}
























