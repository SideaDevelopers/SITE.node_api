"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserController = void 0;
const prismaCliente_1 = require("../../database/prismaCliente");
class GetUserController {
    async handle(request, response) {
        const { id } = request.params;
        try {
            const user = await prismaCliente_1.prismaClient.authUser.findFirst({
                where: {
                    id
                }
            });
            if (user === null)
                return response.status(404).json({
                    error: true,
                    message: "User not found."
                });
            return response.status(200).json({
                error: false,
                message: "User found.",
                data: user
            });
        }
        catch (error) {
            return response.status(500).json({
                error: true,
                message: "Internal server error, contact the suport."
            });
        }
    }
}
exports.GetUserController = GetUserController;
