"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNoticeController = void 0;
const prismaCliente_1 = require("../../database/prismaCliente");
const client_1 = require("@prisma/client");
const postValidateNotice_1 = require("../../validations/noticeValidations/postValidateNotice");
class UpdateNoticeController {
    async handle(request, response) {
        const { type, title, author, describe } = request.body;
        const { id } = request.params;
        const validation = new postValidateNotice_1.PostValidateNotice();
        const isValid = await validation.handle(type, title, author, describe);
        if (!isValid.validated) {
            return response.status(406).json({
                error: !isValid.validated,
                message: isValid.errors
            });
        }
        try {
            const updatedNotice = await prismaCliente_1.prismaClient.notice.update({
                where: {
                    id: id
                },
                data: {
                    type,
                    title,
                    author,
                    describe
                }
            });
            return response.status(200).json({
                error: false,
                data: updatedNotice,
                message: "Notice updated with success."
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
exports.UpdateNoticeController = UpdateNoticeController;
