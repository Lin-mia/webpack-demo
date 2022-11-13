
// let a = new Def(20)
// let b = 10
// effectWatch(()=>{
//     b = a.value + 18;
//     console.log(b,"执行一次")
// })
// a.value = 22


// let c = reactive({
//     name: "ljm",
//     age: 18
// })
// let age = 0;
// effectWatch(()=>{
//     age = c.age + 5
//     console.log("age",age)
// })
// c.age = 25



// App 新建vue的参数 包括生命周期等等
import App from './app.js'
// createApp(新建vue的传参) .mount(挂载的节点)
import { createApp } from './core/index.js'
createApp(App).mount(document.querySelector('#app'))
