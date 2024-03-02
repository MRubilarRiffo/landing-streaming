const crypto = require('crypto');

const generateNonce = () => {
    return crypto.randomBytes(32).toString('hex').substring(0,32);
};

module.exports = { generateNonce };