import { useEffect, useRef } from 'react';
import styles from './Details Product.module.css'

const Details_Product = ({ props, setOnDetails }) => {
    const containerDetailsRef = useRef(null);
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleBackgroundMouseEnter = () => {
        document.body.style.cursor = 'auto';
    };

    const handleBackgroundMouseLeave = () => {
        document.body.style.cursor = 'auto';
    };

    const handleClose = () => {
        setOnDetails(false);
    };

    const handleBackgroundClick = ({ target }) => {
        if (containerDetailsRef.current && !containerDetailsRef.current.contains(target)) {
            handleClose();
        };
    };

    console.log(props);
    return (
        <div
            className={styles.background}
            onMouseEnter={handleBackgroundMouseEnter}
            onMouseLeave={handleBackgroundMouseLeave}
            onClick={handleBackgroundClick}
            >
            <div
                className={styles.container_Details_Product}
                ref={containerDetailsRef}
                >
                <button
                    id={styles.button_close}
                    onClick={handleClose}
                    >
                    X
                </button>
                <div className={styles.container_image_details_product}>
                    <img
                            className={styles.image_details_product}
                            src={props.images[0].src}
                            alt='Imagen de producto'
                        />
                </div>
                <div className={styles.props_details_product}>
                    <p>{props.categories[0].name}</p>
                    <h3 className={styles.product_title}>{props.name}</h3>
                </div>
            </div>
        </div>
    );
};

export { Details_Product };