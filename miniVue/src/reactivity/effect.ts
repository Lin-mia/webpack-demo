// 依赖抽象类
class ReactivityEffect {
    private _fn: any
    constructor(fn) {
        this._fn = fn
    }
    run() {
        activeEffect = this // 指定当前依赖
        return this._fn() // 不返回则执行[effect-->runner()]后是undefined
    }
}

// 当前依赖实例
let activeEffect;

/** 创建依赖实例
 * @reurns run()
*/
export const effect = (fn) => {
    const _effect = new ReactivityEffect(fn);
    _effect.run()
    return _effect.run.bind(_effect) // 返回runner方法 但直接调用会缺少this
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
    dep.add(activeEffect)
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
        effect.run()
    }
 }
 