import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaCliente'
import { PostValidateNotice } from '../../validations/noticeValidations/postValidateNotice'

export class CreateNoticeController {
    async handle(request: Request, response: Response) {
        const { type, title, author, describe } = request.body
        const validation = new PostValidateNotice()

        const isValid = await validation.handle(type, title, author, describe)

        if (!isValid.validated) {
            return response.status(406).json({
                error: !isValid.validated,
                message: isValid.errors
            })
        }

        try {
            const notice = await prismaClient.notice.create({
                data: {
                    type: type,
                    title: title,
                    author: author,
                    describe: describe
                }
            })
            return response.status(201).json({
                data: notice,
                message: "Notícia criada com sucesso."
            })
        } catch (e) {
            return response.status(500).json({
                error: true,
                message: "Internal error, contact the support."
            })
        }
    }
}