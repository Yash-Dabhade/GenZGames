const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
const mailHelper = async (option) => {
  // Generate test SMTP service account from ethereal.email

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: "dabhadeyash@blivet.lco", // sender address
    to: option.email, // list of receivers
    subject: option.subject, // Subject line
    text: option.message, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });
};

module.exports = mailHelper;
