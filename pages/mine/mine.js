// pages/mine/mine.js
const app = getApp();
const $v = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      src: '',
      mineList: [
        {
        title: '我的商机',
        icon: 'icon-dengpao1',
        color: '#ffa763'
        }, {
          title: '关注商机',
          icon: 'icon-fabu',
          color: '#2f91da'
        },{
        title: '报名商机',
        icon: 'icon-danju',
        color: '#2f91da'
      },{
        title: '完善信息',
        icon: 'icon-wode',
        color: '#f26669'
      }]
  },
  //点击更改头像
  changeHeader(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'], 
      success: function (res) {

        var tempFilePaths = res.tempFilePaths
      }
    })
  },
  //点击注册
  regest(){
    wx.navigateTo({
      url: '/pages/regest/regest',
    })
  },
  //点击登录
  login(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  //点击个人中心每一个选项
  chose(e){
    let index = e.currentTarget.dataset.index;
    switch(index){
      case 0:
        wx.navigateTo({
          url: '/pages/mineBusiness/mineBusiness',
        })
        break;
      case 1: 
      wx.navigateTo({
        url: '/pages/signUpBusiness/signUpBusiness?id=1',
      })
      break;
      case 2: 
      wx.navigateTo({
        url: '/pages/signUpBusiness/signUpBusiness?id=2',
      })
      break;
      case 3:
        // wx.showToast({
        //   icon: 'loading',
        //   title: '此功能正在开发',
        //   duration: 2000
        // })
      /*wx.navigateTo({
        url: '/pages/mineBusiness',
      })*/
        wx.navigateTo({
          url: '/pages/regest/regest',
        })
      break;
    }
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
    this.setData({
      src: wx.getStorageSync('user').url
    })
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