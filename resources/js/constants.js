function getStamp() {
    return new Date().getTime();
}

var apiUrl = window.location.protocol + "//" + window.location.host;

/*Generic search*/
function Search(){
    this.BOARD = apiUrl + "/search/board.json?timeStamp=" + getStamp(); 
    this.FILE = apiUrl + "/search/file.json?timeStamp=" + getStamp(); 
}

/*SSO logout*/
function ssoLogout() {
    deleteCookie( Constants.Cookie.TOKEN );
    removeCookies();
    var domain = apiUrl + "/common/logout.do";
    window.location.href = domain;
}

function removeCookies() {
    var res = window.document.cookie;
    var multiple = res.split(";");
    for(var i = 0; i < multiple.length; i++) {
       var key = multiple[i].split("=");
       window.document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
    }
 }

/*Popup*/
function Popup() {
    this.LIST = "/popup.json?timeStamp=" + getStamp();
}

function Common() {
    this.DIVISION = function( division ) {
        return apiUrl + "/common/code.json?manualSort=Y&division=" + division + "&timeStamp=" + getStamp();
    }
}
function Log() {
    this.LOGIN = apiUrl + "/admin/security/loginlog/list.json?timeStamp=" + getStamp();
}

function Community() {
    this.NOTICE = apiUrl + "/notice.json?timeStamp=" + getStamp();
    this.NOTICESINGLE = apiUrl + "/notice/";
    this.BOARD_MANAGEMENT_SINGLE = apiUrl + "/admin/community/management/";
    this.BOARD_CAREER_SINGLE = apiUrl + "/admin/community/gallery/";
    this.GALLERY = apiUrl + "/gallery.json?timeStamp=" + getStamp();
    this.UPDATEFILES = apiUrl + "/qna/attachUpdate";
    this.UPDATEFILESTEST = apiUrl + "/bbsTest/qna/attachUpdate";
}
function Customer() {
    this.INSERT = apiUrl + "/customer/insert.json?timeStamp=" + getStamp();
    this.LIST = apiUrl + "/admin/customer/list.json?timeStamp=" + getStamp();
}
function Board() {
    this.BOARD = apiUrl + "/board/";
    this.BOARD_NOTICE = apiUrl + "/community/notice.json?timeStamp=" + getStamp();
    this.BOARD_MANAGEMENT = apiUrl + "/community/management.json?timeStamp=" + getStamp();
    this.BOARD_CAREER = apiUrl + "/community/career.json?timeStamp=" + getStamp();
}

function MapTitle(){
    this.MENU = [
     {
         name:"?????????",
         url: "/common/login.do",
     },
     {
         name:"????????????",
         url: "/common/signup.do",
     },
     {
         name:"????????????",
         url: "/mypage/withdraw.do",
     },
 ]
}

function Maps() {

	this.MENU = [
        {
            name:"Company",
            url: "/kr/about.do",
            SUBMENU:[
                {name:"????????????",		location:[0,0],		url:"/kr/about.do"},
            ],
        },
        {
            name:"Business",
            url: "/kr/business.do",
            SUBMENU:[
                {name:"????????????",		location:[1,0],		url:"/kr/business.do"},
            ],
        },
        {
            name:"Brand",
            url: "/kr/brand.do",
            SUBMENU:[
                {name:"????????? ??????",		location:[2,0],		url:"/kr/brand.do"},
            ],
        },
        {
            name:"Recruit",
            url: "/kr/recruit.do",
            SUBMENU:[
                {name:"????????????",		location:[3,0],		url:"/kr/recruit.do"},
            ],
        },
        {
            name:"careerlist",
            url: "/kr/recruit/careers/list.do",
            SUBMENU:[
                {name:"????????????",		location:[4,0],		url:"/kr/recruit/careers/list.do"},
            ],
        },
        {
            name:"inquiry",
            url: "/kr/customer/inquiry.do",
            SUBMENU:[
                {name:"????????????",		location:[5,0],		url:"/kr/customer/inquiry.do"},
            ],
        },
        {
            name:"franchise",
            url: "/kr/customer/franchise.do",
            SUBMENU:[
                {name:"????????????",		location:[6,0],		url:"/kr/customer/franchise.do"},
            ],
        },
        {
            name:"management",
            url: "/kr/customer/management.do",
            SUBMENU:[
                {name:"????????????",		location:[7,0],		url:"/kr/customer/management/list.do"},
                {name:"????????????",		location:[7,1],		url:"/kr/customer/management/detail.do"},
            ],
        },
        {
            name:"privacy",
            url: "/kr/privacy.do",
            SUBMENU:[
                {name:"???????????? ????????????",		location:[8,0],		url:"/kr/privacy.do"},
            ],
        },
        {
            name:"email",
            url: "/kr/email.do",
            SUBMENU:[
                {name:"????????? ?????? ????????????",		location:[9,0],		url:"/kr/email.do"},
            ],
        },
        {
            name:"result",
            url: "/kr/result.do",
            SUBMENU:[
                {name:"??????????????????",		location:[10,0],		url:"/kr/result.do"},
            ],
        }
	];

    this.MENU_EN = [
        {
            name:"Company",
            url: "/en/about.do",
            SUBMENU:[
                {name:"ABOUT US",		location:[0,0],		url:"/en/about.do"},
            ]
        },
        {
            name:"Business",
            url: "/en/business.do",
            SUBMENU:[
                {name:"BUSINESS",		location:[1,0],		url:"/en/business.do"},
            ],
        },
        {
            name:"Brand",
            url: "/en/brand.do",
            SUBMENU:[
                {name:"BRAND",		location:[2,0],		url:"/en/brand.do"},
            ],
        },
        {
            name:"Recruit",
            url: "/en/recruit.do",
            SUBMENU:[
                {name:"RECRUIT",		location:[3,0],		url:"/en/recruit.do"},
            ],
        },
        {
            name:"careerlist",
            url: "/en/recruit/careers/list.do",
            SUBMENU:[
                {name:"RECRUIT",		location:[4,0],		url:"/en/recruit/careers/list.do"},
            ],
        },
        {
            name:"inquiry",
            url: "/en/customer/inquiry.do",
            SUBMENU:[
                {name:"CUSTOMER CENTER",		location:[5,0],		url:"/en/customer/inquiry.do"},
            ],
        },
        {
            name:"franchise",
            url: "/en/customer/franchise.do",
            SUBMENU:[
                {name:"CUSTOMER CENTER",		location:[6,0],		url:"/en/customer/franchise.do"},
            ],
        },
        {
            name:"management",
            url: "/en/customer/management.do",
            SUBMENU:[
                {name:"CUSTOMER CENTER",		location:[7,0],		url:"/en/customer/management/list.do"},
                {name:"CUSTOMER CENTER",		location:[7,1],		url:"/en/customer/management/detail.do"},
            ],
        },
        {
            name:"privacy",
            url: "/en/privacy.do",
            SUBMENU:[
                {name:"PRIVACY POLICY",		location:[8,0],		url:"/en/privacy.do"},
            ],
        },
        {
            name:"email",
            url: "/en/email.do",
            SUBMENU:[
                {name:"REJECTION OF UNAUTHORIZED E-MAIL COLLECTION",		location:[9,0],		url:"/en/email.do"},
            ],
        },
        {
            name:"result",
            url: "/en/result.do",
            SUBMENU:[
                {name:"INTEGRATED SEARCH RESULTS",		location:[10,0],		url:"/en/result.do"},
            ],
        }
    ];
}
function Navigation() {

	this.MENU = [
        {
            name:"Company",
            url: "/kr/about.do",
            SUBMENU:[
                {name:"????????????",		location:[0,0],		url:"/kr/about.do"},
            ]
        },
        {
            name:"Business",
            url: "/kr/business.do",
            SUBMENU:[
                {name:"????????????",		location:[1,0],		url:"/kr/business.do"},
            ],
        },
        {
            name:"Brand",
            url: "/kr/brand.do",
            SUBMENU:[
                {name:"????????? ??????",		location:[2,0],		url:"/kr/brand.do"},
            ],
        },
        {
            name:"Recruit",
            url: "/kr/recruit.do",
            SUBMENU:[
                {name:"????????????",		location:[3,0],		url:"/kr/recruit.do"},
            ],
        },
        {
            name:"careerlist",
            url: "/kr/recruit/careers/list.do",
            SUBMENU:[
                {name:"????????????",		location:[4,0],		url:"/kr/recruit/careers/list.do"},
            ],
        },
        {
            name:"inquiry",
            url: "/kr/customer/inquiry.do",
            SUBMENU:[
                {name:"????????????",		location:[5,0],		url:"/kr/customer/inquiry.do"},
            ],
        },
        {
            name:"franchise",
            url: "/kr/customer/franchise.do",
            SUBMENU:[
                {name:"????????????",		location:[6,0],		url:"/kr/customer/franchise.do"},
            ],
        },
        {
            name:"management",
            url: "/kr/customer/management.do",
            SUBMENU:[
                {name:"????????????",		location:[7,0],		url:"/kr/customer/management/list.do"},
                {name:"????????????",		location:[7,1],		url:"/kr/customer/management/detail.do"},
            ],
        },
        {
            name:"privacy",
            url: "/kr/privacy.do",
            SUBMENU:[
                {name:"???????????? ????????????",		location:[8,0],		url:"/kr/privacy.do"},
            ],
        },
        {
            name:"email",
            url: "/kr/email.do",
            SUBMENU:[
                {name:"????????? ?????? ????????????",		location:[9,0],		url:"/kr/email.do"},
            ],
        },
        {
            name:"result",
            url: "/kr/result.do",
            SUBMENU:[
                {name:"??????????????????",		location:[10,0],		url:"/kr/result.do"},
            ],
        }
	];

    this.MENU_EN = [
        {
            name:"Company",
            url: "/en/about.do",
            SUBMENU:[
                {name:"ABOUT US",		location:[0,0],		url:"/en/about.do"},
            ]
        },
        {
            name:"Business",
            url: "/en/business.do",
            SUBMENU:[
                {name:"BUSINESS",		location:[1,0],		url:"/en/business.do"},
            ],
        },
        {
            name:"Brand",
            url: "/en/brand.do",
            SUBMENU:[
                {name:"BRAND",		location:[2,0],		url:"/en/brand.do"},
            ],
        },
        {
            name:"Recruit",
            url: "/en/recruit.do",
            SUBMENU:[
                {name:"RECRUIT",		location:[3,0],		url:"/en/recruit.do"},
            ],
        },
        {
            name:"careerlist",
            url: "/en/recruit/careers/list.do",
            SUBMENU:[
                {name:"RECRUIT",		location:[4,0],		url:"/en/recruit/careers/list.do"},
            ],
        },
        {
            name:"inquiry",
            url: "/en/customer/inquiry.do",
            SUBMENU:[
                {name:"CUSTOMER CENTER",		location:[5,0],		url:"/en/customer/inquiry.do"},
            ],
        },
        {
            name:"franchise",
            url: "/en/customer/franchise.do",
            SUBMENU:[
                {name:"CUSTOMER CENTER",		location:[6,0],		url:"/en/customer/franchise.do"},
            ],
        },
        {
            name:"management",
            url: "/en/customer/management.do",
            SUBMENU:[
                {name:"CUSTOMER CENTER",		location:[7,0],		url:"/en/customer/management/list.do"},
                {name:"CUSTOMER CENTER",		location:[7,1],		url:"/en/customer/management/detail.do"},
            ],
        },
        {
            name:"privacy",
            url: "/en/privacy.do",
            SUBMENU:[
                {name:"PRIVACY POLICY",		location:[8,0],		url:"/en/privacy.do"},
            ],
        },
        {
            name:"email",
            url: "/en/email.do",
            SUBMENU:[
                {name:"REJECTION OF UNAUTHORIZED E-MAIL COLLECTION",		location:[9,0],		url:"/en/email.do"},
            ],
        },
        {
            name:"result",
            url: "/en/result.do",
            SUBMENU:[
                {name:"INTEGRATED SEARCH RESULTS",		location:[10,0],		url:"/en/result.do"},
            ],
        }
    ];
}
function Brand() {
    this.LIST = [
        {
            id: 1,
            name: "63 ????????????",
            enname: "63 Restaurant",
            children : [
                {name: "????????????????????????", id: 11, enname: "Walking on the Cloud"},
                {name: "??????????????????", id: 12, enname: "Touch the Sky"},
                {name: "?????????", id: 13, enname: "Shuchiku"},
                {name: "?????????", id: 14, enname: "Baek Ni Hyang"},
                {name: "????????????", id: 15, enname: "Pavilion"},
                {name: "????????????", id: 16, enname: "Bakery"},
                {name: "63TO-GO", id: 17, enname: "63TO-GO"}
            ]
        },
        {
            id: 2,
            name: "63 ?????????",
            enname: "63 Convention",
            children : []
        },
        {
            id: 3,
            name: "????????? ??????",
            enname: "Plaza Wedding",
            children : [
                {name: "??????????????????", id: 31, enname: "FKI Jeongyeongryeon Plaza"},
                {name: "????????????????????????", id: 32, enname: "Press Center"},
                {name: "???????????????", id: 33, enname: "Yeonsei Plaza"},
                {name: "??????????????????", id: 34, enname: "Baekyangro Plaza"}
            ]
        },
        {
            id: 4,
            name: "???????????????",
            enname: "Taoyuen Style",
            children : [
                {name: "????????????", id: 41, enname: "Apgujeong"},
                {name: "???????????????", id: 42, enname: "Trade Center"},
                {name: "?????????", id: 43, enname: "Mokdong"},
                {name: "?????????", id: 44, enname: "Cheonho"},
                {name: "??????????????????", id: 45, enname: "The Hyundai Seoul"}
            ]
        },
        {
            id: 5,
            name: "??????",
            enname: "T-Won",
            children : [
                {name: "????????????", id: 51, enname: "Seoul Station"},
                {name: "????????????", id: 52, enname: "Yeonse Univ."},
                {name: "????????????", id: 53, enname: "Cheongryangri"}
            ]
        },
        {
            id: 8,
            name: "??????????????????",
            enname: "Baeknihyang Style",
            children : [
                {name: "?????????", id: 81, enname: "Dongtan"}
            ]
        },
        {
            id: 6,
            name: "????????? ??????",
            enname: "Dining Kit",
            children : []
        },
        {
            id: 7,
            name: "??????",
            enname: "Others",
            children : []
        },
    ]
}

//LOCALSTORAGE
function Storage() {
    this.Section = {
        PORTFOLIO: "PORTFOLIO",
        USERVIEWUL: "USERVIEWULTIMED",
        DONTSHOWLAYERPOPUP: "DONTSHOWLAYERPOPUP",
        SAVEHOUR: 0.5,
    };
    this.Filter = {
        PORTFOLIO : {
            name: "PORTFOLIO",
            safeUrl: [
                "/mypage/portfolio.do",
                "/mypage/modify.do",
                "/mypage/qna/list.do",
            ],
        },
    }
};

function Role() {
    this.PROFESSOR = "PROFESSOR";
    this.STAFF = "STAFF";
    this.STUDENT = "STUDENT";
}

function Cookie() {
    this.EXPIRE = 24 * 60;
    this.TOKEN = "JWT";
}

function Constants() {
    this.Community = new Community();
    this.Customer = new Customer();
    this.Board = new Board();
    this.Maps = new Maps();
    this.MapTitle= new MapTitle();
    this.Navigation = new Navigation();
    this.Storage = new Storage();
    this.Common = new Common();
    this.Brand = new Brand();
    this.Log = new Log();
    this.Role = new Role();
    this.Popup = new Popup();
    this.Cookie = new Cookie();
    this.Search = new Search();
}

var Constants = new Constants();

function Print() {
    window.print();
}
