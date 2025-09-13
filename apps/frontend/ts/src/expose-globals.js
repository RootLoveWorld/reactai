// This JavaScript file exposes our TypeScript functions to the global scope
// for use in HTML onclick handlers

// Import the compiled TypeScript functions
// Note: In a real application, you would import these properly
// For now, we'll assume the functions are available globally

// Expose functions to global scope for HTML onclick handlers
if (typeof window !== 'undefined') {
  window.runBasicExample = runBasicExample;
  window.runClassExample = runClassExample;
  window.runInterfaceExample = runInterfaceExample;
  window.runGenericExample = runGenericExample;
  window.demonstrateTypeScriptFeatures = demonstrateTypeScriptFeatures;
  window.displayOutput = displayOutput;
}

console.log("Global functions exposed!");