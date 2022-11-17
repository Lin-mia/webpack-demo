import { reactivity } from "../reactivity2";
import { effect, stop } from "../effect2";


describe('reactivity',()=>{
    it('object',()=>{
        const obj = { foo : 1}
        const obj2 = reactivity(obj)
        expect(obj).not.toBe(obj2)
        expect(obj.foo).toBe(1)
    })
    it('trigger', () =>{
        const obj = reactivity({ foo: 1})
        let b;
        effect(()=>{
            b = obj.foo+1
        })
        expect(b).toBe(2)
        obj.foo++
        expect(b).toBe(3)
    })
    it('runner', ()=>{
        let foo = 1
        const runner = effect(()=>{
            foo++
            return 'foo'
        })
        expect(foo).toBe(2)
        runner()
        expect(foo).toBe(3)
        expect(runner()).toBe('foo')
    })
    it('scheduler', ()=>{
        let run;
        const obj =reactivity( {foo : 1} )
        
        let dummy;
        let scheduler = jest.fn(()=>{
            run = runner
        })
        const runner = effect(()=>{
            dummy = obj.foo
        },{scheduler})

        expect(dummy).toBe(1)
        expect(scheduler).not.toHaveBeenCalled()
        obj.foo = 10 
        expect(dummy).toBe(1)
        expect(scheduler).toHaveBeenCalledTimes(1)
        run()
        expect(dummy).toBe(10)
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