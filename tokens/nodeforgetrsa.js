const rsa = require('trsa')

const keyPair = rsa.generateKeyPair({bits:512});

// The user presents herself by providing a username or email. OR SMARTCARD ID!!!!!!!!!!!
// The service presents a cryptographic challenge.
// The user uses her FIDO authenticator app or key to sign the challenge.
// After signing the challenge, the user sends the signed challenge back to the server.
// The server verifies the response with the user’s corresponding public key, and if successful, gives the user access to the account.

// // encryption
// const originalMessage = 'Hallo, this is Bob. I have something to tell you.'
// const encryptedMessage = rsa.encrypt(originalMessage, keyPair.publicKey);
// const decryptedMessage = rsa.decrypt(encryptedMessage, keyPair.privateKey);
//
// console.log("Original Message  : " + originalMessage);
// console.log("Encrypted Message : " + encryptedMessage);
// console.log("Decrypted Message : " + decryptedMessage);

// signature
// ***************************************************************************************
// ***************************************************************************************
// ***************************************************************************************
// I send the challenge as is to the client - it has no value other than being a random string
// the client creates a signature using the private key - we send the signature to the server
//
// when the server receives it, we verify the signature using the original challenge value,
// and the private key
// We use the signature against the challenge - if it's signed (the boolean value isSigned) then it's worked
// otherwise the value we've got back is assumed NOT to be a sign of the original challenge

// So we SIGN the data, not encrypt/decrypt it

// ***************************************************************************************
// ***************************************************************************************
// ***************************************************************************************

const publicKey = keyPair.publicKey;
const privateKey = keyPair.privateKey;

// generate challenge on server and pass back to client - as is
const challenge = "1234567890abcdefghijklmnop";

// create a signature on the client and send it to server
const signature = rsa.sign(challenge, privateKey);

console.log("Signature : " + signature);

const isSigned = rsa.verify(challenge, signature, publicKey);

if ( isSigned) {
    console.log("Signature is valid")
} else {
    console.log("Signature is NOT valid")
}

console.log("DONE");