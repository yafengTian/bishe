// pages/order/order.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    inside:[],
    outside:[],
    swipertab: [{
      name: '国内游',
      index: 0
    }, {
      name: '国外游',
      index: 1
    }],
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
    // 页面渲染完成
    this.getDeviceInfo()
    this.orderShow()
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
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
  },

  tabChange: function (e) {
    this.setData({
      currtab: e.detail.current
    })
    this.orderShow()
  },

  orderShow: function () {
    let that = this
    switch (this.data.currtab) {
      case 0:
        that.inside()
        break
      case 1:
        that.outside()
        break
    }
  },
  //国内景区
  inside: function () {
    var value;
    var that = this;
    wx.getStorage({
      key: 'inside_catagory',
      success: function(res) {
        that.setData({
          value:res.data
        })
      },
    })
    if(this.value==null)
    {
      wx.request({
        url: app.globalData.urlPath + 'catagory',
        data: {
          catagory: 1
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res);
          that.setData({
            inside: res.data
          });
          wx.setStorage({
            key: 'inside_catagory',
            data: res.data
          })
        },
      })
    }
    else
    {
      that.setData({
        inside:value
      })
    }

  },
//国外景区
  outside: function () {
    var value;
    var that = this;
    wx.getStorage({//获取本地缓存
      key: 'outside_catagory',
      success: function (res) {
        that.setData({
          value: res.data
        })
      },
    })
    if (this.value == null) {//缓存区为空，则应该向服务端发送请求，获取数据，然后再缓存
      wx.request({
        url: app.globalData.urlPath + 'catagory',
        data: {
          catagory: 2
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res);
          that.setData({
            outside: res.data
          });
          wx.setStorage({
            key: 'outside_catagory',
            data: res.data
          })
        },
      })
    }
    else {
      that.setData({
        inside: value
      })
    }
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