"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginController = void 0;
const bcrypt_1 = require("bcrypt");
const prismaCliente_1 = require("../../database/prismaCliente");
const jsonwebtoken_1 = require("jsonwebtoken");
const process_1 = require("process");
class UserLoginController {
    async handle(request, response) {
        const { email, password, keepLogged } = request.body;
        try {
            const user = await prismaCliente_1.prismaClient.authUser.findFirst({
                where: {
                    email
                }
            });
            //Verification of email and password
            if (!user) {
                return response.status(404).json({
                    error: true,
                    message: "User or password incorrect."
                });
            }
            const passwordMatch = await (0, bcrypt_1.compare)(password, user.password);
            if (!passwordMatch) {
                return response.status(404).json({
                    error: true,
                    message: "User or password incorrect."
                });
            }
            if (keepLogged) {
                const token = (0, jsonwebtoken_1.sign)({}, `${process_1.env.ACCESS_TOKEN_SECRET}`, {
                    subject: user.id,
                    expiresIn: "360000000000s"
                });
                return response.status(200).json({
                    error: false,
                    message: "Login success.",
                    data: token
                });
            }
            else {
                const token = (0, jsonwebtoken_1.sign)({}, `${process_1.env.ACCESS_TOKEN_SECRET}`, {
                    subject: user.id,
                    expiresIn: "36000s"
                });
                return response.status(200).json({
                    error: false,
                    message: "Login success.",
                    data: token
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
exports.UserLoginController = UserLoginController;
