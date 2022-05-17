export class FieldsValidations {
    async validateFields(name: String, email: String, desired_area: String, office: String, cell: String, uf: String, city: String, linkedin: String, portfolio: String) {
        if (
            name === '' ||
            email === '' ||
            desired_area === '' ||
            office === '' ||
            cell === '' ||
            uf === '' ||
            city === '' ||
            linkedin === ''
        ) {
            return {
                validated: false,
                message: "Name, email, desired area, office, cell, uf, city and linkedin are required fields."
            }
        }
        return {
            validated: true,
            message: "Success."
        }
    }

    async emailValidate(email: String) {
        var re = /\S+@\S+\.\S+/;
        if (!re.test(email.toString())) {
            return {
                validated: false,
                message: "Invalid email."
            }
        }
        return {
            validated: true,
            message: "Success."
        }
    }
}