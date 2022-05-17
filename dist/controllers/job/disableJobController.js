"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisableJobController = void 0;
const client_1 = require("@prisma/client");
const prismaCliente_1 = require("../../database/prismaCliente");
class DisableJobController {
    async handle(request, response) {
        const { id } = request.params;
        try {
            const actualJob = await prismaCliente_1.prismaClient.job.findUnique({
                where: {
                    id
                }
            });
            const updatedJob = await prismaCliente_1.prismaClient.job.update({
                where: {
                    id
                },
                data: {
                    active: !actualJob?.active
                }
            });
            return response.status(200).json({
                error: false,
                data: updatedJob,
                message: updatedJob.active ? "Job activated with success" : "Job disabled with success"
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
exports.DisableJobController = DisableJobController;
