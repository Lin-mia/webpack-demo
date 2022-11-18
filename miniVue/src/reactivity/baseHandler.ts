import { extend, isObject } from "../shared/extend";
import { track, trigger } from "./effect";
import { reactive, readonly, ReactivityFlags } from "./reactivity";


const get = createGretter() // 这样就不会在get时不重复执行
const set = createSetter()
const readonlyGet = createGretter(true) // 这样就不会在get时不重复执行
const shallowReadonlyGet = createGretter(true, true) // 这样就不会在get时不重复执行


export function createGretter(isReadonly = false, isShallow = false) {
  return function (target, key) {
    if(key === ReactivityFlags.IS_REACTIVE){
      return !isReadonly
    }else if(key === ReactivityFlags.IS_READONLY){
      return isReadonly
    }
    const res= Reflect.get(target, key);
    // 如果是表层，直接return 不递归proxy
    if(isShallow) return res
    if(isObject(res)){
      return isReadonly ? readonly(res) : reactive(res)
    }
    if (!isReadonly) {
      track(target, key);
    }
    return res
  };
}
export function createSetter() {
  return function (target, key, value) {
    const res = Reflect.set(target, key, value); //先赋值修改再触发依赖
    trigger(target, key);
    return res;
  };
}

export const reactiveHandlers = {
  get,
  set,
};
export const readonlyHandlers = {
  get: readonlyGet,
  set(target, key, value) {
    console.warn(`该对象${target}不允许设置`)
    return true;
  },
};
export const shallowReadonlyHandlers = extend({},readonlyHandlers,{
  get: shallowReadonlyGet
})