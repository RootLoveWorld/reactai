// Data
let count = 0;


// Event ,actions 事件驱动更新
window.addEventListener('click',()=>{
    count++;
   // render();
},false);



// Render
const render = () => {
    document.querySelector('#count').textContent = count.toString();
} 


// scheduler
const workLoop = ()=>{
    console.log('workLoop .');
    render();
    window.requestIdleCallback(workLoop);
}

// rerender 重新渲染，损耗性能



workLoop();


// Init
// render();

// React 为什么没有使用 requestIdleCallback 
// scheduler.postTask(()=>{console.log(1)})