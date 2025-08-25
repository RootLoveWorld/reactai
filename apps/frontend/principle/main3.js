// Data
let count = 0;


// Event ,actions 事件驱动更新
window.addEventListener('click',()=>{
    count++;
   // render();
},false);



// Render
const render = () => {
    console.log('render .');
    document.querySelector('#count').textContent = count.toString();
} 


// rerender 重新渲染，损耗性能 --- 解决办法 ：判断数据是否变化，变化才渲染 diff

let prevCount = count;

const reconcile = ()=>{
    if(prevCount!== count){
        render();
        prevCount = count;
    }
}

// scheduler
const workLoop = ()=>{

    reconcile();
    window.requestIdleCallback(workLoop);
}


workLoop();


// Init
 render();

// React 为什么没有使用 requestIdleCallback 
// scheduler.postTask(()=>{console.log(1)})