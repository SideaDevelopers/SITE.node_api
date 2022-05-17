"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidateJobs = void 0;
class PostValidateJobs {
    handle(department, occupation_area, title, describe, limit_date) {
        if (department === undefined ||
            occupation_area === undefined ||
            title === undefined ||
            describe === undefined ||
            department === "" ||
            occupation_area === "" ||
            title === "" ||
            describe === "" ||
            limit_date === "") {
            return {
                validated: false,
                errors: "Department, limit_date, occupation_area, title and describe are required fields."
            };
        }
        else {
            return {
                validated: true,
                errors: 'none.'
            };
        }
    }
}
exports.PostValidateJobs = PostValidateJobs;
