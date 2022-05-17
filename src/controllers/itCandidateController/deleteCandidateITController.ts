import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaCliente'
import { DeleteCurriculumController } from '../awsController/deleteCurriculumController'

export class DeleteCandidateITController {
    async handle(request: Request, response: Response) {
        const { id } = request.params
        const curriculumDelete = new DeleteCurriculumController()
        try {
            const candidate = await prismaClient.iTCandidate.delete({
                where: {
                    id
                }
            })

            const deletedCurriculum = await curriculumDelete.handle(id.toString())

            return response.status(200).json({
                error: false,
                message: "Candidate deleted with success."
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