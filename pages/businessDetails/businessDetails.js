// pages/businessDetails/businessDetails.js
const app = getApp();
const $v = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryId: "1",
    isMy: '',
    drawImg: false,
    drawImg2: false,
    bD: {},
    canvasImg: "",
    inputList: {
      textContent: "",     //text 值
      name: "姓名",              //label 的名字 最多4个字
      placeholder: "请输入姓名",  //placeholder的值
      phone: "电话",              //label 的名字
      placeholder1: "请输入联系方式",  //placeholder的值
      company: "公司",              //label 的名字
      placeholder2: "请输入所在公司",  //placeholder的值
    },
    modalShow: false,
  },
  // 获取详情信息
  getBusinessDetail(load) {
    app.res({
      url: "business/getBusinessById",
      method: "GET",
      data: {
        id: this.data.queryId
      },
      loading: load,
      callback: (res) => {
        var data = res.data;
        data.cDate = app.times(data.cDate, "date");
        this.setData({
          bD: data
        });
      }
    })
  },
  /**
 * 关注或者报名
 */
  attOrSign(e) {
    var ids = e.currentTarget.dataset.id;
    var types = parseInt(e.currentTarget.dataset.type);
    var index = e.currentTarget.dataset.index;
    if (types == 2) {
      if (this.data.bD.signtype != 1) {
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
                  this.getBusinessDetail(false);
                }
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '你已报名,不要重复报名',
          icon: "none",
          duration: 1500
        })
      }
    } else {
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
  //点击分享
  share() {
    wx.showToast({
      icon: 'loading',
      title: '图片生成中',
    });
    this.setData({
      drawImg: true
    });
    this.drawBefore();
  },
  //点击分享给好友
  onShareAppMessage: function () {
    console.log(11);

    return {

      title: '商机分享',

      desc: '自定义分享描述',

      path: '/page/user?id=123'

    }

  },
  // 点击去修改
  toEdit(e) {
    var id = e.currentTarget.dataset.id;
    $v.cId = id;
    wx.switchTab({
      url: '../send/send',
    })
  },
  //点击报名
  signUp() {
    this.setData({
      modalShow: true
    })
  },
  //点击报名弹框的确定按钮
  myeventBox(val) {
    console.log(val)
    wx.showToast({
      icon: 'loading',
      title: '此功能正在开发',
      duration: 2000
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var queryId = options.id;
    this.setData({
      // queryId:queryId,
      isMy: options.isMy
    });
    wx.getSystemInfo({
      success: (res) => {
        // console.log(res.windowWidth)  屏幕宽度
        this.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  saveImg() {
    wx.showModal({
      title: '提示',
      content: '保存图片到本地？',
      confirmText: "保存",
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '',
          });
          wx.saveImageToPhotosAlbum({
            filePath: this.data.canvasImg,
            success: (res) => {
              wx.hideLoading();
              this.setData({
                // canvasImg:"",
                drawImg2: true,
                drawImg: false
              });
              wx.showToast({
                title: '图片保存成功',
                duration: 1500
              })
            },
            fail(res) {
              wx.showToast({
                title: '图片保存失败',
                duration: 1500
              })
            },
            complete(res) {
              console.log(res)
            }
          })
        } else if (res.cancel) {
          this.setData({
            // canvasImg:"",
            drawImg2: true,
            drawImg: false
          });
          wx.showToast({
            title: '取消保存',
            duration: 1500
          })
        }
      }
    })
  },
  cancel(){
    console.log(111111111);
    this.setData({
      // canvasImg:"",
      drawImg2: true,
      drawImg: false
    });

  },
  // 绘制之前准备工作
  drawBefore() {
    if (this.data.drawImg2) {
      wx.hideLoading();
      this.setData({
        drawImg: true,
      })
      return;
    }
    var pages = getCurrentPages()    //获取加载的页面

    var currentPage = pages[pages.length - 1]    //获取当前页面的对象

    var url = currentPage.route;

    var options = currentPage.options

    var urls = url + "?" + "id=" + this.data.queryId;
    //缓存canvas绘制小程序二维码
    wx.downloadFile({
      url: app.globalData.appPath + "business/getminiqrQr?path=" + urls,
      success: (res2) => {
        console.log('二维码：' + res2.tempFilePath)
        //缓存二维码
        this.setData({
          qrcode_temp: res2.tempFilePath
        })
        console.log('开始绘制图片');
        this.drawImage();
      }
    })
  },
  // 绘制图片
  drawImage() {
    //绘制canvas图片
    var that = this
    var ctx = wx.createCanvasContext('myCanvas');

    var bgPath = '../../images/mine_bg.png';
    var qrPath = that.data.qrcode_temp;

    var windowWidth = that.data.windowWidth;
    var windowHeight = that.data.windowHeight;

    // 绘制背景颜色
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, windowWidth, windowHeight);
    //绘制背景图片
    ctx.drawImage(bgPath, 0, 0, windowWidth, 70);
    //绘制标题
    ctx.setFillStyle('#ffffff')
    ctx.setFontSize("14")
    var lw1 = 20 * this.data.bD.title.length;
    ctx.fillText(this.data.bD.title, windowWidth / 2 - lw1 / 2, 40);
    //绘制名字
    ctx.setFillStyle('#333333');
    ctx.setFontSize("14");
    ctx.fillText('简介：', 30, 100);
    //绘制内容

    this.drawText({
      c: ctx,
      t: this.data.bD.des,
      co: "#333333",
      fo: "14",
      w: windowWidth,
      x: 30,
      y: 130
    })
    //绘制二维码
    ctx.drawImage(qrPath, 30, windowHeight - 0.36 * windowWidth - 60, 0.36 * windowWidth, 0.36 * windowWidth);

    //绘制提示文字
    this.drawText({
      c: ctx,
      t: "长按保存图片",
      co: "#0085e2",
      fo: "14 ",
      w: windowWidth,
      x: windowWidth - 0.36 * windowWidth - 60,
      y: windowHeight - 0.18 * windowWidth - 60
    })
    this.drawText({
      c: ctx,
      t: "识别二维码",
      co: "#0085e2",
      fo: "14",
      w: windowWidth,
      x: windowWidth - 0.36 * windowWidth - 60,
      y: windowHeight - 0.18 * windowWidth - 30
    })
    ctx.draw("", () => {
      console.log(222);
      this.canvasToImage(ctx);
    });
  },
  drawText({ c, t, co, fo, w, x, y }) {
    var chr = t.split("");
    var temp = "";
    var row = [];
    c.setFillStyle(co);
    c.setFontSize(fo);
    for (var a = 0; a < chr.length; a++) {
      var ml = c.measureText(temp);
      if (ml.width < w - 85) {


      } else {
        row.push(temp);
        temp = "";
      }
      temp += chr[a];
    }
    row.push(temp);
    for (var b = 0; b < row.length; b++) {
      c.fillText(row[b], x, y + (b) * 20);
    }
  },
  canvasToImage(ctx) {
    var that = this
    wx.canvasToTempFilePath({
      destWidth: 20 * that.data.windowWidth,
      destHeight: 20 * that.data.windowHeight,
      canvasId: 'myCanvas',
      quality: 1,
      fileType: 'jpg',
      success: function (res) {
        console.log("成功" + res.tempFilePath);
        that.setData({
          canvasImg: res.tempFilePath
        });
        wx.hideLoading();
      },
      fail: function (err) {
        console.log('失败')
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var interval = setInterval(() => {
      if (wx.getStorageSync("token")) {
        clearInterval(interval);
        this.getBusinessDetail();
      }
    }, 1)
    
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