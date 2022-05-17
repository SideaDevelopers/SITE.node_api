"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateJobController = void 0;
const client_1 = require("@prisma/client");
const prismaCliente_1 = require("../../database/prismaCliente");
class UpdateJobController {
    async handle(request, response) {
        const { department, occupation_area, title, describe, limit_date } = request.body;
        const { id } = request.params;
        try {
            const updatedJob = await prismaCliente_1.prismaClient.job.update({
                where: {
                    id
                },
                data: {
                    department,
                    occupation_area,
                    title,
                    describe,
                    limit_date
                }
            });
            return response.status(200).json({
                error: false,
                message: "Job updated with success.",
                data: updatedJob
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
exports.UpdateJobController = UpdateJobController;
