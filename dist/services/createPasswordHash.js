"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePasswordHash = void 0;
const bcrypt = require('bcrypt');
class CreatePasswordHash {
    async create(password) {
        const coust = 12;
        return bcrypt.hash(password, coust);
    }
}
exports.CreatePasswordHash = CreatePasswordHash;
