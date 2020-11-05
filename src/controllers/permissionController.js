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
var permissionModel_1 = __importDefault(require("../models/permissionModel"));
var verify_1 = __importDefault(require("../util/verify"));
var sessionModel_1 = __importDefault(require("../models/sessionModel"));
var model = new permissionModel_1.default();
var verifier = new verify_1.default();
var session = new sessionModel_1.default();
var PermissionController = /** @class */ (function () {
    function PermissionController() {
    }
    PermissionController.prototype.newEndpoint = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var url, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = req.body.url;
                        if (!verifier.verifyNullIncommingFields({ url: url }))
                            return [2 /*return*/, res.status(404).json({ "message": "Campo obrigatório não informado" })];
                        return [4 /*yield*/, model.newEndPoint(url)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, res.json(data)];
                }
            });
        });
    };
    PermissionController.prototype.newUserType = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var description, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        description = req.body.description;
                        if (!verifier.verifyNullIncommingFields({ description: description }))
                            return [2 /*return*/, res.status(404).json({ "message": "Campo obrigatório não informado" })];
                        _b = (_a = res).json;
                        return [4 /*yield*/, model.newUserType(description)];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    PermissionController.prototype.assignPermission = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var path, _a, user_id, authorization, _b, idUser, url, logged, grant, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        path = req.route.path;
                        _a = req.headers, user_id = _a.user_id, authorization = _a.authorization;
                        _b = req.body, idUser = _b.idUser, url = _b.url;
                        console.log({ idUser: idUser, url: url, user_id: user_id, authorization: authorization });
                        if (!verifier.verifyNullIncommingFields({ url: url, idUser: idUser, user_id: user_id, authorization: authorization }))
                            return [2 /*return*/, res.status(404).json({ "message": "Campo obrigatório não informado" })];
                        return [4 /*yield*/, session.verify(authorization)];
                    case 1:
                        logged = _e.sent();
                        if (!logged.is_valid)
                            return [2 /*return*/, res.status(404).json({ error: logged.message })];
                        return [4 /*yield*/, model.verify(user_id, path)];
                    case 2:
                        grant = _e.sent();
                        if (!grant.granted) {
                            return [2 /*return*/, res.status(404).json({ error: "Você não possui permissão para acesso" })];
                        }
                        _d = (_c = res).json;
                        return [4 /*yield*/, model.assign(idUser, url)];
                    case 3: return [2 /*return*/, _d.apply(_c, [_e.sent()])];
                }
            });
        });
    };
    PermissionController.prototype.listUserPermissions = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var path, _a, user_id, authorization, idUser, logged, grant, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        path = req.route.path;
                        _a = req.headers, user_id = _a.user_id, authorization = _a.authorization;
                        idUser = req.params.idUser;
                        if (!verifier.verifyNullIncommingFields({ idUser: idUser, user_id: user_id, authorization: authorization }))
                            return [2 /*return*/, res.status(404).json({ "message": "Campo obrigatório não informado" })];
                        return [4 /*yield*/, session.verify(authorization)];
                    case 1:
                        logged = _d.sent();
                        if (!logged.is_valid)
                            return [2 /*return*/, res.status(404).json({ error: "Sessão inválida" })];
                        return [4 /*yield*/, model.verify(user_id, path)];
                    case 2:
                        grant = _d.sent();
                        if (!grant.granted) {
                            return [2 /*return*/, res.status(404).json({ error: "Você não possui permissão para acesso" })];
                        }
                        _c = (_b = res).json;
                        return [4 /*yield*/, model.listUserPermissions(idUser)];
                    case 3: return [2 /*return*/, _c.apply(_b, [_d.sent()])];
                }
            });
        });
    };
    return PermissionController;
}());
exports.default = PermissionController;
