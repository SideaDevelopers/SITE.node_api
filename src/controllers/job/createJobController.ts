import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaCliente'
import { PostValidateJobs } from '../../validations/jobsValidations/postValidateJobs'

export class CreateJobController {
    async handle(request: Request, response: Response) {
        const { department, occupation_area, title, describe, limit_date } = request.body

        const validate = new PostValidateJobs()
        const isValid = validate.handle(department, occupation_area, title, describe, limit_date)

        if (!isValid.validated) {
            return response.status(406).json({
                error: !isValid.validated,
                message: isValid.errors
            })
        }

        try {
            const createdJob = await prismaClient.job.create({
                data: {
                    department,
                    describe,
                    occupation_area,
                    title,
                    limit_date
                }
            })

            return response.status(201).json({
                data: createdJob,
                message: "Job created with success."
            })
        } catch (e) {
            return response.status(500).json({
                error: true,
                message: "Internal error, contact the support.",
                data: e
            })
        }
    }
}