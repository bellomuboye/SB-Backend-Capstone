/**
 * MailController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
send: () => {

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
var mail = {
    from: 'Bell Omuboye ✔ <bellomuboye@gmail.com>',
    to: 'crystalbell.omuboye@gmail.com',
    subject: 'Welcome to Bell Chat App 😎',
    template: 'email',
    context: {
        name: 'Yo'
    }
 }

transporter.sendMail(mail, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});



}
};
