"use strict";

var _obj$name;
// 1. 箭头函数

var fn = function fn(a, b) {
  return a + b;
};

// 2.可选链式语法

var obj = {
  name: {
    age: {
      life: {
        z: 1
      }
    }
  }
};
console.log(obj === null || obj === void 0 || (_obj$name = obj.name) === null || _obj$name === void 0 || (_obj$name = _obj$name.age) === null || _obj$name === void 0 || (_obj$name = _obj$name.life) === null || _obj$name === void 0 ? void 0 : _obj$name.z);