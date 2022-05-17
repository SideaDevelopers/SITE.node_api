"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullValidateNotice = void 0;
class NullValidateNotice {
    async handle(item) {
        if (item !== null)
            return true;
        throw ({
            code: 404,
            message: "Notice not found."
        });
    }
}
exports.NullValidateNotice = NullValidateNotice;
