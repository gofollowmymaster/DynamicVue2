import CryptoJS from 'crypto-js'
const secretKey = 'cqysxx@123456789'
/**
 * AES加密方法
 * @param content 要加密的字符串
 * @returns {string} 加密结果
 */
export const aesEncrypt = (content) => {
  const key = CryptoJS.enc.Utf8.parse(secretKey)
  const srcs = CryptoJS.enc.Utf8.parse(content)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
