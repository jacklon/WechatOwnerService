(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/my"],{"190a":function(n,o,e){"use strict";var t,i=function(){var n=this,o=n.$createElement;n._self._c},a=[];e.d(o,"b",(function(){return i})),e.d(o,"c",(function(){return a})),e.d(o,"a",(function(){return t}))},3876:function(n,o,e){"use strict";(function(n){e("42b7");t(e("66fd"));var o=t(e("f2b4"));function t(n){return n&&n.__esModule?n:{default:n}}n(o.default)}).call(this,e("543d")["createPage"])},a1a3:function(n,o,e){},a4d6:function(n,o,e){"use strict";var t=e("a1a3"),i=e.n(t);i.a},e44c:function(n,o,e){"use strict";e.r(o);var t=e("f4ae"),i=e.n(t);for(var a in t)"default"!==a&&function(n){e.d(o,n,(function(){return t[n]}))}(a);o["default"]=i.a},f2b4:function(n,o,e){"use strict";e.r(o);var t=e("190a"),i=e("e44c");for(var a in i)"default"!==a&&function(n){e.d(o,n,(function(){return i[n]}))}(a);e("a4d6");var r,u=e("f0c5"),c=Object(u["a"])(i["default"],t["b"],t["c"],!1,null,null,null,!1,t["a"],r);o["default"]=c.exports},f4ae:function(n,o,e){"use strict";(function(n){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var t=e("3035"),i=t.factory,a=t.constant,r=(getApp().globalData,{data:function(){return{userInfo:{},headerImg:"",userName:"",ownerFlag:!1,login:!0}},components:{},props:{},onLoad:function(n){t.onLoad(n);var o=this,e=t.checkLoginStatus();e&&i.login.checkLoginStatus((function(){o.userInfo=t.getUserInfo(),o.loadOwenrInfo()}))},onShow:function(){var n=this;n.ckeckUserInfo()?(n.login=!0,n.loadOwenrInfo(),n.userInfo=t.getUserInfo(),this.loadOwnerHeaderImg()):n.login=!1},methods:{bindingOwner:function(){this.ckeckUserInfo()?wx.navigateTo({url:"../bindOwner/bindOwner"}):n.navigateTo({url:"../showlogin/showlogin"})},viewOwner:function(){this.ckeckUserInfo()?wx.navigateTo({url:"../viewBindOwner/viewBindOwner"}):n.navigateTo({url:"../showlogin/showlogin"})},loadOwenrInfo:function(){var n=this;t.getOwner((function(o){console.log(o),n.ownerFlag=!!o}))},myProperty:function(){this.ckeckUserInfo()?wx.navigateTo({url:"../myProperty/myProperty"}):n.navigateTo({url:"../showlogin/showlogin"})},myComplaint:function(){this.ckeckUserInfo()?wx.navigateTo({url:"../complaintList/complaintList"}):n.navigateTo({url:"../showlogin/showlogin"})},onGotUserInfo:function(n){console.log("nickname="+JSON.stringify(n.detail.userInfo))},myHouse:function(){this.ckeckUserInfo()?wx.navigateTo({url:"../my/myHouse"}):n.navigateTo({url:"../showlogin/showlogin"})},myRepair:function(){this.ckeckUserInfo()?wx.navigateTo({url:"/pages/myRepair/myRepair"}):n.navigateTo({url:"../showlogin/showlogin"})},mySettings:function(){this.ckeckUserInfo()?wx.navigateTo({url:"/pages/settings/settings"}):n.navigateTo({url:"../showlogin/showlogin"})},loadOwnerHeaderImg:function(){var n=this;t.getOwner((function(o){var e=a.url.getOwnerPhotoPath+"?objId="+o.memberId+"&communityId="+o.communityId+"&fileTypeCd=10000";n.headerImg=e,n.userName=o.appUserName}))},showLongModel:function(){n.navigateTo({url:"../login/login"})},ckeckUserInfo:function(){return t.checkLoginStatus()}}});o.default=r}).call(this,e("543d")["default"])}},[["3876","common/runtime","common/vendor"]]]);