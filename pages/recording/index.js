// pages/recording/index.js
Page({


  data: {
    RecordingTime: 10,
    ChooseColorMode: 'custom',
    ColorRange: [0, 20],
    Colors: ['#ff0000', '#ff0d00', '#ff1a00', '#ff2600', '#ff3300', '#ff4000', '#ff4d00', '#ff5900', '#ff6600', '#ff7300', '#ff8000', '#ff8c00', '#ff9900', '#ffa600', '#ffb200', '#ffbf00', '#ffcc00', '#ffd900', '#ffe500', '#fff200', '#ffff00', '#f2ff00', '#e5ff00', '#d9ff00', '#ccff00', '#bfff00', '#b2ff00', '#a6ff00', '#99ff00', '#8cff00', '#80ff00', '#73ff00', '#66ff00', '#59ff00', '#4dff00', '#40ff00', '#33ff00', '#26ff00', '#1aff00', '#0dff00', '#00ff00', '#00f20c', '#00e51a', '#00d926', '#00cc33', '#00bf40', '#00b24d', '#00a659', '#009966', '#008c73', '#008080', '#00738c', '#006699', '#0059a6', '#004db2', '#0040bf', '#0033cc', '#0026d9', '#001ae5', '#000ded', '#0000ff', '#0d00ff', '#1a00ff', '#2600ff', '#3300ff', '#4000ff', '#4d00ff', '#5900ff', '#6600ff', '#7300ff', '#8000ff', '#8c00ff', '#9900ff', '#a600ff', '#b200ff', '#bf00ff', '#cc00ff', '#d900ff', '#e500ff', '#f200ff', '#ff00ff', '#ff00f2', '#ff00e5', '#ff00d9', '#ff00cc', '#ff00bf', '#ff00b2', '#ff00a6', '#ff0099', '#ff008c', '#ff0080', '#ff0073', '#ff0066', '#ff0059', '#ff004d', '#ff0040', '#ff0033', '#ff0026', '#ff001a', '#ff000d'],
    CustomColors: []
  },


  onLoad() {
    const customColors = this.data.Colors.map(x => {
      return { color: x, active: false }
    })

    this.setData({
      CustomColors: customColors
    })
  },

  handleRecordingTimeChange(e) {
    this.setData({
      RecordingTime: e.detail.value
    })
  },
  handleChooseColorModeChange(e) {
    this.setData({
      ChooseColorMode: e.detail.value
    })
  },
  handleColorItemTap(e) {
    const index = parseInt(e.currentTarget.dataset.index)
    const customColors = this.data.CustomColors
    customColors[index].active = !customColors[index].active
    this.setData({
      CustomColors: customColors
    })
  },
  handleColorRangeChange(e) {
    let ColorRange = e.detail.value
    if (ColorRange[1] === 0) {
      ColorRange[1] = 1
    }
    this.setData({
      ColorRange: ColorRange
    })
  },
  handleStart() {
    let colors = []

    if (this.data.ChooseColorMode === 'custom') {
      colors = this.data.CustomColors.filter(x => x.active).map(x => {
        return x.color
      })
    }
    else {
      const ColorRange = this.data.ColorRange
      for (let i = ColorRange[0]; i < ColorRange[1]; i++) {
        colors.push(this.data.Colors[i])
      }
    }

    if (colors.length === 0) {
      wx.showToast({
        title: 'Please select a color.',
        icon: 'error',
        duration: 2000
      })
      return
    }

    wx.navigateTo({
      url: `./start/index?recordSecond=${this.data.RecordingTime}&backgroundList=${JSON.stringify(colors)}`
    })
  },
})