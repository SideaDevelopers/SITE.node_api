"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaCliente_1 = require("../database/prismaCliente");
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
}, async (email, password, done) => {
    try {
        const user = await prismaCliente_1.prismaClient.authUser.findFirst({
            where: {
                email: email
            }
        });
        if (user === null)
            throw new Error("Invalid email.");
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
            throw new Error("Invalid password");
        done(null, user);
    }
    catch (e) {
        done(e);
    }
}));
