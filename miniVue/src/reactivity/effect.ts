import { extend } from "../shared/extend";

// 依赖抽象类
class ReactivityEffect {
    private _fn: any
    deps = []
    isActive = true
    onStop?: () => void
    constructor(fn, public scheduler?) {
        this._fn = fn
    }
    run() {
        activeEffect = this // 指定当前依赖
        return this._fn() // 不返回则执行[effect-->runner()]后是undefined
    }

    stop(){
        if(this.isActive){
            cleanupEffect(this)
            this.isActive = false
            this.onStop && this.onStop()
        }
    }
}

function cleanupEffect(effect){
    effect.deps.forEach((dep:any)=>{
        dep.delete(effect)
    })
}
// 当前依赖实例
let activeEffect;

/** 创建依赖实例
 * @reurns run()
*/
export const effect = (fn, options:any = {}) => {
    const _effect = new ReactivityEffect(fn, options.scheduler);
    extend(_effect, options)
    // 第一次触发原来的方法run，后续都是schduler方法，
    // 即set时触发的方法就是scheduler，则在trigger()中修改
    _effect.run()
    const runner:any = _effect.run.bind(_effect) // 返回runner方法 但直接调用会缺少this
    runner.effect = _effect
    return runner
}


/**
 * 
 * !!! track 添加依赖,由Proxy.get()取值操作时添加依赖-- 依赖池dep 【new Set】
 * 传入当前执行对象
 * @param raw 传入的对象
 * @returns 响应式对象proxy
 */
const targetsMap = new Map()
export function track(raw, key) {
    let depsMap = targetsMap.get(raw)
    if (!depsMap) {
        depsMap = new Map()
        targetsMap.set(raw, depsMap)
    }
    let dep = depsMap.get(key)
    if (!dep) {
        dep = new Set()
        depsMap.set(key, dep)
    }
    if(activeEffect){
        dep.add(activeEffect)
        activeEffect.deps.push(dep)
    }
}


/**
 * 
 * !!! trigger 触发依赖,由Proxy.set()赋值操作时触发依赖
 * 到依赖池中遍历依赖，再次执行方法
 * @param raw 传入的对象
 * @returns 响应式对象proxy
 */
 export function trigger(raw, key) {
    let depsMap = targetsMap.get(raw)
    let dep = depsMap.get(key)
    for(const effect of dep){
        if(effect.scheduler){
            effect.scheduler()
        }else{
            effect.run()
        }
    }
 }
 


 export function stop(runner){
    runner.effect.stop()
 }