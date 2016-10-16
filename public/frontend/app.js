!function(){"use strict";angular.module("angularSeedApp",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","ui.bootstrap","LocalStorageModule"])}(),function(){"use strict";function s(){function s(){}var a={restrict:"E",replace:!0,templateUrl:"app/components/topics/topics.html",scope:{creationDate:"="},controller:s,controllerAs:"vm",bindToController:!0};return a}angular.module("angularSeedApp").directive("comTopics",s)}(),function(){"use strict";function s(){function s(s,a,e){e.loadData("menu",null,function(a){s.menus=a.data}),e.loadData("faq",null,function(a){s.faqs=a.data}),e.loadData("online_support",null,function(a){s.supports=a.data}),s.init=function(){$("ul.product-list-content").on("click","li > a",function(){if($(this).hasClass("active"))$(this).removeClass("active").next("ul").hide(400);else{var s=$(this).parent().parent().find("a.active");$(s).removeClass("active").next("ul").hide(400),$(this).addClass("active").next("ul").show(400)}})}}var a={restrict:"E",replace:!0,templateUrl:"app/components/sidebar/sidebar.html",scope:{creationDate:"="},controller:s,controllerAs:"vm",bindToController:!1};return s.$inject=["$scope","$location","commonService"],a}angular.module("angularSeedApp").directive("comSidebar",s)}(),function(){"use strict";function s(){function s(){}var a={restrict:"E",replace:!0,templateUrl:"app/components/search/search.html",scope:{creationDate:"="},controller:s,controllerAs:"vm",bindToController:!1};return a}angular.module("angularSeedApp").directive("comSearch",s)}(),function(){"use strict";function s(){function s(s){function a(){var a,e=[];for(a=0;4>a;a++)e.push({news_image:"../../../assets/images/frontend/img_01.png",news_title:"SUPERNANO - Siêu khuyến mãi nhân dịp khai trương Website",news_description:"Nhân dịp khai trương website bán hàng trực tuyến http://sna no.vn/ Công ty Cổ Phần Công Nghệ Nano Ứng Dụng xin giới thiệu đến Quý khách hàng"});for(a=0;2>a;a++)s.slides.push({id:a,items:e})}s.myInterval="none",s.active=0,s.noWrapSlides=!1,s.slides=[],a()}var a={restrict:"E",replace:!0,templateUrl:"app/components/news-slide/news-slide.html",scope:{creationDate:"="},controller:s,controllerAs:"vm",bindToController:!0};return s.$inject=["$scope"],a}angular.module("angularSeedApp").directive("comNewsSlide",s)}(),function(){"use strict";function s(){function s(){}var a={restrict:"E",replace:!0,templateUrl:"app/components/new-products/new-products.html",scope:{creationDate:"="},controller:s,controllerAs:"vm",bindToController:!0};return a}angular.module("angularSeedApp").directive("comNewProducts",s)}(),function(){"use strict";function s(){function s(){}var a={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:s,controllerAs:"vm",bindToController:!0};return a}angular.module("angularSeedApp").directive("acmeNavbar",s)}(),function(){"use strict";function s(){function s(s){function a(){var a,e=[];for(a=0;4>a;a++)e.push({discount_rate:"20%",product_image:"../../../assets/images/frontend/img_05.jpg",product_name:"Bộ chuyển đổi USB 2.0 to RS232",product_old_price:"200.000",product_new_price:"100.000"});for(a=0;2>a;a++)s.slides.push({id:a,items:e})}s.myInterval=5e3,s.active=0,s.noWrapSlides=!1,s.slides=[],a()}var a={restrict:"E",replace:!0,templateUrl:"app/components/hot-products/hot-products.html",scope:{creationDate:"="},controller:s,controllerAs:"vm",bindToController:!1};return s.$inject=["$scope"],a}angular.module("angularSeedApp").directive("comHotProducts",s)}(),function(){"use strict";function s(){function s(s,a,e,t,n){s.currentUser=null,s.logout=function(){n.logout(function(){s.currentUser=null})},s.openLoginModal=function(){var a;a=e.open({animation:!0,templateUrl:"loginModal.html",size:"lg",controller:"LoginModalInstanceController",controllerAs:"$ctrl",resolve:{}}),a.result.then(function(a){n.isAuthenticated()&&(console.log(a),s.currentUser=a)},function(){t.info("Login modal dismissed at: "+new Date)})},s.openSignupModal=function(){var s;s=e.open({animation:!0,templateUrl:"registerModal.html",size:"lg",controller:"RegisterModalInstanceController",controllerAs:"$ctrl",resolve:{}}),s.result.then(function(){t.info("Register modal closed")},function(){t.info("Register modal dismissed at: "+new Date)})}}var a={restrict:"E",replace:!0,templateUrl:"app/components/header/header.html",scope:{creationDate:"="},controller:s,controllerAs:"vm",bindToController:!1};return s.$inject=["$scope","$location","$uibModal","$log","customerService"],a}angular.module("angularSeedApp").directive("comHeader",s)}(),function(){"use strict";function s(s,a,e,t){function n(){e.loadData("customer/generate-captcha",null,function(s){l.captcha_src=s.data.captcha_src})}var l=this;l.customer={},l.errors={},e.loadData("customer/register",null,function(s){l.cities_provinces=s.data.cities_provinces,l.captcha_src=s.data.captcha_src,l.csrf_token=s.data.csrf_token},function(s){console.log(s)}),l.generateCaptchaToken=function(){n()},l.register=function(){var s=angular.extend(l.customer,{_token:l.csrf_token});angular.isUndefined(s.company)&&(s.company=""),t.register(s,function(s){a.close(null)},function(s){n();var a={};angular.forEach(s.data,function(s,e){a[e]=s[0]}),l.errors=a})},l.cancel=function(){a.dismiss("cancel")}}function a(s,a,e){s.loginData={},s.errors={},s.login=function(){e.login(s.loginData,function(s){console.log(s),a.close(s.data)},function(a){var e={};422==a.status?angular.forEach(a.data,function(s,a){e[a]=s[0]}):401==a.status&&(e.password="Email hoặc mật khẩu đăng nhập không hợp lệ"),s.errors=e})},s.cancel=function(){a.dismiss("cancel")}}angular.module("angularSeedApp").controller("RegisterModalInstanceController",s).controller("LoginModalInstanceController",a),s.$inject=["$scope","$uibModalInstance","commonService","customerService"],a.$inject=["$scope","$uibModalInstance","customerService"]}(),function(){"use strict";function s(){function s(){}var a={restrict:"E",replace:!0,templateUrl:"app/components/footer/footer.html",scope:{creationDate:"="},controller:s,controllerAs:"vm",bindToController:!0};return a}angular.module("angularSeedApp").directive("comFooter",s)}(),function(){"use strict";function s(){function s(){}var a={restrict:"E",replace:!0,templateUrl:"app/components/email-registration/email-registration.html",scope:{creationDate:"="},controller:s,controllerAs:"vm",bindToController:!0};return a}angular.module("angularSeedApp").directive("comEmailRegistration",s)}(),function(){"use strict";function s(s,a,e,t){function n(s){t.loadData("customer/generate-captcha",null,!0,function(a){s(a)})}return{generateCaptcha:n}}angular.module("angularSeedApp").factory("utilService",s),s.$inject=["$http","localStorageService","API_URL","commonService"]}(),function(){"use strict";angular.module("angularSeedApp").factory("notify",["$window",function(s){return console.log("Notify From Service"),function(s){console.log(s)}}])}(),function(){"use strict";function s(s,a,e,t){function n(s,t,n){e.postData("customer/auth",s,function(s){a.set("token",s.data.token),a.set("username",s.data.username),t(s)},function(s){422===s.status||401==s.status?n(s):console.log(s)})}function l(s,a,t){e.postData("customer/register",s,function(s){a(s)},function(s){422===s.status?t(s):console.log(s)})}function o(s){a.remove("token"),a.remove("username"),s()}function r(){return a.get("token")?!0:!1}function c(){return{username:a.get("username"),token:a.get("token")}}function i(s,a,e){}return{login:n,register:l,logout:o,isAuthenticated:r,getAuthData:c,forgotPassword:i}}angular.module("angularSeedApp").factory("customerService",s),s.$inject=["$http","localStorageService","commonService","API_URL"]}(),function(){"use strict";function s(s,a,e,t){function n(a,n,l){var o=t+a,r="GET";return null==n&&(n={}),3e3==e.port()&&(angular.extend(n,{callback:"JSON_CALLBACK"}),r="JSONP"),s({url:o,method:r,params:n,paramSerializer:"$httpParamSerializerJQLike"}).then(function(s){l({data:s.data,status:s.status})},function(s){console.log({data:s.data||"Request failed",status:s.status})})}function l(e,n,l,o){var r=t+e;return s({url:r,method:"POST",data:a(n),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(s){l({data:s.data,status:s.status})},function(s){o({data:s.data||"Request failed",status:s.status})})}return{loadData:n,postData:l}}angular.module("angularSeedApp").factory("commonService",s),s.$inject=["$http","$httpParamSerializerJQLike","$location","API_URL"]}(),function(){"use strict";function s(s){}angular.module("angularSeedApp").controller("MainController",s),s.$inject=["$scope"]}(),function(){"use strict";angular.module("angularSeedApp").filter("notify",["$window",function(s){return console.log("Notify From filter"),function(s){return 123}}])}(),function(){"use strict";angular.module("angularSeedApp").filter("tel",["$log",function(s){return function(s){if(!s)return"";var a=s.toString().trim().replace(/^\+/,"");if(a.match(/[^0-9]/))return s;var e,t,n,l;switch(a.length){case 10:e=a.slice(0,4),t=a.slice(4,7),n=a.slice(7,10);break;case 11:e=a.slice(0,5),t=a.slice(5,8),n=a.slice(8,11);break;default:return s}return l=e+"."+t+"."+n}}])}(),function(){"use strict";function s(s){s.debug("runBlock end")}s.$inject=["$log"],angular.module("angularSeedApp").run(s)}(),function(){"use strict";function s(s,a){s.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}),a.otherwise("/")}s.$inject=["$stateProvider","$urlRouterProvider"],angular.module("angularSeedApp").config(s)}(),function(){"use strict";angular.module("angularSeedApp").constant("API_URL","http://localhost:8000/api/").constant("malarkey",malarkey).constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function s(s,a,e,t,n){s.debugEnabled(!0),a.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|skype):/),e.resourceUrlWhitelist(["self","http://localhost:8000/**"]),t.setPrefix("tudonghoacongnghiep").setStorageType("sessionStorage"),n.options.timeOut=3e3,n.options.positionClass="toast-top-right",n.options.preventDuplicates=!0,n.options.progressBar=!0}angular.module("angularSeedApp").config(s),s.$inject=["$logProvider","$compileProvider","$sceDelegateProvider","localStorageServiceProvider","toastr"]}(),angular.module("angularSeedApp").run(["$templateCache",function(s){s.put("app/main/main.html",'<div><com-header></com-header><div class="clearfix"></div><section class="banner"></section><div class="clearfix"></div><com-topics></com-topics><div class="clearfix"></div><com-search></com-search><div class="clearfix"></div><section class="main-content container mt20"><div class="row"><com-sidebar></com-sidebar><com-new-products></com-new-products></div></section><div class="clearfix"></div><com-hot-products></com-hot-products><div class="clearfix"></div><com-news-slide></com-news-slide><div class="clearfix"></div><com-email-registration></com-email-registration><div class="clearfix"></div><com-footer></com-footer></div>'),s.put("app/components/email-registration/email-registration.html",'<section class="e-mail mt40"><div class="container"><h3 class="f-avobold">Đăng ký nhận Email</h3><ul><li class="col-lg-5"><div class="form-group"><label class="col-sm-3 control-label">Họ và tên :</label><div class="col-sm-9 pl0"><input class="form-control" type="text"></div></div></li><li class="col-lg-5"><div class="form-group"><label class="col-sm-3 control-label">E-mail :</label><div class="col-sm-9 pl0"><input class="form-control" type="text"></div></div></li><li><button class="btn-register">Đăng ký</button></li></ul></div></section>'),s.put("app/components/footer/footer.html",'<footer><div class="container"><div class="row"><div class="col-lg-6 col-md-6 col-sm-12"><h1>BẢN QUYỀN THUỘC tudonghoacongnghiep.vn</h1><ul><li><b>Địa chỉ :</b> Số 11, TT Định Canh - Định Cư, Ngõ 100, Đường Hoàng Quốc Việt, Cầu Giấy, Hà Nội</li><li><b>Tell :</b> 0977 xxx xxx</li><li><b>Mail :</b> tudonghoacongnghiep@gmail.com</li></ul><div class="mt15 network"><a href="#"><img src="../../../assets/images/frontend/common/icon_face.jpg"></a> <a href="#"><img src="../../../assets/images/frontend/common/icon_g.jpg"></a> <a href="#"><img src="../../../assets/images/frontend/common/icon_t.jpg"></a></div></div><div class="col-lg-6 col-md-6 col-sm-12"><p class="visit-number">Tổng số lượt truy cập : <span>100000</span></p><div class="mt10"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8174048181427!2d105.76284945287922!3d21.039990877378983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454c745f9a22d%3A0x82d72ef192592b7b!2zLVBow6JuIFZp4buHbiBWxakgS2jDrSDEkOG6t2MgQ2jhu6duZw!5e0!3m2!1sen!2s!4v1475570936236" width="100%" height="210" frameborder="0" style="border:0" allowfullscreen=""></iframe></div></div><div class="clearfix"></div></div></div></footer>'),s.put("app/components/header/header.html",'<header><div class="top-content"><div class="container"><div class="pull-left"><a href="#"><img src="../../../assets/images/frontend/common/icon_h01.png"></a></div><div class="pull-right"><ul><li><a href="#">Tài khoản của tôi</a></li><li><a href="#">Lịch sử đơn hàng</a></li><li><a href="#">Danh sách ưa thích</a></li><li ng-hide="currentUser"><a href="javascript:void(0)" ng-click="openLoginModal()">Đăng nhập</a></li><li ng-hide="currentUser"><a href="javascript:void(0)" ng-click="openSignupModal()">Đăng ký</a></li><li ng-show="currentUser"><a href="javascript:void(0)">Xin chào: {{currentUser.username}}</a></li><li ng-show="currentUser"><a href="javascript:void(0)" ng-click="logout()">Thoát</a></li></ul><div class="clearfix"></div></div></div></div><div class="clearfix"></div><div style="background-color: #fff;" class="menu_m"><div class="head-nav container"><a href="#"><img src="../../../assets/images/frontend/common/logo.png" alt="tudonghoacongnghiep.vn"></a><div class="pull-right"><ul><li><a href="#">Trang chủ</a>|</li><li><a href="#">Giới thiệu</a>|</li><li><a href="#">Sản phẩm</a>|</li><li><a href="#">Khuyến mãi</a>|</li><li><a href="#">Nhà sản xuất</a>|</li><li><a href="#">Tin tức</a>|</li><li><a href="#">Liên hệ</a></li></ul><a href="#" class="head-btn-cart btn-blue">Giỏ hàng (<span class="text-red">01</span>)</a></div></div></div><script type="text/ng-template" id="loginModal.html"><div class="modal-header"> <button type="button" class="close" ng-click="cancel()">&times;</button> <h4 class="modal-title">Đăng nhập</h4> </div> <div class="modal-body"> <form class="form-horizontal"> <div class="form-group"> <label class="control-label col-sm-2" for="email">Email (<span class="text-red">*</span>):</label> <div class="col-sm-10"> <input type="email" ng-model="loginData.email" class="form-control" id="email" placeholder="Nhập email"> <span class="error-msg" ng-show="errors.email">{{errors.email}}</span> </div> </div> <div class="form-group"> <label class="control-label col-sm-2" for="pwd">Mật khẩu (<span class="text-red">*</span>):</label> <div class="col-sm-10"> <input type="password" ng-model="loginData.password" class="form-control" id="pwd" placeholder="Nhập mật khẩu"> <span class="error-msg" ng-show="errors.password">{{errors.password}}</span> </div> </div> <div class="form-group"> <div class="col-sm-offset-2 col-sm-10"> <div class="checkbox"> <label><input type="checkbox">Nhớ mật khẩu</label> </div> </div> </div> <div class="form-group"> <div class="col-sm-offset-2 col-sm-10"> <button type="submit" class="btn-blue btn-buy" ng-click="login()">Đăng nhập</button> <a href="#" class="textblue" style="margin-left: 10px">Quên mật khẩu?</a> </div> </div> </form> <div class="col-lg-offset-2 mt20"> <strong>Bạn có thể đăng nhập qua</strong> <ul class="box-login" style="text-align: left"> <li> <a href="#"><span></span> <p>Đăng nhập với Facebook</p></a> </li> <li> <a href="#"><span></span> <p>Đăng nhập với Google+</p></a> </li> </ul> </div> </div></script><script type="text/ng-template" id="registerModal.html"><div class="modal-header"> <button type="button" class="close" ng-click="$ctrl.cancel()">&times;</button> <h4 class="modal-title">Đăng ký</h4> </div> <div class="modal-body"> <strong>Thông tin tài khoản</strong> <p>Nhập E-mail và mật khẩu</p> <form class="form-horizontal mt20"> <div class="form-group"> <label class="control-label col-sm-3" for="email-register">Email (<span class="text-red">*</span>):</label> <div class="col-sm-9"> <input type="email" ng-model="$ctrl.customer.email" class="form-control" id="email-register" placeholder="Nhập email"> <span class="error-msg" ng-show="$ctrl.errors.email">{{$ctrl.errors.email}}</span> </div> </div> <div class="form-group"> <label class="control-label col-sm-3" for="pwd-register">Mật khẩu (<span class="text-red">*</span>):</label> <div class="col-sm-9"> <input type="password" ng-model="$ctrl.customer.password" class="form-control" id="pwd-register" placeholder="Mật khẩu"> <span class="error-msg" ng-show="$ctrl.errors.password">{{$ctrl.errors.password}}</span> </div> </div> <div class="form-group"> <label class="control-label col-sm-3" for="pwd-register-2">Nhập lại mật khẩu (<span class="text-red">*</span>):</label> <div class="col-sm-9"> <input type="password" ng-model="$ctrl.customer.password_confirmation" class="form-control" id="pwd-register-2" placeholder="Xác nhận mật khẩu"> <span class="error-msg" ng-show="$ctrl.errors.password_confirmation">{{$ctrl.errors.password_confirmation}}</span> </div> </div> <strong>Thông tin cá nhân</strong> <p class="mb20">Nhập thông tin người nhận, địa chỉ mà bạn muốn chúng tôi chuyển hàng tới.</p> <div class="form-group"> <label class="control-label col-sm-3" for="last-name">Họ đệm (<span class="text-red">*</span>):</label> <div class="col-sm-9"> <input type="text" ng-model="$ctrl.customer.last_name" class="form-control" id="last-name" placeholder="Họ"> <span class="error-msg" ng-show="$ctrl.errors.last_name">{{$ctrl.errors.last_name}}</span> </div> </div> <div class="form-group"> <label class="control-label col-sm-3" for="first-name">Tên (<span class="text-red">*</span>):</label> <div class="col-sm-9"> <input type="text" ng-model="$ctrl.customer.first_name" class="form-control" id="first-name" placeholder="Tên"> <span class="error-msg" ng-show="$ctrl.errors.first_name">{{$ctrl.errors.first_name}}</span> </div> </div> <div class="form-group"> <label class="control-label col-sm-3" for="company">Công ty :</label> <div class="col-sm-9"> <input type="text" ng-model="$ctrl.customer.company" class="form-control" id="company" placeholder="Công ty"> <span class="error-msg" ng-show="$ctrl.errors.company">{{$ctrl.errors.company}}</span> </div> </div> <div class="form-group"> <label class="control-label col-sm-3" for="tel">Điện thoại (<span class="text-red">*</span>):</label> <div class="col-sm-9"> <input type="tel" ng-model="$ctrl.customer.tel" class="form-control" id="tel" placeholder="Điện thoại"> <span class="error-msg" ng-show="$ctrl.errors.tel">{{$ctrl.errors.tel}}</span> </div> </div> <div class="form-group"> <label class="control-label col-sm-3" for="address">Địa chỉ (<span class="text-red">*</span>):</label> <div class="col-sm-9"> <input type="text" ng-model="$ctrl.customer.address" class="form-control" id="address" placeholder="Địa chỉ"> <span class="error-msg" ng-show="$ctrl.errors.address">{{$ctrl.errors.address}}</span> </div> </div> <div class="form-group"> <label class="control-label col-sm-3" for="city_province_id">Tỉnh/Thành phố (<span class="text-red">*</span>):</label> <div class="col-sm-9"> <select class="form-control input-sm" ng-model="$ctrl.customer.city_province_id" id="city_province_id"> <option value="">---Chọn Tỉnh/Thành phố---</option> <option ng-repeat="city_province in $ctrl.cities_provinces" value="{{city_province.id}}">{{city_province.name}}</option> </select> <span class="error-msg" ng-show="$ctrl.errors.city_province_id">{{$ctrl.errors.city_province_id}}</span> </div> </div> <div class="form-group"> <label class="control-label col-sm-3">Mã xác nhận :</label> <div class="col-sm-9"> <img ng-src="{{$ctrl.captcha_src}}" alt="captcha"> <a href="javascript:void(0)" ng-click="$ctrl.generateCaptchaToken()"> <img src="../../../assets/images/frontend/maxacnhan-2.jpg"> </a> </div> </div> <div class="form-group"> <label class="control-label col-sm-3" for="captcha">Ký tự hiển thị (<span class="text-red">*</span>):</label> <div class="col-sm-9"> <input type="text" ng-model="$ctrl.customer.captcha" id="captcha" class="form-control" placeholder="Nhập mã xác nhận"> <span class="error-msg" ng-show="$ctrl.errors.captcha">{{$ctrl.errors.captcha}}</span> </div> </div> <input type="hidden" name="_token" value="{{$ctrl.csrf_token}}" ng> </form> </div> <div class="modal-footer"> <button class="btn-blue btn-buy" type="button" ng-click="$ctrl.register()">Đăng ký</button> <button class="btn btn-warning" type="button" ng-click="$ctrl.cancel()">Hủy</button> </div></script></header>'),s.put("app/components/hot-products/hot-products.html",'<section class="product-hot mt30"><div class="container"><h2 class="title-cm">Sản phầm bán chạy</h2><div class="col-lg-12"><div uib-carousel="" active="active" interval="myInterval" no-wrap="noWrapSlides"><div uib-slide="" ng-repeat="slide in slides track by slide.id" index="slide.id" class="item"><div ng-repeat="product in slide.items" class="col-lg-3 col-xs-3 col-md-3 col-sm-3 product-item"><div class="wrap-product"><span class="safe">{{product.discount_rate}}</span> <a href="#"><img ng-src="{{product.product_image}}"></a></div><p>{{product.product_name}}</p><div class="price-product"><span>{{product.product_old_price}}</span><p class="f-bebas">{{product.product_new_price}}</p><a href="#" class="btn-blue btn-buy">Mua hàng</a></div></div></div></div></div></div></section>'),s.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="#/"><span class="glyphicon glyphicon-home"></span> Angular Gulp Seed</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li class="active"><a ng-href="#/">Inicial</a></li><li><a href="#">Teste</a></li><li><a href="#">Teste 2</a></li></ul><ul class="nav navbar-nav navbar-right acme-navbar-text"></ul></div></div></nav>'),s.put("app/components/new-products/new-products.html",'<div class="col-lg-9 new-product"><h2 class="title-cm">Sản phẩm mới</h2><ul><li class="product-item col-lg-4"><div class="wrap-product"><span class="safe">20%</span> <a href="#"><img src="../../../assets/images/frontend/img_05.jpg"></a></div><p>Bộ chuyển đổi USB 2.0 to RS232</p><div class="price-product"><span>200.000</span><p class="f-bebas">100.000</p><a href="#" class="btn-blue btn-buy">Mua hàng</a></div></li><li class="product-item col-lg-4"><div class="wrap-product"><span class="safe">20%</span> <a href="#"><img src="../../../assets/images/frontend/img_05.jpg"></a></div><p>Bộ chuyển đổi USB 2.0 to RS232</p><div class="price-product"><span>200.000</span><p class="f-bebas">100.000</p><a href="#" class="btn-blue btn-buy">Mua hàng</a></div></li><li class="product-item col-lg-4"><div class="wrap-product"><span class="safe">20%</span> <a href="#"><img src="../../../assets/images/frontend/img_05.jpg"></a></div><p>Bộ chuyển đổi USB 2.0 to RS232</p><div class="price-product"><span>200.000</span><p class="f-bebas">100.000</p><a href="#" class="btn-blue btn-buy">Mua hàng</a></div></li><li class="product-item col-lg-4"><div class="wrap-product"><a href="#"><img src="../../../assets/images/frontend/img_05.jpg"></a></div><p>Bộ chuyển đổi USB 2.0 to RS232</p><div class="price-product"><span>200.000</span><p class="f-bebas">100.000</p><a href="#" class="btn-blue btn-buy">Mua hàng</a></div></li><li class="product-item col-lg-4"><div class="wrap-product"><span class="safe">20%</span> <a href="#"><img src="../../../assets/images/frontend/img_05.jpg"></a></div><p>Bộ chuyển đổi USB 2.0 to RS232</p><div class="price-product"><span>200.000</span><p class="f-bebas">100.000</p><a href="#" class="btn-blue btn-buy">Mua hàng</a></div></li><li class="product-item col-lg-4"><div class="wrap-product"><span class="safe">20%</span> <a href="#"><img src="../../../assets/images/frontend/img_05.jpg"></a></div><p>Bộ chuyển đổi USB 2.0 to RS232</p><div class="price-product"><span>200.000</span><p class="f-bebas">100.000</p><a href="#" class="btn-blue btn-buy">Mua hàng</a></div></li><li class="product-item col-lg-4"><div class="wrap-product"><span class="safe">20%</span> <a href="#"><img src="../../../assets/images/frontend/img_05.jpg"></a></div><p>Bộ chuyển đổi USB 2.0 to RS232</p><div class="price-product"><span>200.000</span><p class="f-bebas">100.000</p><a href="#" class="btn-blue btn-buy">Mua hàng</a></div></li><li class="product-item col-lg-4"><div class="wrap-product"><a href="#"><img src="../../../assets/images/frontend/img_05.jpg"></a></div><p>Bộ chuyển đổi USB 2.0 to RS232</p><div class="price-product"><span>200.000</span><p class="f-bebas">100.000</p><a href="#" class="btn-blue btn-buy">Mua hàng</a></div></li><li class="product-item col-lg-4"><div class="wrap-product"><span class="safe">20%</span> <a href="#"><img src="../../../assets/images/frontend/img_05.jpg"></a></div><p>Bộ chuyển đổi USB 2.0 to RS232</p><div class="price-product"><span>200.000</span><p class="f-bebas">100.000</p><a href="#" class="btn-blue btn-buy">Mua hàng</a></div></li><li class="product-item col-lg-4"><div class="wrap-product"><span class="safe">20%</span> <a href="#"><img src="../../../assets/images/frontend/img_05.jpg"></a></div><p>Bộ chuyển đổi USB 2.0 to RS232</p><div class="price-product"><span>200.000</span><p class="f-bebas">100.000</p><a href="#" class="btn-blue btn-buy">Mua hàng</a></div></li><li class="product-item col-lg-4"><div class="wrap-product"><a href="#"><img src="../../../assets/images/frontend/img_05.jpg"></a></div><p>Bộ chuyển đổi USB 2.0 to RS232</p><div class="price-product"><span>200.000</span><p class="f-bebas">100.000</p><a href="#" class="btn-blue btn-buy">Mua hàng</a></div></li><li class="product-item col-lg-4"><div class="wrap-product"><span class="safe">20%</span> <a href="#"><img src="../../../assets/images/frontend/img_05.jpg"></a></div><p>Bộ chuyển đổi USB 2.0 to RS232</p><div class="price-product"><span>200.000</span><p class="f-bebas">100.000</p><a href="#" class="btn-blue btn-buy">Mua hàng</a></div></li></ul></div>'),s.put("app/components/news-slide/news-slide.html",'<section class="news"><h2 class="news-title f-avobold">Tin tức<span></span></h2><div class="container mt50"><div><div id="news_slider" uib-carousel="" active="active" interval="myInterval" no-wrap="noWrapSlides"><div uib-slide="" ng-repeat="slide in slides track by slide.id" index="slide.id" class="item"><div ng-repeat="news in slide.items" class="col-lg-6 news-item"><div class="wrap-img-news"><img ng-src="{{news.news_image}}"></div><div class="news-content"><a href="#">{{news.news_title}}</a><p>{{news.news_description}}</p></div></div></div></div><div class="clearfix"></div></div></div></section>'),s.put("app/components/search/search.html",'<section class="search container mt20"><div class="col-lg-4 pull-right pr0"><div class="input-group"><input type="text" class="form-control" placeholder="Tìm kiếm theo tên hoặc mã sản phẩm..."> <span class="input-group-btn"><button class="btn btn-default glyphicon" type="button"></button></span></div></div></section>'),s.put("app/components/sidebar/sidebar.html",'<div class="col-lg-3 col-md-3 col-sm-6 side-bar pr0" ng-init="init()"><div class="bar-product-list"><h2 class="side-bar-title">Danh mục sản phẩm</h2><ul class="product-list-content"><li ng-repeat="p in menus"><a href="#/danh-muc-san-pham/{{p.slug}}">{{p.name}}</a><ul ng-if="p.subMenus.length > 0"><li ng-repeat="c in p.subMenus"><a href="#/danh-muc-san-pham/{{p.slug}}/{{c.slug}}">{{c.name}}</a></li></ul></li></ul></div><div class="clearfix"></div><div class="support-online mt20"><h2 class="side-bar-title">Hỗ trợ trực tuyến</h2><ul><li ng-repeat="support in supports"><a ng-href="skype:{{support.skype}}?chat" title="{{support.name}}"><img src="../../../assets/images/frontend/skype-non-text.png"></a><h4>{{support.name}}</h4><p>ĐT: {{support.contact_phone | tel}}<br>Email: {{support.contact_email}}</p></li></ul></div><div class="clearfix"></div><div class="qaa mt20"><h2 class="side-bar-title">Hỏi đáp</h2><marquee direction="up" onmouseover="this.stop();" onmouseout="this.start();"><ul><li ng-repeat="faq in faqs"><a href="#/faq/{{faq.id}}">{{faq.question}}</a></li></ul></marquee></div><div class="clearfix"></div></div>'),s.put("app/components/topics/topics.html",'<section class="topics"><div class="container"><ul class="row"><li class="col-lg-4 col-md-4 col-sm-1"><div class="wrap-img-topics"><img src="../../../assets/images/frontend/common/icon_big03.png"> <span class="link-border"></span></div><h3 class="f-avobold">Dự án</h3><p class="text-center"><a href="#">Giải pháp (phần cứng và phần mềm) đã triển khai</a> <a href="#">Các giải pháp đang nghiên cứu</a> <a href="#">Bản mô tả chi tiết dự án</a></p></li><li class="col-lg-4 col-md-4 col-sm-1"><div class="wrap-img-topics"><img src="../../../assets/images/frontend/common/icon_big01.png"> <span class="link-border"></span></div><h3 class="f-avobold">Đào tạo - Chuyển giao công nghệ</h3><p class="text-center"><a href="#">Đào tạo lập trình điều khiển tự động, lập trình phần cứng</a> <a href="#">Chuyển giao công nghệ</a></p></li><li class="col-lg-4 col-md-4 col-sm-1"><div class="wrap-img-topics"><img src="../../../assets/images/frontend/common/icon_big02.png"> <span class="link-border"></span></div><h3 class="f-avobold">Dịch vụ kỹ thuật</h3><p class="text-center"><a href="#">Dịch vụ hàn mạch điện tử</a> <a href="#">Dịch vụ lắp ráp tụ điện công nghiệp</a> <a href="#">Dịch vụ sửa chữa, bảo dưỡng các thiết bị công nghiệp</a> <a href="#">Dịch vụ thiết, bảo trì Website</a></p></li></ul><div class="clearfix"></div></div></section>')}]);