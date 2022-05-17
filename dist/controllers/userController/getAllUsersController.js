"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUsersController = void 0;
const prismaCliente_1 = require("../../database/prismaCliente");
class GetAllUsersController {
    async handle(request, response) {
        try {
            const list = await prismaCliente_1.prismaClient.authUser.findMany();
            return response.status(200).json(list);
        }
        catch (error) {
            return response.status(500).json({
                error: true,
                message: "Internal server error, contact the suport."
            });
        }
    }
}
exports.GetAllUsersController = GetAllUsersController;
