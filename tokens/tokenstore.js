// Validates the token passed by the caller
// {tone:tok, expires:timestamp}
let tokens = [];

module.exports = {
    add: function (token, payload) {
        // add the payload to the claims - check this automatically splits the payload into an array!!!!
        tokens[token] = payload
    },

    // Check the token is valid, currently it just checks the expiry date
    isValid: function (token) {
        // If the token doesn't exist, return false
        if (tokens[token] === undefined) return false;

        // if the token has a claim called 'exp' (which is a standard claim) and is less than the current date
        // then it has expired, return false
        if (tokens[token].exp <= new Date()) {
            const ndx = tokens.indexOf(token);
            tokens.splice(ndx, 1);
            return false;
        } else {
            // expiry date exists and is in the future, return true
            return true;
        }
    }
};