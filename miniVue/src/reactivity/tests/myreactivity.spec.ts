import {reactive , isReactive, isProxy } from '../reactivity'
import {effect , stop} from '../effect'

describe('reactivity',()=>{
    it('reactivity1',()=>{
        const obj = {age: 18, likes: ['paly','sleep','eat']}
        const a = reactive(obj)
        expect(a.age).toBe(18)
        expect(isReactive(a)).toBe(true)
        expect(isReactive(obj)).toBe(false)
        expect(isReactive(a.likes)).toBe(true)
        expect(isReactive(obj.likes)).toBe(false) 


        expect(isProxy(a)).toBe(true)
        expect(isProxy(obj)).toBe(false)
        expect(isProxy(a.likes)).toBe(true)
        expect(isProxy(obj.likes)).toBe(false) 
    })
    it('effect',()=>{
        const obj = {age: 18}
        let a = reactive(obj)
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
        const obj =reactive( {foo : 1} )

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
        const obj = reactive({foo : 1})
        let dummy;
        const runner = effect(()=>{
            dummy =  obj.foo
        })
        // 1. effect执行run() 此时shouldTrack为true obj.foo 收集到依赖在deps中，
        // 2. stop() 将isactivie改为false，清空依赖
        // 3. obj.foo =10 set执行trigger，deps为空，没有再触发
        // 4. runner() 执行的是run() 判断isactive为false 则只执行run 此时shouldTrack为false，不再继续执行 
        // 5. why：track()中直接activeEffect.isActive判断？
        expect(dummy).toBe(1)
        stop(runner)
        obj.foo = 10
        expect(dummy).toBe(1) // 不再触发
        runner() // 手动执行
        expect(dummy).toBe(10)
        obj.foo = 100 
        expect(dummy).toBe(10)
        obj.foo++ 
        expect(dummy).toBe(10)
    })
    it('onStop',()=>{
        const onStop = jest.fn(()=>{
            console.log(1)
        })
        const obj = reactive({foo : 1})
        let dummy;
        const runner = effect(()=>{
            dummy =  obj.foo
        }, { onStop })
        stop(runner)
        expect(onStop).toHaveBeenCalledTimes(1)
    })
})
