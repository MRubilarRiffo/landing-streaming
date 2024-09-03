import { loadMercadoPago } from "@mercadopago/sdk-js";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import './Mercado Pago.css';
import { submitPaymentForm } from "../../Redux/actions";

const Mercado_Pago = ({ userData, amount }) => {
    const dispatch = useDispatch();

    const [mp, setMp] = useState(null);
    const [visible, setVisible] = useState(false);
    const [countOptions, setCountOptions] = useState(1);

    useEffect(() => {
        const initializeMercadoPago = async () => {
            await loadMercadoPago();
            const mp  = new window.MercadoPago('TEST-ac1913b4-0a4c-4835-8a98-63c7565c0f6a');
            
            setMp(mp);

            const props = {
                style: {
                    width: '100%',
                    padding: '15px 25px',
                    fontFamily: 'Poppins, sans-serif',
                    color: '#adb0bc',
                },
                customFonts: [
                    {
                        src: "https://fonts.googleapis.com/css2?family=Poppins:wght@400",
                    },
                ],
            };

            const cardNumberElement = mp.fields.create('cardNumber', {
                placeholder: "0000 0000 0000 0000",
                style: props.style,
                customFonts: props.customFonts,
                enableLuhnValidation: true
            }).mount('form-checkout__cardNumber');

            const expirationDateElement = mp.fields.create('expirationDate', {
                placeholder: "mm/yy",
                style: props.style,
                customFonts: props.customFonts,
            }).mount('form-checkout__expirationDate');

            const securityCodeElement = mp.fields.create('securityCode', {
                placeholder: "123",
                style: props.style,
                customFonts: props.customFonts,
            }).mount('form-checkout__securityCode');

            getIdentificationTypes(mp);

            setupPaymentMethod(mp, cardNumberElement, securityCodeElement);        
        };

        initializeMercadoPago();
    }, []);

    const getIdentificationTypes = async (mp) => {
        try {
            const identificationTypes = await mp.getIdentificationTypes();
            const identificationTypeElement = document.getElementById('form-checkout__identificationType');

            createSelectOptions(identificationTypeElement, identificationTypes);
        } catch (e) {
            console.error('Error getting identificationTypes: ', e);
        };
    };

    const createSelectOptions = (elem, options, labelsAndKeys = { label: "name", value: "id" }) => {
        const { label, value } = labelsAndKeys;

        elem.options.length = 0;

        const tempOptions = document.createDocumentFragment();

        options.forEach(option => {
            const optValue = option[value];
            const optLabel = option[label];

            const opt = document.createElement('option');
            opt.value = optValue;
            opt.textContent = optLabel;

            tempOptions.appendChild(opt);
        });

        if (elem.id == 'form-checkout__installments') {
            setCountOptions(options.length);
        };

        elem.appendChild(tempOptions);
    };

    const setupPaymentMethod = (mp, cardNumberElement, securityCodeElement) => {
        const paymentMethodElement = document.getElementById('paymentMethodId');
        const issuerElement = document.getElementById('form-checkout__issuer');
        const installmentsElement = document.getElementById('form-checkout__installments');

        const issuerPlaceholder = "Banco emisor";
        const installmentsPlaceholder = "Cuotas";

        let currentBin;
        cardNumberElement.on('binChange', async (data) => {
            const { bin } = data;
            try {
                if (!bin && paymentMethodElement.value) {
                    clearSelectsAndSetPlaceholders();
                    paymentMethodElement.value = "";
                }

                if (bin && bin !== currentBin) {
                    const { results } = await mp.getPaymentMethods({ bin });
                    const paymentMethod = results[0];

                    paymentMethodElement.value = paymentMethod.id;
                    updatePCIFieldsSettings(paymentMethod, cardNumberElement, securityCodeElement);
                    updateIssuer(paymentMethod, bin);
                    updateInstallments(paymentMethod, bin);
                    setVisible(true);
                } else {
                    setVisible(false);
                };

                currentBin = bin;
            } catch (e) {
                // Logica en caso de tarjeta inválida
                console.error('error getting payment methods: ', e)
            }
        });

        function clearSelectsAndSetPlaceholders() {
            clearHTMLSelectChildrenFrom(issuerElement);
            createSelectElementPlaceholder(issuerElement, issuerPlaceholder);

            clearHTMLSelectChildrenFrom(installmentsElement);
            createSelectElementPlaceholder(installmentsElement, installmentsPlaceholder);
        }

        function clearHTMLSelectChildrenFrom(element) {
            const currOptions = [...element.children];
            currOptions.forEach(child => child.remove());
        }

        function createSelectElementPlaceholder(element, placeholder) {
            const optionElement = document.createElement('option');
            optionElement.textContent = placeholder;
            optionElement.setAttribute('selected', "");
            optionElement.setAttribute('disabled', "");

            element.appendChild(optionElement);
        }

        // Este paso mejora las validaciones de cardNumber y securityCode
        function updatePCIFieldsSettings(paymentMethod, cardNumberElement, securityCodeElement) {
            const { settings } = paymentMethod;

            const cardNumberSettings = settings[0].card_number;
            cardNumberElement.update({
                settings: cardNumberSettings
            });

            const securityCodeSettings = settings[0].security_code;
            securityCodeElement.update({
                settings: securityCodeSettings
            });
        };

        async function updateIssuer(paymentMethod, bin) {
            const { additional_info_needed, issuer } = paymentMethod;
            let issuerOptions = [issuer];
    
            if (additional_info_needed.includes('issuer_id')) {
                issuerOptions = await getIssuers(paymentMethod, bin);
            };
    
            createSelectOptions(issuerElement, issuerOptions);
        };
    
        async function getIssuers(paymentMethod, bin) {
            try {
                const { id: paymentMethodId } = paymentMethod;
                return await mp.getIssuers({ paymentMethodId, bin });
            } catch (e) {
                console.error('error getting issuers: ', e)
            };
        };

        async function updateInstallments(paymentMethod, bin) {
            try {
                const installments = await mp.getInstallments({
                    amount: document.getElementById('transactionAmount').value,
                    bin,
                    paymentTypeId: 'credit_card'
                });
                const installmentOptions = installments[0].payer_costs;
                const installmentOptionsKeys = { label: 'recommended_message', value: 'installments' };
                createSelectOptions(installmentsElement, installmentOptions, installmentOptionsKeys);
            } catch (error) {
                console.error('error getting installments: ', error)
            }
        }
    };

    const createCardToken = async (event) => {
        try {
            event.preventDefault();
            const tokenElement = document.getElementById('token');
            if (!tokenElement.value) {
                const token = await mp.fields.createCardToken({
                    cardholderName: document.getElementById('form-checkout__cardholderName').value,
                    identificationType: document.getElementById('form-checkout__identificationType').value,
                    identificationNumber: document.getElementById('form-checkout__identificationNumber').value,
                });
                tokenElement.value = token.id;

                const formData = {
                    transaction_amount: Number(document.getElementById('transactionAmount').value),
                    token: tokenElement.value,
                    description: document.getElementById('description').value,
                    installments: Number(document.getElementById('form-checkout__installments').value),
                    payment_method_id: document.getElementById('paymentMethodId').value,
                    issuer_id: document.getElementById('form-checkout__issuer').value,
                    payer: {
                        email: document.getElementById('form-checkout__email').value,
                        identification: {
                            type: document.getElementById('form-checkout__identificationType').value,
                            number: document.getElementById('form-checkout__identificationNumber').value
                        }
                    }
                };
                console.log(formData);
                dispatch(submitPaymentForm(formData));
            }
        } catch (error) {
            console.error('error creating card token: ', error);
        }
    };

    return (
        <div>
            <style>
                {`
                #form-checkout {
                    display: flex;
                    flex-direction: column;
                }
    
                .container {
                    height: 18px;
                    display: inline-block;
                    border: 1px solid rgb(118, 118, 118);
                    border-radius: 2px;
                    padding: 1px 2px;
                }
                `}
            </style>
            <form id="form-checkout" onSubmit={createCardToken}>
                <div id="form-checkout__cardNumber" className="container"></div>

                <div className="containerRow_dd4w54">
                    <div id="form-checkout__expirationDate" className="container"></div>
                    <div id="form-checkout__securityCode" className="container"></div>
                </div>
                
                <div className="containerInput_d545e68">
                    <input type="text" id="form-checkout__cardholderName" placeholder="Titular de la tarjeta" />
                </div>

                <div className={visible ? "containerInput_d545e68" : "visible"}>
                    <select id="form-checkout__issuer" name="issuer" defaultValue="">
                        <option value="" disabled>Banco emisor</option>
                    </select>
                </div>

                <div id="select-installments_r4e54qw" className={visible ? "containerInput_d545e68" : "visible"}>
                    <select size={countOptions} id="form-checkout__installments" name="installments" defaultValue="">
                        <option value="" disabled>Cuotas</option>
                    </select>
                </div>

                <div className={visible ? "container_ff4e82" : "visible"}>
                    <div className={"containerInput_d545e68"}>
                        <select id="form-checkout__identificationType" name="identificationType" defaultValue="">
                            <option value="" disabled>Tipo de documento</option>
                        </select>
                    </div>

                    <div className={visible ? "containerInput_d545e68" : "visible"}>
                        <input type="text" id="form-checkout__identificationNumber" name="identificationNumber" placeholder="Número do documento" />
                    </div>
                </div>

                <input id="form-checkout__email" name="email" type="hidden" value={userData.mail} />
                <input id="token" name="token" type="hidden" />
                <input id="paymentMethodId" name="paymentMethodId" type="hidden" />
                <input id="transactionAmount" name="transactionAmount" type="hidden" value={amount} />
                <input id="description" name="description" type="hidden" value="Nome do Produto" />
    
                <button type="submit" id="form-checkout__submit"><span>FINALIZAR PAGO</span></button>
            </form>
        </div>
    );
};
  
export { Mercado_Pago };