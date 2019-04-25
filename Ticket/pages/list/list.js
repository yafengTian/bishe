const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (event) {
    console.log(event);
    var typeid = event.typeid;
    var that = this;
    wx.request({
      url: app.globalData.urlPath + 'list',
      data: {
        openid: app.globalData.openid,
        flag: typeid//flag=1表示所有订单，flag=2表示未付款订单，flag=3表示待使用订单，flag=4代表已使用订单
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log("list");
        console.log(res.data);
        that.setData({
          orders: res.data
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    //this.getDeviceInfo()
    //this.collectionShow()
  },

  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },

  /**
   * @Explain：选项卡点击切换
   */
  collectionShow: function () {
    this.setData({
      alreadyOrder: [{
        name: "五一长假长城门票",
        state: "交易成功",
        time: "2019-01-30 14:00-16:00",
        status: "未使用",
        url: "../../resources/images/1.jpg",
        money: "132"
      }, {
        name: "端午节鄱阳湖门票",
        state: "交易成功",
        time: "2019-3-12 18:00-20:00",
        status: "未使用",
        url: "../../resources/images/2.jpg",
        money: "205"
      }]
    })
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

  },
  cancle_collect: function (res) {
    console.log(res);
    var td = res.currentTarget.dataset.id;
    wx.request({
      url: app.globalData.urlPath + 'collect',
      data: {
        id: td,
        flag: 2,//flag=1表示收藏，flag=2表示取消收藏,
        openid: app.globalData.openid
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.data) {
          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 3000,
            success: function (res) {
              wx.navigateTo({
                url: '../collection/collection',
              })
            },
          })
        }
        else {
          wx.showToast({
            title: '取消失败',
            icon: 'success',
            duration: 2000,
            success: function (res) {
              wx.navigateTo({
                url: '../collection/collection',
              })
            },
          })
        }
      },
    })
  }
})