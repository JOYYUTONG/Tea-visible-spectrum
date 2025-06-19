// pages/recording/start/index.js
Page({

  data: {
    startCountDown: 3,
    recordSecond: 0,
    recordCountDown: '',
    backgroundColor: '#fff'
  },


  async onLoad(options) {
    this.ctx = wx.createCameraContext()
    const backgroundList = JSON.parse(options.backgroundList);
    this.setData({
      recordSecond: options.recordSecond,
    })
    await this.handleStartCountDown()
    this.handleStartRecord();
    await this.handleBackground(backgroundList, this.data.recordSecond)
    wx.showToast({ title: 'finish', icon: 'success', duration: 1000 });
    this.handleStopRecord();
  },
  handleStartRecord() {
    this.ctx.startRecord({
      success: (res) => {
        console.log('startRecord')
      }
    })
  },
  handleStopRecord() {
    this.ctx.stopRecord({
      success: (res) => {
        this.handleSaveVideo(res.tempVideoPath)
      }
    })
  },
  handleSaveVideo(tempFilePath) {
    wx.showLoading({ title: 'save' })
    wx.saveVideoToPhotosAlbum({
      filePath: tempFilePath,
      success: function (res) {
        wx.hideLoading()
        wx.showToast({
          title: 'save',
          icon: 'success',
          duration: 2000
        });
        wx.navigateBack();
      },
      fail: function (error) {
        wx.hideLoading()
        wx.showToast({
          title: 'error',
          icon: 'error',
          duration: 2000
        });
        wx.navigateBack();
      }
    })
  },
  async handleBackground(backgroundList, second) {
    const duration = second / backgroundList.length;

    let index = 0;
    let timer = setInterval(() => {
      ++index;
      this.setData({
        recordCountDown: `${(second - index)}s`
      })
      if (second == index) {
        clearInterval(timer)
      }
    }, 1000);

    for (let i = 0; i < backgroundList.length; i++) {
      wx.setNavigationBarColor({
        backgroundColor: backgroundList[i]
      })
      this.setData({
        backgroundColor: backgroundList[i]
      })
      await this.handleWait((duration * 1000))
    }
    this.setData({
      backgroundColor: '#fff',
      recordCountDown: ''
    })
  },
  async handleStartCountDown() {
    for (let i = 0; i < 3; i++) {
      this.setData({
        startCountDown: 3 - i
      })
      await this.handleWait(1000)
    }
    this.setData({
      startCountDown: 0
    })
  },
  async handleWait(second) {
    return await new Promise(resolve => {
      setTimeout(resolve, second);
    });
  },
  handleCameraError(e) {
    console.log(e);
  },
})