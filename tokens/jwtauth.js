const jwt = require("jwt-simple");
const moment = require('moment');
const users = require(__dirname + '/../userdata/users');
const tokenStore = require(__dirname + '/tokenstore');


const jwtParams = {
    JWT_TOKEN_SECRET: 'token-secret',
    JWT_TOKEN_ISSUER: 'NHS Digital',
    JWT_HEADER: 'authorization',
    JWT_TOKEN_EXPIRY: 30   /** Set to expiry after 30 seconds */
};

// Issues the token after validating the username and password passed in the body.
const auth = function (req, res) {
    if (req.body) {
        // Body has the username & password - get the values from the body ands pass them to the checkCredntials function
        const user = users.checkCredentials(req.body.smartCardId);
        //console.log(req.body)
        if (user) {
            // Authenticated
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

        } else {
            // User not found or password incorrect
            res.sendStatus(401);
        }
    } else {
        // Body did not have the username/password data
        res.sendStatus(401);
    }
};

exports.auth = auth;
exports.params = jwtParams;
