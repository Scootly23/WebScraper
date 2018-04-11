var nodemailer = require('nodemailer');


module.exports.sendMessage=function(message)
{
    var shortUrl;
    let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'scootly23@gmail.com',
                pass: 'Scott112394'
            }
        });

        let mailOptions = {
            from: "johan", // sender address
            to: '6518953064@vtext.com', // list of receivers
            text:  message,// plain text body // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
    });
}