"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthController {
    static login(request, response) {
        return response.status(200).json(request.body);
    }
    static register(request, response) {
        return response.status(201).json(request.body);
    }
}
exports.default = AuthController;
