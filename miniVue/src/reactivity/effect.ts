import { extend } from "../shared/extend";

// 当前依赖实例
let activeEffect;
// 是否需要继续收集依赖
let shouTrack;

/**
 * 问题：
 * 为什么不在track中直接使用effect.isActive属性，stop后为isactive为false 不再收集依赖
    track()--> if(!activeEffect.isActive) return // stop 后 不再收集依赖
    解答：
    比如在obj.age++ 中进行了一个取值操作，不跑stop()函数的情况下，isactive一直都是true，此时会重复收集依赖
    而通过shouTrack操作，每次run()【开始时赋值true然后继续收集依赖】完成后都是false[即初始化or set赋值操作] 单纯的取值操作track检验时是false，不会再往下收集依赖

    所以实际而言，并不是shouTrack和isactive有关联，这两个是不同的标记。
    一个是代表是否停止了run 一个是是否应该继续停止收集依赖，虽然在isactive为false情况下需要停止收集依赖，但两者并不等价。
 */
function isTracking(){
    return shouTrack && activeEffect!==undefined
}

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
        if(!this.isActive){
            return this._fn()
        }
        activeEffect = this // 指定当前依赖
        shouTrack = true
        const res = this._fn() // 不返回则执行[effect-->runner()]后是undefined
        shouTrack = false
        return res
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
    effect.deps.length = 0 //已清空依赖记录
}

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
    if(!isTracking()) return 
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

    if(!dep.has(activeEffect)){
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