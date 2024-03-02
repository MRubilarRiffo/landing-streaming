require('dotenv').config();
const axios = require('axios');
const { generateNonce } = require('./functions/generateNonce');
const { generateSignature } = require('./functions/generateSignature');

const binancePay = async (req, res) => {
    try {
        const { merchantTradeNo, orderAmount, currency, description, goodsDetails } = req.body;

        const apiKey = process.env.API_KEY_BINANCEPAY;
        const secretKey = process.env.SECRET_KEY_BINANCEPAY;

        const requestBody = {
            env: {
                terminalType: 'APP'
            },
            merchantTradeNo,
            orderAmount,
            currency,
            description,
            goodsDetails
        };

        const timestamp = Date.now();

        const nonce = generateNonce();

        const signature = generateSignature(requestBody, secretKey, nonce, timestamp);

        const response = await axios.post('https://bpay.binanceapi.com/binancepay/openapi/v3/order', requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'BinancePay-Timestamp': timestamp,
                'BinancePay-Nonce': nonce,
                'BinancePay-Certificate-SN': apiKey,
                'BinancePay-Signature': signature
            }
        });

        const { status, data, errorMessage } = response.data;

        if (status === 'SUCCESS') {
            res.json({
                prepayId: data.prepayId,
                qrcodeLink: data.qrcodeLink,
                qrContent: data.qrContent,
                checkoutUrl: data.checkoutUrl,
                deeplink: data.deeplink,
                universalUrl: data.universalUrl
            });
        } else {
            res.status(400).json({ error: errorMessage });
        }
    } catch (error) {
        console.error('Error al crear el pedido: ', error.response);
        res.status(500).json({ error: 'Error interno del servidor' });
    };
};

module.exports = { binancePay };