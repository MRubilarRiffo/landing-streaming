const crypto = require('crypto');

const generateSignature = (body, secretKey, nonce, timestamp) => {
    const payload = timestamp + "\n" + nonce + "\n" + JSON.stringify(body) + "\n";
    const hmac = crypto.createHmac('sha512', secretKey);
    hmac.update(payload);
    const signature = hmac.digest('hex').toUpperCase();
    return signature;
};

module.exports = { generateSignature };