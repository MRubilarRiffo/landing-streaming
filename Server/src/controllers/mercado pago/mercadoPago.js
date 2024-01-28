require('dotenv').config();
const { MercadoPagoConfig, Payment } = require("mercadopago");

const mercado_Pago = async (req, res, next) => {
    try {
        const mercadoPagoAccessToken = process.env.ACCESS_TOKEN_TEST;
        
        const client = new MercadoPagoConfig({ accessToken: mercadoPagoAccessToken, options: { timeout: 5000 } });
        
        const payment = new Payment(client);

        if (!mercadoPagoAccessToken) {
            console.log('Error: access token not defined');
            res.status(400).send('Error: access token not defined');
        };

        const { body } = req;

        // console.log(body);

        // payment.create({ body: {
        //         token: "2d21c7a34a226196bb9c25648ab0c101",
        //         issuer_id: "200",
        //         installments: 6,
        //         transaction_amount: 100,
        //         description: '<DESCRIPTION>',
        //         payment_method_id: 'master',
        //         payer: {
        //             email: 'm.rubilar1010@gmail.com',
        //             identification: { type: 'RUT', number: '999999999' }
        //         }
        // } }).then(console.log).catch(console.log);

        payment.create({ body })
            .then(console.log)
            .catch(console.log);
            
    } catch (error) {
        console.log('Error al procesar el pago: ', error);
        res.status(500).send('Error interno al procesar el pago');
    };
};

module.exports = { mercado_Pago };