"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordValidation = void 0;
class PasswordValidation {
    async confirm(password, confirmPassword) {
        return password === confirmPassword;
    }
}
exports.PasswordValidation = PasswordValidation;
