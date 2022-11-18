import { readonly, isReadonly, shallowReadonly, isProxy } from "../reactivity";
describe('readonly',()=>{
    it('object',()=>{
        const obj = {foo:1, likes: ['paly','sleep','eat']}
        const b = readonly(obj)
        expect(b).not.toBe(obj)
        expect(b.foo).toBe(1)
        expect(isReadonly(b)).toBe(true)
        expect(isReadonly(obj)).toBe(false)
        expect(isReadonly(b.likes)).toBe(true)
        expect(isReadonly(obj.likes)).toBe(false)
        expect(isProxy(b)).toBe(true)
        expect(isProxy(obj)).toBe(false)
        expect(isProxy(b.likes)).toBe(true)
        expect(isProxy(obj.likes)).toBe(false)
    })
    it('readonly',()=>{
        console.warn = jest.fn()
        const user = readonly({age: 18})
        user.age++
        expect(console.warn).toBeCalled()
    })
    it('shallowReadonly', ()=>{
        const obj = {foo:1, likes: ['paly','sleep','eat']}
        const b = shallowReadonly(obj)
        expect(b).not.toBe(obj)
        expect(b.foo).toBe(1)
        expect(isReadonly(b)).toBe(true)
        expect(isReadonly(obj)).toBe(false)
        expect(isReadonly(b.likes)).toBe(false)
        expect(isReadonly(obj.likes)).toBe(false)

        expect(isProxy(b)).toBe(true)
        expect(isProxy(obj)).toBe(false)
        expect(isProxy(b.likes)).toBe(false)
        expect(isProxy(obj.likes)).toBe(false)
    })
})