(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/change-phone/change-phone"],{"0faf":function(n,t,a){"use strict";var e=a("d16c"),u=a.n(e);u.a},1324:function(n,t,a){"use strict";a.r(t);var e=a("6b2a"),u=a.n(e);for(var o in e)"default"!==o&&function(n){a.d(t,n,(function(){return e[n]}))}(o);t["default"]=u.a},"33ef":function(n,t,a){"use strict";a.r(t);var e=a("fb60"),u=a("1324");for(var o in u)"default"!==o&&function(n){a.d(t,n,(function(){return u[n]}))}(o);a("0faf");var i,c=a("f0c5"),f=Object(c["a"])(u["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],i);t["default"]=f.exports},"6b2a":function(n,t,a){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=function(){a.e("components/uni-nav-bar/uni-nav-bar").then(function(){return resolve(a("8265"))}.bind(null,a)).catch(a.oe)},u={components:{uniNavBar:e},data:function(){return{phone:"",detailData:{}}},onLoad:function(n){this.detailData=JSON.parse(n.data),console.log(this.detailData),this.phone=this.detailData.phone},methods:{back:function(){n.navigateBack({delta:1})},submitJunmp:function(){console.log("保存成功"),n.showLoading({title:"loading"}),setTimeout((function(){n.hideLoading(),n.navigateBack({delta:1})}),1e3)}}};t.default=u}).call(this,a("543d")["default"])},"93f9":function(n,t,a){"use strict";(function(n){a("700f"),a("921b");e(a("66fd"));var t=e(a("33ef"));function e(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,a("543d")["createPage"])},d16c:function(n,t,a){},fb60:function(n,t,a){"use strict";var e={"uni-nav-bar":function(){return a.e("components/uni-nav-bar/uni-nav-bar").then(a.bind(null,"8265"))}},u=function(){var n=this,t=n.$createElement;n._self._c},o=[];a.d(t,"b",(function(){return u})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return e}))}},[["93f9","common/runtime","common/vendor"]]]);