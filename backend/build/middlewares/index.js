"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("@src/models");
const authMiddleware = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, 'dq6DyfbcfPouDZ8uKduWrFePdmzlh6vc');
        const userId = decodedToken.userId;
        models_1.User.findOne({ where: { id: userId } })
            .then(value => {
            request.user = value;
            next();
        })
            .catch(() => {
            throw new Error();
        });
    }
    catch (e) {
        response.status(401).json({ e });
    }
};
exports.authMiddleware = authMiddleware;
