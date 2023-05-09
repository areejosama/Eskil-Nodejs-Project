import nodemailer from 'nodemailer';

export const sendemail=async (dest,subject, message)=>{
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.nodemaileremail, 
            pass: process.env.nodemailerpassword,
        },
      });
    
      let info = await transporter.sendMail({
        from: '"Eskil- Modern Homeware" <areejosama33@gmail.com>', // sender address
        to: dest, // list of receivers
        subject: subject, // Subject line
        html: message, // html body
      });

      return info;
    
}


