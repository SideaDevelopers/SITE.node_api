"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const process_1 = require("process");
async function ensureAuthenticated(request, response, next) {
    const authToken = request.headers.authorization;
    if (!authToken) {
        return response.status(401).json({
            error: true,
            message: "Token is missing."
        });
    }
    const [, token] = authToken.split(" ");
    try {
        (0, jsonwebtoken_1.verify)(token, `${process_1.env.ACCESS_TOKEN_SECRET}`);
        return next();
    }
    catch (error) {
        return response.status(401).json({
            error: true,
            message: "Invalid Token."
        });
    }
}
exports.ensureAuthenticated = ensureAuthenticated;
