import {reactivity, effect} from '../index'
it('reactivity',()=>{
    const obj = {age: 18}
    const a = reactivity(obj)
    expect(a.age).toBe(18)
})

it.skip('reactivity',()=>{
    const obj = {age: 18}
    let a = reactivity(obj)
    let b = 0; 
    effect(()=>{
        b = a.age+1
    })
    expect(b).toBe(19)
    a.age++;
    expect(b).toBe(20)
})