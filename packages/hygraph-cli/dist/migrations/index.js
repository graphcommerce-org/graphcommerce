"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableMigrations = void 0;
const graphcommerce5to6_1 = require("./graphcommerce5to6");
const graphcommerce6to7_1 = require("./graphcommerce6to7");
const graphcommerce7to8_1 = require("./graphcommerce7to8");
const graphcommerce8to9_1 = require("./graphcommerce8to9");
exports.availableMigrations = [
    graphcommerce5to6_1.graphcommerce5to6,
    graphcommerce6to7_1.graphcommerce6to7,
    graphcommerce7to8_1.graphcommerce7to8,
    graphcommerce8to9_1.graphcommerce8to9,
];
