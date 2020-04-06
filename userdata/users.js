// Hardcoded users for testing
// Can be changed to store the users in a database
const users = [
    {smartcardId: "11111111", name: "Jim", email: "jim@nhs.net"},
    {smartcardId: "22222222", name: "Sam", email: "sam@nhs.net"}
];

const checkCredentials = function (smartcardId) {
    // Check if username/password are good
    const user = users.find(function (u) {
        return u.smartcardId === smartcardId;
    });

    return user
};

exports.checkCredentials = checkCredentials;