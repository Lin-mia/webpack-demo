export const extend = Object.assign

export const isObject = (obj)=>{
    return typeof obj === 'object' && obj !== null
}
export const hadChanged = (val, newVal)=>{
    return !Object.is(val, newVal)
}