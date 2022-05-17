import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaCliente'
import { FieldsValidationsIT } from '../../validations/candidateTIValidations/fieldsValidationsIT'

export class PostItCandidateController {
    async handle(request: Request, response: Response) {
        const { name, email, office, cell, uf, city, linkedin, portfolio } = request.body
        const fieldsValidations = new FieldsValidationsIT()
        try {
            const fieldsIsEmpty = await fieldsValidations.validateFields(name, email, office, cell, uf, city, linkedin, portfolio)
            const emailIsValid = await fieldsValidations.emailValidate(email)
            if (fieldsIsEmpty.validated && emailIsValid.validated) {
                const createdITCandidate = await prismaClient.iTCandidate.create({
                    data: {
                        name,
                        email,
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
                    message: "Successfully registered.",
                    data: createdITCandidate
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
            return response.status(500).json({
                error: true,
                message: "Internal server error, contact the suport."
            })
        }
    }
}