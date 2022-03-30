const nodeMailer = require('../config/nodemailer');

module.exports.newComment = (comment) => {
    console.log('Inside newComment mailer');
    console.log(comment.user);

    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'shamitsingh1812@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: htmlString
    }, (err, info) => {
        if(err){console.log('Error in sending mail', err); return};

        console.log('Message sent', info);
        return;
    })
}