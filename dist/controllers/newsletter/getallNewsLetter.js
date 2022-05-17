"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllNewsLetter = void 0;
const prismaCliente_1 = require("../../database/prismaCliente");
class GetAllNewsLetter {
    async handle(request, response) {
        try {
            const list = await prismaCliente_1.prismaClient.newsLetter.findMany();
            return response.status(200).json(list);
        }
        catch (e) {
            return response.status(500).json({
                error: true,
                message: "Internal server error, contact the support."
            });
        }
    }
}
exports.GetAllNewsLetter = GetAllNewsLetter;
