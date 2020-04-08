const rsa = require('trsa');

// This is JUST a utility class to duplicate what the client should be doing, i.e.
// signing the challenge and sending it back to the server.
// The Private key can be obtained passing the smart card id to the app,
// e.g. GET - http://localhost:3000/privatekey?smartcardId=22222222
//
// The challenge can be obtained by obtained by passing the smart card ID in a post,
// e.g. POST - http://localhost:3000/authenticate - with JSON body passing the smart card id
// {
//     "smartcardId": "22222222"
// }
// Once you have the signature and challenge, paste them into the string values below.
// The signature will be printed out and this can be used in the signed challenge call
// e.g POST - http://localhost:3000/authenticate - with JSON body of:
// {
// 	"smartcardId": "22222222",
//     "signedChallenge": "4a5a24714e63a0ff3cd404b9443ff48c6b88f1a574aed48a35f422e416add070e48a73308f8271618710caf325aa78361f79a016d83ba4d97f13bc46c2d53764"
// }

// Get the private key by issuing a GET to http://localhost:3000/privatekey?smartcardId=22222222
const privateKey = "-----BEGIN RSA PRIVATE KEY-----\n" +
    "MIIBPAIBAAJBAK8RT73YW2Ee+bDjIBTvw/mn35hJC+y5/6WbpxnLP54CHul/Wj8n\n" +
    "u/f4rFyHPYI11Szxru+Wi4haU81wrTDbxUsCAwEAAQJARGEgomhlmNO+d2bfWw4j\n" +
    "n9oALb0qWTZ1MjxP0nVezdokcCXkx9eAPcz2CZPOjUbcyOe16eI2eEUFZH3V9Kql\n" +
    "YQIhAOK+V/ee5Pg7SR82PohDdl+mIeullSigUEbCKyhdNGlpAiEAxagKUE6mz8PV\n" +
    "k3HU246o9Os8BesYw7/H/TpIb0KTjpMCIQDS4IIBmvaKYuDrtVBM/Kkf5euQNIxX\n" +
    "n1lppXXr8VsoWQIhAKVDFzyGRps41n5tktfws/v0Iz+fjhk9ZO2pqZ69P7rZAiEA\n" +
    "0HvIh/m5KZFQvGK2y2Juw/Xl+Gw4kKNIJJO/EOYUBoQ=\n" +
    "-----END RSA PRIVATE KEY-----";

// generate challenge on server by issuing a POST to http://localhost:3000/authenticate with a body of
// {
//     "smartcardId": "22222222"
// }
// and use the returned challenge in the string below - as is
const challenge = "VocaxEEiGCbZyJqHoyKwPneAIrYIeF";

// create a signature this will be used by the client to send a POST to http://localhost:3000/signedChallenge with
// a body of
// {
// 	   "smartcardId": "22222222",
//     "signedChallenge": "1282015f6dc04b849b19912d47af0a7d29ca90e5ea4e682e82eb25a23e4f79034a167314ab836e5485994b222c248e037d11a26dd23f7420dc9944a2b80eac88"
// }
const signature = rsa.sign(challenge, privateKey);

console.log("Signature : " + signature);