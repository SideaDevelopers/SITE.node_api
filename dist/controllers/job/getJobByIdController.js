"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetJobByIdController = void 0;
const client_1 = require("@prisma/client");
const prismaCliente_1 = require("../../database/prismaCliente");
class GetJobByIdController {
    async handle(request, response) {
        const { id } = request.params;
        try {
            const job = await prismaCliente_1.prismaClient.job.findUnique({
                where: {
                    id
                }
            });
            if (job !== null)
                return response.status(200).json(job);
            return response.status(404).json({
                error: true,
                message: "Job not found."
            });
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return response.status(404).json({
                        error: true,
                        message: "Job not found."
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
exports.GetJobByIdController = GetJobByIdController;
