//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isLike: true,
    details: [],
    addcar: true,
    tabCurrent: 0,
    chooseType: 0,
    chooseType1: 0,
    fonts:'',
    imgUrls: [
      "../../resources/images/1.jpg",
      "../../resources/images/2.jpg",
      "../../resources/images/1.jpg",
      "../../resources/images/3.jpg",
      "../../resources/images/4.jpg"
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
  },
  select_this: function (e) {
    var current = e.currentTarget.dataset.current;
    this.setData({
      tabCurrent: current
    })
  },
  goBuy: function () {
   
  },
  close: function () {   
  },
  //生命周期函数
  onLoad: function (event) {
    this.setData({
      ticketId: event.ticket_id
    })
  },
  onShow: function (event) {
    var td = this.data.ticketId;
    var that = this;
    console.log(td);
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000,
    }),
      wx.request({
        url: app.globalData.urlPath + 'detail',
        data: {
          tId: td
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res);
          that.setData({
            details: res.data
          })
          console.log(res.data);
        },
      })
  },
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  // 收藏
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
    if (!this.data.isLike) {
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 2000
      })
    }
    else {
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        duration: 2000
      })
    }
  },
  // 跳到购物车
  addcar() {
    this.setData({
      addcar: !this.data.addcar
    });
    if (!this.data.addcar) {
      wx.showToast({
        title: '加入购物车成功',
        icon: 'success',
        duration: 2000
      })
    }
    else {
      wx.showToast({
        title: '取消加入购物车',
        icon: 'success',
        duration: 2000
      })
    }
  },
  // 立即购买
  immeBuy() {
    if (app.globalData.flag == 1)//已经登陆，可以下单
    {
      var tId = this.data.ticketId;
      wx.showModal({
        title: '确定去下单？',
        content: '',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '',
        confirmText: '确认',
        confirmColor: 'green',
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../pay/pay?tId=' + tId,
            })
          }
        },
      })
    }
    else//未登录必须先登陆
    {
      wx.showModal({
        title: '请先授权登陆',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        success: function (res) {
          if (res.confirm == true) {
            wx.navigateTo({
              url: '../authorize/authorize'
            })
          }
          else {
            //用户按了拒绝按钮
            wx.showModal({
              title: '未授权登陆，请先授权',
              content: '您拒绝授权，将不能使用小程序',
              confirmText: '确定',
              cancelText: '取消',
              success: function (res) {
                if (res.confirm) {//确定授权
                  wx.navigateTo({
                    url: '../authorize/authorize'
                  })
                } else if (res.cancel) {//拒绝授权
                  wx.navigateTo({
                    url: '../home/home'
                  })
                }
              }
            })
          }
        },
      })
    }
  }

})
