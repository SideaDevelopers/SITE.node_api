import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaCliente'
import { FieldsValidations } from '../../validations/candidateValidations/fieldsValidations'
import { NextFunction } from "express"
import { Prisma } from '@prisma/client'

export class PostCandidateController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { name, email, desired_area, office, cell, uf, city, linkedin, portfolio } = request.body
        const fieldsValidations = new FieldsValidations()

        try {
            const fieldsIsEmpty = await fieldsValidations.validateFields(name, email, desired_area, office, cell, uf, city, linkedin, portfolio)
            const emailIsValid = await fieldsValidations.emailValidate(email)
            if (fieldsIsEmpty.validated && emailIsValid.validated) {
                const createdCandidate = await prismaClient.candidate.create({
                    data: {
                        name,
                        email,
                        desired_area,
                        office,
                        cell,
                        uf,
                        city,
                        linkedin,
                        portfolio
                    }
                })

                return response.status(201).json({
                    error: false,
                    message: "Successfully registered",
                    data: createdCandidate
                })
            } else {
                return response.status(406).json({
                    error: true,
                    valid_email: emailIsValid.validated,
                    message_email: emailIsValid.message,
                    valid_fields: fieldsIsEmpty.validated,
                    message_fields: fieldsIsEmpty.message
                })
            }
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    return response.status(404).json({
                        error: true,
                        message: "Email já registrado."
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