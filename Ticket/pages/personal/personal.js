// pages/personal/personal.js
const app = getApp();
Page({
  data: {
    //flag:'0',//用户登陆状态
    is_login:''
  },
  onLoad: function (options) {
    console.log(1223112);
    console.log(options);
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
              // 页面显示. 
            if (app.globalData.flag== 0) {
                this.setData({
                  userName: '风一样的男人',
                  userPhone: '13701006491',
                  userHead: '../../resources/images/unlogin.png',
                  operation: '登录',
                  is_login:'未登陆',
                  login:false
                })
              }
              else {
              this.setData({
                  nickName: app.globalData.nickName,
                userPhone: app.globalData.userPhone,
                  userHead: '../../resources/images/tou.png',
                  is_login:'已登陆',
                  operation: '退出',
                  login: true
                })
              }
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  defaultLogin: function (e) {
    let login = e.currentTarget.dataset.login;
    if (login == true) {
      // 点击退出
      app.globalData.flag = 0;
      wx.showToast({
        title: '退出',
        icon:'loading',
        duration:2000
      })
      wx.switchTab({
        url: '../home/home'
      })
    } else {
      // 点击登录
      wx.navigateTo({
        url: '../login/login'
      })
    }
  },
  listFirst: function () {
    // 我的预订
    if (this.data.login) {
      wx.switchTab({
        url: '../orders/orders'
      })
    } else {
      wx.showToast({
        title: '请登录',
        icon: 'loading',
        duration: 800
      })
    }
  },
  getScanning: function () {
    app.getScanning()
  },
  set_is_login:function(that){
      this.dataset({
        is_login:false
      })
  }
})