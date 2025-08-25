

// 1. 箭头函数

const fn = (a,b) =>{
    return a+b;
}

// 2.可选链式语法

const obj = {
    name:{
        age:{
            life:{
                z:1
            }
        }
    }
}

console.log(obj?.name?.age?.life?.z)