import { effectWatch } from './reactivity.js'
import { mountElement, diff } from './renderer.js'
export function createApp(rootComponent){
    return {
        mount(rootContainer){
            const setupResult = rootComponent.setup()
            let prevSubTree;
            let isMount = false;
            effectWatch(()=>{
                if(!isMount){
                    isMount = true
                    const subTree  =  rootComponent.render(setupResult) //app.js要创建的虚拟节点
                    prevSubTree = subTree
                    mountElement(subTree, rootContainer) // 1. 初次--虚拟节点转化为真实节点
                }else{
                    const subTree  =  rootComponent.render(setupResult) //虚拟节点
                    diff(prevSubTree,subTree) // 2， 更新--新旧虚拟节点比较
                    prevSubTree = subTree
                }
            })
        }
    }
}