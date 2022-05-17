export class NullValidateNotice {
    async handle(item: any){
        if(item !== null) return true
        throw ({
            code: 404,
            message: "Notice not found."
        })
    }
}