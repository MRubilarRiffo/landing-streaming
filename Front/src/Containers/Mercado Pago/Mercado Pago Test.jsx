import { useEffect, useState } from 'react';
import { loadMercadoPago } from '@mercadopago/sdk-js';
import './Mercado Pago.css';

const Mercado_Pago_Test = ({ userData, amount }) => {
    const [verification, setVerification] = useState(false);

    useEffect(() => {
        initializeMercadoPago();
    }, []);

    const initializeMercadoPago = async () => {
        await loadMercadoPago();
        const mp = new window.MercadoPago('TEST-ac1913b4-0a4c-4835-8a98-63c7565c0f6a');
    
        const cardForm = mp.cardForm({
            amount: `${amount}`,
            iframe: false,
            form: {
                id: 'form-checkout',
                cardNumber: {
                    id: 'form-checkout__cardNumber',
                    placeholder: '0000 0000 0000 0000',
                },
                expirationDate: {
                    id: 'form-checkout__expirationDate',
                    placeholder: 'mm/yy',
                },
                securityCode: {
                    id: 'form-checkout__securityCode',
                    placeholder: '123',
                },
                cardholderName: {
                    id: 'form-checkout__cardholderName',
                    placeholder: 'Titular de la tarjeta',
                },
                issuer: {
                    id: 'form-checkout__issuer',
                    placeholder: 'Banco emisor',
                },
                installments: {
                    id: 'form-checkout__installments',
                    placeholder: 'Cuotas',
                },        
                identificationType: {
                    id: 'form-checkout__identificationType',
                    placeholder: 'Tipo de documento',
                },
                identificationNumber: {
                    id: 'form-checkout__identificationNumber',
                    placeholder: 'Número del documento',
                },
                cardholderEmail: {
                    id: 'form-checkout__cardholderEmail',
                    placeholder: 'E-mail',
                },
            },
            callbacks: {
                onFormMounted: error => {
                    if (error) return console.warn('Form Mounted handling error: ', error);
                    console.log('Form mounted');
                },
                onSubmit: event => {
                    console.log("aqui");
                    console.log(cardForm.getCardFormData());
                    event.preventDefault();
        
                    const {
                        paymentMethodId: payment_method_id,
                        issuerId: issuer_id,
                        cardholderEmail:
                            email,
                            amount,
                            token,
                            installments,
                            identificationNumber,
                            identificationType,
                    } = cardForm.getCardFormData();
        
                    fetch('/process_payment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            token,
                            issuer_id,
                            payment_method_id,
                            transaction_amount: Number(amount),
                            installments: Number(installments),
                            description: 'Descripción del producto',
                            payer: {
                                email,
                                identification: {
                                    type: identificationType,
                                    number: identificationNumber,
                                },
                            },
                        }),
                    });
                },
                onFetching: (resource) => {
                    if (resource == 'installments') {
                        setVerification(true)
                    };
                    console.log('Fetching resource: ', resource);
                }
            },
        });
    };
    
    return (
        <form id='form-checkout'>
            <h4>CRÉDITO, DÉBITO O CUENTA RUT</h4>
            <div className='containerInput_d545e68'>
                <input
                    id='form-checkout__cardNumber'
                    maxLength='16'
                    inputMode='numeric'
                    autoComplete='off'
                    pattern='[0-9]*'
                    />
            </div>
            <div className='containerRow_dd4w54'>
                <div className='containerInput_d545e68'>
                    <input
                        id='form-checkout__expirationDate'
                        maxLength='5'
                        inputMode='numeric'
                        autoComplete='off'
                        />
                </div>
                <div className='containerInput_d545e68'>
                    <input
                        id='form-checkout__securityCode'
                        maxLength='3'
                        inputMode='numeric'
                        autoComplete='off'
                        />
                </div>
            </div>
            <div className='containerInput_d545e68'>
                <input
                    type='text'
                    id='form-checkout__cardholderName'
                    />
            </div>
            <select id='form-checkout__issuer'></select>
            <div
                className={verification ? 'containerInput_d545e68' : 'verification'}
                multiple
                >
                {

                    // <select id='form-checkout__installments'></select>
                }
                
                <div className='select-multiple'>
                    <div className='select-multiple__circle'></div>
                    <select id='form-checkout__installments' multiple></select>
                </div>

            </div>
            <div className='containerRow_dd4w54'>
                <div className='containerInput_d545e68'>
                    <select id='form-checkout__identificationType'></select>
                </div>
                <div className='containerInput_d545e68'>
                    <input
                        type='text'
                        id='form-checkout__identificationNumber'
                        />
                </div>
            </div>
            <input
                id='form-checkout__cardholderEmail'
                type='email'
                defaultValue={userData.mail}
                />
            <button
                type='submit'
                id='form-checkout__submit'
                >
                <span>FINALIZAR PAGO</span>
            </button>
        </form>
    );
};

export { Mercado_Pago_Test };