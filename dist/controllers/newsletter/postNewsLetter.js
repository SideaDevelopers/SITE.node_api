"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostNewsLetter = void 0;
const client_1 = require("@prisma/client");
const prismaCliente_1 = require("../../database/prismaCliente");
const postValidateNewsLetter_1 = require("../../validations/newsLetterValidations/postValidateNewsLetter");
class PostNewsLetter {
    async handle(request, response) {
        const { email } = request.body;
        const validate = new postValidateNewsLetter_1.PostValidateNewsLetter();
        const isValid = validate.handle(email);
        if (!isValid.validated) {
            return response.status(406).json({
                error: !isValid.validated,
                message: isValid.errors
            });
        }
        try {
            const newsletter = await prismaCliente_1.prismaClient.newsLetter.create({
                data: {
                    email
                }
            });
            return response.status(201).json(newsletter);
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    return response.status(404).json({
                        error: true,
                        message: "Email já cadastrado."
                    });
                }
                else {
                    return response.status(500).json({
                        error: true,
                        message: "Internal server error, contact the support."
                    });
                }
            }
        }
    }
}
exports.PostNewsLetter = PostNewsLetter;
