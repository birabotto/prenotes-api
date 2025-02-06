"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatNumber = (number) => {
    const numString = String(number);
    return numString.padStart(8, "0");
};
exports.default = formatNumber;
