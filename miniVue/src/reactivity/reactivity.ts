import { readonlyHandlers, reactiveHandlers } from "./baseHandler"

export const reactivity = (raw)=>{
    return createActiveObject(raw, reactiveHandlers)
}

export const readonly = (raw)=>{
    return createActiveObject(raw, readonlyHandlers)
}

function createActiveObject(raw,handlers){
    return new Proxy(raw, handlers)
}