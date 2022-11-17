import { track, trigger } from "./effect2"

export const reactivity = (raw)=>{
    return new Proxy(raw, {
        get(target,key){
            track(target,key) // 收集依赖 
            return Reflect.get(target,key)
        },
        set(target,key,value) { 
            const res = Reflect.set(target,key,value)
            trigger(target,key)
            return res
        }
    })
}