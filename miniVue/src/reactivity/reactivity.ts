import { track, trigger} from './effect'
export const reactivity = (raw)=>{
    return new Proxy(raw, {
        get(target,key){
            track(target,key)
            return Reflect.get(target,key)
        },
        set(target,key,value){
            const res = Reflect.set(target,key,value) //先赋值修改再触发依赖
            trigger(target,key)
            return res
        }
    })
}