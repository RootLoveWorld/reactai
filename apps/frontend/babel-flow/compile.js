import  parser from '@babel/parser'
import traverse from '@babel/traverse'
import generator from '@babel/generator'
import fs from 'fs';

const codePath = './src/index.js'
const destPath = './lib/index.js'

// 读取
const code = fs.readFileSync(codePath,{encoding:'utf-8'});


//  code -> AST
const ast = parser.parse(code);
//console.log('AST==>',ast)

// AST 
// 1. 访问者模式
const visitor = {
    VariableDeclaration(path) {
        //console.log('path==>',path)
        if(path.node.kind  === 'const' || path.node.kind === 'let'){
            path.node.kind = 'var';
        }
    }
}

// 遍历AST
traverse.default(ast,visitor)


// generation Code

const res = generator.default(ast,{},code);


// 

console.log('code==',code)
console.log('res==',res.code)

// 写入
// 判断目录
if(!fs.existsSync('./lib')){
    fs.mkdirSync('./lib');
}
fs.writeFileSync(destPath,res.code,{encoding:'utf-8'})