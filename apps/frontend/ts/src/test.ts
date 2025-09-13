// Simple test file to verify TypeScript setup

console.log("TypeScript environment test");

// Test basic types
const testString: string = "Hello TypeScript";
const testNumber: number = 42;
const testBoolean: boolean = true;

console.log(`String: ${testString}`);
console.log(`Number: ${testNumber}`);
console.log(`Boolean: ${testBoolean}`);

// Test interface
interface TestObject {
  id: number;
  name: string;
}

const testObj: TestObject = {
  id: 1,
  name: "Test Object"
};

console.log(`Object: ${JSON.stringify(testObj)}`);

// Test function
function add(a: number, b: number): number {
  return a + b;
}

const result = add(5, 3);
console.log(`Function result: 5 + 3 = ${result}`);

// Test array
const testArray: number[] = [1, 2, 3, 4, 5];
console.log(`Array: [${testArray.join(", ")}]`);

// Test generic
function identity<T>(arg: T): T {
  return arg;
}

const stringIdentity = identity<string>("test");
const numberIdentity = identity<number>(123);

console.log(`Generic string: ${stringIdentity}`);
console.log(`Generic number: ${numberIdentity}`);

console.log("✅ TypeScript environment test completed successfully!");