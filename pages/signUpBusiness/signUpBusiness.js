// pages/signUpBusiness/signUpBusiness.js
const app = getApp();
const $v = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryId:"",
    pageNum: 1,
    businessList: []
  },
  //点击查看详情
  details(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../businessDetails/businessDetails?id=' + id,
    })
  },
  // 当滚动到底部时触发事件
  scrolltolower: function () {
    this.setData({
      pageNum: this.data.pageNum + 1
    });
  },
  /**
   * 获取我的商机列表
   */
  buiness: function () {
    var url = "";
    if (this.data.queryId == 1) {
      url = "business/getMyAttentionList"
    }else if(this.data.queryId){
      url = "business/getSignList"
    }
    app.res({
      url: url,
      method: "GET",
      data: {},
      callback: (res) => {
        var arr = res.data;
        arr.forEach((e, index) => {
          arr[index].cDate = app.times(e.cDate, "dateTime")
        });
        this.setData({
          businessList: arr
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      queryId:options.id
    });
    if(options.id == 1) {
      wx.setNavigationBarTitle({
        title:"关注商机"//页面标题为路由参数
      })
    }else if(options.id = 2) {
      wx.setNavigationBarTitle({
        title: "报名商机"//页面标题为路由参数
      })
    }
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
    this.buiness();
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