// Data
let count = 0;


// Event ,actions 事件驱动更新
window.addEventListener('click',()=>{
    count++;
    render();
},false);



// Render
const render = () => {
    document.querySelector('#count').textContent = count.toString();
} 


// Init
render();