// Data  Status 状态  Hooks useState useReducer

const queue = [];
let index = 0;

const useState = (initialState) =>{
    queue.push(initialState);
    const update = (newState)=>{
        // Why  Hooks  不能在条件语句中使用
        queue.push(newState);
        index++;
    }
    return [queue[index],update]
}

// currentDispatcher , resolveDispatcher



const [count,setCount] = useState(0);


// Event ,actions 事件驱动更新
window.addEventListener('click',()=>{
   // setCount(count+1);
   setCount(queue[index]+1);
},false);



// Render
const render = () => {
    console.log('render .');
    document.querySelector('#count').textContent = queue[index].toString(); // 取出最新的数据
} 


// rerender 重新渲染，损耗性能 --- 解决办法 ：判断数据是否变化，变化才渲染 diff

let prevCount = count;

const reconcile = ()=>{
    // 判断数据是否变化
    // 尽可能少的更新、尽可能多的复用
    // key使用，减少不必要的渲染



    if(prevCount!== queue[index]){
        render();
        prevCount = queue[index];
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