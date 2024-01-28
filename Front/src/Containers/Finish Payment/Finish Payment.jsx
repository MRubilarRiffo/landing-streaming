import { memo, useEffect, useState } from 'react';
import { Mercado_Pago } from '../Mercado Pago/Mercado Pago';
import { finishPayment } from './Finish Payment.module.css';
import { Form_Billing_Details } from '../Forms/Form Billing Details';

const Finish_Payment = () => {
    useEffect(() => {
        return () => window.cardPaymentBrickController.unmount();
    }, []);

    const [userData, setUserData] = useState({
        name: "",
        lastname: "",
        mail: ""
    });


    return (
        <div className={finishPayment}>
            <h1>Finish Payment</h1>
            <Form_Billing_Details userData={userData} setUserData={setUserData} />
            <Mercado_Pago userData={userData} />
        </div>
    );
};

export { Finish_Payment };