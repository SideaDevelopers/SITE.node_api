export class PasswordValidation {
    async confirm(password: String, confirmPassword: String) {
        return password === confirmPassword
    }
}