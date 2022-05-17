export class PostValidateJobs {
    handle(department: String, occupation_area: String, title: String, describe: String, limit_date: any) {
        if(
            department === undefined ||
            occupation_area === undefined ||
            title === undefined ||
            describe === undefined ||
            department === "" ||
            occupation_area === "" ||
            title === "" ||
            describe === "" ||
            limit_date === ""
        ){
            return {
                validated: false,
                errors: "Department, limit_date, occupation_area, title and describe are required fields."
            }
        }else{
            return {
                validated: true,
                errors: 'none.'
            }
        }
    }
}