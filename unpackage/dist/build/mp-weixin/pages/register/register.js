(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/register/register"],{"0099":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;t("fbca");var o=function(){Promise.all([t.e("common/vendor"),t.e("components/uni-icons/uni-icons")]).then(function(){return resolve(t("8d28"))}.bind(null,t)).catch(t.oe)},i={components:{uniIcons:o},data:function(){return{imageList:[],value:["请选择","请选择","请选择"],defaultProps1:{label:"name",value:"id",children:"child"},options:[],name:"",idCard:"",phone:"",array:["请选择","男","女"],sexIndex:0,workList:[],workIndex:0,userInfo:{avatar:"",username:"",idcard:"",sex:"0",phone:"",unit:"请选择",x:"",z:"",c:""}}},onShow:function(){n.hideHomeButton()},onLoad:function(){this.getType()},methods:{onConfirm:function(n,e){console.log(n),this.userInfo.unit=n.result,console.log(e),this.userInfo.x=n.value[0],this.userInfo.z=n.value[1],this.userInfo.c=n.value[2],console.log(this.userInfo)},onCancel:function(){console.log("你取消了")},showPicker:function(){this.$refs.linkage.show()},jumpRegster:function(){n.redirectTo({url:"../login/login"})},getType:function(){var e=this;this.$http.get("/interface/rest/http/xlwb/xlgc-wb-xcx-sssj-xzcjl.htm",{params:{}}).then((function(t){console.log("单位"),console.log(t),1==t.data.msgState?e.options=t.data.result:n.showToast({title:t.data.msg,duration:2e3,icon:"none"})})).catch((function(n){console.log(n)}))},typeChange:function(n){var e=[];for(var t in n)e.push(n[t].unit);return e},checkIDCard:function(n){for(var e=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],t=["1","0","X","9","8","7","6","5","4","3","2"],o=n+"",i=n[17],s=o.substring(0,17),a=s.split(""),c=a.length,r=0,u=0;u<c;u++)r+=a[u]*e[u];var l=r%11,f=t[l],h=/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/,d=h.test(n);return!(i!==f||!d)},submitMsg:function(){if(console.log(this.userInfo),this.userInfo.avatar.length<1)n.showModal({content:"请上传头像!",showCancel:!1,confirmText:"确定"});else if(this.userInfo.username.length<1)n.showModal({content:"请输入姓名!",showCancel:!1,confirmText:"确定"});else if("0"!=this.userInfo.sex)if(this.checkIDCard(this.userInfo.idcard))if(/^1[3456789]\d{9}$/.test(this.userInfo.phone))if(""!=this.userInfo.x){var e={avatar:this.userInfo.avatar,username:this.userInfo.username,idcard:this.userInfo.idcard,sex:this.userInfo.sex.toString(),phone:this.userInfo.phone,unit:this.userInfo.unit,countyId:this.userInfo.x.toString(),townId:this.userInfo.z.toString(),villageId:this.userInfo.c.toString()};console.log(e),n.showLoading({title:"loading"}),this.$http.post("/interface/rest/http/xlwb/xlgc-wb-xcx-yhzc.htm",e).then((function(e){console.log(e),n.hideLoading(),1==e.data.msgState?(n.redirectTo({url:"../regres/regres"}),n.showToast({title:e.data.msg,duration:2e3})):n.showToast({title:e.data.msg,duration:2e3,icon:"none"})})).catch((function(e){console.log(e),n.hideLoading(),n.showToast({title:"请求失败！",duration:2e3,icon:"none"})}))}else n.showModal({content:"请选择所在单位!",showCancel:!1,confirmText:"确定"});else n.showModal({content:"请输入正确的手机号!",showCancel:!1,confirmText:"确定"});else n.showModal({content:"请输入正确的身份证号!",showCancel:!1,confirmText:"确定"});else n.showModal({content:"请选择性别!",showCancel:!1,confirmText:"确定"})},chooseImage:function(){var e=this;n.chooseImage({count:1,success:function(t){n.showLoading({title:"上传中...",mask:!0}),n.uploadFile({url:"https://www.app8848.com/interface/rest/file/upload/util/uploadFile.htm",header:{token:"281179305_eN2cdo2snJhvbJO2ZC3FzMUNLC2kloZWjJavbkak3cXOLC2abp6WbC3F3i3T3mZNbJ0ixc_T3maRZm92ZC3FzCwiloy8bJ5mlo2S3cXOLC2TbJdWbauWbpUixcEKx8f5z8_Kzs_JzM3T3mKhlm9NlpQixi3w3iwibpqRdUak3cX0zs_0zskOzMET3m5WnJSxnpKa3cXidGqMd8zKzcQO3iwijGhvbmUixi3iLC2wlpQixi3iLC2NZp6Tsm6SZt3F3YuajIQMys30zt3T3Y2vbGUixcQT3YyclG9vbE5hbpUixiLWmFrkRV7aSFoYV3TiLC2MZpyKjma0eqBhjIyIbI2k3cXizsQNzcQNx8_Oya9rt4ZHemyFsoWcyN3T3YyXbI20sm6SZt3F3YhTZJziLC20daqMZo22ZC3FzCwidp5WdC3F3m5KbGwiLC2KjJqNtpQixczKzcQT3YqMZo2xnpKa3cXidGqMd8zKzcQO3iwidIhKjJqNlpQixi20Zoy0zMUNy8EigQ"},filePath:t.tempFilePaths[0],name:"file",success:function(t){var o=JSON.parse(t.data);1==o.msgState?e.userInfo.avatar=o.result:n.showToast({title:"上传失败，请重新上传",duration:2e3,icon:"none"})}}),n.hideLoading()}})},sizeTypeChange:function(n){this.userInfo.sex=parseInt(n.detail.value)}}};e.default=i}).call(this,t("543d")["default"])},"0af7":function(n,e,t){"use strict";var o=t("8683"),i=t.n(o);i.a},"37fe":function(n,e,t){"use strict";t.r(e);var o=t("0099"),i=t.n(o);for(var s in o)"default"!==s&&function(n){t.d(e,n,(function(){return o[n]}))}(s);e["default"]=i.a},"4aec":function(n,e,t){"use strict";t.r(e);var o=t("cab8"),i=t("37fe");for(var s in i)"default"!==s&&function(n){t.d(e,n,(function(){return i[n]}))}(s);t("0af7");var a,c=t("f0c5"),r=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);e["default"]=r.exports},"7e61":function(n,e,t){"use strict";(function(n){t("700f"),t("921b");o(t("66fd"));var e=o(t("4aec"));function o(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("543d")["createPage"])},8683:function(n,e,t){},cab8:function(n,e,t){"use strict";var o={"uni-icons":function(){return Promise.all([t.e("common/vendor"),t.e("components/uni-icons/uni-icons")]).then(t.bind(null,"8d28"))},"w-picker":function(){return t.e("components/w-picker/w-picker").then(t.bind(null,"8461"))}},i=function(){var n=this,e=n.$createElement;n._self._c},s=[];t.d(e,"b",(function(){return i})),t.d(e,"c",(function(){return s})),t.d(e,"a",(function(){return o}))}},[["7e61","common/runtime","common/vendor"]]]);