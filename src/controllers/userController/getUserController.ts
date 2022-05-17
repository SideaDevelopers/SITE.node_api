import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaCliente'

export class GetUserController {
    async handle(request: Request, response: Response){
        const { id } = request.params

        try {   
            const user = await prismaClient.authUser.findFirst({
                where: {
                    id
                }
            })
    
            if(user === null) return response.status(404).json({
                error: true,
                message: "User not found."
            })
            return response.status(200).json({
                error: false,
                message: "User found.",
                data: user
            })
        } catch (error) {
            return response.status(500).json({
                error: true,
                message: "Internal server error, contact the suport."
            })
        }
    }
}