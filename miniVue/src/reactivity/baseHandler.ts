import { track, trigger } from "./effect";


const get = createGretter() // 这样就不会在get时不重复执行
const set = createSetter()
const readonlyGet = createGretter(true) // 这样就不会在get时不重复执行

export function createGretter(isReadonly = false) {
  return function (target, key) {
    if (!isReadonly) {
      track(target, key);
    }
    return Reflect.get(target, key);
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
