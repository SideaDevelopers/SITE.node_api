"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostItCandidateController = void 0;
const prismaCliente_1 = require("../../database/prismaCliente");
const fieldsValidationsIT_1 = require("../../validations/candidateTIValidations/fieldsValidationsIT");
class PostItCandidateController {
    async handle(request, response) {
        const { name, email, office, cell, uf, city, linkedin, portfolio } = request.body;
        const fieldsValidations = new fieldsValidationsIT_1.FieldsValidationsIT();
        try {
            const fieldsIsEmpty = await fieldsValidations.validateFields(name, email, office, cell, uf, city, linkedin, portfolio);
            const emailIsValid = await fieldsValidations.emailValidate(email);
            if (fieldsIsEmpty.validated && emailIsValid.validated) {
                const createdITCandidate = await prismaCliente_1.prismaClient.iTCandidate.create({
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
                });
                return response.status(201).json({
                    error: false,
                    message: "Successfully registered.",
                    data: createdITCandidate
                });
            }
            else {
                return response.status(406).json({
                    error: true,
                    valid_email: emailIsValid.validated,
                    message_email: emailIsValid.message,
                    valid_fields: fieldsIsEmpty.validated,
                    message_fields: fieldsIsEmpty.message
                });
            }
        }
        catch (e) {
            return response.status(500).json({
                error: true,
                message: "Internal server error, contact the suport."
            });
        }
    }
}
exports.PostItCandidateController = PostItCandidateController;
