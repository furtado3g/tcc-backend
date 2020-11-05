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
var userModel_1 = __importDefault(require("../models/userModel"));
var sessionController_1 = __importDefault(require("./sessionController"));
var digestHash_1 = __importDefault(require("../util/digestHash"));
var verify_1 = __importDefault(require("../util/verify"));
var permissionModel_1 = __importDefault(require("../models/permissionModel"));
var sessionModel_1 = __importDefault(require("../models/sessionModel"));
var verifier = new verify_1.default();
var permission = new permissionModel_1.default();
var session = new sessionModel_1.default();
var userModel = new userModel_1.default();
var userController = /** @class */ (function () {
    function userController() {
    }
    /*
      Destruct the request body
      Generates the user's password hash
      Starts the session model
      Checks whether user information exists in the bank
      Creates the session and persists the session and its validity
    */
    userController.prototype.validate = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var username, password, sessionc, model, verify, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = req.body.username;
                        password = req.body.password;
                        if (!verifier.verifyNullIncommingFields({ username: username, password: password }))
                            return [2 /*return*/, res.status(404).json({ "message": "Campo obrigatório não informado" })];
                        password = digestHash_1.default(password);
                        sessionc = new sessionController_1.default();
                        model = new userModel_1.default();
                        return [4 /*yield*/, model.verifyUser({ username: username, password: password })];
                    case 1:
                        verify = _a.sent();
                        if (!(verify.is_valid == true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, sessionc.newSession(verify.user['id'])];
                    case 2:
                        token = _a.sent();
                        console.log(token);
                        return [2 /*return*/, res.json({ auth: verify.user['id'], token: token })];
                    case 3: return [2 /*return*/, res.status(404).json({ message: "Usuário ou senha inválido" })];
                }
            });
        });
    };
    /*
      Destruct the request body
      Encrypts the password using the salt defined in a controller function
      Sends the request to the database
      Persists the data using the model
    */
    userController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var path, _a, userid, authorization, password, _b, name, username, email, user_type, verifier, logged, last_password, userModel, created, error;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        path = req.route.path;
                        _a = req.headers, userid = _a.userid, authorization = _a.authorization;
                        password = req.body.password;
                        _b = req.body, name = _b.name, username = _b.username, email = _b.email, user_type = _b.user_type;
                        verifier = new verify_1.default();
                        if (!verifier.verifyNullIncommingFields({ name: name, username: username, email: email, password: password, userid: userid, authorization: authorization }))
                            return [2 /*return*/, res.status(404).json({ "error": "Campo obrigatório não informado" })];
                        return [4 /*yield*/, session.verify(authorization)];
                    case 1:
                        logged = _c.sent();
                        if (!logged.is_valid)
                            return [2 /*return*/, res.status(404).json({ error: "Sessão inválida" })];
                        //checks if the user has permission to access the endpoint
                        //const grant:any = await permission.verify(userid,path);
                        //if(!grant.granted){
                        //  return res.status(404).json({error:"Você não possui acesso"})
                        //}
                        password = digestHash_1.default(password);
                        last_password = password;
                        userModel = new userModel_1.default();
                        return [4 /*yield*/, userModel.create({
                                name: name,
                                username: username,
                                password: password,
                                email: email,
                                last_password: last_password,
                                user_type: user_type,
                            })];
                    case 2:
                        created = _c.sent();
                        error = created.error;
                        if (created != null && !error) {
                            return [2 /*return*/, res.json({ "message": "Usuário cadastrado com sucesso" })];
                        }
                        else if (error) {
                            return [2 /*return*/, res.status(404).json({ error: error })];
                        }
                        else {
                            return [2 /*return*/, res.status(404).json({ "message": "Erro ao cadastrar usuário" })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    userController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, username, email, userType, authorization, logged, created;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, name = _a.name, username = _a.username, email = _a.email, userType = _a.userType;
                        authorization = req.headers.authorization;
                        if (!verifier.verifyNullIncommingFields({ name: name, username: username, email: email, authorization: authorization }))
                            return [2 /*return*/, res.status(404).json({ "error": "Campo obrigatório" })];
                        return [4 /*yield*/, session.verify(authorization)];
                    case 1:
                        logged = _b.sent();
                        if (!logged.is_valid)
                            return [2 /*return*/, res.status(404).json({ error: "Sessão inválida" })];
                        created = userModel.update({
                            name: name,
                            username: username,
                            email: email,
                            user_type: userType
                        });
                        if (created != null) {
                            return [2 /*return*/, res.json({ "message": "Dados atualizados com sucesso" })];
                        }
                        else {
                            return [2 /*return*/, res.status(404).json({ "message": "Erro ao cadastrar usuário" })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    userController.prototype.recoveryPassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var email, userModel, recovered;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.body.email;
                        if (!verifier.verifyNullIncommingFields({ email: email }))
                            return [2 /*return*/, res.status(404).json({ "message": "Campo obrigatório" })];
                        userModel = new userModel_1.default();
                        return [4 /*yield*/, userModel.recoveryPassword(email)];
                    case 1:
                        recovered = _a.sent();
                        console.log(recovered);
                        if (recovered) {
                            return [2 /*return*/, res.json({ "message": "Verifique sua caixa de email com senha temporária" })];
                        }
                        else {
                            return [2 /*return*/, res.json({ "Erro": "Erro ao enviar email com senha temporária" }).status(404)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    userController.prototype.updatePassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, password, actualPassword, _b, userid, authorization, userModel, logged, checkActual, updated;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, password = _a.password, actualPassword = _a.actualPassword;
                        password = digestHash_1.default(password);
                        actualPassword = digestHash_1.default(actualPassword);
                        _b = req.headers, userid = _b.userid, authorization = _b.authorization;
                        if (!verifier.verifyNullIncommingFields({ userid: userid, password: password, authorization: authorization }))
                            return [2 /*return*/, res.status(404).json({ "message": "Campo obrigatório" })];
                        userModel = new userModel_1.default();
                        return [4 /*yield*/, session.verify(authorization)];
                    case 1:
                        logged = _c.sent();
                        if (!logged.is_valid)
                            return [2 /*return*/, res.status(404).json({ error: "Sessão inválida" })];
                        return [4 /*yield*/, userModel.checkAtualPassword(userid, actualPassword)];
                    case 2:
                        checkActual = _c.sent();
                        if (!checkActual)
                            return [2 /*return*/, res.status(404).json({ Error: "Senhas não correspondem" })];
                        return [4 /*yield*/, userModel.updatePassword(userid, password)];
                    case 3:
                        updated = _c.sent();
                        if (updated.updated) {
                            return [2 /*return*/, res.json({ "message": "Senha alterada com sucesso" })];
                        }
                        else {
                            return [2 /*return*/, res.json({ "Error": "Erro ao alterar senha" }).status(404)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    userController.prototype.detail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, userid, authorization, userModel, logged, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.headers, userid = _a.userid, authorization = _a.authorization;
                        userModel = new userModel_1.default();
                        if (!verifier.verifyNullIncommingFields({ id: id, userid: userid, authorization: authorization }))
                            return [2 /*return*/, res.status(404).json({ "message": "Campo obrigatório" })];
                        return [4 /*yield*/, session.verify(authorization)];
                    case 1:
                        logged = _b.sent();
                        if (!logged.is_valid)
                            return [2 /*return*/, res.status(404).json({ error: "Sessão inválida" })];
                        return [4 /*yield*/, userModel.detail(id)];
                    case 2:
                        data = _b.sent();
                        return [2 /*return*/, res.json(data)];
                }
            });
        });
    };
    userController.prototype.listUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userid, authorization, _b, page, perPage, userModel, logged, data;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.headers, userid = _a.userid, authorization = _a.authorization;
                        _b = req.query, page = _b.page, perPage = _b.perPage;
                        userModel = new userModel_1.default();
                        if (!verifier.verifyNullIncommingFields({ userid: userid, authorization: authorization }))
                            return [2 /*return*/, res.status(404).json({ "message": "Campo obrigatório" })];
                        return [4 /*yield*/, session.verify(authorization)];
                    case 1:
                        logged = _c.sent();
                        if (!logged.is_valid)
                            return [2 /*return*/, res.status(404).json({ error: "Sessão inválida" })];
                        return [4 /*yield*/, userModel.list(Number(perPage), Number(page))];
                    case 2:
                        data = _c.sent();
                        if (JSON.stringify(data).includes('"error"')) {
                            return [2 /*return*/, res.status(404).json(data)];
                        }
                        return [2 /*return*/, res.json(data)];
                }
            });
        });
    };
    userController.prototype.disableUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userid, authorization, action, id, userModel, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.headers, userid = _a.userid, authorization = _a.authorization;
                        action = req.body.action;
                        id = req.params.id;
                        if (!verifier.verifyNullIncommingFields({ userid: userid, authorization: authorization }))
                            return [2 /*return*/, res.status(404).json({ "message": "Campo obrigatório" })];
                        userModel = new userModel_1.default();
                        return [4 /*yield*/, userModel.deactivate(id)];
                    case 1:
                        response = (_b.sent()) || '';
                        if (response.includes('Erro') || response === '') {
                            return [2 /*return*/, res.status(404).json({ "error": response })];
                        }
                        return [2 /*return*/, res.json({ message: response })];
                }
            });
        });
    };
    return userController;
}());
exports.default = userController;
