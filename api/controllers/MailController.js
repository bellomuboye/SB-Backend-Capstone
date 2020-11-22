/**
 * MailController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
send: (mailDetails) => {

var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'bellomuboye@gmail.com',
        pass: 'TheBells2001'
    }
});
transporter.use('compile', hbs({
    viewEngine: {
        extName: ".hbs",
        partialsDir: "./views",
        layoutsDir: "./views",
        defaultLayout: "",
    },
    viewPath: "./views/",
    extName: ".hbs",
}));

 var mailOptions = {
    from: 'Bell Omuboye ✔ <bellomuboye@gmail.com>',
    ...mailDetails
 }

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});



}
};
