import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaCliente'

export class DisableJobController { 
    async handle(request: Request, response: Response){
        const { id } = request.params

        try {
            const actualJob = await prismaClient.job.findUnique({
                where:{
                    id
                }
            })

            const updatedJob = await prismaClient.job.update({
                where: {
                    id
                },
                data: {
                    active: !actualJob?.active
                }
            })

            return response.status(200).json({
                error: false,
                data: updatedJob,
                message: updatedJob.active ? "Job activated with success" : "Job disabled with success"
            })

        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return response.status(404).json({
                        error: true,
                        message: "Job not found."
                    });
                }else{
                    return response.status(500).json({
                        error: true,
                        message: "Internal server error, contact the support."
                    });
                }
            }
        }
    }
}