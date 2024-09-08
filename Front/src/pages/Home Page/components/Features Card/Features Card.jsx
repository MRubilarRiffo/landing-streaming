import { useState } from 'react';
import styles from './Features Card.module.css';
import { MdKeyboardDoubleArrowDown, MdCheck  } from 'react-icons/md';
import PurchaseOptions from '../Purchase Options/Purchase Options';
import ShoppingCart from '../Shopping Cart/Shopping Cart';

const FeaturesCard = ({ feature, productId }) => {
    const [features, setFeatures] = useState(JSON.parse(feature));
    const [moreInfo, setMoreInfo] = useState(false);
    const [showPurchaseOptions, setShowPurchaseOptions] = useState(false);
    const [showShoppingCart, setShowShoppingCart] = useState(false);

    const handleClickMoreInfo = () => {
        setMoreInfo(!moreInfo);
    };

    const handleShowPurchaseOptions = () => {
        setShowPurchaseOptions(!showPurchaseOptions);
    };

    return (
        <div className={styles.card}>
            {features.length > 0 &&
                <div className={styles.containerList}>
                    <div className={styles.list}>
                        {features.slice(0, moreInfo ? features.length : 3).map((description, index) => (
                            <div className={styles.description} key={`description-${index}`}>
                                <div className={styles.iconCheck}><MdCheck /></div>
                                <p className={!moreInfo ? styles.noActiveMoreInfo : ''}>{description}</p>
                            </div>
                        ))}
                    </div>
                    <MdKeyboardDoubleArrowDown
                        onClick={handleClickMoreInfo}
                        className={`${styles.iconArrow} ${moreInfo ? styles.rotate : ''}`}
                    />
                </div>
            }
            <button className={styles.btnPayNow} onClick={handleShowPurchaseOptions}>Comprar Ahora</button>
            {showPurchaseOptions &&
                <PurchaseOptions setShowPurchaseOptions={setShowPurchaseOptions} setShowShoppingCart={setShowShoppingCart} productId={productId} />
            }
            {showShoppingCart &&
                <ShoppingCart setShowShoppingCart={setShowShoppingCart} />
            }

        </div>
    );
}

export default FeaturesCard;