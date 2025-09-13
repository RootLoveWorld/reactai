let big:bigint = 100n;
console.log(big)

//--------------------type assertion------------Start--------

let someValue:any = " I am Miracle";
// First
let x:number = (<string>someValue).length; // type assertion
// Second
let y:number = (someValue as string).length; // type assertion

console.log("type assertion",x,y);
//---------------------type assertion-----------End--------

class Person {
  public name: string; // 公开的，外部可访问
  private age: number; // 私有，只能在类内部用
  protected id: string; // 受保护，类内部和子类可用

  constructor(name: string, age: number, id: string) {
    this.name = name;
    this.age = age;
    this.id = id;
  }

  // 类内部可以访问private和protected
  getInfo() {
    return `${this.name}, ${this.age}, ${this.id}`;
  }
}

let p = new Person("小明", 20, "123");
p.name; // 正确（public）
// p.age; // 报错！（private，外部不能访问）
console.log(p.getInfo());



// -----------------------------------------








