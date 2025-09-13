// Simple TypeScript example that can be run in Node.js

// Basic types
const greeting: string = "Hello, TypeScript!";
const year: number = 2023;
// Commenting out unused variable to fix ESLint warning
// const isTypeScriptAwesome: boolean = true;

// Interface
interface Developer {
  name: string;
  age: number;
  skills: string[];
  greet(): string;
  // Adding the missing method to fix TypeScript error
  learnNewSkill(skill: string): void;
}

// Class implementing interface
class TypeScriptDeveloper implements Developer {
  constructor(
    public name: string,
    public age: number,
    public skills: string[]
  ) {}

  greet(): string {
    return `Hi, I'm ${this.name}, a ${this.age}-year-old developer skilled in ${this.skills.join(", ")}.`;
  }

  // Implementing the missing method
  learnNewSkill(skill: string): void {
    this.skills.push(skill);
    console.log(`${this.name} learned a new skill: ${skill}`);
  }
}

// Function with optional parameter
function introduce(developer: Developer, showSkills: boolean = true): string {
  let introduction = developer.greet();
  
  if (showSkills) {
    introduction += ` My skills include: ${developer.skills.join(", ")}.`;
  }
  
  return introduction;
}

// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Array of developers
const developers: Developer[] = [
  new TypeScriptDeveloper("Alice", 25, ["TypeScript", "React"]),
  new TypeScriptDeveloper("Bob", 30, ["JavaScript", "Node.js"])
];

// Main execution
console.log(greeting);
console.log(`Current year: ${year}`);

// Using the developers
developers.forEach(dev => {
  console.log(introduce(dev));
  
  // Learning new skills
  dev.learnNewSkill("TypeScript Advanced");
});

// Using generic function
const stringResult = identity<string>("Hello");
const numberResult = identity<number>(42);
console.log(`Generic function results: ${stringResult}, ${numberResult}`);

// Union types example
type Status = "pending" | "approved" | "rejected";

function checkStatus(status: Status): string {
  switch (status) {
    case "pending":
      return "Your request is pending approval";
    case "approved":
      return "Your request has been approved";
    case "rejected":
      return "Your request has been rejected";
    default:
      return "Unknown status";
  }
}

console.log(checkStatus("approved"));
console.log(checkStatus("pending"));

// Type assertion example
const someValue: unknown = "this is a string";
const strLength: number = (someValue as string).length;
console.log(`Length of string: ${strLength}`);

// Using CommonJS export syntax to fix verbatimModuleSyntax error
exports.TypeScriptDeveloper = TypeScriptDeveloper;
exports.introduce = introduce;