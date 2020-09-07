/**
 * 上下文对象,再其他文件调用常量 方法 时间工具类时 只引入上下文文件
 * 
 * add by wuxw 2019-12-27
 * 
 * the source opened https://gitee.com/java110/WechatOwnerService
 */
const constant = require("../constant/index.js");


const factory = require("../factory/index.js");

let util = {};
/**
 * 获取请后台服务时的头信息
 */
const getHeaders = function() {
	
	let _wAppId = uni.getStorageSync(constant.mapping.W_APP_ID);
	return {
		"app-id": constant.app.appId,
		"transaction-id": 'util.core.wxuuid()',
		"req-time": 'util.date.getDateYYYYMMDDHHMISS()',
		"sign": '1234567',
		"user-id": '-1',
		"cookie": '_java110_token_=' + wx.getStorageSync('token'),
		"Accept": '*/*',
		"w-app-id":_wAppId
	};
};
/**
 * http 请求 加入是否登录判断
 */
const request = function(_reqObj) {

	//这里判断只有在 post 方式时 放加载框
	if (_reqObj.hasOwnProperty("method") && "POST" == _reqObj.method) {
		uni.showLoading({
			title: '加载中',
			mask: true
		});
		_reqObj.complete = function() {
			uni.hideLoading();
		}
	}

	//白名单直接跳过检查登录
	if (constant.url.NEED_NOT_LOGIN_URL.includes(_reqObj.url)) {
		_reqObj.communityId = constant.mapping.HC_TEST_COMMUNITY_ID;
		uni.request(_reqObj);
		return;
	}
	//校验是否登录，如果没有登录跳转至温馨提示页面
	factory.login.checkSession().then(function() {
		//有回话 跳转至相应页面
		//重写token
		_reqObj.header.cookie = '_java110_token_=' + wx.getStorageSync('token');
		uni.request(_reqObj);
	}, function(error) { //回话过期
		// #ifdef H5
		//先微信登录
		factory.login.wechatRefreshToken();
		// #endif

		//小程序登录
		// #ifdef MP-WEIXIN
		factory.login.doLogin();
		// #endif

		// #ifdef APP-PLUS
		//查询临时钥匙
		let _key = wx.getStorageSync(constant.mapping.OWNER_KEY);
		if (_key) {
			factory.login._doLoginOwnerByKey(_key);
		} else {
			uni.navigateTo({
				url: '/pages/showlogin/showlogin'
			});
			return;
		}
		// #endif
	});
};
/**
 * 获取位置
 * add by wuxw 2019-12-28
 */


const getLocation = function() {
	return wx.getStorageSync('location');
};

const getCurrentLocation = function() {
	return wx.getStorageSync('currentLocation');
};
/**
 * 获取用户信息
 * 
 * add by wuxw 2019-12-28
 */
const getUserInfo = function() {
	let _userInfo = wx.getStorageSync(constant.mapping.USER_INFO);

	return JSON.parse(_userInfo);
};

/**
 * 登录标记
 * add  by wuxw 2019-12-28
 */
const getLoginFlag = function() {
	let _loginFlag = wx.getStorageSync(constant.mapping.LOGIN_FLAG);
	return _loginFlag;
};

const _loadArea = function(_level, _parentAreaCode, callBack = _areaList => {}) {
	let areaList = wx.getStorageSync(constant.mapping.AREA_INFO);
	if (areaList) {
		callBack(areaList);
		return;
	}
	uni.request({
		url: constant.url.areaUrl,
		header: getHeaders(),
		data: {
			areaLevel: _level,
			// 临时登录凭证
			parentAreaCode: _parentAreaCode
		},
		success: function(res) {
			res = res.data;
			var province = [],
				city = [],
				area = [];
			var _currentArea = [];
			province = res.areas.filter(item => {
				return item.areaLevel == '101';
			});
			city = res.areas.filter(item => {
				return item.areaLevel == '202';
			});
			area = res.areas.filter(item => {
				return item.areaLevel == '303';
			});
			var provinceList = {};
			province.forEach(function(item) {
				provinceList[item.areaCode] = item.areaName;
			});
			var cityList = {};
			city.forEach(function(item) {
				cityList[item.areaCode] = item.areaName;
			});
			var quyuList = {};
			area.forEach(function(item) {
				quyuList[item.areaCode] = item.areaName;
			});
			let areaList = {
				province_list: provinceList,
				city_list: cityList,
				county_list: quyuList
			};
			callBack(areaList); //将 地区信息存储起来

			wx.setStorageSync(constant.mapping.AREA_INFO, areaList);
		},
		fail: function(error) {
			// 调用服务端登录接口失败
			wx.showToast({
				title: '调用接口失败'
			});
			console.log(error);
		}
	});
};

const getOwner = function(callBack = _ownerInfo => {}) {
	// 从硬盘中获取 业主信息
	let _ownerInfo = wx.getStorageSync(constant.mapping.OWNER_INFO);
	console.log('owner', _ownerInfo);
	if (_ownerInfo) {
		callBack(_ownerInfo);
	} else {
		request({
			url: constant.url.queryAppUserBindingOwner,
			header: getHeaders(),
			data: {},
			success: function(res) {
				console.log('login success');
				let _json = res.data;
				console.log(res);

				if (_json.code == 0) {
					_ownerInfo = _json.data[0];

					if (_ownerInfo == null || _ownerInfo == undefined) {
						callBack(null);
						return;
					}

					if (_ownerInfo.state == '12000') {
						wx.setStorageSync(constant.mapping.OWNER_INFO, _ownerInfo);
						let _currentCommunityInfo = {
							communityId: _ownerInfo.communityId,
							communityName: _ownerInfo.communityName
						};
						wx.setStorageSync(constant.mapping.CURRENT_COMMUNITY_INFO, _currentCommunityInfo);
					}

					callBack(_json.data[0]);
				}
			},
			fail: function(error) {
				// 调用服务端登录接口失败
				wx.showToast({
					title: '调用接口失败'
				});
				console.log(error);
			}
		});
	}
};

const getProperty = function() {
	let communitInfo = getCurrentCommunity();
	return new Promise((resolve, reject) => {
		let _objData = {
			page: 1,
			row: 5,
			communityId: communitInfo.communityId,
			memberTypeCd: '390001200002'
		};
		request({
			url: constant.url.listStore,
			header: getHeaders(),
			method: "GET",
			data: _objData,
			//动态数据
			success: function(res) {
				console.log("请求返回信息：", res);
				if (res.statusCode == 200) {
					resolve(res.data.stores[0]);
					return;
				}
				reject(res.body);
			},
			fail: function(e) {
				//  调用服务端登录接口失败
				wx.showToast({
					title: '调用接口失败',
					icon: 'none'
				});
				reject(e);
			}
		});
	})
};
/**
 * 获取当前小区信息
 */


const getCurrentCommunity = function() {
	let communityInfo = wx.getStorageSync(constant.mapping.CURRENT_COMMUNITY_INFO);
	return communityInfo;
};
/**
 * add by shil 2020-01-08
 * 获取当前用户的房屋信息
 */


const getRooms = function() {
	return new Promise((resolve, reject) => {
		getOwner(function(_owner) {
			request({
				url: constant.url.queryRoomsByOwner,
				header: getHeaders(),
				method: "GET",
				data: {
					communityId: _owner.communityId,
					ownerId: _owner.memberId
				},
				success: function(res) {
					if (res.statusCode == 200) {
						//将业主信息和房屋信息一起返回
						res.data['owner'] = _owner;

						if (res.data.rooms.length == 0) {
							wx.showToast({
								title: "未查询到房屋信息",
								icon: 'none',
								duration: 2000
							});
						}

						resolve(res);
					} else {
						wx.showToast({
							title: '未查询到房屋信息',
							icon: 'none',
							duration: 2000
						});
					}
				},
				fail: function(res) {
					//  调用服务端登录接口失败
					wx.showToast({
						title: '调用接口失败'
					});
					reject(res);
				}
			});
		});
	});
};

//判断当前登录状态，不调跳转登录界面
const checkLoginStatus = function() {
	let loginFlag = wx.getStorageSync(constant.mapping.LOGIN_FLAG);
	let nowDate = new Date();
	if (loginFlag && loginFlag.expireTime > nowDate.getTime()) {
		return true;
	} else {
		return false;
	}
};

/**
 * 跳转功能封装
 * @param {Object} _param 跳转入参
 */
const navigateTo = function(_param) {
	let _url = _param.url;
	let _tempUrl = _url.indexOf('?') > 0 ? _url.substring(0, _url.indexOf('?')) : _url;
	//是否需要登录
	constant.url.NEED_NOT_LOGIN_PAGE.forEach(item => {
		if (item == _tempUrl) {
			uni.navigateTo(_param);
			return;
		}
	});
	console.log('跳转参数', _param);
	//校验是否登录，如果没有登录跳转至温馨提示页面
	factory.login.checkSession().then(function() {
		//有回话 跳转至相应页面
		uni.navigateTo(_param);
	}, function(error) { //回话过期
		// #ifdef H5
		//先微信登录
		factory.login.wechatRefreshToken();
		// #endif

		//小程序登录
		// #ifdef MP-WEIXIN
		factory.login.doLogin();
		// #endif

		// #ifdef APP-PLUS
		//查询临时钥匙
		let _key = wx.getStorageSync(constant.mapping.OWNER_KEY);
		if (_key) {
			factory.login._doLoginOwnerByKey(_key);
		} else {
			uni.navigateTo({
				url: '/pages/showlogin/showlogin'
			});
			return;
		}
		// #endif
	});
};

const onLoad = function(_option) {
	
	console.log('参数打印',_option);

	// #ifdef H5
	
	let _key = _option.key;

	if (_key != null && _key != undefined && _key != '') {
		//根据key 去做登录
		factory.login._doLoginOwnerByKey(_key);
	}

	let wAppId = _option.wAppId;

	if (wAppId != null && wAppId != undefined && wAppId != '') {
		uni.setStorageSync(constant.mapping.W_APP_ID, _option.wAppId);
	}else{
		wAppId = uni.getStorageInfoSync(constant.mapping.W_APP_ID)
		if(wAppId != null && wAppId != undefined && wAppId != ''){
			uni.setStorageSync(constant.mapping.W_APP_ID, constant.app.wAppId);
		}
	}
	

	// #endif
}

module.exports = {
	constant: constant,
	util: util,
	factory: factory,
	getHeaders: getHeaders,
	getLocation: getLocation,
	getUserInfo: getUserInfo,
	getLoginFlag: getLoginFlag,
	_loadArea: _loadArea,
	getCurrentLocation: getCurrentLocation,
	getOwner: getOwner,
	getCurrentCommunity: getCurrentCommunity,
	request: request,
	getRooms: getRooms,
	getProperty: getProperty,
	checkLoginStatus: checkLoginStatus,
	onLoad: onLoad,
	navigateTo: navigateTo
};
