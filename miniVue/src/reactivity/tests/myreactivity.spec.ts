import {reactivity } from '../reactivity'
import {effect } from '../effect'

describe('reactivity',()=>{
    it('reactivity1',()=>{
        const obj = {age: 18}
        const a = reactivity(obj)
        expect(a.age).toBe(18)
    })
    it('effect',()=>{
        const obj = {age: 18}
        let a = reactivity(obj)
        let b = 0; 
        const run = effect(()=>{
            b = a.age+1
        })
        expect(b).toBe(19)
        a.age++;
        expect(b).toBe(20)
        expect(typeof run).toBe("function")
        run()
        expect(b).toBe(20)
    })
    it('effect runner',()=>{
        let foo = 0
        const runner = effect(()=>{
            foo++
            return foo
        })
        expect(foo).toBe(1)
        runner()
        console.dir(runner)
        expect(foo).toBe(2)
        expect(runner()).toBe(3) // 测试runner return值 
    })
})
