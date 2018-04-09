// pages/send/send.js
const app = getApp();
const $v = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    content:"",
    cId:"",
    id:""
  },
  //点击我的商机按钮
  myBusiness(){
    wx.navigateTo({
      url: '/pages/mineBusiness/mineBusiness',
    })
  },
  // 标题input
  titleF(e){
    this.setData({
      title: e.detail.value
    })
  },
  // 内容textarea
  contentF(e){
    this.setData({
      content: e.detail.value
    })
  },
  /**
   * 发布商机
   */
  sendBusiness(){
    if(this.data.title == "" || this.data.des == ""){
      wx.showToast({
        title: '请填写完整信息',
        icon:"none",
        duration:1500
      });
      return ;
    }
    app.res({ 
      url:"business/addBusiness",
      method:"POST",
      data:{
        title:this.data.title,
        des:this.data.content
      },
      callback:(res)=>{
        wx.showModal({
          title: '提示',
          content: '添加成功',
          cancelText:'继续发布',
          confirmText:"去大厅",
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../business/business',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },
  /**
   * 修改商机发布
   */
  editBusiness(e){
    var id = e.currentTarget.dataset.id;
    if (this.data.title == "" || this.data.des == "") {
      wx.showToast({
        title: '请填写完整信息',
        icon: "none",
        duration: 1500
      });
      return;
    }
    app.res({
      url: "business/updateBusiness",
      method: "POST",
      data: {
        id: id,
        title: this.data.title,
        des: this.data.content
      },
      callback: (res) => {
        wx.showModal({
          title: '提示',
          content: '修改成功',
          cancelText: '继续修改',
          confirmText: "去大厅",
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../business/business',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },
  // 获取详情信息
  getBusinessDetail() {
    if (this.data.cId=="") {
      this.setData({
        title:"",
        content:"",
        id:""
      })
      return ;
    }
    app.res({
      url: "business/getBusinessById",
      method: "GET",
      data: {
        id: this.data.cId
      },
      callback: (res) => {
        this.setData({
          title:res.data.title,
          content:res.data.des,
          id:res.data.id
        })
        // var data = res.data;
        // data.cDate = app.times(data.cDate, "date");
        // this.setData({
        //   bD: data
        // })
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
    this.setData({
      cId: $v.cId
    });
    $v.cId = "";
    this.getBusinessDetail();
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