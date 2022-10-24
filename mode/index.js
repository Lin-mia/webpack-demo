Function.prototype.call = function(context){
    const myContext = Object(context) || window
    myContext.fn = this
    let res = myContext.fn(...[arguments].slice(1))
    delete myContext.fn
    return res
}

Function.prototype.apply = function(context,args){
    const myContext = Object(context) || window
    myContext.fn = this
    let res
    if(args){
        res = myContext.fn(...args)
    }else{
        res = myContext.fn()
    }
    delete myContext.fn
    return res
}
Function.prototype.bind = function(context,...args){
    return (...values)=>{
        return this.apply(context,[...args,...values])
    }
}

function aa(){
    console.log(this.a,this.b,this.c)
}
aa.apply({a:1,b:2})
aa.bind({a:1,b:2})()