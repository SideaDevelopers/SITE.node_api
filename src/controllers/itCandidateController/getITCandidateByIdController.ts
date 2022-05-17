import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaCliente'

export class GetITCandidateByIdController {
    async handle(request: Request, response: Response) {
        const { id } = request.params

        try {
            const candidate = await prismaClient.iTCandidate.findFirst({
                where: {
                    id
                }
            })
            if (candidate !== null) return response.status(200).json(candidate)
            return response.status(404).json({
                error: true,
                message: "Candidate not found."
            })
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return response.status(404).json({
                        error: true,
                        message: "Candidate not found."
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