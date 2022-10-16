export default function (){
    const num = 1500;
    const div1 = document.createElement('div')
    div1.id = 'div222'
    div1.innerHTML = num
    document.body.appendChild(div1)
}
export const add = (a,b)=>{
    console.log(a+b);
}
export const multi = (a,b)=>{
    console.log(a*b)
}