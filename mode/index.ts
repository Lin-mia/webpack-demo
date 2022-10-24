class Singleton{
    private static instance: Singleton | null
    name: string 
    private constructor(name: string){
        this.name = name
    }
    static createInstance(name: string): Singleton{
        if(!this.instance){
            this.instance = new Singleton(name)
        }
        return this.instance
    }
}
const sin1 = Singleton.createInstance('zs')
const sin2 = Singleton.createInstance('ls')
const sin3 = Singleton.createInstance('ss')
console.log(sin1)
console.log(sin2)
console.log(sin3)
console.log(sin1===sin3)
