"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runtimeCaching = void 0;
const cache_1 = __importDefault(require("next-pwa/cache"));
exports.runtimeCaching = cache_1.default.map((rule) => {
    if (rule.options?.cacheName === 'next-data') {
        rule.handler = 'NetworkFirst';
    }
    return rule;
});
