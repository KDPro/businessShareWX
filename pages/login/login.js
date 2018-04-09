// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '/images/login.jpg'
  },
  //点击去注册 
  regest() {
    wx.navigateTo({
      url: '/pages/regest/regest',
    })
  },
  //点击登录按钮
  listenerLogin(){
    wx.showToast({
      icon: 'loading',
      title: '此功能正在开发',
      duration: 2000
    })
    setTimeout(function(){
      wx.switchTab({
        url: '/pages/index/index',
      })
    },2500)
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