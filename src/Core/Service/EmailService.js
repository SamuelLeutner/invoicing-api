const nodemailer = require('nodemailer')

class EmailService {
  constructor() {
    this.transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async makeBody(name, email, token) {
    const resetUrl = `http://localhost:${process.env.SERVER_PORT}/change-password/temporary_token=${token}`;

    return {
      from: 'Samuel Leutner <samuel.leutner@gmail.com>',
      to: `${name} <${email}>`,
      subject: 'Password Reset',
      html: `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            color: #333;
                            padding: 20px;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #fff;
                            border-radius: 10px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            background-color: #007bff;
                            color: #fff;
                            padding: 10px;
                            text-align: center;
                            border-radius: 10px 10px 0 0;
                        }
                        .content {
                            padding: 20px;
                        }
                        .button {
                            background-color: #007bff;
                            color: #fff;
                            text-decoration: none;
                            padding: 10px 20px;
                            border-radius: 5px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>Password Reset</h2>
                        </div>
                        <div class="content">
                            <p>Dear ${name},</p>
                            <p>You requested to reset your password. Please click on the following link to reset your password:</p>
                            <p><a class="button" href="${resetUrl}">Reset Password</a></p>
                            <p>${resetUrl}</p>
                            <p>If you didn't request this, you can safely ignore this email.</p>
                            <p>Best regards,<br/>Samuel Leutner</p>
                        </div>
                    </div>
                </body>
            </html>
        `
    };
  }

  async sendEmail(user) {
    try {
      const { name, email, token } = user;

      const data = await this.makeBody(name, email, token);

      return await this.transport.sendMail(data);
    } catch (error) {
      return ({ status: 500, error: 'Error sending email' });
    }
  }
}

module.exports = EmailService;
