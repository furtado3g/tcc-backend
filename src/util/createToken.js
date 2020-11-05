"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
function default_1(username, typeToken) {
    var secret = "A$N0tH1nG" + typeToken;
    var token = jsonwebtoken_1.default.sign({ username: username }, secret);
    return token;
}
exports.default = default_1;
