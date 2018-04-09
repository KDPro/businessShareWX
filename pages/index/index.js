// pages/login/login.js
const app = getApp();
const $v = app.globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图参数
    imgUrls: [],
    autoplay: true,
    interval: 2000,
    duration: 1000,
    indicatorDots: true,
    // 商机参数
    pageNum:1,
    pageSize:5,
    businessList: []
  },
  //点击查看详情
  details(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../businessDetails/businessDetails?id='+id,
    })
  },
  /**
   * 获取轮播图 request
   */
  carousel() {
    app.res({
      url: "carousel/getOnPic",
      method: "GET",
      data: {},
      callback: (res) => {
        var arr = res.data;
        arr.forEach((e,index)=>{
          arr[index].path = $v.appPath + e.path
        });
        this.setData({
          imgUrls: arr
        })
      }
    })
  },
  /**
   * 获取商机列表
   */
  business(load){
    app.res({
      url:"business/getBusinessList",
      method:"POST",
      data:{
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize,
        orderBy: "attention desc,sign_up desc"
      },
      loading:load,
      callback: (res) => {
        var arr = res.data.list;
        arr.forEach((e,index)=>{
          arr[index].cDate = app.times(e.cDate, "dateTime")
        });
        this.setData({
          businessList: arr
        })
      }
    })
  },
  /**
   * 关注或者报名
   */
  attOrSign(e){
    var ids = e.currentTarget.dataset.id;
    var types = parseInt(e.currentTarget.dataset.type);
    var index = e.currentTarget.dataset.index;
    if(types == 2) {
      if (this.data.businessList[index].signtype != 1) {
        wx.showModal({
          title: '提示',
          content: '确认报名吗?',
          success: (res) => {
            if (res.confirm) {
              app.res({
                url: "business/signOrAttention",
                method: "GET",
                loading: false,
                data: {
                  id: ids,
                  type: types
                },
                callback: (res) => {
                  this.business(false);
                }
              })
            }
          }
        })
      }else {
        wx.showToast({
          title: '你已报名,不要重复报名',
          icon:"none",
          duration:1500
        })
      }
    }else {
      app.res({
        url: "business/signOrAttention",
        method: "GET",
        loading: false,
        data: {
          id: ids,
          type: types
        },
        callback: (res) => {
          this.business(false);
        }
      })
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
    var interval = setInterval(()=>{
      if (wx.getStorageSync("token")) {
        clearInterval(interval);
        this.carousel();
        this.business();
      }
    },1)
    
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