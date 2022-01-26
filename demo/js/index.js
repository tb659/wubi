dataKey.forEach(function (item, index) {
	$('#'.concat(dataKey[index])).text(dataValue[index])
})

var autoRun = null
var time = 0
var numAll = 0
var numError = 0
var scrollHeight = 160
var numInput = 0
var run = false

var txtInput = getObj('txtInput')
var divText = getObj('divText')

txtInput.value = ''
txtInput.disabled = false
txtInput.style.height = Math.max(500, divText.offsetHeight) + 'px'
txtInput.focus()

getObj('spanError').innerHTML = '0'
getObj('spanTime').innerHTML = '0'
getObj('spanRate').innerHTML = '0'
getObj('spanSpeed').innerHTML = '0'
getObj('spanNum').innerHTML = '0'

clearText()
selectText()

function changeText() {
	clearText()
	if (!run) {
		autoRun = setInterval(timer, 1000)
		run = true
	}

	var txt = getObj('txtInput').value
	txt = txt.replace(/rn/g, 'n')
	var divTxt = getObj('divText').innerHTML
	divTxt = divTxt.replace(/  /g, ' ')
	divTxt = divTxt.replace(/   /g, ' ')
	divTxt = divTxt.replace(/r/g, '')
	divTxt = divTxt.replace(/n/g, '')
	divTxt = divTxt.replace(/&nbsp;/g, ' ')
	divTxt = divTxt.replace(/<BR>/g, 'n')
	divTxt = divTxt.replace(/<br>/g, 'n')

	var len = txt.length
	if (len % scrollHeight === 0 && len !== divMain.scrollTop && len !== 0) {
		divMain.scrollTop += scrollHeight
	}

	if (txt.trim().length === divTxt.length && run) {
		clearInterval(autoRun)
		run = false
	}
	if (!txt.length) {
		clearText()
		clearInterval(autoRun)
		getObj('spanTime').innerHTML = '0'
		run = false
		time = 0
	} else {
		run = true
	}

	var top = 18
	var left = 0
	var error = 0
	var lost = 0
	for (var i = 0; i < divTxt.length; i++) {
		if (i >= txt.length + lost) {
			break
		}

		var color = '#9DFFB9'
		if (txt.charAt(i - lost) != divTxt.charAt(i)) {
			error++
			color = 'red'
		}

		if (divTxt.charAt(i) == 'n' || divTxt.charAt(i) == 'r') {
			if (divTxt.charAt(i) == 'n') {
				top += 60
				left = 0
			}
			continue
		}

		var charWidth = divTxt.charCodeAt(i) > 255 ? 24 : 13
		var span = document.createElement('span')
		span.style.position = 'absolute'
		span.style.width = charWidth + 'px'
		span.style.height = '24px'
		span.style.top = top + 'px'
		span.style.left = left + 'px'
		span.style.zIndex = 1
		span.style.backgroundColor = color
		divMain.appendChild(span)

		left += charWidth
		if (left > 974 - charWidth) {
			top += 60
			left = 0
			if (divTxt.charAt(i + 1) == ' ' || divTxt.charAt(i + 1) == 'n') {
				i++
				lost++
			}
		}
	}
	getObj('spanError').innerHTML = error
	getObj('spanNum').innerHTML = txt.length
	getObj('spanRate').innerHTML = txt.length ? Math.round(100 - (error / txt.length) * 100) + '%' : '0'
	getObj('spanSpeed').innerHTML =  time ? Math.round((txt.length / time) * 60) : 0 + '字/分'
}

function selectText() {
	var selText = getObj('selText')
	var txtInput = getObj('txtInput')
	var txt = getObj(selText.value).value
	txt = txt.replace(/r/g, '')
	txt = txt.replace(/n/g, '')
	var divText = getObj('divText')
	txt = txt.replace(/  /g, ' ')
	txt = txt.replace(/   /g, ' ')
	divText.innerHTML = txt
	numAll = txt.length
	getObj('spanAllNum').innerHTML = txt.length
	clearText()
	txtInput.style.height = Math.max(500, divText.offsetHeight) + 'px'
	txtInput.value = ''
	txtInput.disabled = false
	txtInput.focus()
	getObj('spanError').innerHTML = '0'
	getObj('spanTime').innerHTML = '0'
	getObj('spanRate').innerHTML = '0'
	getObj('spanSpeed').innerHTML = '0'
	getObj('spanNum').innerHTML = '0'
	getObj('txtInput').value = ''
	if (run) {
		clearInterval(autoRun)
		run = false
		time = 0
	}
}

function clearText() {
	var divMain = getObj('divMain')
	var spans = divMain.getElementsByTagName('span')
	while (spans.length > 0) {
		divMain.removeChild(spans[0])
	}
}
function timer() {
	time++
	var str = ''
	var fen = Math.floor(time / 60)
	if (fen > 0) {
		str += fen + '分'
	}
	getObj('spanTime').innerHTML = str + (time - fen * 60) + '秒'
	var txt = getObj('txtInput').value
	txt = txt.replace(/rn/g, 'n')
	getObj('spanSpeed').innerHTML = Math.round((txt.length / time) * 60) + '字/分'
}

function getObj(id) {
	return document.getElementById(id)
}

document.addEventListener('keyup', handlePause)

function handlePause(e) {
	if (e.code === 'F8' && run) {
		clearInterval(autoRun)
		run = false
	}
}
