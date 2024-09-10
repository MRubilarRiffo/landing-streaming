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

    const products = useSelector(({ products }) => products.data) || [];

    const { loader, card, cards, info, texts, line, home } = styles;
    
    if (products.length === 0) {
        return (
            <div className={loader}>
                <Loader />
            </div>
        );
    };

    return (
        <>
            <Header />
            <div className={home}>
                <div className={info}>
                    <div className={texts}>
                        <h2>Comparta la suscripción premium más barato en GamsGo</h2>
                    </div>
                    <div className={line}></div>
                </div>
                <div className={cards}>
                    {products.map((product) => (
                        <div key={product.id} className={card}>
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