"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCandidateITController = void 0;
const client_1 = require("@prisma/client");
const prismaCliente_1 = require("../../database/prismaCliente");
const deleteCurriculumController_1 = require("../awsController/deleteCurriculumController");
class DeleteCandidateITController {
    async handle(request, response) {
        const { id } = request.params;
        const curriculumDelete = new deleteCurriculumController_1.DeleteCurriculumController();
        try {
            const candidate = await prismaCliente_1.prismaClient.iTCandidate.delete({
                where: {
                    id
                }
            });
            const deletedCurriculum = await curriculumDelete.handle(id.toString());
            return response.status(200).json({
                error: false,
                message: "Candidate deleted with success."
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
exports.DeleteCandidateITController = DeleteCandidateITController;
