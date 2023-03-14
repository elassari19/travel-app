import nodemailer from 'nodemailer'

export interface IEmail {
  to: string,
  subject: string,
  text: string,
  html: string
}

const sendEmail = async (email: IEmail) => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.AUTH_EMAIL?.toString(), // generated ethereal user
      pass: process.env.AUTH_PASSWORD?.toString() // generated ethereal password
    },
  });

  try {
    // send mail with defined transport object
    const isSent = await transporter.sendMail({
      from: `${process.env.AUTH_EMAIL}`, 
      to: email.to, 
      subject: email.subject, 
      text: email.text, 
      html: email.html 
    });
  } catch (error) {
    console.log(error);  
  }
}

export default sendEmail;