
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

async function mail(emaildata) {
    // const emaildata = JSON.parse(data);
    console.log(emaildata)
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
export default mail;
