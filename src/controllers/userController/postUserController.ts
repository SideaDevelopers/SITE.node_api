import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaCliente'
import { CreatePasswordHash } from '../../services/createPasswordHash'
import { AlreadyExistValidation } from '../../validations/userValidation/alreadyExistValidation'
import { PasswordValidation } from '../../validations/userValidation/passwordValidation'

export class PostUserController {
    async handle(request: Request, response: Response) {
        const { email, password, confirmPassword} = request.body
        const validation = new PasswordValidation()
        const alreadyExist = new AlreadyExistValidation()
        const hashService = new CreatePasswordHash()
        const isPasswordValid = await validation.confirm(password.toString(), confirmPassword.toString())
        const userExist = await alreadyExist.validate(email)

        if(!isPasswordValid) return response.status(406).json({
            error: true,
            message: "Password's don't match."
        })

        if(userExist) return response.status(406).json({
            error: true,
            message: "E-mail already registered."
        })

        try{
            const hashedPassword = await hashService.create(password)
            const createdUser = await prismaClient.authUser.create({
                data: {
                    email,
                    password: hashedPassword.toString(),
                }
            })

            return response.status(201).json({
                error: false,
                message: "User created with success.",
                data: createdUser
            })
        }catch(e) {
            return response.status(500).json(e)
        }
    }
}