(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/change-phone/change-phone"],{"0faf":function(n,t,a){"use strict";var e=a("3bdb"),o=a.n(e);o.a},1324:function(n,t,a){"use strict";a.r(t);var e=a("6b2a"),o=a.n(e);for(var i in e)"default"!==i&&function(n){a.d(t,n,(function(){return e[n]}))}(i);t["default"]=o.a},"33ef":function(n,t,a){"use strict";a.r(t);var e=a("62dd"),o=a("1324");for(var i in o)"default"!==i&&function(n){a.d(t,n,(function(){return o[n]}))}(i);a("0faf");var u,c=a("f0c5"),r=Object(c["a"])(o["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],u);t["default"]=r.exports},"3bdb":function(n,t,a){},"62dd":function(n,t,a){"use strict";var e={uniNavBar:function(){return a.e("components/uni-nav-bar/uni-nav-bar").then(a.bind(null,"8265"))}},o=function(){var n=this,t=n.$createElement;n._self._c},i=[];a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return e}))},"6b2a":function(n,t,a){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=function(){a.e("components/uni-nav-bar/uni-nav-bar").then(function(){return resolve(a("8265"))}.bind(null,a)).catch(a.oe)},o={components:{uniNavBar:e},data:function(){return{phone:"",detailData:{}}},onLoad:function(n){this.detailData=JSON.parse(n.data),console.log(this.detailData),this.phone=this.detailData.phone},methods:{back:function(){n.navigateBack({delta:1})},submitJunmp:function(){console.log("保存成功"),n.showLoading({title:"loading"});var t={phone:this.phone};this.$http.post("/interface/rest/http/xlwb/xlgc-wb-xcx-grzx-xgsjh.htm",t).then((function(t){n.hideLoading(),console.log(t.data),1==t.data.msgState?(n.showToast({title:t.data.msg,duration:2e3}),n.navigateBack({delta:1})):n.showToast({title:t.data.msg,duration:2e3,icon:"none"})})).catch((function(t){console.log(t),n.hideLoading(),n.showToast({title:"请求失败",duration:2e3,icon:"none"})}))}}};t.default=o}).call(this,a("543d")["default"])},"93f9":function(n,t,a){"use strict";(function(n){a("700f");e(a("66fd"));var t=e(a("33ef"));function e(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,a("543d")["createPage"])}},[["93f9","common/runtime","common/vendor"]]]);