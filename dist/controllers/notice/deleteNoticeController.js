"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteNoticeController = void 0;
const client_1 = require("@prisma/client");
const prismaCliente_1 = require("../../database/prismaCliente");
class DeleteNoticeController {
    async handle(request, response) {
        const { id } = request.params;
        try {
            const deletedNotice = await prismaCliente_1.prismaClient.notice.delete({
                where: {
                    id
                }
            });
            return response.status(200).json({
                error: false,
                message: "Notice deleted with success."
            });
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return response.status(404).json({
                        error: true,
                        message: "Notice not found."
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
exports.DeleteNoticeController = DeleteNoticeController;
