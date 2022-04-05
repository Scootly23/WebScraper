var nodemailer = require('nodemailer');


module.exports.sendMessage=function(message)
{
    var shortUrl;
    let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'scootly23@gmail.com',
                pass: [REDACTED]
            }
        });

        let mailOptions = {
            from: "johan", // sender address
            to: [REDACTED]@vtext.com', // list of receivers
            text:  message,// plain text body // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
    });
}
