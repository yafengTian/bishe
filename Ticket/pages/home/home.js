var app = getApp()
Page( {
  data: {
    imgUrls: [
      { url: '../../resources/images/1.jpg' },
      { url: '../../resources/images/2.jpg' },
      { url: '../../resources/images/3.jpg' },
      { url: '../../resources/images/4.jpg' }
    ],
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
    "goodsList": [
      {
        "goods": {
          "buyUnit": 10,
          "desc": "唯一的不同，是处处不同",
          "id": 1093,
          "imgUrl": "../../resources/images/1.jpg",
          "name": "云南大理三日游3666元，包吃住",
          "tag": "ten"
        },
        "period": 211116272,
        "takeRate":0.01,
        "takeChances": 70,
        "totalChances": 8090
      },
      {
        "goods": {
          "buyUnit": 1,
          "desc": "颜色随机",
          "id": 348,
          "imgUrl": "../../resources/images/2.jpg",
          "name": "Apple Watch Sport 38毫米 铝金属表壳 运动表带",
          "tag": ""
        },
        "period": 211116207,
        "takeRate":0.19,
        "takeChances": 632,
        "totalChances": 3288
      },
      {
        "goods": {
          "buyUnit": 1,
          "desc": "配备 Retina 显示器",
          "id": 510,
          "imgUrl": "../../resources/images/3.jpg",
          "name": "Apple MacBook Pro 15.4英寸笔记本",
          "tag": ""
        },
        "period": 211116244,
        "takeRate":0.26,
        "takeChances": 3760,
        "totalChances": 14288
      },
      {
        "goods": {
          "buyUnit": 10,
          "desc": "超长续航 智能防盗",
          "id": 1168,
          "imgUrl": "../../resources/images/4.jpg",
          "name": "【预售】小牛电动N1电动踏板车 动力版 约11月20日发货",
          "tag": "ten"
        },
        "period": 211116256,
        "takeRate":0.05,
        "takeChances": 300,
        "totalChances": 5990
      },
      {
        "goods": {
          "buyUnit": 1,
          "desc": "因工艺原因重量略有浮动",
          "id": 979,
          "imgUrl": "../../resources/images/1.jpg",
          "name": "周生生 黄金 足金旋转木马吊坠",
          "tag": ""
        },
        "period": 211116138,
        "takeRate":0.17,
        "takeChances": 514,
        "totalChances": 2999
      },
      {
        "goods": {
          "buyUnit": 10,
          "desc": "颜色随机 支持专柜验货",
          "id": 673,
          "imgUrl": "../../resources/images/2.jpg",
          "name": "Coach 蔻驰 抛光粒面皮革铆钉COACH CENTRAL手提包",
          "tag": "ten"
        },
        "period": 211115685,
        "takeRate":0.13,
        "takeChances": 630,
        "totalChances": 4950
      },
      {
        "goods": {
          "buyUnit": 10,
          "desc": "颜色随机 美式奢侈生活风格的代表",
          "id": 943,
          "imgUrl": "../../resources/images/3.jpg",
          "name": "MICHAEL KORS 迈克高仕 十字纹皮革钱包",
          "tag": "ten"
        },
        "period": 211114592,
        "takeRate":0.45,
        "takeChances": 680,
        "totalChances": 1500
      },
      {
        "goods": {
          "buyUnit": 1,
          "desc": "吴晓波酿吴酒 一半清醒一半醉",
          "id": 1095,
          "imgUrl": "../../resources/images/4.jpg",
          "name": "【预售】吴酒 2016年贺年年酒 圣诞节开始派送",
          "tag": ""
        },
        "period": 211116226,
        "takeRate":0.04,
        "takeChances": 7,
        "totalChances": 199
      },
      {
        "goods": {
          "buyUnit": 10,
          "desc": "珍贵绝伦",
          "id": 140,
          "imgUrl": "../../resources/images/1.jpg",
          "name": "中国黄金 AU9999万足金50g薄片",
          "tag": "ten"
        },
        "period": 211116228,
        "takeRate":0.95,
        "takeChances": 14200,
        "totalChances": 14990
      }, {
      "goods": {
        "buyUnit": 10,
        "desc": "唯一的不同，是处处不同",
        "id": 1093,
        "imgUrl": "../../resources/images/2.jpg",
        "name": "【预售】Apple iPhone6s Plus 128G 颜色随机",
        "tag": "ten"
      },
      "period": 211116272,
      "takeRate":0.01,
      "takeChances": 70,
      "totalChances": 8090,
      flag:''//用户登陆标志
    }
    ],
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

  },
  onToTop: function( e ) {
    if( e.detail.scrollTop >= 290 ) {
      this.setData( { sortPanelPos: 'fixed' });
    } else {
      this.setData( { sortPanelPos: 'relative' });
    }
    console.log( e.detail.scrollTop )
  },
  getdetail:function(){
      wx.navigateTo({
        url: '../detail/detail'
      })
    
  
  }
})
