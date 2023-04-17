var nodemailer = require('nodemailer');

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {

    let transporter = nodemailer.createTransport({
        host: 'mail.teamrabbil.com',
        port: 25,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "info@teamrabbil.com",
            pass: '~sR4[bhaC[Qs'
        }, tls: {
            rejectUnauthorized: false
        },
    });

    let mailOptions = {
        from: 'Inventory <info@teamrabbil.com>', // sender address
        to: EmailTo, // list of receivers,i.e: "ch@mail.com,sk@mail.com"
        subject: EmailSubject, // Subject line
        text: EmailText // plain text body
    };

    return await transporter.sendMail(mailOptions)

}
module.exports = SendEmailUtility