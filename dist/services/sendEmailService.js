"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailService = void 0;
const process_1 = require("process");
const nodemailer = require("nodemailer");
class SendEmailService {
    async send(name, email, message) {
        try {
            var transporter = nodemailer.createTransport({
                host: process_1.env.SMTP_EMAIL,
                port: process_1.env.PORT_EMAIL,
                secure: true,
                auth: {
                    user: process_1.env.FROM_EMAIL,
                    pass: process_1.env.PASSWORD_EMAIL,
                },
            });
            var messageToSend = {
                from: process_1.env.FROM_EMAIL,
                to: process_1.env.FROM_EMAIL,
                subject: "[SITE-BOT] New contact message",
                text: `${name}, with email: ${email}, send the following message: ${message}`,
                html: `
                    <header style="background-color: #070F16; color: #f7f7f7; padding: 10px;">
                        <h3>New message from ${name} - (${email})</h3>
                    </header>
                    <article>
                        <p>Message:</p>
                        <p>${message}</p>
                    </article>
                    <footer style="background-color: #070F16; color: #f7f7f7; padding: 10px;">
                        <h4>SIDEA-BOT</h4>
                    </footer>
                `
            };
            var info = await transporter.sendMail(messageToSend);
            return ({
                error: false,
                message: "Message sent.",
                data: info
            });
        }
        catch (e) {
            throw e;
        }
    }
}
exports.SendEmailService = SendEmailService;
