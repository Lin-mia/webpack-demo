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
                    const subTree  =  rootComponent.render(setupResult)
                    prevSubTree = subTree
                    mountElement(subTree, rootContainer)
                }else{
                    const subTree  =  rootComponent.render(setupResult)
                    diff(prevSubTree,subTree)
                    prevSubTree = subTree
                }
            })
        }
    }
}