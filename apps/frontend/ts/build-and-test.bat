@echo off
echo Building TypeScript files for Node.js...
npx tsc

echo.
echo Building TypeScript files for browser...
npx tsc --project tsconfig.browser.json

echo.
echo Build complete! You can now:
echo 1. Open public/index.html in your browser to test browser examples
echo 2. Run node dist/index.js to test Node.js examples
echo 3. Run npm run run-examples for interactive Node.js examples