import { readonly } from "../reactivity";
describe('readonly',()=>{
    it('object',()=>{
        const obj = {foo:1}
        const b = readonly(obj)
        expect(b).not.toBe(obj)
        expect(b.foo).toBe(1)
    })
    it('readonly',()=>{
        console.warn = jest.fn()
        const user = readonly({age: 18})
        user.age++
        expect(console.warn).toBeCalled()
    })
})