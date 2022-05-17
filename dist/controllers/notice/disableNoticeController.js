"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisableNoticeController = void 0;
const client_1 = require("@prisma/client");
const prismaCliente_1 = require("../../database/prismaCliente");
class DisableNoticeController {
    async handle(request, response) {
        const { id } = request.params;
        try {
            const actualNotice = await prismaCliente_1.prismaClient.notice.findUnique({
                where: {
                    id
                }
            });
            const updatedNotice = await prismaCliente_1.prismaClient.notice.update({
                where: {
                    id
                },
                data: {
                    active: !actualNotice?.active
                }
            });
            return response.status(200).json({
                error: false,
                data: updatedNotice,
                message: updatedNotice.active ? "Notice activated with success." : "Notice desabled with success."
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
exports.DisableNoticeController = DisableNoticeController;
