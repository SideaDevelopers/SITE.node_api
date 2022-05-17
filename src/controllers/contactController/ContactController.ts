import { Request, Response } from 'express'
import { SendEmailService } from '../../services/sendEmailService'
import { ContactValidation } from '../../validations/contactValidations/contactValidations'

export class ContactController {
    async handle(request: Request, response: Response) {
        const { name, email, message } = request.body
        const service = new SendEmailService()
        const validated = new ContactValidation()

        try {
            const isValid = await validated.validate(name, email, message)

            if (isValid.validated) {
                const info = await service.send(name, email, message)

                return response.status(200).json({
                    error: false,
                    data: info,
                    message: "Message sent."
                })
            } else {
                return response.status(406).json({
                    error: true,
                    message: isValid.message
                })
            }

        } catch (e) {
            return response.status(500).json({
                error: true,
                message: "Internal server error, contact the support."
            })
        }
    }
}