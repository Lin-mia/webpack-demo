import mul from "../utils.js"
import _ from 'lodash'
import img from '../images/kru0w4th0szh.jpg'
import '../assects/index.css'
// import '../font/iconfont.css'
import '../assects/index.scss'

function add(a,b){
    console.log(a+b)
}
add(3,4)
mul(3,4)
console.log(2313123)
console.log('2444阿斯顿你看阿萨大大啊')
console.log('2444阿斯顿1231313213221232137777')

const button = document.createElement('button')
button.innerHTML = '新增'
document.body.appendChild(button)
button.onclick = function(){
    const div = document.createElement('div')
    div.innerHTML = 'item'
    document.body.appendChild(div)
}
/**
 * 1. new Image() src='../images/kru0w4th0szh.jpg' 如果index.html路径不在build中，那么相对路径会出现问题。
 * 2. 导入没有这个问题，import img 得到的是img 的路径，不是Node节点。
 */
console.log(img)
const image = new Image()
image.src= img
image.classList.add('avatar')
document.body.appendChild(image)
console.log(_.join(['hello','webpack'],''))

const div1 = document.querySelector('#div1')
div1.innerHTML = `<div class='iconfont icon-biaoqian'> abcdddddeeeeeffffddee </div>`


