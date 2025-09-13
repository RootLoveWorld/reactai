interface Person  {
  name: string;
  age: number;
  say():void;
}


type Animal = {
    name: string; 
}

// 面向对象编程
interface Student extends Person {
    id:number;
}


 // extends
 // 类与接口的继承 Inheritance
 // 泛型约束 Generic Constraints
 // 条件类型 Conditional Types

// 面向协议编程
type Dog = Animal & { age: number };

// 协议
type IdProtocol = { id: number };
type NameProtocol = { name: string };

type InfoProtocol = IdProtocol & NameProtocol;

// unknown 与 never

// 自定义类型守卫
// 优先使用 typeof/instanceof 处理简单场景
// 对复杂对象结构使用自定义守卫函数

const call = (a:string, b:number) => {
  return 'Miracle';
};

type FunctionReturnType<T> = T extends () => infer E ? E : never;

type FParamsType<T> = T extends (...args: any[]) => any ? Parameters<T> : never;

type FParamsType1<T> = T extends (...args: infer P) => any ? P : never;

// Using the types to avoid unused variable warnings
type ReturnTypeExample = FunctionReturnType<typeof call>;
type ParamsTypeExample = FParamsType<typeof call>;
type ParamsType1Example = FParamsType1<typeof call>;

console.log("Index.ts loaded");