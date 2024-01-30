import { initMercadoPago, CardPayment  } from '@mercadopago/sdk-react';

initMercadoPago('TEST-ac1913b4-0a4c-4835-8a98-63c7565c0f6a');

const Mercado_Pago = ({ userData }) => {
    const initialization = {
        amount: 100,
        payer: {
            email: userData.mail,
        },
    };

    const customization = {
        visual: {
            texts: {
                formTitle: "Crédito, débito o Cuenta Rut",
            }
        }
    };

    const onSubmit = async (formData) => {
        // callback llamado al hacer clic en el botón enviar datos
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3001/api/mercadopago/process_payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(response => {
                // recibir el resultado del pago
                resolve();
            })
            .catch(error => {
                // manejar la respuesta de error al intentar crear el pago
                reject();
            });
        });
    };
  
    const onError = async (error) => {
        // callback llamado para todos los casos de error de Brick
        console.log(error);
        alert(JSON.stringify(error));
    };
  
    const onReady = async () => {
        /*
          Callback llamado cuando Brick está listo.
          Aquí puedes ocultar cargamentos de su sitio, por ejemplo.
        */
    };
  
    return (
        <CardPayment
            initialization={initialization}
            onSubmit={onSubmit}
            onReady={onReady}
            onError={onError}
            customization={customization}
        />
    );
};
  
export { Mercado_Pago };