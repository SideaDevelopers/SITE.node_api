const bcrypt = require('bcrypt')

export class CreatePasswordHash {
    async create(password: String) {
        const coust = 12;
        return bcrypt.hash(password, coust)
    }
}