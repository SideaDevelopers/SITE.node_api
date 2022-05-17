"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactValidation = void 0;
class ContactValidation {
    async validate(name, email, message) {
        if (name === undefined ||
            email === undefined ||
            message === undefined ||
            name === "" ||
            email === "" ||
            message === "") {
            return {
                validated: false,
                message: "Email, name and message are required fields"
            };
        }
        else {
            var re = /\S+@\S+\.\S+/;
            if (re.test(email.toString())) {
                return {
                    validated: true,
                    message: "Validated"
                };
            }
            else {
                return {
                    validated: false,
                    message: "Invalid email"
                };
            }
        }
    }
}
exports.ContactValidation = ContactValidation;
