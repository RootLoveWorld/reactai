interface Person  {
  name: string;
  age: number;
  say():void;
}


type Animal = {
    name: string; 
}

// 面向对象编程
interface student extends Person {
    id:number;
}


 // extends
 // 类与接口的继承 Inheritance
 // 泛型约束 Generic Constraints
 // 条件类型 Conditional Types

// 面向协议编程
type Dog = Animal & { age: number }

// 协议
type IdProtocal = { id: number }
type NameProtocal = { name: string }

type InfoProtocal = IdProtocal & NameProtocal









// interface 与 type的区别
// 拓展性
// 声明合并方式
// 使用范围

// 隔离
namespace A{

}



// unknown 与 never

// 自定义类型守卫
// 优先使用 typeof/instanceof 处理简单场景
// 对复杂对象结构使用自定义守卫函数



const call = (a:string,b:number)=>{
  return 'Miracle'
}

type FunctionReturnType<T> = T extends ()=> infer E ? E :never;


type FParamsType<T> = T extends (...args: any[]) => any ? Parameters<T> :never;


type FParamsType1<T> = T extends (...args: infer P) => any ? P :never;

type ReturnType = FunctionReturnType<typeof call>

type ParamsType = FParamsType<typeof call>

type ParamsType1 = FParamsType1<typeof call>