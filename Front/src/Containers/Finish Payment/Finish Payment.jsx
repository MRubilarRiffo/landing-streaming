import { useEffect, useState } from 'react';
import { Mercado_Pago } from '../Mercado Pago/Mercado Pago';
import { finishPayment, noInfo, buttonReturn } from './Finish Payment.module.css';
import { Form_Billing_Details } from '../Forms/Form Billing Details';
import { Details_Order } from '../Details Order/Details Order';
import { useLocation, useNavigate } from 'react-router-dom';

const Finish_Payment = () => {
    useEffect(() => {
        return () => {
            window.cardPaymentBrickController && window.cardPaymentBrickController.unmount();
        };
    }, []);

    const [userData, setUserData] = useState({
        name: "",
        lastname: "",
        mail: ""
    });

    const location = useLocation();

    const { quantity, price, name } = location.state || {};

    const navigate = useNavigate();

    const handleNavigate = () => navigate('/');

    const NoInfo = () => {
        return (
            <div className={noInfo}>
                <p>Tu carrito está vacío.</p>
                <button
                    className={buttonReturn}
                    onClick={handleNavigate}
                    >
                    Volver a la tienda
                </button>
            </div>
        );
    };

    return (
        <div className={finishPayment}>
            <h1>Finish Payment</h1>
            {
                !quantity || !price || !name
                    ? <NoInfo />
                    : <>
                        <Form_Billing_Details userData={userData} setUserData={setUserData} />
                        <Details_Order quantity={quantity} price={price} name={name} />
                        <Mercado_Pago userData={userData} />
                    </>
            }
            
        </div>
    );
};

export { Finish_Payment };