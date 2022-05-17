import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaCliente'

export class DeleteNewsLetterController {
    async handle(request: Request, response: Response){
        const { id } = request.params

        try{
            const deletedNewsLetter = await prismaClient.newsLetter.delete({
                where: {
                    id
                }
            })

            return response.status(200).json({
                error: false,
                message: 'Record deleted with sucess.'
            })
        } catch(e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return response.status(404).json({
                        error: true,
                        message: "Record not found."
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