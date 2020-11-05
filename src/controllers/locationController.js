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
var locationModel_1 = __importDefault(require("../models/locationModel"));
var verify_1 = __importDefault(require("../util/verify"));
var permissionModel_1 = __importDefault(require("../models/permissionModel"));
var sessionModel_1 = __importDefault(require("../models/sessionModel"));
var verifier = new verify_1.default();
var session = new sessionModel_1.default();
var permission = new permissionModel_1.default();
var model = new locationModel_1.default();
var LocationController = /** @class */ (function () {
    function LocationController() {
    }
    LocationController.prototype.new = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, tp_location, comments, capacity, path, _b, userid, authorization, logged, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, tp_location = _a.tp_location, comments = _a.comments, capacity = _a.capacity;
                        path = req.route.path;
                        _b = req.headers, userid = _b.userid, authorization = _b.authorization;
                        if (!verifier.verifyNullIncommingFields({ tp_location: tp_location, comments: comments, capacity: capacity }))
                            return [2 /*return*/, res
                                    .status(404)
                                    .json({ message: "Campos obrigatórios não informados" })];
                        return [4 /*yield*/, session.verify(authorization)];
                    case 1:
                        logged = _c.sent();
                        if (!logged.is_valid)
                            return [2 /*return*/, res.status(404).json({ error: "Sessão expirada" })];
                        return [4 /*yield*/, model.insert({
                                type: tp_location,
                                comments: comments,
                                capacity: capacity,
                            })];
                    case 2:
                        response = _c.sent();
                        return [2 /*return*/, res.json(response)];
                }
            });
        });
    };
    LocationController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var path, _a, userid, authorization, _b, tp_location, comments, capacity, locationId, logged, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        path = req.route.path;
                        _a = req.headers, userid = _a.userid, authorization = _a.authorization;
                        _b = req.body, tp_location = _b.tp_location, comments = _b.comments, capacity = _b.capacity;
                        locationId = req.params.locationId;
                        if (!verifier.verifyNullIncommingFields({
                            locationId: locationId,
                            tp_location: tp_location,
                            comments: comments,
                            capacity: capacity,
                        }))
                            return [2 /*return*/, res
                                    .status(404)
                                    .json({ message: "Campos obrigatórios não informados" })];
                        return [4 /*yield*/, session.verify(authorization)];
                    case 1:
                        logged = _c.sent();
                        if (!logged.is_valid)
                            return [2 /*return*/, res.status(404).json({ error: "Sessão inválida" })];
                        return [4 /*yield*/, model.update({ type: tp_location, comments: comments, capacity: capacity }, Number(locationId))];
                    case 2:
                        response = _c.sent();
                        return [2 /*return*/, res.json(response)];
                }
            });
        });
    };
    LocationController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var path, _a, userid, authorization, locationId, logged, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        path = req.route.path;
                        _a = req.headers, userid = _a.userid, authorization = _a.authorization;
                        locationId = req.params.locationId;
                        if (!verifier.verifyNullIncommingFields({ locationId: locationId }))
                            return [2 /*return*/, res
                                    .status(404)
                                    .json({ message: "Campo obrigatório não informado" })];
                        return [4 /*yield*/, session.verify(authorization)];
                    case 1:
                        logged = _b.sent();
                        if (!logged.is_valid)
                            return [2 /*return*/, res.status(404).json({ error: "Sessão inválida" })];
                        return [4 /*yield*/, model.delete(Number(locationId))];
                    case 2:
                        response = _b.sent();
                        return [2 /*return*/, res.json(response)];
                }
            });
        });
    };
    LocationController.prototype.list = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var path, _a, userid, authorization, _b, perPage, page, logged, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        path = req.route.path;
                        _a = req.headers, userid = _a.userid, authorization = _a.authorization;
                        _b = req.query, perPage = _b.perPage, page = _b.page;
                        return [4 /*yield*/, session.verify(authorization)];
                    case 1:
                        logged = _e.sent();
                        if (!logged.is_valid)
                            return [2 /*return*/, res.status(404).json({ error: "Sessão inválida" })];
                        _d = (_c = res).json;
                        return [4 /*yield*/, model.getList(Number(perPage), Number(page))];
                    case 2: 
                    //checks if the user has permission to access the endpoint
                    //const grant:any = await permission.verify(userid,path);
                    //if(!grant.granted){
                    //    return res.status(404).json({error:"Você não possui permissão para acesso"})
                    //}
                    return [2 /*return*/, _d.apply(_c, [_e.sent()])];
                }
            });
        });
    };
    LocationController.prototype.detail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var path, _a, userid, authorization, locationId, logged, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        path = req.route.path;
                        _a = req.headers, userid = _a.userid, authorization = _a.authorization;
                        locationId = req.params.locationId;
                        if (!verifier.verifyNullIncommingFields({ locationId: locationId, userid: userid, authorization: authorization }))
                            return [2 /*return*/, res
                                    .status(404)
                                    .json({ message: "Campo obrigatório não informado" })];
                        return [4 /*yield*/, session.verify(authorization)];
                    case 1:
                        logged = _d.sent();
                        if (!logged.is_valid)
                            return [2 /*return*/, res.status(404).json({ error: "Sessão inválida" })];
                        _c = (_b = res).json;
                        return [4 /*yield*/, model.detail(locationId)];
                    case 2: 
                    //checks if the user has permission to access the endpoint
                    //const grant:any = await permission.verify(userid,path);
                    //if(!grant.granted){
                    //    return res.status(404).json({error:"Você não possui permissão para acesso"})
                    //}
                    return [2 /*return*/, _c.apply(_b, [_d.sent()])];
                }
            });
        });
    };
    LocationController.prototype.search = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var path, _a, userid, authorization, _b, term, type, logged;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        path = req.route.path;
                        _a = req.headers, userid = _a.userid, authorization = _a.authorization;
                        _b = req.query, term = _b.term, type = _b.type;
                        if (!verifier.verifyNullIncommingFields({ userid: userid, authorization: authorization }))
                            return [2 /*return*/, res
                                    .status(404)
                                    .json({ message: "Campo obrigatório não informado" })];
                        return [4 /*yield*/, session.verify(authorization)];
                    case 1:
                        logged = _c.sent();
                        if (!logged.is_valid)
                            return [2 /*return*/, res.status(404).json({ error: "Sessão inválida" })];
                        //checks if the user has permission to access the endpoint
                        //const grant:any = await permission.verify(userid,path);
                        //if(!grant.granted){
                        //    return res.status(404).json({error:"Você não possui permissão para acesso"})
                        //}
                        return [2 /*return*/, res.send(model.search(term, type))];
                }
            });
        });
    };
    return LocationController;
}());
exports.default = LocationController;
