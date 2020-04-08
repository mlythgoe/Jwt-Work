const express = require('express');
const bodyParser = require('body-parser');
const rsa = require('trsa');
const jwt = require("jwt-simple");
const moment = require('moment');
const jwtparams = require(__dirname + '/tokens/jwtparams');
const users = require(__dirname + '/userdata/users');
const tokenStore = require(__dirname + '/tokens/tokenstore');

// Express app setup
const app = express();
app.use(bodyParser.json());

const router = express.Router();

// Test function to get the private key matched to a smartcard id
router.get('/privatekey', function (req, res) {
    const smartcardId = req.query.smartcardId;
    const user = users.checkCredentials(smartcardId);
    res.send(user.privateKey);

});

// Authenticate Route
// The Smartcard is passed in the post body
// The response is a challenge which the client will sign using their private key
router.post('/authenticate', function (req, res) {
    const smartcardId = req.body.smartcardId;
    const challenge = users.createChallenge(smartcardId);
    res.send(challenge);

});

// Signed Challenge
// After getting a challenge from the server, the client
// should send it back after signing it with their private key
router.post('/signedChallenge', function (req, res) {
    const user = users.checkCredentials(req.body.smartcardId);
    const signedChallenge = req.body.signedChallenge;

    const isSigned = rsa.verify(user.challenge, signedChallenge, user.publicKey);

    if ( isSigned ) {

        const jwtParams = jwtparams.jwtParams;

        const expires = moment().add(jwtParams.JWT_TOKEN_EXPIRY, 'seconds').valueOf();
        // Create the PAYLOAD
        const payload = {
            // Registered claims
            exp: expires,
            iss: jwtParams.JWT_TOKEN_ISSUER,
            // Public claims
            name: user.name,
            email: user.email
        };

        console.log("Created Payload:");
        console.log(payload);

        // Encode the token
        // HEADER internally created by jwt-simple
        const token = jwt.encode(payload, jwtParams.JWT_TOKEN_SECRET);

        // Add the token to token store
        tokenStore.add(token, payload);

        // Return the token to the caller
        res.json({token: token});
    }

});

app.use(router);

app.listen(3000);

console.log('Listening on 3000');