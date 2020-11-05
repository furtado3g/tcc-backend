"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sessionController_1 = __importDefault(require("./controllers/sessionController"));
var userController_1 = __importDefault(require("./controllers/userController"));
var reserveController_1 = __importDefault(require("./controllers/reserveController"));
var locationController_1 = __importDefault(require("./controllers/locationController"));
var permissionController_1 = __importDefault(require("./controllers/permissionController"));
var locationUserController_1 = __importDefault(require("./controllers/locationUserController"));
var TypeLocationController_1 = __importDefault(require("./controllers/TypeLocationController"));
var routes = express_1.default.Router();
//inicio das controllers 
var users = new userController_1.default();
var sessions = new sessionController_1.default();
var reserves = new reserveController_1.default();
var location = new locationController_1.default();
var permission = new permissionController_1.default();
var locationUser = new locationUserController_1.default();
var locationType = new TypeLocationController_1.default();
//controle  de sessão
routes.post('/session', users.validate);
routes.put('/session', sessions.extendSession);
//controle de usuarios
routes.post('/user', users.create);
routes.put('/user', users.update);
routes.get('/user/:id', users.detail);
routes.delete('/user/:id', users.disableUser);
routes.get('/users', users.listUsers);
routes.post('/recovery', users.recoveryPassword);
routes.put('/user/changePassword', users.updatePassword);
//controle de tipo de local
routes.post('/location/type/', locationType.create);
routes.get('/location/type/', locationType.list);
routes.delete('/location/type/:id', locationType.delete);
//controle de reservas 
routes.post('/reserve/', reserves.create);
routes.put('/reserve/:reserveId', reserves.update);
routes.get('/reserve/', reserves.list);
routes.get('/reserve/:reserveId', reserves.detail);
routes.delete('/reserve/:reserveId', reserves.delete);
//controle de responsaveis do local
routes.post('/location/user/', locationUser.assign);
routes.delete('/location/user/:locationUserId', locationUser.unassign);
routes.get('/location/user/:userId', locationUser.listAssigns);
//controle de locais
routes.post('/location/', location.new);
routes.put('/location/:locationId', location.update);
routes.delete('/location/:locationId', location.delete);
routes.get('/locations', location.list);
routes.get('/location/:locationId', location.detail);
//controle de permissões
routes.post('/endpoint', permission.newEndpoint);
routes.post('/usertype', permission.newUserType);
routes.post('/permission', permission.assignPermission);
routes.get('/user/:idUser/permissions', permission.listUserPermissions);
exports.default = routes;
