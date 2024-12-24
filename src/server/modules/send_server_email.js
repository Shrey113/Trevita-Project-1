const APP_email = "weddingwhisper3@gmail.com";
const APP_email_pass_key = "yqhc ntzi ewdb etrn";

const fs = require('fs').promises; // Promisify fs module for async operations
const nodemailer = require('nodemailer');
const { write_log_file, error_message, info_message, success_message, normal_message } = require('./_all_help');

async function send_email(to, subject, htmlContent) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: APP_email,
                pass: APP_email_pass_key,
            },
        });

        const mail_options = {
            from: APP_email,
            to: to,
            subject: subject,
            html: htmlContent,
        };

        const info = await transporter.sendMail(mail_options);
        info_message(`Email Info : ${info.response}`);
    } catch (error) {
        error_message('Error occurred:', error);
    }
}

async function send_welcome_page(email) {
    try {
        const welcome_page_html = await fs.readFile('src/server/modules/welcome_page_template.html', 'utf8');
        await send_email(email, 'Welcome to Travel Buddy!', welcome_page_html);
    } catch (error) {
        error_message('Failed to send welcome email:', error);
    }
}


async function send_otp_page(email, otp_to_send) {
    try {
        const otp_page_html = await fs.readFile('src/server/modules/otp_template.html', 'utf8');
        const email_html = otp_page_html.replace('{{OTP_CODE}}', otp_to_send);
        await send_email(email, 'Your OTP Code', email_html);
    } catch (error) {
        error_message('Failed to send OTP email:', error);
    }
}

async function send_forgot_password_email(email, new_password) {
    try {

        const reset_password_html = await fs.readFile('src/server/modules/forgot_password_admin.html', 'utf8');

        const email_html = reset_password_html.replace('{password}', new_password);

        await send_email(email, 'Your New Password', email_html);
        
    } catch (error) {
        console.error('Failed to send password reset email:', error);
    }
}

module.exports = { send_welcome_page, send_otp_page,send_forgot_password_email };
