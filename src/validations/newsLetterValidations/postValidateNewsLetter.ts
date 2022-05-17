export class PostValidateNewsLetter {
    handle(email: String) {
        if (email === null || email === '' || email === undefined) {
            return {
                validated: false,
                errors: "Email is a required field."
            }
        } else {
            var re = /\S+@\S+\.\S+/;
            if (re.test(email.toString())) {
                return {
                    validated: true,
                    errors: "none"
                }
            } else {
                return {
                    validated: false,
                    errors: "Invalid email."
                }
            }
        }
    }
}