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
var LocationModel = /** @class */ (function () {
    function LocationModel() {
    }
    LocationModel.prototype.insert = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            var returnable, insertedRows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default("locations")
                            .insert(location)
                            .then(function (data) {
                            returnable = { message: "Espaço cadastrado com sucesso" };
                        })
                            .catch(function (err) {
                            returnable = { error: "Erro ao excluir espaço" };
                        })];
                    case 1:
                        insertedRows = _a.sent();
                        return [2 /*return*/, returnable];
                }
            });
        });
    };
    LocationModel.prototype.update = function (location, locationId) {
        return __awaiter(this, void 0, void 0, function () {
            var returnable, canIUpdate, updatedRows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default("locations")
                            .select("*")
                            .where("id", locationId)];
                    case 1:
                        canIUpdate = _a.sent();
                        if (!canIUpdate[0]) {
                            return [2 /*return*/, {
                                    error: "Espaço não existente",
                                }];
                        }
                        return [4 /*yield*/, connection_1.default("locations")
                                .where("id", locationId)
                                .update(location)
                                .then(function (data) {
                                returnable = { message: "Espaço alterado com sucesso" };
                            })
                                .catch(function (err) {
                                returnable = { error: "Erro ao alterar espaço" };
                            })];
                    case 2:
                        updatedRows = _a.sent();
                        return [2 /*return*/, returnable];
                }
            });
        });
    };
    LocationModel.prototype.delete = function (locationId) {
        return __awaiter(this, void 0, void 0, function () {
            var returnable, canIUpdate, deletedRows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default("locations")
                            .select("*")
                            .where("id", locationId)];
                    case 1:
                        canIUpdate = _a.sent();
                        if (!canIUpdate[0]) {
                            return [2 /*return*/, {
                                    error: "Espaço não existente",
                                }];
                        }
                        return [4 /*yield*/, connection_1.default("locations")
                                .where("id", locationId)
                                .delete()
                                .then(function (data) {
                                returnable = { message: "Espaço excluído com sucesso" };
                            })
                                .catch(function (err) {
                                returnable = { error: "Erro ao excluir espaço" };
                            })];
                    case 2:
                        deletedRows = _a.sent();
                        return [2 /*return*/, returnable];
                }
            });
        });
    };
    LocationModel.prototype.getList = function (perPage, page) {
        return __awaiter(this, void 0, void 0, function () {
            var returnable, numberofPages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default("locations").select("id")];
                    case 1:
                        numberofPages = _a.sent();
                        console.log(page);
                        if (!(page !== null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, connection_1.default("locations")
                                .select("*")
                                .limit(perPage || 10)
                                .offset(page * perPage || 1)
                                .then(function (data) {
                                returnable = {
                                    numberofPages: numberofPages.length / (perPage || 10),
                                    data: data,
                                };
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, connection_1.default("locations")
                            .select("*")
                            .then(function (data) {
                            returnable = {
                                numberofPages: numberofPages.length / (perPage || 10),
                                data: data,
                            };
                        })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, returnable];
                }
            });
        });
    };
    LocationModel.prototype.detail = function (locationId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default("locations").where("id", locationId).select("*")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LocationModel.prototype.search = function (term, type) {
        return __awaiter(this, void 0, void 0, function () {
            var returnable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (term == undefined)
                            term = "";
                        if (type == undefined)
                            type = "";
                        if (!((term != null || term != undefined || term != "") &&
                            (type == null || type == undefined || type == ""))) return [3 /*break*/, 2];
                        return [4 /*yield*/, connection_1.default("locations")
                                .where("comments", "like", "%" + term + "%")
                                .select("*")
                                .catch(function (err) {
                                console.log("A");
                            })];
                    case 1:
                        returnable = _a.sent();
                        return [3 /*break*/, 8];
                    case 2:
                        if (!((type == null || type == undefined || type == "") &&
                            (term != null || term != undefined || term != ""))) return [3 /*break*/, 4];
                        return [4 /*yield*/, connection_1.default("locations")
                                .where("type", type)
                                .select("*")
                                .catch(function (err) {
                                console.log(err);
                            })];
                    case 3:
                        returnable = _a.sent();
                        return [3 /*break*/, 8];
                    case 4:
                        if (!((type == null || type == undefined || type == "") &&
                            (term == null || term == undefined || term == ""))) return [3 /*break*/, 6];
                        return [4 /*yield*/, connection_1.default("locations")
                                .select("*")
                                .catch(function (err) {
                                console.log(err);
                            })];
                    case 5:
                        returnable = _a.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        if (!((type != null || type != undefined || type != "") &&
                            (term != null || term != undefined || term != ""))) return [3 /*break*/, 8];
                        return [4 /*yield*/, connection_1.default("locations")
                                .where("comments", "like", "%" + term + "%")
                                .where("type", type)
                                .select("*")
                                .catch(function (err) {
                                console.log(err);
                            })];
                    case 7:
                        returnable = _a.sent();
                        _a.label = 8;
                    case 8: return [2 /*return*/, returnable];
                }
            });
        });
    };
    return LocationModel;
}());
exports.default = LocationModel;
