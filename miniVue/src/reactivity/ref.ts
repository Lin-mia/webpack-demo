import { hadChanged, isObject } from "../shared/extend"
import { isTracking, trackEffect, triggerEffect } from "./effect"
import { reactive } from "./reactivity"

class RefImpl{
    private _value: any
    public dep
    private _rawValue: any
    public __v_isRef = true
    constructor(value){
        // 原始对象：因为如果value是对象，需要转化为reactive
        this._rawValue = value // 因为如果是对象被转化为proxy 则Object.is判断有问题 另外存储对象值
        this._value = convert(value) // 转换后的对象
        this.dep = new Set()
    }
    get value(){
        // 收集依赖
        trackRefValue(this)
        return this._value
    }
    set value(newValue){ //相同值情况不触发
        if(hadChanged(this._rawValue,newValue)){
            // 新值
            this._rawValue = newValue
            // 转换新值
            this._value = convert(newValue)
            // 触发依赖
            triggerEffect(this.dep)
        }
    }
}
// 对象--转换为响应式对象/原对象
function convert(value){
    return isObject(value)?reactive(value):value
}

function trackRefValue(ref){
    if(isTracking()){
        trackEffect(ref.dep)
    }
}

// 值的响应式
export function ref (value){
    return new RefImpl(value)
}
// 判断是否时ref
export function isRef(val){
    return !!val.__v_isRef
}
// 当是ref时，返回ref.value 普通值直接返回
export function unRef(val){
    return isRef(val) ? val.value : val
}

export function proxyRefs(objWithRef){
    return new Proxy(objWithRef,{
        get(target,key){
            return unRef(Reflect.get(target,key))
        },
        set(target,key,value){
            if(isRef(target[key]) && !isRef(value)){
                return (target[key].value = value)
            }else{
                return Reflect.set(target,key,value)
            }
        }
    })
}