import styles from './Shopping Cart.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ButtonCloseModal from '../../../../components/Button Close Modal/Button Close Modal';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = ({ setShowShoppingCart }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState({
        activeCart: false,
    })

    const { activeCart } = state;
    const { container, cart, content, btnPay, activeCart: activeCartStyle, 'row-1': row1, 'row-2': row2 } = styles;

    useEffect(() => {
        // dispatch()
        setState(prevState => ({ ...prevState, activeCart: true }));
    }, []);

    console.log('Renderizado de Shopping Cart');

    return (
        <div className={container}>
            <div className={`${cart} ${activeCart && activeCartStyle}`}>
                <ButtonCloseModal setCloseModal={setShowShoppingCart} />
                <div className={content}>
                    <div className={row1}>
                        <h3>Carrito de Compra</h3>

                    </div>
                    <div className={row2}>
                        <button className={btnPay}><p>Finalizar Compra</p></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;