"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateJobController = void 0;
const prismaCliente_1 = require("../../database/prismaCliente");
const postValidateJobs_1 = require("../../validations/jobsValidations/postValidateJobs");
class CreateJobController {
    async handle(request, response) {
        const { department, occupation_area, title, describe, limit_date } = request.body;
        const validate = new postValidateJobs_1.PostValidateJobs();
        const isValid = validate.handle(department, occupation_area, title, describe, limit_date);
        if (!isValid.validated) {
            return response.status(406).json({
                error: !isValid.validated,
                message: isValid.errors
            });
        }
        try {
            const createdJob = await prismaCliente_1.prismaClient.job.create({
                data: {
                    department,
                    describe,
                    occupation_area,
                    title,
                    limit_date
                }
            });
            return response.status(201).json({
                data: createdJob,
                message: "Job created with success."
            });
        }
        catch (e) {
            return response.status(500).json({
                error: true,
                message: "Internal error, contact the support.",
                data: e
            });
        }
    }
}
exports.CreateJobController = CreateJobController;
