const app=getApp();
Page({
  data: {
    isLike: true,
    details:[],
    // banner
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

    // 商品详情介绍
    detailImg: [
      "../../resources/images/1.jpg",
      "../../resources/images/2.jpg",
      "../../resources/images/3.jpg",
      "../../resources/images/4.jpg",
      "../../resources/images/2.jpg",
      "../../resources/images/4.jpg",
    ],
  },
  //生命周期函数
  onLoad:function(event){
  this.setData({
    ticketId: event.ticket_id
  })
  },
  onShow:function(event){
    var td = this.data.ticketId;
    var that = this;
    console.log(td);
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000,
    }),
      wx.request({
        url: 'http://localhost:8080/BiShe/detail',
        data: {
          tId: td
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res);
          that.setData({
            details:res.data
          })
          console.log(that.data.details);
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
  toCar() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  // 立即购买
  immeBuy() {
    if(app.globalData.flag==1)
    {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 4000
    });
    }
    else
    {
      wx.showToast({
        title: '请先登陆',
        icon: 'success',
        duration: 3000,
        success: function (res) {
          wx.navigateTo({
            url: '../login/login',
          })
         },
      });
    }
  }
})