export class ContactValidation {
    async validate(name: String, email: String, message: String){
        if (name === undefined ||
            email === undefined ||
            message === undefined ||
            name === "" ||
            email === "" ||
            message === ""  
        ){
            return {
                validated: false,
                message: "Email, name and message are required fields"
            }
        }else {
            var re = /\S+@\S+\.\S+/;
            if(re.test(email.toString())){
                return {
                    validated: true,
                    message: "Validated"
                }
            } else {
                return {
                    validated: false,
                    message: "Invalid email"
                }
            }
        }
    }
}