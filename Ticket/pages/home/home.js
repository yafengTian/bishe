var app = getApp()
Page( {
  data: {
    imgUrls:[
      "../../resources/images/1.jpg",
       '../../resources/images/2.jpg',
      '../../resources/images/3.jpg',
    ],//轮播图的url
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    windowWidth: 320,
    sortPanelTop: '0',
    sortPanelDist: '290',
    sortPanelPos: 'relative',
    noticeIdx: 0,
    notices: [
      {
        "clickUrl": "dbjsbridge://go?module=detail&gid=1032&period=192",
        "goods": "故宫近期即将在夜晚对游客开放",
        "name": "故宫",
        "time": "2分钟前"
      },
      {
        "clickUrl": "dbjsbridge://go?module=detail&gid=1032&period=192",
        "goods": "因为天气原因，长城暂时不对外开放",
        "name": "长城",
        "time": "1天前"
      },
      {
        "clickUrl": "dbjsbridge://go?module=detail&gid=1032&period=192",
        "goods": "国家博物馆免费向游客开发",
        "name": "国家博物馆",
        "time": "2分钟前"
      }
    ],
    "goodsList":[],
    animationNotice: {}
  },
  onReady: function() {

  },
  onLoad: function() {
    console.log("home");
    var me = this;
    var animation = wx.createAnimation( {
      duration: 400,
      timingFunction: 'ease-out',
    });
    me.animation = animation;
    wx.getSystemInfo( {
      success: function( res ) {
        me.setData( { windowWidth: res.windowWidth })
      }
    });
    wx.login({
      success: function(res) {
        wx.request({
          url: 'http://localhost:8080/BiShe/is_login',
          data: {
            'operFlag': "getOpenid",
             code:res.code
          },
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {
            app.globalData.openid = res.data.openid;
          }
        })
      },
    })
    console.log( 'onLoad' );
  },
  startNotice: function() {
    var me = this;
    var notices = me.data.notices || [];
    if( notices.length == 0 ) {
      return;
    }

    var animation = me.animation;
    //animation.translateY( -12 ).opacity( 0 ).step();
    animation.translateY( 0 ).opacity( 1 ).step( { duration: 0 });
    me.setData( { animationNotice: animation.export() });

    var noticeIdx = me.data.noticeIdx + 1;
    if( noticeIdx == notices.length ) {
      noticeIdx = 0;
    }

    // 更换数据
    setTimeout( function() {
      me.setData( {
        noticeIdx: noticeIdx
      });
    }, 400 );

    // 启动下一次动画
    setTimeout( function() {
      me.startNotice();
    }, 5000 );
  },
  onShow: function() {
   this.startNotice();
    //初始化首面，从数据库获取初始数据
    var that = this;
    wx.request({
      url: 'http://localhost:8080/BiShe/image',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
          console.log(res.data);
          that.setData({
            // imgUrls: res.data.ticketImages
            goodsList: res.data,
          })
          console.log(that.data.goodsList);
      },
      fail:function(res){
        wx.showToast({
          title: '网络连接错误',
          icon: 'loading',
          duration: 2000,
        })
      }
    })

  },
  onToTop: function( e ) {
    if( e.detail.scrollTop >= 290 ) {
      this.setData( { sortPanelPos: 'fixed' });
    } else {
      this.setData( { sortPanelPos: 'relative' });
    }
    console.log( e.detail.scrollTop )
  }
})
