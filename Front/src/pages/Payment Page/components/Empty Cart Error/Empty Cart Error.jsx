import { useNavigate } from 'react-router-dom';
import imgEmptyCart from '../../../../assets/img/empty-cart.png';
import styles from './Empty Cart Error.module.css'
import Header from '../../../../components/Header/Header';

const EmptyCartError = () => {
    const navigate = useNavigate();

    const handleReturnToHome = () => navigate('/');

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.imgContainer}>
                    <img src={imgEmptyCart} alt="" />
                </div>
                <div className={styles.textContainer}>
                    <h3>Actualmente tu carrito se encuentra vacío.</h3>
                    <p>Puedes ver todos los productos disponibles y comprar algo en la tienda.</p>
                </div>
                <button
                    className={styles.btnReturnToHome}
                    onClick={handleReturnToHome}
                >
                    <span>Volver a la tienda</span>
                </button>
            </div>
        </>
    );
};

export default EmptyCartError;