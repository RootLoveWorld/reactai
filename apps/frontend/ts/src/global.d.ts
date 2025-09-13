// Global type definitions for browser examples

// Extend the Window interface to include our custom functions
interface Window {
  runBasicExample: () => string;
  runClassExample: () => string;
  runInterfaceExample: () => string;
  runGenericExample: () => string;
  demonstrateTypeScriptFeatures: () => string;
  displayOutput: (text: string) => void;
}