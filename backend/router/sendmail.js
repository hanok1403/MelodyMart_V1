
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: "melodymart.mini@gmail.com",
      pass: process.env.NODEMAIL_PASS,
    },
});

async function sendPasswordResetEmail(email, resetToken) {
  const resetUrl = `https://melodymart.vercel.app/reset-password?token=${resetToken}&email=${email}`;
  const info = await transporter.sendMail({
    from: {
      name: "MelodyMart",
      address: "melodymart.mini@gmail.com",
    }, 
    to: email,
    subject: "MelodyMart Password Reset Request",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset</h2>
        <p>We received a request to reset your MelodyMart password. Click the link below to reset it:</p>
        <p><a href="${resetUrl}" style="color: #1a73e8;">Reset Your Password</a></p>
        <p>This link will expire in 1 hour for security reasons.</p>
        <hr>
        <p style="font-size: 12px; color: #999;">If you didn’t request this password reset, please ignore this email or contact our support team.</p>
      </div>
    `
  });

  console.log("Password reset email sent: %s", info.messageId);
}


async function mail(emaildata) {
    // const emaildata = JSON.parse(data);
    //console.log(emaildata)
    const info = await transporter.sendMail({
      from: {
        name: "MelodyMart",
        address: "melodymart.mini@gmail.com",
      }, 

      to: `${emaildata.email}`,
      subject: "Hello ✔", 
      text: "Hello world?", 
      html: `<p>Order placed successfully with cost price of ${emaildata.cost}$<p>`,
    });

    console.log("Message sent: %s", info.messageId);
}
export {mail, sendPasswordResetEmail};
