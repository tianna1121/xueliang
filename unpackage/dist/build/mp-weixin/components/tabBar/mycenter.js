(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/tabBar/mycenter"],{4260:function(t,e,n){},5405:function(t,e,n){"use strict";var o={uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-icons/uni-icons")]).then(n.bind(null,"8d28"))},uniPopup:function(){return n.e("components/uni-popup/uni-popup").then(n.bind(null,"212b"))}},i=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}))},"6b49":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n("fbca"),i=function(){n.e("components/shufei-action/action").then(function(){return resolve(n("9fe8"))}.bind(null,n)).catch(n.oe)},a={components:{action:i},data:function(){return{userInfo:{},isTrue:!1}},methods:{ontrueGetList:function(){console.log("加载了个人中心，可以把网络请求放这里"),this.getMsg()},getMsg:function(){var e=this;this.isTrue||(console.log("个人数据"),this.$http.get("/interface/rest/http/xlwb/xlgc-wb-xcx-grzxsj.htm").then((function(n){if(console.log(n),1==n.data.msgState){var o=n.data.list[0];e.userInfo=o,e.userInfo.avatar.length<10&&(e.userInfo.avatar="http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg")}else t.showToast({title:n.data.msg,duration:2e3,icon:"none"})})).catch((function(e){console.log(e),t.showToast({title:"请求失败",duration:2e3,icon:"none"})})))},changeAvatar:function(t){this.$refs.action.actionConfig={list:["预览头像","拍摄照片","从相册选择"],type:0,isBorderColor:!1,specClass:"show"}},itemClick:function(e,n){this.isTrue=!0,console.log("你点击的action-sheet的类型是".concat(n,",list对应的索引值是").concat(e));var o=this;switch(e){case 0:var i=[];i.push(this.userInfo.avatar),t.previewImage({urls:i});break;case 1:["camera"],t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["camera"],success:function(t){o.chooseImage1(t.tempFilePaths[0])}});break;case 2:t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(t){o.chooseImage1(t.tempFilePaths[0])}});break;default:break}},chooseImage1:function(e){var n=this;t.showLoading({title:"上传中...",mask:!0}),t.uploadFile({url:"https://www.app8848.com/xlgc/interface/rest/file/upload/util/uploadFile.htm",header:{token:"281179305_eN2cdo2snJhvbJO2ZC3FzMUNLC2kloZWjJavbkak3cXOLC2abp6WbC3F3i3T3mZNbJ0ixc_T3maRZm92ZC3FzCwiloy8bJ5mlo2S3cXOLC2TbJdWbauWbpUixcEKx8f5z8_Kzs_JzM3T3mKhlm9NlpQixi3w3iwibpqRdUak3cX0zs_0zskOzMET3m5WnJSxnpKa3cXidGqMd8zKzcQO3iwijGhvbmUixi3iLC2wlpQixi3iLC2NZp6Tsm6SZt3F3YuajIQMys30zt3T3Y2vbGUixcQT3YyclG9vbE5hbpUixiLWmFrkRV7aSFoYV3TiLC2MZpyKjma0eqBhjIyIbI2k3cXizsQNzcQNx8_Oya9rt4ZHemyFsoWcyN3T3YyXbI20sm6SZt3F3YhTZJziLC20daqMZo22ZC3FzCwidp5WdC3F3m5KbGwiLC2KjJqNtpQixczKzcQT3YqMZo2xnpKa3cXidGqMd8zKzcQO3iwidIhKjJqNlpQixi20Zoy0zMUNy8EigQ"},filePath:e,name:"file",success:function(e){var o=JSON.parse(e.data);if(1==o.msgState)return n.isTrue=!0,n.updata(o.result),o.result;n.isTrue=!1,t.showToast({title:"上传失败，请重新上传",duration:2e3})}})},updata:function(e){var n=this,o={avatar:e};this.$http.post("/interface/rest/http/xlwb/xlgc-wb-xcx-grzx-xgtx.htm",o).then((function(o){console.log("图像上传"),console.log(o),1==o.data.msgState?(n.userInfo.avatar=e,t.showToast({title:o.data.msg,duration:2e3})):t.showToast({title:o.data.msg,duration:2e3,icon:"none"})})).catch((function(e){console.log(e),t.showToast({title:"请求失败",duration:2e3,icon:"none"})}))},titleClick:function(t){console.log(t)},changePhone:function(){var e={phone:this.userInfo.phone},n="change-phone";t.navigateTo({url:"/pages/change-phone/".concat(n,"?data=").concat(JSON.stringify(e))})},loginOuts:function(){this.$refs.showtip.open()},cancel:function(t){this.$refs.showtip.close()},loginOut:function(){(0,o.setTokenStorage)(""),t.redirectTo({url:"/pages/login/login"})},myUpdata:function(){t.navigateTo({url:"/pages/my-report/my-report"})}}};e.default=a}).call(this,n("543d")["default"])},b1a8:function(t,e,n){"use strict";n.r(e);var o=n("5405"),i=n("ce40");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("c646");var c,s=n("f0c5"),u=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);e["default"]=u.exports},c646:function(t,e,n){"use strict";var o=n("4260"),i=n.n(o);i.a},ce40:function(t,e,n){"use strict";n.r(e);var o=n("6b49"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/tabBar/mycenter-create-component',
    {
        'components/tabBar/mycenter-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("b1a8"))
        })
    },
    [['components/tabBar/mycenter-create-component']]
]);
