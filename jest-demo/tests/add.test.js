const add = require('../add.js')
// it和test等价
test('1+1',()=>{
    const res = add(1,2)
    expect(res).toBe(3)
})

it('1+1',()=>{
    const res = add(1,2)
    expect(res).toBe(3)
})

// 组成模块
describe('add',()=>{
    it('1+1',()=>{
        const res = add(1,2)
        expect(res).toBe(3)
    })
    it('1+1',()=>{
        const res = add(1,2)
        expect(res).toBe(3)
    })
})