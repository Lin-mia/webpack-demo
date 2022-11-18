import { readonlyHandlers, reactiveHandlers, shallowReadonlyHandlers } from "./baseHandler"
export const ReactivityFlags = {
    IS_REACTIVE:"isReactive",
    IS_READONLY:"isReadonly"
}
export function isReactive(raw){
    return !!raw[ReactivityFlags.IS_REACTIVE]
}
export function isReadonly(raw){
    return !!raw[ReactivityFlags.IS_READONLY]
}
export function isProxy(raw){
    return isReactive(raw) || isReadonly(raw)
}

export const reactive = (raw)=>{
    return createActiveObject(raw, reactiveHandlers)
}

export const readonly = (raw)=>{
    return createActiveObject(raw, readonlyHandlers)
}
export const shallowReadonly = (raw)=>{
    return createActiveObject(raw, shallowReadonlyHandlers)
}

function createActiveObject(raw,handlers){
    return new Proxy(raw, handlers)
}