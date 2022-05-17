"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNoticeController = void 0;
const prismaCliente_1 = require("../../database/prismaCliente");
const postValidateNotice_1 = require("../../validations/noticeValidations/postValidateNotice");
class CreateNoticeController {
    async handle(request, response) {
        const { type, title, author, describe } = request.body;
        const validation = new postValidateNotice_1.PostValidateNotice();
        const isValid = await validation.handle(type, title, author, describe);
        if (!isValid.validated) {
            return response.status(406).json({
                error: !isValid.validated,
                message: isValid.errors
            });
        }
        try {
            const notice = await prismaCliente_1.prismaClient.notice.create({
                data: {
                    type: type,
                    title: title,
                    author: author,
                    describe: describe
                }
            });
            return response.status(201).json({
                data: notice,
                message: "Notícia criada com sucesso."
            });
        }
        catch (e) {
            return response.status(500).json({
                error: true,
                message: "Internal error, contact the support."
            });
        }
    }
}
exports.CreateNoticeController = CreateNoticeController;
