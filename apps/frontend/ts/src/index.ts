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