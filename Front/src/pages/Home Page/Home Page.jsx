import styles from './Home Page.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import ProductCard from './components/Product Card/Product Card';
import FeaturesCard from './components/Features Card/Features Card';
import { useEffect } from 'react';
import { getProducts } from '../../redux/actions';
import Header from '../../components/Header/Header';

const HomePage = () => {
    const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProducts());
	}, []);

    const { data } = useSelector((state) => state.products);
    
    if (!data) {
        return (
            <div className={styles.loader}>
                <Loader />
            </div>
        );
    };

    return (
        <>
            <Header />
            <div className={styles.home}>
                <div className={styles.info}>
                    <div className={styles.texts}>
                        <h2>Comparta la suscripción premium más barato en GamsGo</h2>
                    </div>

                    <div className={styles.line}></div>
                </div>
                <div className={styles.cards}>
                    {data.map((product) => (
                        <div key={product.id} className={styles.card}>
                            <ProductCard  product={product} />
                            <FeaturesCard feature={product.features} productId={product.id} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default HomePage;