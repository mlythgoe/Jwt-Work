const jwtParams = {
    JWT_TOKEN_SECRET: 'token-secret',
    JWT_TOKEN_ISSUER: 'NHS Digital',
    JWT_HEADER: 'authorization',
    JWT_TOKEN_EXPIRY: 30   /** Set to expiry after 30 seconds */
};
exports.jwtParams = jwtParams;