// 返回虚拟节点
export function h(tag, props, children){
    // 虚拟节点
    return {
        tag,
        props,
        children
    }
}