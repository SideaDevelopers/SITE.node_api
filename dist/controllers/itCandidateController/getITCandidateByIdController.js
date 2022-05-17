"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetITCandidateByIdController = void 0;
const client_1 = require("@prisma/client");
const prismaCliente_1 = require("../../database/prismaCliente");
class GetITCandidateByIdController {
    async handle(request, response) {
        const { id } = request.params;
        try {
            const candidate = await prismaCliente_1.prismaClient.iTCandidate.findFirst({
                where: {
                    id
                }
            });
            if (candidate !== null)
                return response.status(200).json(candidate);
            return response.status(404).json({
                error: true,
                message: "Candidate not found."
            });
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return response.status(404).json({
                        error: true,
                        message: "Candidate not found."
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
exports.GetITCandidateByIdController = GetITCandidateByIdController;
