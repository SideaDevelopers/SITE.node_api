"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListJobsController = void 0;
const prismaCliente_1 = require("../../database/prismaCliente");
class ListJobsController {
    async handle(request, response) {
        try {
            const jobsList = await prismaCliente_1.prismaClient.job.findMany();
            return response.status(200).json(jobsList);
        }
        catch (e) {
            return response.status(500).json({
                error: true,
                message: "Internal server error, contact the support."
            });
        }
    }
}
exports.ListJobsController = ListJobsController;
