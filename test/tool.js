// 设置储存token
const setTokenStorage = (token) => {
  uni.setStorageSync('am_token', token)
}

// 获取token
const getTokenStorage = () => {
  let token = ''
  try {
    token = uni.getStorageSync('am_token')
  } catch (e) {
  }
  return token
}

// 重新整理一下config
const configHandle = (config) => {
  config.header = {
    ...config.header,
    token: getTokenStorage() // token 特殊处理，主要是header有可能使用的是局部配置
  }
  return config
}
// 设置储存isNew
const setIsNewStorage = (isNew) => {
  uni.setStorageSync('isNew', isNew)
}

// 获取isNew
const getIsNewStorage = () => {
  let isNew = ''
  try {
    isNew = uni.getStorageSync('isNew')
  } catch (e) {
  }
  return isNew
}

// 设置储存电话
const setPhoneStorage = (phone) => {
  uni.setStorageSync('phone', phone)
}

// 获取phone
const getPhoneIsNewStorage = () => {
  let phone = ''
  try {
    phone = uni.getStorageSync('phone')
  } catch (e) {
  }
  return phone
}
// 设置openid
const setOpenIdStorage = (openid) => {
  uni.setStorageSync('openid', openid)
}

// 获取openid
const getOpenIdStorage = () => {
  let openid = ''
  try {
    openid = uni.getStorageSync('openid')
  } catch (e) {
  }
  return openid
}
export {
  setTokenStorage,
  getTokenStorage,
  configHandle,
  setIsNewStorage,
  getIsNewStorage,
  setPhoneStorage,
  getPhoneIsNewStorage,
  setOpenIdStorage,
  getOpenIdStorage
}
