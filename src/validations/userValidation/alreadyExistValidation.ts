import { prismaClient } from "../../database/prismaCliente";

export class AlreadyExistValidation {
    async validate(email: string){
        const user = await prismaClient.authUser.findFirst({
            where: {
                email
            }
        })

        if(user === null) return false
        return true
    }
}