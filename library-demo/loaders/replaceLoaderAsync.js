module.exports = function(source){
    // 异步
    const callback = this.async()
    setTimeout(()=>{
        const result = source.replace('dell',this.query.name);
        callback(null,result)
    },1000)
}