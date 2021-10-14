
var nodemailer = require('nodemailer');



async function sendEmail (message) {
    console.log(message.email);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'yehudawork1@gmail.com',
          pass: '026521478'
        }
      }); 
      
      var mailOptions = {
        from:  message.email,
        to: 'yehudawork1@gmail.com',
        subject: 'הצעות לשיפור',
        text: "מאת: " +message.email+"\n נושא: "+message.subject+"\n תוכן ההודעה: "+message.text
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = {
    sendEmail:sendEmail
}