import styles from './Payment Page.module.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BillingDetails from './components/Billing Details/Billing Details';
import DetailsOrder from './components/Details Order/Details Order';
import BinancePay from './components/Binance Pay/Binance Pay';
import Header from '../../components/Header/Header';
import formatPrice from '../../functions/formatPrice';
import { useSelector } from 'react-redux';
import EmptyCartError from './components/Empty Cart Error/Empty Cart Error';

const PaymentPage = () => {
    const location = useLocation();

    const cart = useSelector((state) => state.cart);

    const { quantity, salePrice, name } = location.state || {};

    const [subTotal, setSubTotal] = useState(formatPrice(quantity * salePrice, 'Chile'));
    const [userData, setUserData] = useState({
        name: '',
        lastname: '',
        mail: ''
    });

    console.log(quantity, salePrice, name);
    

    if (!quantity || quantity <= 0 || !salePrice || salePrice <= 0 || !name) {
        return <EmptyCartError />;
    };

    return (
        <>
            <Header />
            <div className={styles.body}>
                <div className={styles.columnLeft}>
                    <BillingDetails userData={userData} setUserData={setUserData} />
                </div>
                <div className={styles.columnRight}>
                    <DetailsOrder quantity={quantity} name={name} subTotal={subTotal} salePrice={salePrice} />
                    <BinancePay />
                </div>
            </div>
        </>
    );
};

export default PaymentPage;