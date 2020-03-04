"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
function default_1(app) {
    app.post('/login', AuthController_1.default.login);
    app.post('/register', AuthController_1.default.register);
}
exports.default = default_1;
