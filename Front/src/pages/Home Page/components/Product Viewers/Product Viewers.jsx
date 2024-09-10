import styles from './Product Viewers.module.css';
import randomNumber from '../../../../functions/randomNumber';
import { useEffect, useState } from 'react';
import { GoEye } from 'react-icons/go';

const ProductViewers = () => {
    const [state, setState] = useState({ viewers: randomNumber(18, 30) });

    const { viewers } = state;
    const { viewersContainer } = styles;

    useEffect (() => {
        const viewersInterval = setInterval(() => {
            setState(prevState => ({ ...prevState, viewers: randomNumber(18, 30) }));
        }, randomNumber(3000, 7000));

        return () => clearInterval(viewersInterval);
    }, [])


    return (
        <div className={viewersContainer}>
            <GoEye />
            <p>{viewers} personas están viendo este producto ahora.</p>
        </div>
    );
};

export default ProductViewers;