import { Prisma } from '@prisma/client'
import e, { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaCliente'
import { PostValidateNewsLetter } from '../../validations/newsLetterValidations/postValidateNewsLetter'

export class PostNewsLetter {
    async handle(request: Request, response: Response){
        const { email } = request.body
        const validate = new PostValidateNewsLetter()

        const isValid = validate.handle(email)

        if(!isValid.validated){
            return response.status(406).json({
                error: !isValid.validated,
                message: isValid.errors
            })
        }

        try {
            const newsletter = await prismaClient.newsLetter.create({
                data: {
                    email
                }
            })

            return response.status(201).json(newsletter)
        } catch(e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    return response.status(404).json({
                        error: true,
                        message: "Email já cadastrado."
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