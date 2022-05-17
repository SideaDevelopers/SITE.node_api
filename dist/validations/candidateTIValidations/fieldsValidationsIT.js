"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsValidationsIT = void 0;
class FieldsValidationsIT {
    async validateFields(name, email, office, cell, uf, city, linkedin, portfolio) {
        if (name === '' ||
            email === '' ||
            office === '' ||
            cell === '' ||
            uf === '' ||
            city === '' ||
            linkedin === '' ||
            portfolio === '') {
            return {
                validated: false,
                message: "Name, email, portfolio, office, cell, uf, city and linkedin are required fields."
            };
        }
        return {
            validated: true,
            message: "Success."
        };
    }
    async emailValidate(email) {
        var re = /\S+@\S+\.\S+/;
        if (!re.test(email.toString())) {
            return {
                validated: false,
                message: "Invalid email."
            };
        }
        return {
            validated: true,
            message: "Success."
        };
    }
}
exports.FieldsValidationsIT = FieldsValidationsIT;
