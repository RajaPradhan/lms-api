import { registerService, loginService } from '../services/authenticationService';
import { sendVerificationEmail } from '../services/emailService';
//import redisClient from '../models/redis';

const sendJSONResponse = (res, responseObj) => {
    console.log('responseObj=>', responseObj);
    res.status(responseObj.status);
    res.json(responseObj.jsonResult);
},

generateVerificationId = () => {
  return Math.floor((Math.random() * 100) + 54);
},

verifyEmail = (req, res) => {
  if(!req.body.firstName
    || !req.body.lastName
    || !req.body.email
    || !req.body.mobile
    || !req.body.password) {
      sendJSONResponse(res, {"status": 400, "jsonResult": {"result": "All fields required."}});
  } else {
    const verificationId = generateVerificationId();
    const host = req.get('host');
    // redisClient.hmset(req.body.email, {
    //   verificationId,
    //   host
    // });

    sendVerificationEmail(req, verificationId)
    .then(response => {
      console.log('response =>', response);
    })
    .catch(err => {
      console.log('err =>', err);
    });
  }
},

register = (req, res) => {
  console.log('req=', req.body);
  if(!req.body.firstName
    || !req.body.lastName
    || !req.body.email
    || !req.body.mobile
    || !req.body.password) {
      sendJSONResponse(res, {"status": 400, "jsonResult": {"result": "All fields required."}});
  } else {
      console.log('Inside register controller');
      //verifyEmail(req, res);
      registerService({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          mobile: req.body.mobile,
          password: req.body.password
      })
      .then(function(responseObj) {
          console.log('Promise resolved');
          sendJSONResponse(res, responseObj);
      })
      .catch(function(responseObj) {
          console.log('Promise rejected');
          sendJSONResponse(res, responseObj);
      });
  }
},

login = (req, res) => {
    if(!req.body.email
      || !req.body.password) {
        sendJSONResponse(res, {"status": 400, "jsonResult": {"result": "All fields required"}});
    } else {
        loginService({
            email: req.body.email,
            password: req.body.password
        })
        .then(function(responseObj) {
            console.log('Promise resolved');
            sendJSONResponse(res, responseObj);
        }).catch(function(responseObj) {
            console.log('Promise rejected');
            sendJSONResponse(res, responseObj);
        });
    }
};

export { register, login };
