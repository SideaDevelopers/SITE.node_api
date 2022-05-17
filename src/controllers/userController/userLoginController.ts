import { Request, Response } from 'express'
import { compare } from 'bcrypt'
import { prismaClient } from '../../database/prismaCliente'
import { sign } from 'jsonwebtoken'
import { env } from "process";

export class UserLoginController {
    async handle(request: Request, response: Response) {
        const { email, password, keepLogged } = request.body
        try {
            const user = await prismaClient.authUser.findFirst({
                where: {
                    email
                }
            })

            //Verification of email and password
            if (!user) {
                return response.status(404).json({
                    error: true,
                    message: "User or password incorrect."
                })
            }

            const passwordMatch = await compare(password, user.password)

            if (!passwordMatch) {
                return response.status(404).json({
                    error: true,
                    message: "User or password incorrect."
                })
            }

            if (keepLogged) {
                const token = sign({}, `${env.ACCESS_TOKEN_SECRET}`, {
                    subject: user.id,
                    expiresIn: "360000000000s"
                })

                return response.status(200).json({
                    error: false,
                    message: "Login success.",
                    data: token
                })
            } else {
                const token = sign({}, `${env.ACCESS_TOKEN_SECRET}`, {
                    subject: user.id,
                    expiresIn: "36000s"
                })

                return response.status(200).json({
                    error: false,
                    message: "Login success.",
                    data: token
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