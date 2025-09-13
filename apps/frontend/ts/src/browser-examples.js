// Browser-compatible JavaScript examples
// This file can be directly used in HTML without module issues

// Basic example
function runBasicExample() {
  try {
    // Simple example
    const message = "Hello, TypeScript!";
    const count = 42;
    const result = `Message: ${message}\nCount: ${count}\nMultiplication: ${count * 2}`;
    return result;
  } catch (error) {
    return "Error: " + error.message;
  }
}

// Class example
function runClassExample() {
  try {
    // Class example
    class Greeter {
      constructor(message) {
        this.greeting = message;
      }
      
      greet() {
        return "Hello, " + this.greeting;
      }
    }
    
    const greeter = new Greeter("world");
    return greeter.greet();
  } catch (error) {
    return "Error: " + error.message;
  }
}

// Interface-like example (using objects)
function runInterfaceExample() {
  try {
    // Object example
    function greeter(person) {
      return "Hello, " + person.firstName + " " + person.lastName;
    }
    
    const user = { firstName: "Jane", lastName: "User" };
    return greeter(user);
  } catch (error) {
    return "Error: " + error.message;
  }
}

// Generic-like example
function runGenericExample() {
  try {
    // Generic-like example
    function identity(arg) {
      return arg;
    }
    
    const output1 = identity("Hello");
    const output2 = identity(42);
    const result = `String identity: ${output1}\nNumber identity: ${output2}`;
    return result;
  } catch (error) {
    return "Error: " + error.message;
  }
}

// Simple function to demonstrate various features
function demonstrateTypeScriptFeatures() {
  // Basic types
  const year = 2023;

  // Array
  const features = [
    "Static typing",
    "Interfaces",
    "Generics",
    "Classes",
    "Modules"
  ];

  // Object
  const tsInfo = {
    version: "5.0",
    features: features,
    releaseYear: year
  };

  // Function with optional parameter
  function formatInfo(info, showFeatures = true) {
    let result = `TypeScript ${info.version} (${info.releaseYear})\n`;
    
    if (showFeatures) {
      result += "Key features:\n";
      info.features.forEach((feature, index) => {
        result += `  ${index + 1}. ${feature}\n`;
      });
    }
    
    return result;
  }

  return formatInfo(tsInfo);
}

// Simple function to display output
function displayOutput(text) {
  const outputElement = document.getElementById('output');
  if (outputElement) {
    outputElement.textContent = text;
  }
}

// Expose functions to global scope for HTML onclick handlers
if (typeof window !== 'undefined') {
  window.runBasicExample = runBasicExample;
  window.runClassExample = runClassExample;
  window.runInterfaceExample = runInterfaceExample;
  window.runGenericExample = runGenericExample;
  window.demonstrateTypeScriptFeatures = demonstrateTypeScriptFeatures;
  window.displayOutput = displayOutput;
}

console.log("Browser-compatible JavaScript examples loaded!");