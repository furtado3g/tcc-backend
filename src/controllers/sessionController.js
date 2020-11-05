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
var createToken_1 = __importDefault(require("../util/createToken"));
var sessionModel_1 = __importDefault(require("../models/sessionModel"));
var connection_1 = __importDefault(require("../database/connection"));
var verify_1 = __importDefault(require("../util/verify"));
var verifier = new verify_1.default();
var sessionController = /** @class */ (function () {
    function sessionController() {
    }
    sessionController.prototype.newSession = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var model, authToken, sessionToken, token, insertedSession, data, returnableToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        model = new sessionModel_1.default();
                        return [4 /*yield*/, createToken_1.default(userId, 'auth')];
                    case 1:
                        authToken = _a.sent();
                        return [4 /*yield*/, createToken_1.default(userId, 'session' + Date.now())];
                    case 2:
                        sessionToken = _a.sent();
                        token = {
                            userId: userId,
                            authToken: authToken,
                            sessionToken: sessionToken
                        };
                        return [4 /*yield*/, model.create(token)];
                    case 3:
                        insertedSession = _a.sent();
                        return [4 /*yield*/, connection_1.default('sessions').select('expires_at').where('session_token', '=', sessionToken)];
                    case 4:
                        data = _a.sent();
                        returnableToken = {
                            authToken: authToken,
                            sessionToken: sessionToken,
                            expires_at: data[0].expires_at
                        };
                        if (!insertedSession.message.includes('Erro')) {
                            return [2 /*return*/, returnableToken];
                        }
                        else {
                            return [2 /*return*/, {
                                    message: "Erro ao persistir sessão no banco de dados"
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    sessionController.prototype.extendSession = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, authToken, authorization, reserveId, model, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = req.body, userId = _a.userId, authToken = _a.authToken;
                        authorization = req.headers.authorization;
                        reserveId = req.params.reserveId;
                        if (!verifier.verifyNullIncommingFields({ reserveId: reserveId, authorization: authorization, userId: userId, authToken: authToken }))
                            return [2 /*return*/, res.status(404).json({ message: "Campo obrigatório não informado" })];
                        model = new sessionModel_1.default();
                        console.log(authorization);
                        _c = (_b = res).json;
                        return [4 /*yield*/, model.renew({
                                "userId": userId,
                                "sessionToken": authorization,
                                "authToken": authToken
                            })];
                    case 1: return [2 /*return*/, _c.apply(_b, [_d.sent()])];
                }
            });
        });
    };
    return sessionController;
}());
exports.default = sessionController;
