function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) return obj
    let res
    if (obj instanceof Array) {
        res = []
    } else {
        res = {}
    }
    for (let key in obj) {
        res[key] = deepClone(obj[key])
    }
    return res
}


const obj = {
    name: 'ljm',
    age: 23,
    merits: ['beautiful','beautiful','beautiful']
}
const obj2 = deepClone(obj)
console.log(obj === obj2)
obj2.merits.push('noMoney')
console.log(obj)
console.log(obj2)

function myInstanceof(A, B){
    let p = A.__proto__
    while(p){
        if(p === B.prototype){
            return true
        }
        p = p.__proto__
    }
    return false
}
console.log(myInstanceof([],Array))