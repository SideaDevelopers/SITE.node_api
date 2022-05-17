export class PostValidateNotice {
    handle(type: String, title: String, author: String, describe: String) {
        if(
            type === undefined ||
            title === undefined ||
            author === undefined ||
            describe === undefined ||
            type === "" ||
            title === "" ||
            author === "" ||
            describe === ""
        ){
            return {
                validated: false,
                errors: "Type, title, author and describe are required fields."
            }
        }else{
            return {
                validated: true,
                errors: 'none.'
            }
        }
    }
}