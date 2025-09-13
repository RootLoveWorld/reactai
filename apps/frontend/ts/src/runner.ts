#!/usr/bin/env node

/**
 * Simple TypeScript runner script
 * This script demonstrates how to run different TypeScript examples
 */

// Import our example modules
import './1';
import './index';
import './hello-ts';
import './learning-examples';

console.log("📘 TypeScript Learning Environment");
console.log("==================================");
console.log("All TypeScript examples have been imported and executed.");
console.log("");
console.log("Available examples:");
console.log("1. Basic types (1.ts)");
console.log("2. Advanced types (index.ts)");
console.log("3. Hello TypeScript (hello-ts.ts)");
console.log("4. Comprehensive examples (learning-examples.ts)");
console.log("");
console.log("To see output from specific examples, check the console logs above.");
console.log("To run individual files, compile with 'npm run compile' and then use 'node dist/filename.js'");

// Simple interactive menu (only works in Node.js environment)
console.log("");
console.log("Interactive TypeScript Runner");
console.log("-----------------------------");
console.log("This interactive menu only works when running in Node.js environment.");

// Simple function to demonstrate various examples
function runExample(choice: string) {
  switch (choice) {
    case '1':
      console.log("Running basic example...");
      const message: string = "Hello, TypeScript!";
      const count: number = 42;
      console.log(`Message: ${message}`);
      console.log(`Count: ${count}`);
      console.log(`Multiplication: ${count * 2}`);
      break;
      
    case '2':
      console.log("Running class example...");
      class Greeter {
        greeting: string;
        
        constructor(message: string) {
          this.greeting = message;
        }
        
        greet() {
          return "Hello, " + this.greeting;
        }
      }
      
      const greeterInstance = new Greeter("world");
      console.log(greeterInstance.greet());
      break;
      
    case '3':
      console.log("Running interface example...");
      interface Person {
        firstName: string;
        lastName: string;
      }
      
      function greeterFunc(person: Person) {
        return "Hello, " + person.firstName + " " + person.lastName;
      }
      
      const user = { firstName: "Jane", lastName: "User" };
      console.log(greeterFunc(user));
      break;
      
    case '4':
      console.log("Running generic example...");
      function identity<T>(arg: T): T {
        return arg;
      }
      
      const output1 = identity<string>("Hello");
      const output2 = identity<number>(42);
      console.log(`String identity: ${output1}`);
      console.log(`Number identity: ${output2}`);
      break;
      
    case '5':
      console.log("Goodbye!");
      process.exit(0);
      
    default:
      console.log("Invalid option. Please try again.");
  }
}

// Run a few examples automatically
console.log("\n--- Running Examples Automatically ---");
runExample('1');
runExample('2');
runExample('3');
runExample('4');