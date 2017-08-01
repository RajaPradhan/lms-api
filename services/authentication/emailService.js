import nodemailer from 'nodemailer';
import xoauth2 from 'xoauth2';
import q from 'q';

import config from '../../config/config.json';

export const sendVerificationEmail = (req, verificationId) => {
  const deferred = q.defer();
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      xoauth2: xoauth2.createXOAuth2Generator({
        user: config.gmailUser,
        clientId: '',
        clientSceret: '',
        refreshToken: ''
      })
    }
  });

  const host = req.get('host');
  const link = `http://${host}/verify?id=${verificationId}`;
  const mailOptions = {
    from: config.gmailUser,
    to: req.body.email,
    subject: 'Please confirm email',
    html: `Hello ${req.body.firstName} <br/> Please click on the link to verify your
           Email address. <br/>
           <a href=${link}>Click here.<a/>
          `
  };

  smtpTransport.sendMail(mailOptions, (err, res) => {
    if(err) {
      console.log('Error sending mail!!!');
      deferred.reject({"status": 500, "jsonResult": {"result": err}});
    } else {
      console.log('Email sent. Message received =', res.message);
      deferred.resolve({"status": 200, "jsonResult": {"result": 'Email sent successfully'}});
    }
  });

  return deferred.promise;
}
