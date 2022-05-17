import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaCliente'
import { Prisma } from '@prisma/client'
import { PostValidateNotice } from '../../validations/noticeValidations/postValidateNotice'

export class UpdateNoticeController {
    async handle(request: Request, response: Response){
        const { type, title, author, describe } = request.body
        const { id } = request.params
        const validation = new PostValidateNotice()

        const isValid = await validation.handle(type, title, author, describe)

        if (!isValid.validated) {
            return response.status(406).json({
                error: !isValid.validated,
                message: isValid.errors
            })
        }

        try{
            const updatedNotice = await prismaClient.notice.update({
                where: {
                    id: id
                },
                data: {
                    type,
                    title,
                    author,
                    describe
                }
            })

            return response.status(200).json({
                error: false,
                data: updatedNotice,
                message: "Notice updated with success."
            })
        } catch(e){
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return response.status(404).json({
                        error: true,
                        message: "Notice not found."
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