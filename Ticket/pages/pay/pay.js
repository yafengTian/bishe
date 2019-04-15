// pages/pay/pay.js
const app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tId: '',
    details: [],
    hiddening:true,
    number:0,
    price:0,
    showPayPwdInput: false,  //是否展示密码输入层
    pwdVal: '',  //输入的密码
    payFocus: true, //文本框焦点
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.tId);
    this.setData({
      tId: options.tId
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var id = this.data.tId;
    var that = this;
    console.log(id);
    wx.request({
      url: 'http://localhost:8080/BiShe/detail',
      data: {
        tId: id
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        that.setData({
          details: res.data
        })
        console.log(that.data.details);
      },
    })
  },

  reduce:function(){
    this.setData({
      number:this.data.number-1,
    })
  },
  add:function(){
    this.setData({
      number: this.data.number +1
    })
  },
  /**
 * 隐藏支付密码输入层
 */
  hidePayLayer: function () {
    var val = this.data.pwdVal;
    var pwd='tyfxxs';
    var that=this;
    this.setData({ showPayPwdInput: false, payFocus: false, pwdVal: '' }, function () {
     if(val==pwd)//用户输入密码正确，即付款成功，然后将付款信息保存在数据库中
     {
       wx.request({//发送网络请求，更新购买信息(用户身份（openid），购买票的数目，票的信息（是哪个景区的门票)）
         url: 'http://localhost:8080/BiShe/pay?openid=' + app.globalData.openid + '&count=' + that.data.number + '&tId=' + that.data.tId,
         method: 'GET',
         dataType: 'json',
         responseType: 'text',
         success:function(res){
            console.log(res);
            if(res.data==true)
            {
              wx.showToast({
                title: '购买成功',
                icon: 'success',
                duration: 2000,
                success: function (res) {
                  wx.navigateTo({
                    url: '../order/order?number=' + that.data.number,
                  })
                }
              })
            }
         }
       })
     }
     else
     {
        wx.showToast({
          title: '密码错误重新输入',
          icon: 'fail',
          duration: 2000,
        })
     }
    });

  },
  /**
   * 显示支付密码输入层
   */
  showInputLayer: function () {
    this.setData({ showPayPwdInput: true, payFocus: true });
  },
  /**
  * 获取焦点
  */
  getFocus: function () {
    this.setData({ payFocus: true });
  },
  /**
   * 输入密码监听
   */
  inputPwd: function (e) {
    this.setData({ pwdVal: e.detail.value });

    if (e.detail.value.length >= 6) {
      this.hidePayLayer();
    }
  }
})
