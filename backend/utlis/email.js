const nodemailer = require('nodemailer');

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.url = url;
        this.firstName = user.name.split(' ')[0];
        this.from = `Tecno Industries <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            return nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD
                }
            });
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async send(subject, html) {
        await this.newTransport().sendMail({
            from: this.from,
            to: this.to,
            subject,
            html,
            text: html.replace(/<[^>]*>/g, '') // strip HTML tags for plain-text version
        });
    }

    async sendWelcome() {
        await this.send(
            'Welcome to Tecno Industries Admin Panel',
            `<p>Hi ${this.firstName},</p>
             <p>Your admin account has been created. You can log in here:</p>
             <p><a href="${this.url}">${this.url}</a></p>`
        );
    }

    async sendPasswordReset() {
        await this.send(
            'Your password reset token (valid for 10 minutes)',
            `<p>Hi ${this.firstName},</p>
             <p>Forgot your password? Click the link below to reset it:</p>
             <p><a href="${this.url}">${this.url}</a></p>
             <p>If you didn&apos;t request this, please ignore this email.</p>`
        );
    }
};
