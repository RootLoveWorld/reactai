# TypeScript Learning Environment

This is a comprehensive TypeScript learning environment set up for you to experiment with TypeScript concepts.

## Folder Structure

```
ts/
├── src/                 # TypeScript source files
│   ├── 1.ts             # Simple bigint example
│   ├── index.ts         # Advanced TypeScript examples
│   ├── learning-examples.ts # Comprehensive TypeScript examples
│   ├── hello-ts.ts      # Practical TypeScript examples
│   ├── browser-examples.js # Browser-compatible JavaScript examples
│   ├── expose-globals.js # Script to expose functions to global scope
│   ├── global.d.ts      # Global type definitions
│   └── test.ts          # Simple test file
├── dist/                # Compiled JavaScript files
├── public/              # HTML files for browser testing
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies and scripts
```

## Getting Started

1. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

2. **Compile TypeScript files**:
   ```bash
   npm run compile
   ```
   or watch for changes:
   ```bash
   npm run compile:watch
   ```

3. **Compile for browser use**:
   ```bash
   npm run compile:browser
   ```

4. **Build for both Node and browser**:
   ```bash
   npm run build:all
   ```

5. **Type checking** (without emitting files):
   ```bash
   npm run type-check
   ```
   or watch for changes:
   ```bash
   npm run type-check:watch
   ```

6. **Clean build**:
   ```bash
   npm run clean
   ```

7. **Build project**:
   ```bash
   npm run build
   ```

## Learning Resources

The following files contain examples of various TypeScript concepts:

### 1.ts
Simple example showing bigint usage:
```typescript
let big: bigint = 100n;
console.log(big);
```

### index.ts
Advanced TypeScript concepts including:
- Interfaces and type definitions
- Inheritance and extensions
- Generic constraints
- Conditional types
- Type inference with `infer`
- Custom type guards

### learning-examples.ts
Comprehensive examples covering:
- Basic types (boolean, number, string, etc.)
- Arrays and tuples
- Enums
- Any, void, null, undefined, never
- Type assertions
- Interfaces
- Classes and inheritance
- Access modifiers (public, private, protected)
- Static properties
- Abstract classes
- Advanced types (intersection, union)
- Type guards
- Generics
- Modules and namespaces
- Declaration merging

### Browser Examples

For browser usage, you can directly open `public/index.html` in your browser. This file loads the JavaScript version of the examples which avoids all module system issues.

If you want to compile the browser examples:

1. Compile for browser: `npm run compile:browser` or `npm run build:all`
2. The compiled files will be in the `dist/` directory
3. Open `public/index.html` in your browser

## Testing in Node.js

1. Compile TypeScript files:
   ```bash
   npm run compile
   ```

2. Run individual files:
   ```bash
   node dist/index.js
   ```

3. Or run the interactive runner:
   ```bash
   npm run run-examples
   ```

## Key TypeScript Concepts Covered

1. **Basic Types**: boolean, number, string, array, tuple, enum, any, void, null, undefined, never, object
2. **Interfaces**: Defining object shapes, optional properties, readonly properties
3. **Functions**: Function types, optional/default parameters, rest parameters
4. **Classes**: Inheritance, access modifiers, static properties, abstract classes
5. **Generics**: Generic functions, interfaces, classes, constraints
6. **Advanced Types**: Intersection types, union types, type guards, type aliases
7. **Modules**: Export/import syntax
8. **Namespaces**: Organizing code
9. **Declaration Merging**: Combining interfaces

## Practice Exercises

Try modifying the existing examples or create new files in the `src/` directory to practice:

1. Create a new file `src/practice.ts`
2. Add some TypeScript code to experiment with
3. Compile with `npm run compile`
4. Check the output in the `dist/` folder

## Configuration

The `tsconfig.json` is configured with strict type checking and modern JavaScript targets. Key settings include:

- `"strict": true` - Enables all strict type checking options
- `"target": "es2020"` - Target modern JavaScript
- `"module": "commonjs"` - Use CommonJS modules for Node.js
- `"jsx": "react-jsx"` - Support for JSX syntax
- `"sourceMap": true` - Generate source maps for debugging
- `"declaration": true` - Generate declaration files

Happy learning!