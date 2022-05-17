import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaCliente'

export class GetAllCandidatesController {
    async handle(request: Request, response: Response) {
        try {
            const list = await prismaClient.candidate.findMany()
            return response.status(200).json(list)
        } catch (error) {
            return response.status(500).json({
                error: true,
                message: "Internal server error, contact the suport."
            })
        }
    }
}