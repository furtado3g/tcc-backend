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
var knex_paginate_1 = require("knex-paginate");
var ReserveModel = /** @class */ (function () {
    function ReserveModel() {
    }
    ReserveModel.prototype.insert = function (reserve) {
        return __awaiter(this, void 0, void 0, function () {
            var returnable, labIsTaken, insertedRows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default('reservations')
                            .where('location_id', reserve.location_id)
                            .where('date', reserve.date)
                            .whereBetween('time_start', [reserve.time_end, reserve.time_start])
                            .whereBetween('time_end', [reserve.time_end, reserve.time_start])];
                    case 1:
                        labIsTaken = _a.sent();
                        if (labIsTaken[0]) {
                            return [2 /*return*/, {
                                    message: "Espaço já reservado"
                                }];
                        }
                        return [4 /*yield*/, connection_1.default('reservations').insert(reserve)
                                .then(function (data) {
                                console.log(data);
                                returnable = {
                                    message: "Reserva efetuada com sucesso"
                                };
                            })
                                .catch(function (e) {
                                //traduzir retorno a baixo
                                returnable = {
                                    error: "Erro ao realizar reserva"
                                };
                            })];
                    case 2:
                        insertedRows = _a.sent();
                        return [2 /*return*/, returnable];
                }
            });
        });
    };
    ReserveModel.prototype.update = function (reserve, reserveId) {
        return __awaiter(this, void 0, void 0, function () {
            var returnable, insertedRows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(reserve);
                        return [4 /*yield*/, connection_1.default('reservations')
                                .where('id', reserveId)
                                .update(reserve)
                                .then(function (data) {
                                returnable = {
                                    message: "Reserva atualizada com sucesso"
                                };
                            }).catch(function () {
                                returnable = {
                                    error: "Erro ao atualizar reserva"
                                };
                            })];
                    case 1:
                        insertedRows = _a.sent();
                        return [2 /*return*/, returnable];
                }
            });
        });
    };
    ReserveModel.prototype.delete = function (reserveId) {
        return __awaiter(this, void 0, void 0, function () {
            var returnable, deletedRows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default('reservations')
                            .where('id', '=', reserveId)
                            .delete()
                            .then(function (data) {
                            returnable = {
                                message: "Reserva excluída com sucesso"
                            };
                        }).catch(function (e) {
                            returnable = {
                                error: "Erro ao excluir reserva"
                            };
                        })];
                    case 1:
                        deletedRows = _a.sent();
                        return [2 /*return*/, returnable];
                }
            });
        });
    };
    ReserveModel.prototype.list = function (page, perPage) {
        return __awaiter(this, void 0, void 0, function () {
            var itens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        knex_paginate_1.attachPaginate();
                        return [4 /*yield*/, connection_1.default('reservations')
                                .limit(perPage || 10)
                                .offset((page * perPage) || 1)
                                .select('*')];
                    case 1:
                        itens = _a.sent();
                        return [2 /*return*/, itens];
                }
            });
        });
    };
    ReserveModel.prototype.detail = function (reserveId) {
        return __awaiter(this, void 0, void 0, function () {
            var reserve;
            return __generator(this, function (_a) {
                reserve = connection_1.default('reservations').select('*').where('id', reserveId);
                return [2 /*return*/, reserve];
            });
        });
    };
    return ReserveModel;
}());
exports.default = ReserveModel;
