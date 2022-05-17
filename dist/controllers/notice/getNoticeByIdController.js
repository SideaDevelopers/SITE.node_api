"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNoticeByIdController = void 0;
const prismaCliente_1 = require("../../database/prismaCliente");
class GetNoticeByIdController {
    async handle(request, response) {
        const { id } = request.params;
        try {
            const notice = await prismaCliente_1.prismaClient.notice.findUnique({
                where: {
                    id
                }
            });
            if (notice !== null)
                return response.status(200).json(notice);
            return response.status(404).json({
                error: true,
                message: "Notice not found."
            });
        }
        catch (e) {
            return response.status(500).json({
                error: true,
                message: "Internal server error, contact the support."
            });
        }
    }
}
exports.GetNoticeByIdController = GetNoticeByIdController;
