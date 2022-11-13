import { reactive } from './core/index.js'
import { h } from './core/h.js'
const App = {
    render: function(context){
        // return h('div', {} , [
        //     h('p', {} ,"hello jiamiao"),
        //     h('p', context.obj.props , String(context.obj.age)),
        //     h(context.obj.tag, {id: "ljm"}, "really")
        // ])
        return h(context.obj.tag, context.obj.props, "really")
    },
    setup: function(){
        const obj = reactive({
            age: 18,
            props: {
                "a":"a",
                "b" : "b"
            },
            tag: "div"
        })
        window.obj = obj
        return {
            obj,
        }
    }
}
export default App