import {reactive} from '../reactivity'
import {effect} from '../effect'

it('reactivity',()=>{
    const obj = {age: 18}
    const a = reactive(obj)
    expect(a.age).toBe(18)
})

it('reactivity',()=>{
    const obj = {age: 18}
    let a = reactive(obj)
    let b = 0; 
    effect(()=>{
        b = a.age+1
    })
    expect(b).toBe(19)
    a.age++;
    expect(b).toBe(20)
})