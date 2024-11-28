const nodemailer = require("nodemailer");
require('dotenv').config(); 


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, 
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});


const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.SMTP_HOST, 
    to,
    subject,
    text,
  };


  transporter.sendMail(mailOptions,function(error,info){
    if(error){
      console.log(error);
    }
  })
}

module.exports = sendEmail;
