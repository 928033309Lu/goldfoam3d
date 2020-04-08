import cookies from './util.cookies'
import db from './util.db'
import * as formater from './util.formater'

/**
 * 替换字符串
 * @param {*} source 源字符串
 * @param {*} oldText 待替换字符串
 * @param {*} newText 新字符串，默认为空
 */
const replaceText = function (source, oldText, newText = '') {
  if (!source || !oldText) return source
  while (source.indexOf(oldText) >= 0) {
    source = source.replace(oldText, newText)
  }
  return source
}

const util = {
  cookies,
  db,
  formater,
  replaceText
}

export default util
