import { prismaClient } from "../database/prismaCliente";
const bcrypt = require('bcrypt')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    }, async (email: any, password: any, done: any) => {
        try{
            const user = await prismaClient.authUser.findFirst({
                where: {
                    email: email
                }
            })
            if(user === null) throw new Error("Invalid email.")
            const validPassword = await bcrypt.compare(password, user.password)
            if(!validPassword) throw new Error("Invalid password")

            done(null, user);
        } catch(e){
            done(e)
        }
    })
)