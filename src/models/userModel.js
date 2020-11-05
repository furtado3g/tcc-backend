"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var connection_1 = __importDefault(require("../database/connection"));
var digestHash_1 = __importDefault(require("../util/digestHash"));
var mailer_1 = __importDefault(require("../util/mailer"));
var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    UserModel.prototype.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var usernameExists, emailExists, insertedRows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default('users')
                            .select('*')
                            .where('username', user.username)];
                    case 1:
                        usernameExists = _a.sent();
                        console.log('usernameExists');
                        console.log(usernameExists);
                        if (usernameExists[0]) {
                            return [2 /*return*/, {
                                    "error": "Nome de usuário já cadastrado"
                                }];
                        }
                        return [4 /*yield*/, connection_1.default('users')
                                .select('*')
                                .where('email', user.email)];
                    case 2:
                        emailExists = _a.sent();
                        console.log('emailExists');
                        console.log(emailExists);
                        if (emailExists[0]) {
                            return [2 /*return*/, {
                                    "error": "Email já cadastrado"
                                }];
                        }
                        console.log(emailExists);
                        return [4 /*yield*/, connection_1.default('users').insert(user)];
                    case 3:
                        insertedRows = _a.sent();
                        console.log('insertedRows');
                        console.log(insertedRows);
                        return [2 /*return*/, insertedRows];
                }
            });
        });
    };
    UserModel.prototype.verifyUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var returnable, usernameExists, search;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default('users')
                            .select('*')
                            .where('username', user.username)
                            .where('active', true)];
                    case 1:
                        usernameExists = _a.sent();
                        if (usernameExists[0]) {
                            returnable = {
                                "error": "Nome de usuário já cadastrado"
                            };
                        }
                        return [4 /*yield*/, connection_1.default('users')
                                .where('username', user.username)
                                .where('password', user.password)
                                .where('active', true)
                                .then(function (data) {
                                if (data[0]) {
                                    returnable = { is_valid: true, user: data[0] };
                                }
                                else {
                                    returnable = { is_valid: false, user: null };
                                }
                            })
                                .catch(function (e) { returnable = { is_valid: false, user: null }; })];
                    case 2:
                        search = _a.sent();
                        return [2 /*return*/, returnable];
                }
            });
        });
    };
    UserModel.prototype.update = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var returnable, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnable = {
                            message: "message"
                        };
                        return [4 /*yield*/, connection_1.default('users')
                                .select('password')
                                .where('username', user.username)];
                    case 1:
                        users = _a.sent();
                        if (!users[0])
                            return [2 /*return*/, { message: "No user found" }];
                        return [4 /*yield*/, connection_1.default('users')
                                .where('username', user.username)
                                .where('active', true)
                                .update({
                                name: user.name,
                                email: user.email,
                                user_type: user.user_type,
                            })
                                .then(function (data) {
                                returnable.message = "Alteração de usuário realizado com sucesso";
                            })
                                .catch(function (e) {
                                returnable.message = "Erro ao atualizar usuário";
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.deactivate = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var returnable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default('users')
                            .update({
                            active: false
                        })
                            .where('id', userId)
                            .then(function (data) {
                            returnable = "Usuário desativado com sucesso";
                        })
                            .catch(function (e) {
                            console.log(e);
                            returnable = "Erro ao desativar usuário";
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, returnable];
                }
            });
        });
    };
    UserModel.prototype.recoveryPassword = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var random, digestedRandom, returnable, user, updatedRows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        random = crypto_1.randomBytes(20).toString('hex');
                        digestedRandom = digestHash_1.default(random);
                        return [4 /*yield*/, connection_1.default('users')
                                .select('password', 'id')
                                .where('active', true)
                                .where('email', email)];
                    case 1:
                        user = _a.sent();
                        if (!user[0])
                            return [2 /*return*/, false];
                        mailer_1.default.to = email;
                        mailer_1.default.subject = "RLAB: Recuperação de senha.";
                        mailer_1.default.message = "Senha alterada com sucesso. <br> Sua nova senha é : " + random;
                        mailer_1.default.sendMail();
                        return [4 /*yield*/, connection_1.default('users')
                                .where('id', user[0].id)
                                .update({
                                password: digestedRandom,
                                last_password: user[0].password
                            })
                                .then(function (data) {
                                returnable = true;
                            })
                                .catch(function (e) {
                                returnable = false;
                            })];
                    case 2:
                        updatedRows = _a.sent();
                        return [2 /*return*/, returnable];
                }
            });
        });
    };
    UserModel.prototype.updatePassword = function (userId, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var returnable, user, updatedRows;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnable = { updated: true };
                        return [4 /*yield*/, connection_1.default('users')
                                .select('password')
                                .where('active', true)
                                .where('id', userId)];
                    case 1:
                        user = _a.sent();
                        if (!user[0])
                            return [2 /*return*/, { message: "No user found" }];
                        updatedRows = connection_1.default('users')
                            .where('id', userId)
                            .update({
                            password: newPassword,
                            last_password: user[0].password
                        })
                            .then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _b = (_a = console).log;
                                        return [4 /*yield*/, data];
                                    case 1:
                                        _b.apply(_a, [_c.sent()]);
                                        returnable = { updated: true };
                                        return [2 /*return*/];
                                }
                            });
                        }); })
                            .catch(function (e) { returnable = { updated: false }; });
                        return [2 /*return*/, returnable];
                }
            });
        });
    };
    UserModel.prototype.checkAtualPassword = function (userId, actualPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var returnable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnable = true;
                        return [4 /*yield*/, connection_1.default('users')
                                .where('id', userId)
                                .where('active', true)
                                .where('password', actualPassword)
                                .select('*')
                                .then(function (data) {
                                console.log(data);
                                if (!data[0])
                                    returnable = false;
                            })
                                .catch(function (e) { returnable = false; })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, returnable];
                }
            });
        });
    };
    UserModel.prototype.detail = function (usersId) {
        return __awaiter(this, void 0, void 0, function () {
            var returnable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default('users')
                            .where('id', usersId)
                            .select('*')
                            .where('active', true)
                            .then(function (data) {
                            returnable = data[0];
                        }).catch(function (err) {
                            returnable = {
                                error: "Erro ao obter usuário"
                            };
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, returnable];
                }
            });
        });
    };
    UserModel.prototype.list = function (perPage, page) {
        return __awaiter(this, void 0, void 0, function () {
            var returnable, numberofPages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default('users')
                            .select('id')];
                    case 1:
                        numberofPages = _a.sent();
                        return [4 /*yield*/, connection_1.default('users')
                                .select('id', 'name')
                                .where('active', true)
                                .orderBy('name')
                                .limit(perPage || 10)
                                .offset((page * perPage) || 1)
                                .then(function (data) {
                                if (data[0]) {
                                    returnable = {
                                        numberofPages: numberofPages.length < perPage ? 1 : numberofPages.length / perPage || 10,
                                        data: data
                                    };
                                }
                                else {
                                    returnable = {
                                        error: "Usuário não encontrado"
                                    };
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, returnable];
                }
            });
        });
    };
    return UserModel;
}());
exports.default = UserModel;
