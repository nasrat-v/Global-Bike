"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsersController {
    static me(request, response) {
        return response.json(request.user);
    }
}
exports.default = UsersController;
