"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyExistValidation = void 0;
const prismaCliente_1 = require("../../database/prismaCliente");
class AlreadyExistValidation {
    async validate(email) {
        const user = await prismaCliente_1.prismaClient.authUser.findFirst({
            where: {
                email
            }
        });
        if (user === null)
            return false;
        return true;
    }
}
exports.AlreadyExistValidation = AlreadyExistValidation;
