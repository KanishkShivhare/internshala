const nodemailer = require("nodemailer");
const ErrorHandler = require("./ErrorHandler");

exports.sendmail = (req, res, next ,url) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    post: 465,
    auth: {
      user: "shivharekanishk@gmail.com",
      pass: "",
    },
  });

  const mailOptions = {
    from: "Mr.Kanishk Shivhare <shivharekanishk@gmail.com>",
    to: req.body.email,
    subject: "password Reset Link",
    html: `<h1>Click link blow to reset password</h1>
        <a href="${url}">Password Reset link</a>`,
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) return next(new ErrorHandler("err", 500));
    console.log(info);
    return res.status(200).json({
      message: "mail sent successfully",
      url,
    });
  });
};
