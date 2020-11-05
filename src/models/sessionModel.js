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
var moment_1 = __importDefault(require("moment"));
var SessionModel = /** @class */ (function () {
    function SessionModel() {
    }
    /*
      Saves section and user tokens to verify that the section is valid
    */
    SessionModel.prototype.create = function (userToken) {
        return __awaiter(this, void 0, void 0, function () {
            var response, insertedSession;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = {
                            message: "Sessão autenticada com sucesso",
                            token: {},
                        };
                        return [4 /*yield*/, connection_1.default("sessions")
                                .insert({
                                user_id: userToken.userId,
                                auth_token: userToken.authToken,
                                session_token: userToken.sessionToken,
                            })
                                .then(function (data) {
                                response.token = userToken;
                            })
                                .catch(function (e) {
                                response.message = "Erro de autenticação! Tente novamente mais tarde.";
                            })];
                    case 1:
                        insertedSession = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    SessionModel.prototype.renew = function (userToken) {
        return __awaiter(this, void 0, void 0, function () {
            var returnable, getValues, updatedSession;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default("sessions")
                            .where("session_token", userToken.sessionToken)
                            .select("expires_at")];
                    case 1:
                        getValues = _a.sent();
                        if (moment_1.default(getValues[0].expires_at) < moment_1.default()) {
                            return [2 /*return*/, {
                                    message: "Token inválido",
                                }];
                        }
                        return [4 /*yield*/, connection_1.default("sessions")
                                .where("session_token", userToken.sessionToken)
                                .where("expires_at", ">=", moment_1.default(getValues[0].expires_at).toISOString())
                                .update({
                                expires_at: moment_1.default(getValues[0].expires_at)
                                    .add(5, "minutes")
                                    .toISOString(),
                            })
                                .then(function (data) {
                                console.log(data);
                                returnable = { status: "updated" };
                            })
                                .catch(function (e) {
                                returnable = { status: e };
                            })];
                    case 2:
                        updatedSession = _a.sent();
                        return [2 /*return*/, returnable];
                }
            });
        });
    };
    SessionModel.prototype.verify = function (sessionToken) {
        return __awaiter(this, void 0, void 0, function () {
            var returnable, is_valid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnable = {
                            message: "Token inválido",
                            is_valid: false,
                        };
                        return [4 /*yield*/, connection_1.default("sessions")
                                .where("session_token", sessionToken)
                                .select("expires_at")
                                .then(function (data) {
                                if (moment_1.default(data[0].expires_at) > moment_1.default()) {
                                    returnable = {
                                        message: "Token válido",
                                        is_valid: true,
                                    };
                                }
                                else {
                                    returnable = {
                                        message: "Token inválido",
                                        is_valid: false,
                                    };
                                }
                            })
                                .catch(function (e) {
                                returnable = {
                                    message: "Erro durante a transação de informações",
                                    is_valid: false,
                                };
                                console.log(e);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, returnable];
                }
            });
        });
    };
    return SessionModel;
}());
exports.default = SessionModel;
