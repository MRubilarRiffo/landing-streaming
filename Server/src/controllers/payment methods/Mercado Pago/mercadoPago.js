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

        console.log(body);

        payment.create({ body })
            .then(console.log)
            .catch(console.log);
            
    } catch (error) {
        console.log('Error al procesar el pago: ', error);
        res.status(500).send('Error interno al procesar el pago');
    };
};

module.exports = { mercado_Pago };