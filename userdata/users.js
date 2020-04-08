const rsa = require('trsa')
const randomstring = require("randomstring");
// Hardcoded users for testing
// Can be changed to store the users in a database

// Takes the basic smart card id, name and email attributes but also
// creates the public and private keys (the private keys should be stored on authenticator devices but
// are stored here so a test url can be used to extract them - they are need to generate the signed challenge
const createUser = function(smartcardId, name, email) {

    let keyPair = rsa.generateKeyPair({bits: 512});
    let publicKey = keyPair.publicKey;
    let privateKey = keyPair.privateKey;

    console.log("Public Key: " + publicKey);
    console.log("Private Key: " + privateKey);

    return {
        smartcardId: smartcardId,
        publicKey: publicKey,
        privateKey: privateKey,
        challenge: "",
        name: name,
        email: email
    }
}

// Create a challenge and pass it back, after storing it in the user
const createChallenge = function (smartCardId) {
    const user = checkCredentials(smartCardId);
    const challenge = randomstring.generate({
        length: 30,
        charset: 'alphabetic'
    });
    user.challenge = challenge;
    return challenge;
}

// Returns a user if the smartcardId matches an existing user
const checkCredentials = function (smartcardId) {
    return users.find(function (u) {
        return u.smartcardId === smartcardId;
    })
};

// Preconfigured static user data
const users = [
    createUser("11111111","Jim", "jim@nhs.net"),
    createUser("22222222", "Sam", "sam@nhs.net")
];


exports.checkCredentials = checkCredentials;
exports.createChallenge = createChallenge;