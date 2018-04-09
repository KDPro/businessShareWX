// pages/mineBusiness/mineBusiness.js
const app = getApp();
const $v = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum:1,
    businessList: []
  },
  // 点击去修改
  toEdit(e) {
    var id = e.currentTarget.dataset.id;
    $v.cId = id;
    wx.switchTab({
      url: '../send/send',
    })
  },
  //点击查看详情
  details(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../businessDetails/businessDetails?id=' + id+"&&isMy=true",
    })
  },
  // 当滚动到底部时触发事件
  scrolltolower:function(){
    this.setData({
      pageNum:this.data.pageNum+1
    });
  },
  /**
   * 获取我的商机列表
   */
  buiness:function(){
    app.res({
      url:"business/getMyBusinessList",
      method:"GET",
      data:{},
      callback:(res)=>{
        var arr = res.data;
        arr.forEach((e, index) => {
          arr[index].cDate = app.times(e.cDate, "dateTime");
          arr[index].isStatusName = this.transStatus(e.isStatus);
        });
        this.setData({
          businessList: arr
        })
      }
    })
  },
  /**
     * 转换状态
     */
  transStatus(val) {
    switch (val) {
      case 0:
        return "待审核";
        break;
      case 1:
        return "已通过";
        break;
      case 2:
        return "未通过";
        break;
      case 3:
        return "已完成";
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