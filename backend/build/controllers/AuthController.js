"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("@models/user"));
class AuthController {
    static login(request, response) {
        user_1.default.authenticate(request.body.email, request.body.password)
            .then(value => {
            const payload = { userId: value.id };
            const token = jsonwebtoken_1.default.sign(payload, 'dq6DyfbcfPouDZ8uKduWrFePdmzlh6vc');
            return response.status(200).json({ jwt: token });
        })
            .catch(_error => {
            return response.status(401).json();
        });
    }
    static register(request, response) {
        user_1.default.create({
            email: request.body.email,
            password: request.body.password,
            firstName: request.body.firstName,
            lastName: request.body.lastName,
        })
            .then(() => {
            return response.status(201).json();
        })
            .catch(error => {
            throw error;
        });
    }
}
exports.default = AuthController;
