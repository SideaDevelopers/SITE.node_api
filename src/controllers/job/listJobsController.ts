import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaCliente'

export class ListJobsController {
    async handle(request: Request, response: Response){
        try{
            const jobsList = await prismaClient.job.findMany()
            return response.status(200).json(jobsList)
        } catch(e) {
            return response.status(500).json({
                error: true,
                message: "Internal server error, contact the support."
            })
        }
    }
}