const nodeMailer = require('../config/nodemailer');
const ForgotPassword = require('../models/forgotPass');

module.exports.newPassword = async (email) => {
    console.log('Inside newPassword mailer');
    // console.log(comment.user);

    // let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    let user = await ForgotPassword.findOne({email: email});
    console.log(user);

    nodeMailer.transporter.sendMail({
        from: 'shamitsingh1812@gmail.com',
        to: email,
        subject: "Link Generated for new password",
        html: `http://127.0.0.1:8000/users/reset-password/?accessToken=${user.accessToken}`
    }, (err, info) => {
        if(err){console.log('Error in sending mail', err); return};

        console.log('Message sent', info);
        return;
    })
    return;
}