const axios = require('axios')
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

async function getDouban (isbn) {
  const url = `https://search.douban.com/book/subject_search?search_text=${isbn}`
  let searchInfo = await axios.get(url)
  console.log(searchInfo.data)
  // 获取window.__DATA__后面的数据 解密
  let reg = /window\.__DATA__ = "(.*)"/
  if(reg.test(searchInfo.data)) {
    console.log(RegExp.$1)
    // let searchData = 
  }
}

console.log(getDouban('9787801093660'))

// 云函数入口函数
exports.main = async (event, context) => {
  const {isbn} = event
  return getDouban(isbn)
  // const wxContext = cloud.getWXContext()

  // return {
  //   // event,
  //   // openid: wxContext.OPENID,
  //   // appid: wxContext.APPID,
  //   // unionid: wxCont、ext.UNIONID,
  // }
}