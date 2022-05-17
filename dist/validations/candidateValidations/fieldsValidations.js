"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsValidations = void 0;
class FieldsValidations {
    async validateFields(name, email, desired_area, office, cell, uf, city, linkedin, portfolio) {
        if (name === '' ||
            email === '' ||
            desired_area === '' ||
            office === '' ||
            cell === '' ||
            uf === '' ||
            city === '' ||
            linkedin === '') {
            return {
                validated: false,
                message: "Name, email, desired area, office, cell, uf, city and linkedin are required fields."
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
exports.FieldsValidations = FieldsValidations;
