// JWT Token Authentication
// Part of the course on "REST API Design Development & Management"
// http://www.acloudfan.com

const express = require('express');
const bodyParser = require('body-parser');
const jwtAuth = require(__dirname + '/tokens/jwtauth');
const jwtValidator = require(__dirname + '/tokens/validator');

// Express app setup
const app = express();
app.use(bodyParser.json());

const router = express.Router();

// This is the passport middleware function that gets called first
const jwtAuthAuth = jwtAuth.auth;
router.post('/token', jwtAuthAuth, function (req, res) {
    res.send('token');
});

// This the call to the imaginary API that will parse the JWT token and validate it (look at expiry date)
const jwtValidatorAuth = jwtValidator.auth;
router.get('/private', jwtValidatorAuth, function (req, res) {
    res.send('Access granted to private resource!!!')
});

app.use(router);

app.listen(3000);

console.log('Listening on 3000');