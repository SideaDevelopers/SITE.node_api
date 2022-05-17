import { env } from "process";

const nodemailer = require("nodemailer");

export class SendEmailService {
    async send(name: String, email: String, message: String) {
        try {
            var transporter = nodemailer.createTransport({
                host: env.SMTP_EMAIL,
                port: env.PORT_EMAIL,
                secure: true,
                auth: {
                    user: env.FROM_EMAIL,
                    pass: env.PASSWORD_EMAIL,
                },
            });

            var messageToSend = {
                from: env.FROM_EMAIL,
                to: env.FROM_EMAIL,
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

            var info = await transporter.sendMail(messageToSend)

            return ({
                error: false,
                message: "Message sent.",
                data: info
            })
        } catch (e) {
            throw e
        }
    }
}