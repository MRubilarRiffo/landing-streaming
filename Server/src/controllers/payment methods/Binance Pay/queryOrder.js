const axios = require('axios');
const crypto = require('crypto');
const { generateNonce } = require('./functions/generateNonce');
const { generateSignature } = require('./functions/generateSignature');
require('dotenv').config();

const queryOrder = async (req, res) => {
    try {
        const apiKey = process.env.API_KEY_BINANCEPAY;
        const secretKey = process.env.SECRET_KEY_BINANCEPAY;

        const requestBody = {
            "merchantId": "9825386937292",
            "prepayId": "282425753837314048"
        };

        const timestamp = Date.now();

        const nonce = generateNonce();

        const signature = generateSignature(requestBody, secretKey, nonce, timestamp)

        const response = await axios.post('https://bpay.binanceapi.com/binancepay/openapi/v2/order/query', requestBody, {
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
            return res.json({
                merchantId: data.merchantId,
                prepayId: data.prepayId,
                transactionId: data.transactionId,
                merchantTradeNo: data.merchantTradeNo,
                tradeType: data.tradeType,
                status: data.status,
                currency: data.currency,
                totalFee: data.totalFee,
                productName: data.productName,
                productDetail: data.productDetail,
                transactTime: data.transactTime,
                createTime: data.createTime
            });
        } else {
            return res.status(400).json({ error: errorMessage });
        }

    } catch (error) {
        console.error('Error al consultar el pedido: ', error.response);
        return res.status(500).json({ error: 'Error interno del servidor' });
    };
};

module.exports = { queryOrder };