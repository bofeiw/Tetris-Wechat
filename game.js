import './js/libs/weapp-adapter'
import start from './js/main'

wx.setKeepScreenOn({
  keepScreenOn: true
})

new start().start()
