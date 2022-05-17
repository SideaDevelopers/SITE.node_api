import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaCliente'

export class GetNoticeByIdController {
    async handle(request: Request, response: Response) {
        const { id } = request.params

        try {
            const notice = await prismaClient.notice.findUnique({
                where: {
                    id
                }
            })

            if (notice !== null ) return response.status(200).json(notice)
            return response.status(404).json({
                    error: true,
                    message: "Notice not found."
                })
        }catch(e){
            return response.status(500).json({
                error: true,
                message: "Internal server error, contact the support."
            })
        }
    }
}