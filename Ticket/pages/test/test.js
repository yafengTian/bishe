// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs:[]
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
    //初始化首面，从数据库获取初始数据
      var that = this;
      wx.request({
        url: 'http://localhost:8080/BiShe/image',
        data: '',
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res.data);
          that.setData({
            imgs: res.data.ticketImages
          })
          console.log(that.data.imgs);
        },
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