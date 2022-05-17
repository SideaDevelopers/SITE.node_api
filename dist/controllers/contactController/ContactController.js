"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const sendEmailService_1 = require("../../services/sendEmailService");
const contactValidations_1 = require("../../validations/contactValidations/contactValidations");
class ContactController {
    async handle(request, response) {
        const { name, email, message } = request.body;
        const service = new sendEmailService_1.SendEmailService();
        const validated = new contactValidations_1.ContactValidation();
        try {
            const isValid = await validated.validate(name, email, message);
            if (isValid.validated) {
                const info = await service.send(name, email, message);
                return response.status(200).json({
                    error: false,
                    data: info,
                    message: "Message sent."
                });
            }
            else {
                return response.status(406).json({
                    error: true,
                    message: isValid.message
                });
            }
        }
        catch (e) {
            return response.status(500).json({
                error: true,
                message: "Internal server error, contact the support."
            });
        }
    }
}
exports.ContactController = ContactController;
