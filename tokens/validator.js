// DO NOT USE THIS IN PRODUCTION Implementation
// This is just for demo purposes
const jwt = require("jwt-simple");
const jwtAuth = require(__dirname + '/jwtauth');
const tokenStore = require(__dirname + '/tokenstore');

const auth = function (req, res, next) {

    // Token sent by the client HTTP header authorization
    const token = req.headers[jwtAuth.params.JWT_HEADER];
    console.log(token);
    if (token === undefined) {

        // Send 401 with reason for failure
        res.statusMessage = 'Unauthorized : Token not provided!!!';
        res.sendStatus('401').end()
        // Do NOT call next()

    } else {
        // Decode the header
        try {
            jwt.decode(token, jwtAuth.params.JWT_TOKEN_SECRET);
        } catch (e) {
            // Decode exception
            res.statusMessage = 'Unauthorized : Invalid Token!!!';
            res.sendStatus('401');
            return;
        }

        // Token has a valid format so now call a function to validate the contents
        if (!tokenStore.isValid(token)) {
            res.statusMessage = 'Unauthorized : Token invalid or Expired!!!';
            res.sendStatus('401');
            return;
        }
        next();
    }
};

exports.auth = auth;