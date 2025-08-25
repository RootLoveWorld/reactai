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

// 语法分析 parser 将词法单元转换成抽象语法树
function parse(tokens) {
    let current = 0;

    // Helper function to peek at current token
    function peek() {
        return tokens[current];
    }

    // Helper function to consume current token
    function consume(expectedType = null) {
        if (expectedType && peek()?.type !== expectedType) {
            throw new Error(`Expected ${expectedType}, got ${peek()?.type || 'EOF'}`);
        }
        return tokens[current++];
    }

    // Parse primary expressions (numbers, identifiers, parentheses, function calls)
    function parsePrimary() {
        const token = peek();

        if (!token) {
            throw new Error('Unexpected end of expression');
        }

        if (token.type === 'Number') {
            consume();
            return {
                type: 'Literal',
                value: token.value
            };
        }

        if (token.type === 'Identifier') {
            consume();
            return {
                type: 'Identifier',
                name: token.value
            };
        }

        if (token.type === 'Function') {
            return parseFunctionCall();
        }

        if (token.type === 'LeftParen') {
            consume('LeftParen');
            const expr = parseExpression();
            consume('RightParen');
            return expr;
        }

        throw new Error(`Unexpected token: ${token.type}`);
    }

    // Parse function calls
    function parseFunctionCall() {
        const functionToken = consume('Function');
        consume('LeftParen');
        
        const args = [];
        
        // Handle empty parameter list
        if (peek()?.type === 'RightParen') {
            consume('RightParen');
            return {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: functionToken.value
                },
                arguments: args
            };
        }
        
        // Parse arguments
        do {
            args.push(parseExpression());
            if (peek()?.type === 'Comma') {
                consume('Comma');
            } else {
                break;
            }
        } while (peek()?.type !== 'RightParen');
        
        consume('RightParen');
        
        return {
            type: 'CallExpression',
            callee: {
                type: 'Identifier',
                name: functionToken.value
            },
            arguments: args
        };
    }

    // Parse multiplication and division (higher precedence)
    function parseMultiplicative() {
        let left = parsePrimary();
        
        while (peek()?.type === 'Operator' && /[*/]/.test(peek().value)) {
            const operator = consume('Operator');
            const right = parsePrimary();
            
            left = {
                type: 'BinaryExpression',
                operator: operator.value,
                left: left,
                right: right
            };
        }
        
        return left;
    }

    // Parse addition and subtraction (lower precedence)
    function parseAdditive() {
        let left = parseMultiplicative();
        
        while (peek()?.type === 'Operator' && /[+-]/.test(peek().value)) {
            const operator = consume('Operator');
            const right = parseMultiplicative();
            
            left = {
                type: 'BinaryExpression',
                operator: operator.value,
                left: left,
                right: right
            };
        }
        
        return left;
    }

    // Parse full expression (entry point)
    function parseExpression() {
        return parseAdditive();
    }

    // Parse the entire token stream
    const ast = parseExpression();
    
    if (current < tokens.length) {
        throw new Error(`Unexpected token after expression: ${peek().type}`);
    }
    
    return ast;
}

// Helper function to pretty print AST
function printAST(node, indent = 0) {
    const spaces = '  '.repeat(indent);
    
    switch (node.type) {
        case 'Literal':
            return `${spaces}Literal: ${node.value}`;
        case 'Identifier':
            return `${spaces}Identifier: ${node.name}`;
        case 'BinaryExpression':
            return `${spaces}BinaryExpression (${node.operator}):\n` +
                   `${printAST(node.left, indent + 1)}\n` +
                   `${printAST(node.right, indent + 1)}`;
        case 'CallExpression':
            const args = node.arguments.map(arg => printAST(arg, indent + 1)).join('\n');
            return `${spaces}CallExpression:\n` +
                   `${spaces}  callee: ${node.callee.name}\n` +
                   `${spaces}  arguments:\n${args}`;
        default:
            return `${spaces}Unknown: ${node.type}`;
    }
}

// Test parser with various expressions
console.log('\n=== Testing Parser (Tokens to AST) ===\n');

function testParser(expression) {
    console.log(`Expression: "${expression}"`);
    try {
        const tokens = tokenize(expression);
        console.log('Tokens:', tokens);
        
        const ast = parse(tokens);
        console.log('AST:');
        console.log(printAST(ast));
        console.log('\nAST Object:', JSON.stringify(ast, null, 2));
    } catch (error) {
        console.error('Parser Error:', error.message);
    }
    console.log('\n' + '='.repeat(50) + '\n');
}

// Test cases
testParser("Multiply(Divide(Add(3,1),2),3)");
testParser("a + b * 2");
testParser("pow(x, 2) + sqrt(y)");
testParser("(a + b) * c");