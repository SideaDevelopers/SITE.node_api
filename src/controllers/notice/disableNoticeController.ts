import { Prisma } from '@prisma/client';
import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaCliente';

export class DisableNoticeController {
    async handle(request: Request, response: Response){
        const { id } = request.params;

        try {
            const actualNotice = await prismaClient.notice.findUnique({
                where: {
                    id
                }
            })

            const updatedNotice = await prismaClient.notice.update({
                where: {
                    id
                },
                data: {
                    active: !actualNotice?.active
                }
            })

            return response.status(200).json({
                error: false,
                data: updatedNotice,
                message: updatedNotice.active ? "Notice activated with success." : "Notice desabled with success."
            })
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return response.status(404).json({
                        error: true,
                        message: "Notice not found."
                    });
                }else{
                    return response.status(500).json({
                        error: true,
                        message: "Internal server error, contact the support."
                    });
                }
            }
        }
    }
}