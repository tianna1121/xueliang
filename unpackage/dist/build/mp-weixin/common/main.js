(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{3836:function(e,o,t){"use strict";t.r(o);var n=t("97d2");for(var c in n)"default"!==c&&function(e){t.d(o,e,(function(){return n[e]}))}(c);t("cfb9");var i,r,s,a,u=t("f0c5"),l=Object(u["a"])(n["default"],i,r,!1,null,null,null,!1,s,a);o["default"]=l.exports},"42a1":function(e,o,t){"use strict";(function(e,o){t("700f");var n=r(t("66fd")),c=r(t("3836")),i=t("6045");function r(e){return e&&e.__esModule?e:{default:e}}function s(e,o){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);o&&(n=n.filter((function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var o=1;o<arguments.length;o++){var t=null!=arguments[o]?arguments[o]:{};o%2?s(Object(t),!0).forEach((function(o){u(e,o,t[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(t,o))}))}return e}function u(e,o,t){return o in e?Object.defineProperty(e,o,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[o]=t,e}n.default.config.productionTip=!1,e.getSystemInfo({success:function(e){var o=e.model;console.log("手机型号-------",e.model),o.indexOf("iPhone X")>=0||o.indexOf("iPhone XR")>=0||o.indexOf("iPhone XS")>=0||o.indexOf("iPhone 12")>=0||o.indexOf("iPhone 11")>=0||o.indexOf("iPhone11")>=0||o.indexOf("iPhone12")>=0||o.indexOf("iPhoneXR")>=0||o.indexOf("iPhoneX")>=0?n.default.prototype.$is_bang=!0:n.default.prototype.$is_bang=!1}}),c.default.mpType="app",n.default.prototype.$http=i.http;var l=new n.default(a({},c.default));o(l).$mount()}).call(this,t("543d")["default"],t("543d")["createApp"])},"97d2":function(e,o,t){"use strict";t.r(o);var n=t("e908"),c=t.n(n);for(var i in n)"default"!==i&&function(e){t.d(o,e,(function(){return n[e]}))}(i);o["default"]=c.a},cfb9:function(e,o,t){"use strict";var n=t("d913"),c=t.n(n);c.a},d913:function(e,o,t){},e908:function(e,o,t){"use strict";(function(e){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var n=t("fbca"),c={onLaunch:function(){console.log("App Launch")},onShow:function(){console.log("App Show");var o=this;this.getUserInfo(),e.getSetting({success:function(t){console.log("地图位置"),e.hideLoading(),t.authSetting["scope.userLocation"]?o.chooseLocation():e.authorize({scope:"scope.userLocation",success:function(){o.chooseLocation()},fail:function(){e.showToast({title:"无法获取地图权限",duration:2e3,icon:"none"})}})}})},onHide:function(){console.log("App Hide")},methods:{chooseLocation:function(){var o=this;e.getLocation({type:"wgs84",success:function(t){var n={lost_address:"只提供经纬度",lost_longitude:t.longitude,lost_latitude:t.latitude};o.$http.post("/interface/rest/http/xlwb/xlgc-wb-xcx-hqdydwxx.htm",n,{params:{}}).then((function(o){console.log("获取用户经纬度提交"),console.log(o),1==o.data.msgState||e.showToast({title:o.data.msg,duration:2e3,icon:"none"})})).catch((function(o){console.log(o),e.showToast({title:"获取地理位置失败",duration:2e3,icon:"none"})}))}})},getUserInfo:function(){console.log("获取用户信息");var o=this;e.login({provider:"weixin",success:function(t){console.log("code"),console.log(t.code);var c={code:t.code};o.$http.post("/interface/rest/http/platform_general/getOpenId.htm",c,{params:{}}).then((function(o){if(console.log("获取oppenid"),console.log(o),1==o.data.msgState){var t=o.data.result;(0,n.setOpenIdStorage)(t)}else e.showToast({title:o.data.msg,duration:2e3,icon:"none"})})).catch((function(o){console.log(o),e.showToast({title:"获取地理位置失败",duration:2e3,icon:"none"})})),e.getUserInfo({provider:"weixin",success:function(e){console.log("2222222"),console.log(e.userInfo),console.log("用户昵称为："+e.userInfo.nickName)}})}})}}};o.default=c}).call(this,t("543d")["default"])}},[["42a1","common/runtime","common/vendor"]]]);