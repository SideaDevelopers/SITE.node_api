import { Prisma } from '@prisma/client';
import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaCliente';

export class GetJobByIdController {
    async handle(request: Request, response: Response){
        const { id } = request.params

        try {
            const job = await prismaClient.job.findUnique({
                where: {
                    id
                }
            })

            if (job !== null ) return response.status(200).json(job)
            return response.status(404).json({
                    error: true,
                    message: "Job not found."
                })
        } catch(e) {
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