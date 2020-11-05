"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
function default_1(password) {
    var salt = "SistemaDeGerenciamento";
    return crypto_1.default.createHash("sha512").update(password + salt).digest("hex");
}
exports.default = default_1;
