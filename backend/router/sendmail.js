
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "melodymart.mini@gmail.com",
      pass: "ykfu kikb jzdm sraw",
    },
});

async function mail(emaildata) {
    // send mail with defined transport object
    // const emaildata = JSON.parse(data);
    console.log(emaildata)
    const info = await transporter.sendMail({
      from: {
        name: "MelodyMart",
        address: "melodymart.mini@gmail.com",
      }, // sender address
    //   from:'melodymart.mini@gmail.com',
      to: `${emaildata.email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<p>Order placed successfully with cost price of ${emaildata.cost}$<p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
export default mail;
