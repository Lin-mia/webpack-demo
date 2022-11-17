import {reactivity } from '../reactivity'
import {effect , stop} from '../effect'

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

    it('scheduler',()=>{
        let run;
        let dummy;
        let scheduler = jest.fn(()=>{
            run = runner
        })
        const obj =reactivity( {foo : 1} )

        const runner = effect(()=>{
            dummy = obj.foo
        },{ scheduler })
        expect(scheduler).not.toHaveBeenCalled();
        expect(dummy).toBe(1);
        obj.foo ++ 
        expect(scheduler).toHaveBeenCalledTimes(1);
        expect(dummy).toBe(1);
        run()
        expect(dummy).toBe(2);
    })

    it('stop',()=>{
        // stop 传入runner 清除依赖池中的当前依赖
        const obj = reactivity({foo : 1})
        let dummy;
        const runner = effect(()=>{
            dummy =  obj.foo
        })
        expect(dummy).toBe(1)
        stop(runner)
        obj.foo = 10
        expect(dummy).toBe(1) // 不再触发
        runner() // 手动执行
        expect(dummy).toBe(10)
        obj.foo = 100 // 重新赋值的时候 又执行到了track 添加了依赖
        expect(dummy).toBe(100)
    })
    it('onStop',()=>{
        const onStop = jest.fn(()=>{
            console.log(1)
        })
        const obj = reactivity({foo : 1})
        let dummy;
        const runner = effect(()=>{
            dummy =  obj.foo
        }, { onStop })
        stop(runner)
        expect(onStop).toHaveBeenCalledTimes(1)
    })
})
