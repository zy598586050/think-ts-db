"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstToUpper = void 0;
// 首字母大写
const firstToUpper = (str) => {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
};
exports.firstToUpper = firstToUpper;
