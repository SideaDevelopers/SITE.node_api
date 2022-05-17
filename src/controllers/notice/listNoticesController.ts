import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaCliente'

export class ListNoticesController {
    async handle( request: Request, response: Response ){
        try{
            const list = await prismaClient.notice.findMany()
            return response.status(200).json(list)
        }catch(e){
            response.status(500).json({
                error: true,
                message: "Internal server error, contact the support"
            })
        }
    }
}