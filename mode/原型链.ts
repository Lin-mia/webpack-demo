// class People {
//     name: string
//     constructor(name: string){
//         this.name = name
//     }
//     sayHi(){
//         console.log(`my name is ${this.name}`)
//     }
// }
// export class Worker extends People{
//     name: string
//     work: string
//     constructor(name: string, work: string){
//         super(name)
//         this.work = work
//     }
//     sayWork(){
//         console.log(`i am working ${this.work}`)
//     }
// }

// const worker = new Worker('ljm','programmer')
// worker.sayHi()
// worker.sayWork()
// // @ts-ignore
// console.log(worker.__proto__,'1')
// // @ts-ignore
// console.log(worker.__proto__ === Worker.prototype)
// // @ts-ignore
// console.log(worker.__proto__.__proto__,'2')
// // @ts-ignore
// console.log(worker.__proto__.__proto__ === People.prototype)
// // @ts-ignore
// console.log(worker.__proto__.__proto__.__proto__)


interface Function{
    call1: (any)=>{}
    bind1: (p1:any,p2?:any)=>((ar1,arg2,arg3)=>{})
    apply1: (p1:any,p2:any)=>{}

}
Function.prototype.call1 = function(context){
    const myContext = Object(context) || window
    myContext.fn = this
    let res = myContext.fn(...[arguments].slice(1))
    delete myContext.fn
    return res
}

Function.prototype.apply1 = function(context,args){
    const myContext = Object(context) || window
    myContext.fn = this
    let res
    if(args){
        res = myContext.fn(...args)
    }else{
        res = myContext.fn()
    }
    delete myContext.fn
    return res
}
Function.prototype.bind1 = function(context,...args){
    const _this = this
    return function(...values){
        return _this.apply(context,[...args,...values])
    }
}

function aa(e,f,g){
    console.log(this.a,this.b,this.c)
    console.log(e,f,g)
}
aa.apply({a:1,b:2},[4,5,6])
const a = aa.bind1({a:1,b:2})
console.log(a(1,2,3))
