import { useEffect, useState } from 'react';
import { Mercado_Pago } from '../Mercado Pago/Mercado Pago';
import { finishPayment } from './Finish Payment.module.css';
import { Form_Billing_Details } from '../Forms/Form Billing Details';
import { Details_Order } from '../Details Order/Details Order';
import { useLocation, useNavigate } from 'react-router-dom';
import { Binance_Pay } from '../Binance Pay/Binance Pay';

const Finish_Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { quantity, price, name } = location.state || {};

    useEffect(() => {
        if (!quantity || !price || !name) navigate('/');
    }, [quantity, price, name]);

    const [userData, setUserData] = useState({
        name: "",
        lastname: "",
        mail: ""
    });

    return (
        <div className={finishPayment}>
            <Form_Billing_Details userData={userData} setUserData={setUserData} />
            <Details_Order quantity={quantity} price={price} name={name} />
            
            <Mercado_Pago userData={userData} amount={25000} />
            <Binance_Pay />
        </div>
    );
};

export { Finish_Payment };