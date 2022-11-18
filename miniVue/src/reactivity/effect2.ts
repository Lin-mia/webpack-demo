import { extend } from "../shared/extend";
export class ReactivityEffect {
  private _fn: any;
  deps = [];
  isActive = true;
  onStop?: () => void;

  constructor(fn, public scheduler?) {
    this._fn = fn;
  }
  run() {
    activeEffect = this;
    return this._fn();
  }
  stop() {
    if(this.isActive){
        cleanupEffect(this)
        this.isActive = false
        this.onStop && this.onStop()
    }
  }
}
function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect);
  });
}
export function stop(runner) {
  runner.effect.stop();
}

let activeEffect;

const targetsMap = new Map();
export function track(target, key) {
  let depsMap = targetsMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetsMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }
  if (!activeEffect) return;
  dep.add(activeEffect);
  activeEffect.deps.push(dep);
}

export function trigger(target, key) {
  let depsMap = targetsMap.get(target);
  let dep = depsMap.get(key);
  for (let effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run(); //执行依赖
    }
  }
}

export function effect(fn, options: any = {}) {
  const _effect = new ReactivityEffect(fn, options.scheduler); // 依赖实例
  extend(_effect, options);
  _effect.run();
  const runner: any = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}
