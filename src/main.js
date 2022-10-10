import '../assects/index.css'
import '../assects/index2.css'

import axios from  'axios'
import {add} from './number'
import _ from 'lodash'
// // babel
// const arr = [new Promise(()=>{}),new Promise(()=>{})]
// arr.map(item=>{
//     console.log(item,"item")
// })

// consol1.log(11)
add(24,24)
console.log(_.join(['a','b','c']))
console.log(this)

// // 异步加载文件
// function getComponent(){
//     return import(/* webpackChunkName: "lodash" */ 'lodash').then(({default: _}) =>{
//         const element = document.createElement('div')
//         element.innerHTML = _.join(['jiamiao','lin'],'-')
//         return element
//     })
// }
// getComponent().then(element=>{
//     document.body.appendChild(element)
// })
axios.get("/react/api/header.json")   
.then((res)=>{
    console.log(res)
})