/**
 * 作者：sdumpling
 * 来源：CSDN
 * 原文：https://blog.csdn.net/lettangyuanfly/article/details/80714737
 */

export default class SwipeListener {
  /*初始化回调函数*/
  constructor(callbackUp, callbackDown, callbackLeft, callbackRight, callbackTouch) {
    this.callbackUp = callbackUp
    this.callbackDown = callbackDown
    this.callbackLeft = callbackLeft
    this.callbackRight = callbackRight
    this.callbackTouch = callbackTouch
  }

  start() {
    let t = this;
    /*获取起始坐标和id*/
    wx.onTouchStart(function (e) {
      t.x0 = e.changedTouches[0].clientX
      t.y0 = e.changedTouches[0].clientY
      t.startId = e.changedTouches[0].identifier
    })
    /*监听移动*/
    wx.onTouchMove(function (e) {
      t.xt = e.changedTouches[0].clientX
      t.yt = e.changedTouches[0].clientY
      t.endId = e.changedTouches[0].identifier
      /*判断并回调*/
      // t._call()
    })
    /*获取结束坐标和id*/
    wx.onTouchEnd(function (e) {
      t.xt = e.changedTouches[0].clientX
      t.yt = e.changedTouches[0].clientY
      t.endId = e.changedTouches[0].identifier
      /*判断并回调*/
      t._call()
    })
  }

  stop() {
    wx.offTouchStart()
    wx.offTouchMove()
    wx.offTouchEnd()
  }

  _call() {
    /* 判断是否为同一次触摸，若不是则直接忽略*/
    if (this.endId === this.startId) {
      let w = this.xt - this.x0
      let h = this.yt - this.y0
      let k = h / w
      /*不使用1判断斜率，而留有余量，防止误触*/
      if (k > 2 || k < -2) {
        /*滑动20px以上激活，防止误触*/
        if (h < -20) this.callbackUp() /*向上*/
        if (h > 20) this.callbackDown() /*向下*/
      } else if (k < 0.5 && k > -0.5) {
        if (w < -20) this.callbackLeft() /*向左*/
        if (w > 20) this.callbackRight() /*向右*/
      } else {
        this.callbackTouch() /*touch*/
      }
    }
  }
}
