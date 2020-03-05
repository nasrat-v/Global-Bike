"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = __importDefault(require("@src/controllers/AuthController"));
const UsersController_1 = __importDefault(require("@src/controllers/UsersController"));
const middlewares_1 = require("@src/middlewares");
function default_1(app) {
    app.post('/login', AuthController_1.default.login);
    app.post('/register', AuthController_1.default.register);
    app.get('/users/me', middlewares_1.authMiddleware, UsersController_1.default.me);
}
exports.default = default_1;
