// pages/regest/regest.js
const app = getApp();
const $v = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    phone: "",
    com: "",
    comDes:""
  },
  //姓名 
  userNameInput(e) {
    var val = e.detail.value;
    this.setData({
      username: val
    });
  },
  phoneInput(e) {
    var val = e.detail.value;
    this.setData({
      phone: val
    });
  },
  comInput(e) {
    var val = e.detail.value;
    this.setData({
      com: val
    });
  },
  comDesInput(e){
    var val = e.detail.value;
    this.setData({
      comDes: val
    });
  },
  //点击确定按钮
  listenerRegest() {
    if (this.data.phone == "") {
      wx.showToast({
        icon: 'none',
        title: '请填写电话',
        duration: 1500
      });
      return;
    }

    app.res({
      url: "user/updateUserInfo",
      method: "POST",
      load:false,
      data: {
        company: this.data.com,
        username: this.data.username,
        phone: this.data.phone,
        cpDes: this.data.comDes
      },
      callback: (res) => {
        if(res.code == 0) {
          wx.showModal({
            title: '提示',
            content: '完善信息成功',
            confirmText:"返回上一页",
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack();
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            }
          })
        }else if(res.code == 601){
          app.res({
            url: "user/updateUser",
            method: "POST",
            load: false,
            data: {
              company: this.data.com,
              username: this.data.username,
              phone: this.data.phone,
              cpDes: this.data.comDes
            },
            callback: (res) => {
                wx.showModal({
                  title: '提示',
                  content: '完善信息成功',
                  confirmText: "返回上页",
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateBack();
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
            }
          })
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})