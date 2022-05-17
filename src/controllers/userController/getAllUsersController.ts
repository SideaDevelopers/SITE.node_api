import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaCliente'

export class GetAllUsersController {
    async handle (request: Request, response: Response){
        try {
            const list = await prismaClient.authUser.findMany()
            return response.status(200).json(list)
        } catch (error) {
            return response.status(500).json({
                error: true,
                message: "Internal server error, contact the suport."
            })
        }
    }
}