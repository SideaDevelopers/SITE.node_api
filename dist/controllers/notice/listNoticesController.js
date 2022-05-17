"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNoticesController = void 0;
const prismaCliente_1 = require("../../database/prismaCliente");
class ListNoticesController {
    async handle(request, response) {
        try {
            const list = await prismaCliente_1.prismaClient.notice.findMany();
            return response.status(200).json(list);
        }
        catch (e) {
            response.status(500).json({
                error: true,
                message: "Internal server error, contact the support"
            });
        }
    }
}
exports.ListNoticesController = ListNoticesController;
