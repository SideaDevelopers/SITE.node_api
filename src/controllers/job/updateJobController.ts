import { Prisma } from '@prisma/client';
import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaCliente';

export class UpdateJobController {
    async handle(request: Request, response: Response) {
        const { department, occupation_area, title, describe, limit_date } = request.body
        const { id } = request.params

        try {
            const updatedJob = await prismaClient.job.update({
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
            })
            return response.status(200).json({
                error: false,
                message: "Job updated with success.",
                data: updatedJob
            })
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return response.status(404).json({
                        error: true,
                        message: "Job not found."
                    });
                } else {
                    return response.status(500).json({
                        error: true,
                        message: "Internal server error, contact the support."
                    });
                }
            }
        }
    }
}