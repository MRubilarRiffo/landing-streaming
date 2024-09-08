import styles from './Purchase Options.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductById } from '../../../../redux/actions';
import { GET_PRODUCTS_BY_ID } from '../../../../redux/actions-type';
import formatPrice from '../../../../functions/formatPrice';
import Loader from '../../../../components/Loader/Loader';
import ProductViewers from '../Product Viewers/Product Viewers';
import ButtonCloseModal from '../../../../components/Button Close Modal/Button Close Modal';

const PurchaseOptions = ({ setShowPurchaseOptions, productId, setShowShoppingCart }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState({
        activeVariation: null,
        activeCard: false,
        price: null
    })

    const { container, card, content, activeCard: activeCardStyle, 'row-1': row1, 'column-1': column1, 'column-2': column2 } = styles;
    const { activeVariation, activeCard, price } = state;
    const { salePrice, previousPrice } = price || { salePrice: 0, previousPrice: 0 };

    useEffect(() => {
        dispatch(getProductById(productId));
        setState(prevState => ({ ...prevState, activeCard: true }))
        return () => dispatch({ type: GET_PRODUCTS_BY_ID, payload: {} });
    }, [productId])
    
    const product = useSelector(({ productDetails }) => productDetails);
    
    useEffect(() => {
        const { salePrice, previousPrice } = product || null;
        
        if (salePrice && previousPrice) {
            setState(prevState => ({ ...prevState, price: { salePrice, previousPrice } }));
        };
    }, [product]);
    
    const handle = {
        showShoppingCart: () => {
            setShowShoppingCart(true);
            setShowPurchaseOptions(false);
        },
        payNow: () => {
            const { salePrice, name } = product;
            navigate('/finalizar-pago', { state: { quantity: 1, salePrice, name } })
        },
        btnVariation: (salePrice, previousPrice, id) => {
            setState(prevState => ({
                ...prevState,
                activeVariation: id,
                price: { salePrice, previousPrice }
            }));
        }
    };

    const VariationView = () => {
        const variations = product.Variations[0].ProductVariations || [];
        const nameVariation = product.Variations[0].name || '';
        const { btnVariation } = handle;

        return (
            <div className={styles.variationContainer}>
                <p className={styles.variationName}>{nameVariation}</p>
                <div className={styles.variations}>
                    {variations.map(({ id, salePrice, previousPrice, value }) => (
                        <p
                            key={id}
                            className={`${styles.variation} ${id === activeVariation && styles.activeVariation}`}
                            onClick={() => btnVariation(salePrice, previousPrice, id)}
                        >
                            {value}
                        </p>
                    ))}
                </div>
            </div>
        );
    };

    const PriceView = () => {
        const { priceContainer, salePrice: salePriceStyle, previousPrice: previousPriceStyle } = styles;

        return (
            <div className={priceContainer}>
                <p className={salePriceStyle}>{formatPrice(salePrice, 'Chile')}</p>
                <p className={previousPriceStyle}>{formatPrice(previousPrice, 'Chile')}</p>
            </div>
        );
    };

    const DescriptionView = () => {
        const { description } = product || '';
        const { description: descriptionStyle } = styles;

        return <p className={descriptionStyle}>{description}</p>;
    };

    const PaymentButtons = () => {
        const { btnAddToCart, btnBuy, 'row-2': row2 } = styles;
        const { showShoppingCart, payNow } = handle;

        return (
            <div className={row2}>
                <button className={btnAddToCart} onClick={showShoppingCart}> <p>Agregar al carrito</p></button>
                <button className={btnBuy} onClick={payNow}><p>Pagar Ahora</p></button>
            </div>
        );
    };

    return (
        <div className={container}>
            <div className={`${card} ${activeCard && activeCardStyle}`}>
                <ButtonCloseModal setCloseModal={setShowPurchaseOptions} />
                {!product || !product?.name
                    ? <Loader />
                    : <div className={content}>
                        <div className={row1}>
                            <div className={column1}>
                                <h3>{product.name}</h3>
                            </div>
                            <div className={column2}>
                                <PriceView />
                                <DescriptionView />
                                <ProductViewers />
                                <VariationView />
                            </div>
                        </div>
                        <PaymentButtons />
                    </div>
                }
            </div>
        </div>
    );
};

export default PurchaseOptions;