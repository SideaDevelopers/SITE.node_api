"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidateNotice = void 0;
class PostValidateNotice {
    handle(type, title, author, describe) {
        if (type === undefined ||
            title === undefined ||
            author === undefined ||
            describe === undefined ||
            type === "" ||
            title === "" ||
            author === "" ||
            describe === "") {
            return {
                validated: false,
                errors: "Type, title, author and describe are required fields."
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
exports.PostValidateNotice = PostValidateNotice;
