import styles from './Card.module.css';
import { Details_Product } from '../Details Product/Details Product';
import { useState } from 'react';

const Card = ({ props }) => {
    const formatPrice = (price) => {
        const priceCLP = Math.floor(price);
        return `$${priceCLP.toLocaleString('es-CL')}`;
    };

    const [onDetails, setOnDetails] = useState(false);

    const handleClick = () => {
        setOnDetails(!onDetails);
    };

    return (
        <div>
            {
                onDetails && <Details_Product props={props} setOnDetails={setOnDetails}/>
            }

            <div
                className={styles.card}
                onClick={handleClick}
                >
                <div className={styles.image_container}>
                    <img
                        className={styles.image_product}
                        src={props.images[0].src}
                        alt='Imagen de producto'
                    />
                </div>
                <div className={styles.product_info}>
                    <p>{props.categories[0].name}</p>
                    <h3 className={styles.product_title}>{props.name}</h3>
                    <div className={styles.container_prices}>
                        <p className={styles.product_price}>{formatPrice(props.price)}</p>
                        <p className={styles.product_price}>{formatPrice(props.regular_price)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Card };