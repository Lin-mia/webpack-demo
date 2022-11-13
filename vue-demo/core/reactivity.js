export class Def {
    constructor(value){
        this._val = value
        this.effects = new Set() // 依赖池
    }
    get value(){
        this.depend()
        return this._val
    }
    set value(newVal){
        this._val = newVal
        this.notify()
    }
    depend(){
        currentEffect && this.effects.add(currentEffect)
    }
    notify(){
        this.effects.forEach((effect)=>{
            effect()
        })
    }
}
let currentEffect = null
// effectWatch 执行时，内部函数就会被执行
// 当内部执行了获取值的操作，就会被加入依赖池当中
export function  effectWatch(fn) {
    currentEffect = fn // 依赖池加入的是 需要执行的函数
    fn()
    currentEffect = null // 执行完成后置空 后续再执行时currentEffect为null 则不会再被加入到依赖池中
}

// 响应式对象
const targetMap = new Map() // 存储多个响应式对象 [{xxx:xxx}---reactive,{xxx:xxx}---reactive]

export const reactive = (raw)=>{
    return new Proxy(raw,{
        get(target, key){
            const def = getDef(raw,key)
            def.depend()
            return Reflect.get(target,key)
        },
        set(target, key, value){
            const def = getDef(raw,key)
            const res = Reflect.set(target,key,value)
            def.notify()
            return res
        }
    })

}

function getDef (raw,key){
    let reactiveMap = targetMap.get(raw) // 取出当前的reactive的对象
    if(!reactiveMap){
        reactiveMap = new Map()
        targetMap.set(raw,reactiveMap)
    }
    let propertyDef = reactiveMap.get(key) // 取出当前reactivity的key的Dep
    if(!propertyDef){
        propertyDef = new Def() // 不需要赋值 为的是执行加入依赖的操作
        reactiveMap.set(key, propertyDef)
    }
    // 返回的是响应式对象 的 Def属性
    return propertyDef
}