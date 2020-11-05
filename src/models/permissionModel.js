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
var connection_1 = __importDefault(require("../database/connection"));
var PermissionModel = /** @class */ (function () {
    function PermissionModel() {
    }
    PermissionModel.prototype.assign = function (idUser, url) {
        return __awaiter(this, void 0, void 0, function () {
            var tp_user, id_permission, returnable, permissionExists, insertedRows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserType(idUser)];
                    case 1:
                        tp_user = _a.sent();
                        return [4 /*yield*/, this.getEndPointId(url)];
                    case 2:
                        id_permission = _a.sent();
                        return [4 /*yield*/, connection_1.default('type_user_permisions')
                                .where('tp_user', tp_user[0].user_type)
                                .where('id_permission', id_permission[0].id)];
                    case 3:
                        permissionExists = _a.sent();
                        if (permissionExists[0])
                            return [2 /*return*/, { error: "Permissão já atribuída" }];
                        return [4 /*yield*/, connection_1.default('type_user_permisions')
                                .insert({
                                id_permission: id_permission[0].id,
                                tp_user: tp_user[0].user_type
                            })
                                .then(function (data) {
                                returnable = data;
                            }).catch(function (e) {
                                returnable = { error: e };
                            })];
                    case 4:
                        insertedRows = _a.sent();
                        return [2 /*return*/, returnable];
                }
            });
        });
    };
    PermissionModel.prototype.verify = function (idUser, url) {
        return __awaiter(this, void 0, void 0, function () {
            var returnable, endpoint, user, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default('permissions')
                            .where('endpoint', url)
                            .select('id')];
                    case 1:
                        endpoint = _a.sent();
                        if (!endpoint[0]) {
                            return [2 /*return*/, {
                                    error: "Endpoint não cadastrado"
                                }];
                        }
                        return [4 /*yield*/, connection_1.default.from('users')
                                .where('id', idUser)
                                .select('*')];
                    case 2:
                        user = _a.sent();
                        if (!endpoint[0]) {
                            return [2 /*return*/, {
                                    "error": "Usuário inexistente"
                                }];
                        }
                        return [4 /*yield*/, connection_1.default('type_user_permisions')
                                .where("id_permission", endpoint[0].id)
                                .where('tp_user', user[0].user_type)
                                .select('*')
                                .then(function (data) {
                                returnable = {
                                    granted: true,
                                    result: data
                                };
                            })
                                .catch(function (e) {
                                console.log(e);
                                returnable = {
                                    granted: true
                                };
                            })];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, returnable];
                }
            });
        });
    };
    PermissionModel.prototype.newEndPoint = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var returnable, endpointExists, insertedRows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default('permissions')
                            .where('endpoint', url)
                            .select('*')];
                    case 1:
                        endpointExists = _a.sent();
                        if (endpointExists[0]) {
                            return [2 /*return*/, {
                                    error: "Endpoint já cadastrado"
                                }];
                        }
                        return [4 /*yield*/, connection_1.default('permissions')
                                .insert({ "endpoint": url }).then(function (selectedTodo) {
                                console.log(selectedTodo);
                                returnable = { message: "Endpoint cadastrado com sucesso" };
                            })
                                .catch(function (e) {
                                returnable = { error: e };
                            })];
                    case 2:
                        insertedRows = _a.sent();
                        return [2 /*return*/, returnable];
                }
            });
        });
    };
    PermissionModel.prototype.newUserType = function (description) {
        return __awaiter(this, void 0, void 0, function () {
            var returnable, userTypeExists, insertedRows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default('user_type')
                            .where('description', description)
                            .select('*')];
                    case 1:
                        userTypeExists = _a.sent();
                        if (userTypeExists[0]) {
                            return [2 /*return*/, {
                                    error: "Tipo de usuário já cadastrado"
                                }];
                        }
                        return [4 /*yield*/, connection_1.default('user_type')
                                .insert({ description: description })
                                .then(function () { returnable = { message: "Tipo de usuário cadastrado com sucesso" }; })
                                .catch(function (e) { returnable = { error: e }; })];
                    case 2:
                        insertedRows = _a.sent();
                        return [2 /*return*/, returnable];
                }
            });
        });
    };
    PermissionModel.prototype.listUserPermissions = function (idUser) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default('type_user_permisions')
                            .join("users", "users.user_type", "type_user_permisions.tp_user")
                            .join("permissions", "permissions.id", "type_user_permisions.id_permission")
                            .where("users.id", idUser)
                            .select('permissions.id', 'permissions.endpoint', 'users.name')];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    PermissionModel.prototype.getUserType = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default('users').where('id', id).select('users.user_type')];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    PermissionModel.prototype.getEndPointId = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default('permissions').where('endpoint', url).select('id')];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return PermissionModel;
}());
exports.default = PermissionModel;
