function createElem(tag){
    return document.createElement(tag)
}
function patchProps(el, key, preVal, nextVal){
    if(nextVal===null){
        el.removeAttribute(key)
    }else{
        el.setAttribute(key,nextVal)
    }
}
function insert(el,parent){
    parent.append(el)
}
function createTextNode(text){
    return document.createTextNode(text)
}
function remove(el,parent){
    parent.removeChild(el)
}
// 将虚拟节点处理为节点
export function mountElement(vnode, container){
    const {tag, props, children } = vnode
    // tag
    const el = (vnode.el = createElem(tag))
    // props = {}
    for(let key in props){
        const val = props[key]
        patchProps(el, key, null, val)
    }
    if(typeof children === "string"){
        insert(createTextNode(children),el)
    }else if(Array.isArray(children)){
        children.forEach(v => {
            mountElement(v,el)
        });
    }
    insert(el,container)
}
// n1 oldVnode
// n2 newVnode
export function diff(n1,n2){
    // 当tag不一致时，将n1上的真实节点el，替换为新建的节点
    if(n1.tag !== n2.tag){
        n1.el.replaceWith((n2.el = createElem(n2.tag)))
    }else{
        // 当props不同时
        const newProps = n2.props
        const oldProps = n1.props
        const el = (n2.el = n1.el)
        // 遍历新节点的属性，如果新旧属性值不同，则设置新值
        if(newProps){
            for(const key in newProps){
                if(newProps[key]!==oldProps[key]){
                    patchProps(el,key, oldProps[key],newProps[key])
                }
            }
        }
        // 遍历旧属性值，如果新vnode没有该属性，remove掉(null)
        if(oldProps){
            for(const key in oldProps){
                if(!newProps[key]){
                    patchProps(el,key,oldProps[key],null)
                }
            }
        }
        // 遍历children节点
        const newChildren = n2.children
        const oldChildren = n1.children
        // 新节点是纯文本，则直接替换innerHMTL
        if(typeof newChildren === "string"){
            if(typeof oldChildren === "string"){
                newChildren!==oldChildren && (el.innerHTML = newChildren)
            }else if(Array.isArray(oldChildren)){
                el.innerHTML = newChildren
            }
        }else if(Array.isArray(newChildren)){
            // 旧节点是文本，则置空，将新元素依次挂载到el上
            if(typeof oldChildren === 'string'){
                el.innerHTML = ''
                newChildren.forEach(v=>{
                    mountElement(v,el)
                })
            // 数组 简单比较增减，不涉及元素调换
            }else if(Array.isArray(oldChildren)){
                const length = Math.min(newChildren.length,oldChildren.length)
                for(let i=0;i<length;i++){
                    const newVnode = newChildren[i]
                    const oldVnode = oldChildren[i]
                    diff(newVnode,oldVnode) // 新旧节点对比
                }
                if(newChildren.length > length){
                    for(let i=length;i<newChildren.length;i++){
                        const vnode = newChildren[i]
                        mountElement(vnode,el) // 多出的节点新增
                    }
                }
                if(oldChildren.length > length){
                    for(let i=length;i<newChildren.length;i++){
                        const vnode = newChildren[i]
                        remove(vnode.el,el) // 旧节点删除
                    }
                }
            }
        }
    }
}