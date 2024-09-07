import styles from './Purchase Options.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiCloseFill } from 'react-icons/ri';
import { getProductById } from '../../../../redux/actions';
import { GET_PRODUCTS_BY_ID } from '../../../../redux/actions-type';
import formatPrice from '../../../../functions/formatPrice';
import Loader from '../../../../components/Loader/Loader';
import ProductViewers from '../Product Viewers/Product Viewers';

const PurchaseOptions = ({ setShowPurchaseOptions, productId, setShowShoppingCart }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProductById(productId));
        return () => dispatch({ type: GET_PRODUCTS_BY_ID, payload: {} });
    }, [productId])

    const product = useSelector(state => state.productDetails);

    const [price, setPrice] = useState({
        salePrice: product.salePrice || 0,
        previousPrice: product.previousPrice || 0
    })

    useEffect(() => {
        if (product) {
            setPrice({
                salePrice: product.salePrice,
                previousPrice: product.previousPrice
            });
        };
    }, [product]);

    console.log(product);
    
    const { salePrice, previousPrice } = price || 0;

    const handle = {
        showShoppingCart: () => {
            setShowShoppingCart(true);
            setShowPurchaseOptions(false);
        },
        payNow: () => {
            const { salePrice, name } = product;
            navigate('/finalizar-pago', { state: { quantity: 1, salePrice, name } })
        },
        setPrice: (salePrice, previousPrice) => setPrice({ salePrice, previousPrice }),
        closePurchaseOptions: () => setShowPurchaseOptions(false)
    }


    const VariationView = () => {
        const variations = product.Variations[0].ProductVariations || [];
        const name = product.Variations[0].name || '';

        return (
            <div className={styles.variationContainer}>
                <p className={styles.variationName}>{name}</p>
                <div className={styles.variations}>
                    {variations.map(({ id, salePrice, previousPrice, value }) => (
                        <p
                            key={id}
                            className={styles.variation}
                            onClick={() => handle.setPrice(salePrice, previousPrice)}
                        >
                            {value}
                        </p>
                    ))}
                </div>
            </div>
        );
    };

    const BtnClose = () => {
        const { closePurchaseOptions } = handle;
        const { closeBtn } = styles;

        return (
            <button
                className={closeBtn}
                onClick={closePurchaseOptions}>
                <RiCloseFill />
            </button>
        );
    };

    const PriceView = () => {
        return (
            <div className={styles.priceContainer}>
                <p className={styles.salePrice}>{formatPrice(salePrice, 'Chile')}</p>
                <p className={styles.previousPrice}>{formatPrice(previousPrice, 'Chile')}</p>
            </div>
        );
    };

    const DescriptionView = () => {
        const { description } = product || '';

        return <p className={styles.description}>{description}</p>;
    };


    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <BtnClose />
                {Object.keys(product).length === 0
                    ? <Loader />
                    : <div className={styles.content}>
                        <div className={styles['row-1']}>
                            <div className={styles['column-1']}>
                                <h3>{product.name}</h3>
                            </div>
                            <div className={styles['column-2']}>
                                <PriceView />
                                <DescriptionView />
                                <ProductViewers />
                                <VariationView />
                            </div>
                        </div>
                        <div className={styles['row-2']}>
                            <button className={styles.btnAddToCart} onClick={handle.showShoppingCart}><p>Agregar al carrito</p></button>
                            <button className={styles.btnBuy} onClick={handle.payNow}><p>Pagar Ahora</p></button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default PurchaseOptions;