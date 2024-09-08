import styles from './Product Viewers.module.css';
import randomNumber from '../../../../functions/randomNumber';
import { useEffect, useState } from 'react';
import { GoEye } from 'react-icons/go';

const ProductViewers = () => {
    const [viewers, setViewers] = useState(randomNumber(10, 30));

    useEffect (() => {
        const viewersInterval = setInterval(() => {
            setViewers(randomNumber(10, 30));
        }, randomNumber(4000, 10000));

        return () => clearInterval(viewersInterval);
    }, [])

    return (
        <div className={styles.viewersContainer}>
            <GoEye />
            <p>{viewers} personas están viendo este producto ahora.</p>
        </div>
    );
};

export default ProductViewers;