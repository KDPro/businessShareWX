//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.getUser();
        }else {
          this.getUser();  
        }
      }
    })
  },
  //获取微信用户信息
  getUser:function () {
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo
        // 如果token不存在调用login
        if (!wx.getStorageSync('token')) {
          this.wxLogin(res.userInfo);
        }
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      },
      fail:res=>{
        // 如果token不存在调用login
        if (!wx.getStorageSync('token')) {
          this.wxLogin();
        }
        // wx.openSetting({
        //     success:(data)=> {
        //       console.log(data);
        //       this.getUser();
        //     }
        //   })
      }
    })
  },
  // 登录 通过code 换取 token
  wxLogin: function (userInfo) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        userInfo.code = res.code;
        this.res({
          url: "wxlogin",
          method: "POST",
          data: userInfo,
          callback: (res) => {
            this.globalData.token = res.data;
            this.globalData.user = res.user;
            wx.setStorageSync('token', this.globalData.token);
            wx.setStorageSync('user', this.globalData.user);
          }
        })
      }
    })
  },
  // 微信请求的封装
  res: function ({ url, method, data,loading,callback }) {
    if (loading || loading==undefined) {
      wx.showLoading({
        title: '加载中...',
      });
    }
    wx.request({
      url: this.globalData.appPath + url, //仅为示例，并非真实的接口地址
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',// 默认值
        'token': wx.getStorageSync('token')
      },
      success: (res)=> {
        if (res.data.code == 0) {
          callback(res.data);
        } else if(res.data.code == 550) {
          wx.removeStorageSync('token');
          this.getUser();
        } else if(res.data.code == 600) {
          wx.showModal({
            title: '提示',
            content: '请完善个人信息后进行操作',
            cancelText:"取消",
            confirmText:"去完善",
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/regest/regest',
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
         
        }else if (res.data.code == 601) {
          callback(res.data);
        }else {
          if(res.data.msg) {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 2000
            })
          }
          
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '网络可能出错了，请稍后重试',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      complete: function (res) {
        if (loading || loading == undefined) { 
          wx.hideLoading();
        }
      }
    })
  },
  // 通过时间戳获取时间
  times: function (val, date) {
    var time = new Date(val);
    var year = time.getFullYear();
    var month = time.getMonth() >= 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1);
    var day = time.getDate() >= 10 ? time.getDate() : '0' + time.getDate();
    var hour = time.getHours() >= 10 ? time.getHours() : '0' + time.getHours();
    var min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes();
    var sec = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds();
    if (date == "date") {
      return (year + "-" + month + "-" + day);
    } else if (date == "time") {
      return (hour + ":" + min);
    } else if (date == "dateTime") {
      return (year + "-" + month + "-" + day + " " + hour + ":" + min);
    }

  },
  globalData: {
    userInfo: null,
    appPath: "http://192.168.20.3:8080/",
    token: "",
    user:"",
    cId:"",
    appid: "wx856849114a8b8b43",
    secret:"2232b08f2d4f2f93507b9c1ef61075f5"
  }
})