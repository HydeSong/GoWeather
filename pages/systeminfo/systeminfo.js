Page({
  onGotUserInfo(e) {
    // e.detail 跟 wx.getUserInfo()获取的用户信息是一样的
    // const { encryptedData, iv, rawData, signature, userInfo } = e.detail;
    // console.log(encryptedData);
    // console.log(iv);
    // console.log(rawData);
    // console.log(signature);
    // console.log(userInfo);

    const { encryptedData, iv } = e.detail;
    const data = { encryptedData, iv };

    wx.login({
      timeout: 3000, // timeout 是超时时间，单位是 ms
      success: res => { // wx.login 接口调成功后会执行 success 回调
        // res.code 就是登录的凭证, 需要发送给服务端
        const code = res.code;
        console.log(code)
        console.log(encryptedData)
        console.log(iv)

        wx.request({
          url: `http://127.0.0.1/users/wxLogin`, // 我们的服务端地址
          method: 'POST',
          data: {
            code, encryptedData, iv
          },
          success: res => {
            // res.data 为服务端正确登录后签发的 JWT
            wx.setStorageSync('auth', res.data);
          }
        })
      }
    })
  },
  data: {
    systeminfoObj: {},
    systeminfoArr: [
      {
        key: 'brand',
        name: '手机品牌',
      },
      {
        key: 'model',
        name: '手机型号',
      },
      {
        key: 'pixelRatio',
        name: '设备像素比',
      },
      {
        key: 'screenWidth',
        name: '屏幕宽度',
      },
      {
        key: 'screenHeight',
        name: '屏幕高度',
      },
      {
        key: 'windowWidth',
        name: '可使用窗口宽度',
      },
      {
        key: 'windowHeight',
        name: '可使用窗口高度',
      },
      {
        key: 'statusBarHeight',
        name: '状态栏高度',
      },
      {
        key: 'language',
        name: '微信设置的语言',
      },
      {
        key: 'version',
        name: '微信版本号',
      },
      {
        key: 'system',
        name: '操作系统版本',
      },
      {
        key: 'platform',
        name: '客户端平台',
      },
      {
        key: 'fontSizeSetting',
        name: '用户字体大小设置(px)',
      },
      {
        key: 'SDKVersion',
        name: '客户端基础库版本',
      },
    ],
  },
  onShow () {
    this.setData({
      systeminfoObj: getApp().globalData.systeminfo
    })
  },
})