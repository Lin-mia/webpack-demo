module.exports = class CopyrightWebpackPlugin {
    constructor(options){
        // new CopyrightWebpackPlugin({a:1}) =>options:  {a:1}
        console.log(options)
    }
    apply(compiler){
        compiler.hooks.compile.tap('CopyrightWebpackPlugin',()=>{
            console.log('compiler')
        })
        compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin',(compilation,cb)=>{
            debugger;
            compilation.assets['copyright.txt'] = {
                source: function(){
                    return 'coprtroght from lin'
                },
                size: function(){
                    return 20
                }
            }
            cb()
        })
    }
}