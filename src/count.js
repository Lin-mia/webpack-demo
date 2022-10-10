export default function (){
    const count = 1;
    const domcount = document.querySelector('#count')
    domcount.innerHTML = count
    domcount.addEventListener('click',function(){
        domcount.innerHTML = +domcount.innerHTML+1
    })
}