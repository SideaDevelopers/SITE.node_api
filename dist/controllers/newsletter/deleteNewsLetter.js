"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteNewsLetterController = void 0;
const client_1 = require("@prisma/client");
const prismaCliente_1 = require("../../database/prismaCliente");
class DeleteNewsLetterController {
    async handle(request, response) {
        const { id } = request.params;
        try {
            const deletedNewsLetter = await prismaCliente_1.prismaClient.newsLetter.delete({
                where: {
                    id
                }
            });
            return response.status(200).json({
                error: false,
                message: 'Record deleted with sucess.'
            });
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return response.status(404).json({
                        error: true,
                        message: "Record not found."
                    });
                }
                else {
                    return response.status(500).json({
                        error: true,
                        message: "Internal server error, contact the support."
                    });
                }
            }
        }
    }
}
exports.DeleteNewsLetterController = DeleteNewsLetterController;
