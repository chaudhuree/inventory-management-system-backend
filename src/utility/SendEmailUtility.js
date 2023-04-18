var nodemailer = require('nodemailer');

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {

    let transporter = nodemailer.createTransport({
        host: 'mail.teamrabbil.com', //can create from gmail or yahoo
        port: 25, // this port is provided by smtp server
        secure: false, // as it is localhost so it is not secure and for 465 port it is secure
        auth: {
            user: "info@teamrabbil.com", // email id
            pass: '~sR4[bhaC[Qs' // password
        }, tls: {
            rejectUnauthorized: false // this is for localhost
        },
    });

    let mailOptions = {
        from: 'Inventory <info@teamrabbil.com>', // email mask. that is showed in email
        to: EmailTo, // list of receivers,i.e: "ch@mail.com,sk@mail.com"
        subject: EmailSubject, // Subject line,it is shown inside email
        text: EmailText // plain text body
    };

    return await transporter.sendMail(mailOptions)

}
module.exports = SendEmailUtility