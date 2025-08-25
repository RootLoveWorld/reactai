// Multiply(Divide(Add(3,1),2),3)

// tokens
// 1. tokens 提取 tokenizer 拆解为词法单元
// 2. AST


function tokenize(expression) {
    const tokens = [];
    let current = 0;

    while (current < expression.length) {
        let char = expression[current];

        // Skip whitespace
        if (/\s/.test(char)) {
            current++;
            continue;
        }

        // Handle numbers (including decimal numbers)
        if (/[0-9]/.test(char)) {
            let value = '';
            let hasDecimal = false;
            
            while (char && (/[0-9]/.test(char) || (char === '.' && !hasDecimal))) {
                if (char === '.') {
                    hasDecimal = true;
                }
                value += char;
                char = expression[++current];
            }
            
            tokens.push({
                type: 'Number',
                value: parseFloat(value)
            });
            continue;
        }

        // Handle operators
        if (/[+\-*/]/.test(char)) {
            tokens.push({
                type: 'Operator',
                value: char
            });
            current++;
            continue;
        }

        // Handle parentheses
        if (char === '(') {
            tokens.push({
                type: 'LeftParen',
                value: char
            });
            current++;
            continue;
        }
        
        if (char === ')') {
            tokens.push({
                type: 'RightParen',
                value: char
            });
            current++;
            continue;
        }

        // Handle comma
        if (char === ',') {
            tokens.push({
                type: 'Comma',
                value: char
            });
            current++;
            continue;
        }

        // Handle identifiers and function names (support alphanumeric and underscore)
        if (/[a-zA-Z_]/.test(char)) {
            let value = '';
            
            while (char && /[a-zA-Z0-9_]/.test(char)) {
                value += char;
                current++;
                char = expression[current];
            }

            // Look ahead to determine if it's a function call
            let lookahead = current;
            while (lookahead < expression.length && /\s/.test(expression[lookahead])) {
                lookahead++;
            }
            
            if (lookahead < expression.length && expression[lookahead] === '(') {
                tokens.push({
                    type: 'Function',
                    value: value
                });
            } else {
                tokens.push({
                    type: 'Identifier',
                    value: value
                });
            }
            continue;
        }

        // Handle unexpected characters
        throw new Error(`Unexpected character '${char}' at position ${current}`);
    }

    return tokens;
}


// Test the enhanced tokenize function
console.log('=== Testing Enhanced Tokenize Function ===\n');

// Test 1: Original example
console.log('Test 1 - Function calls with nested expressions:');
console.log('Input: "Multiply(Divide(Add(3,1),2),3)"');
console.log('Output:', tokenize("Multiply(Divide(Add(3,1),2),3)"));
console.log();

// Test 2: Decimal numbers
console.log('Test 2 - Decimal numbers:');
console.log('Input: "Add(3.14, 2.5)"');
console.log('Output:', tokenize("Add(3.14, 2.5)"));
console.log();

// Test 3: Simple arithmetic expression
console.log('Test 3 - Simple arithmetic:');
console.log('Input: "a + b * 2.5 - c"');
console.log('Output:', tokenize("a + b * 2.5 - c"));
console.log();

// Test 4: Function with multiple parameters
console.log('Test 4 - Function with spaces:');
console.log('Input: "pow( x , 2 ) + sqrt( y )"');
console.log('Output:', tokenize("pow( x , 2 ) + sqrt( y )"));
console.log();