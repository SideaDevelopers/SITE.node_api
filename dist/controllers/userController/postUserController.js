"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostUserController = void 0;
const prismaCliente_1 = require("../../database/prismaCliente");
const createPasswordHash_1 = require("../../services/createPasswordHash");
const alreadyExistValidation_1 = require("../../validations/userValidation/alreadyExistValidation");
const passwordValidation_1 = require("../../validations/userValidation/passwordValidation");
class PostUserController {
    async handle(request, response) {
        const { email, password, confirmPassword } = request.body;
        const validation = new passwordValidation_1.PasswordValidation();
        const alreadyExist = new alreadyExistValidation_1.AlreadyExistValidation();
        const hashService = new createPasswordHash_1.CreatePasswordHash();
        const isPasswordValid = await validation.confirm(password.toString(), confirmPassword.toString());
        const userExist = await alreadyExist.validate(email);
        if (!isPasswordValid)
            return response.status(406).json({
                error: true,
                message: "Password's don't match."
            });
        if (userExist)
            return response.status(406).json({
                error: true,
                message: "E-mail already registered."
            });
        try {
            const hashedPassword = await hashService.create(password);
            const createdUser = await prismaCliente_1.prismaClient.authUser.create({
                data: {
                    email,
                    password: hashedPassword.toString(),
                }
            });
            return response.status(201).json({
                error: false,
                message: "User created with success.",
                data: createdUser
            });
        }
        catch (e) {
            return response.status(500).json(e);
        }
    }
}
exports.PostUserController = PostUserController;
