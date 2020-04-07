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

const privateKey = "-----BEGIN RSA PRIVATE KEY-----\n" +
    "MIIBOgIBAAJBAMFxWMYr8IGrfv0Y+IN+hu5qF9D1mlSp8ZlP1c+aub3baAzH7upa\n" +
    "XmAqHB/XZxkG6VKuPNDFqS99sx9RLKH7WmcCAwEAAQJBAIRTZBXT8ubRCMJb9YwF\n" +
    "3oly263ehF8MDbABc9JbFlovbUsw2lwuRlZ61Xa3KRa8xygqE+VKe4XgdJFhuyoo\n" +
    "e5kCIQD3y1yf6m8epDrqAvMobwxn3Fh52PibC5M/m4cDWktMuwIhAMfZOkJnCcpj\n" +
    "Xbg3iE3GK9UJ/dJ1P8nQaHPzIMokCkRFAiBdYfxEH9tEluvE6NuuLztjoLyPHt+B\n" +
    "vrj9TaVx9ANQpQIgY7l7P+1ozkx9VNKpOp4b+0fsF9wYQ52yscFt6FDJqr0CICos\n" +
    "v8cEM1NpcJHSOSpDvJQJIZKPb6esZKYHsCRlIEa7\n" +
    "-----END RSA PRIVATE KEY-----";

// generate challenge on server and pass back to client - as is
const challenge = "fffFGhIOOHknPjKdgSPveDojbhhOzt";

// create a signature on the client and send it to server
const signature = rsa.sign(challenge, privateKey);

console.log("Signature : " + signature);