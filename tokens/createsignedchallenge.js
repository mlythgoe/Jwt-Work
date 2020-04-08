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
    "MIIBOQIBAAJBAL2oFoTea55JwcONfBvIba9XA8MayClaggC3nXVMqlyY44e5AmcC\n" +
    "qbdcxrfDkbMORdpiGYqesRs6zTw4kpyRCC8CAwEAAQJAJmA1tkr/Qbcw8u3VGBYV\n" +
    "Q656v2bS67M5rQV6YfrSWgvohiWFmKAY5lb1rvP2iIAtansQFlD4rnhbfsJ6yG/F\n" +
    "kQIhAOCKTMu36c2jjhuaHFKb9bf0UyP1Bqbt8nGv4Kr0QbR5AiEA2DqZN8gQZOGs\n" +
    "9kBjq6art0GIx842qq/qv+lG3h9e5+cCIClxXTs8dqq9xTzS9OdKYc/SCIZacx/c\n" +
    "SyMwkwb6jiYBAiByoraCbU3Lvh2NvFtbMJTPJi5XB8vRuEwzjIBm2KjfNwIgGX3Z\n" +
    "YGqMflvdiRQMuVAsvmjzoh0gq6XjAny8JKXtsx0=\n" +
    "-----END RSA PRIVATE KEY-----";

// generate challenge on server by issuing a POST to http://localhost:3000/authenticate with a body of
// {
//     "smartcardId": "22222222"
// }
// and use the returned challenge in the string below - as is
const challenge = "vKuZGxYmtpqSoizxjFXlKgUBVprXsq";

// create a signature this will be used by the client to send a POST to http://localhost:3000/signedChallenge with
// a body of
// {
// 	   "smartcardId": "22222222",
//     "signedChallenge": "1282015f6dc04b849b19912d47af0a7d29ca90e5ea4e682e82eb25a23e4f79034a167314ab836e5485994b222c248e037d11a26dd23f7420dc9944a2b80eac88"
// }
const signature = rsa.sign(challenge, privateKey);

console.log("Signature : " + signature);