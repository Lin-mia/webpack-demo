import { ReactivityEffect } from "./effect"

class ComputedRefImpl{
    private _getter: any
    private _value: any
    private _dirty = true
    private _effect: ReactivityEffect
    constructor(getter){
        this._getter = getter
        // 创建依赖，当getter执行到reactive的get时，dep收集到了依赖，
        // 当reactive的set调用时，触发函数的scheduler方法，而不是run方法，重置为更新状态，
        // 后续conputed中的get value时，是手动调用run方法拿到结果的
        this._effect = new ReactivityEffect(getter,()=>{
            if(!this._dirty){
                this._dirty = true
            }
        })
    }
    get value(){
        // 数据初次/更改了，执行run函数（即执行getter方法）
        if(this._dirty){
            this._dirty = false
            this._value = this._effect.run()
        }
        // 没有更新，return记录值 缓存
        return this._value
    }
}
export function computed(getter){
    return new ComputedRefImpl(getter)
}