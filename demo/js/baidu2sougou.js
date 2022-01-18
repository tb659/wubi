/*
 * @Author: tb659
 * @Date: 2022-01-18 10:22:21
 * @LastEditors: tb659
 * @LastEditTime: 2022-01-18 17:21:18
 * @Description: 百度手打输入法词库转搜狗
 * @FilePath: \五笔打字\demo\js\baidu2sougou.js
 */

const source = ['苍蝇(cang|ying) 55000']
let data = ''
source.forEach(item => {
	item = item.slice(0, item.indexOf(')')).split('(')
	item[1] = "'" + item[1].split('|').join("'")
	item = item[1] + ' ' + item[0] + '\n'
	data += item
})
console.log(data)
