// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync('userInfo') || {}
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
  // 获取用户信息
  ongetUserInfo (e) {
    // console.log(e)
    let {userInfo} = e.detail
    // console.log(userInfo)
    // 调用云函数 获取用户openid
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        // console.log(res)
        let {openid} = res.result
        userInfo.openid = openid
        this.setData({
          userInfo
        })
        // 写入本地缓存
        wx.setStorageSync('userInfo', userInfo)
        console.log(this.data.userInfo)
      }
    })
  },
  // 扫码
  scanCode () {
    wx.scanCode({
      success: res => {
        console.log(res.result)
        // 获取图书isbn号，去豆瓣获取详情
        this.addBook(res.result)
      }
    })
  },
  addBook () {
    wx.cloud.callFunction({
      name: 'getDouban',
      data: {isbn},
      success: ({result}) => {
        console.log(result)
      }
    })
  }
})