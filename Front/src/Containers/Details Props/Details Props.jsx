import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryContainer, poppins, seccionReview, views, eye, containerDetails, containerPay, containerInput, containerPrices, buttonPay, tablePrices } from './Details Props.module.css';
import { format_Price } from '../../Functions/Format Price';
import { getRandomNumber } from '../../Functions/Random Number';
import { FaRegEye, FaMinus, FaPlus } from "react-icons/fa";
import { Star } from '../Star/Star';

const Details_Props = ({ name, category, price, regularPrice, description, bulkPrice, averageRating, countReview, shortDescription }) => {
    const [quantity, setQuantity] = useState(1);

    const handleChangeQuantity = ({ target: { value } }) => {
        let parsedValue = parseInt(value, 10) || 1;
        parsedValue = Math.max(parsedValue, 1);
        setQuantity(parsedValue);
    };

    const handleClickPlus = () => setQuantity(quantity + 1);
    const handleClickMinus = () => (quantity > 1) && setQuantity(quantity - 1);

    let variablePrice = null;

    if (bulkPrice) {
        const matchedRule = bulkPrice.find(({ min, max }) => {
            return quantity >= (min || 1) && quantity <= (max || Infinity);
        });

        if (matchedRule) variablePrice = (price - matchedRule.discount);

        // if (matchedRule) {
        //     bulkPrice.type === 'fixed'
        //         ? variablePrice = (price - matchedRule.discount)
        //         : variablePrice = (price - (price * matchedRule.discount / 100));
        // };
    };

    const [randomNumber, setRandomNumber] = useState(getRandomNumber(15, 30));
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            setRandomNumber(getRandomNumber(15, 30));
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const navigate = useNavigate();

    const handleFinishPayment = () => {
        navigate('/finalizar-pago', {
            state: { quantity: quantity, price: variablePrice || price, name: name }
        });
    };

    const renderTableBulkPrices = () => {
        return (
            <div className={tablePrices}>
                <table>
                    <thead>
                        <tr>
                            <th>Mínimo</th>
                            <th>Máximo</th>
                            <th>Precio Unitario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bulkPrice.map(({ min, max, discount }, index) => (
                            <tr key={`price-${index}`}>
                                <td>{min || 1}</td>
                                <td>{max || 'Y más..'}</td>
                                <td>
                                    {format_Price(price - discount)}
                                    c/u
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className={containerDetails}>
            <div className={seccionReview}>
                <Star averageRating={averageRating} />
                <p>( {countReview} opininiones de clientes )</p>
            </div>
            <h2>{name.toUpperCase()}</h2>
            <div className={containerPrices}>
                <span>{format_Price(variablePrice || price)}</span>
                <span>{format_Price(regularPrice)}</span>
            </div>
            {shortDescription.length > 0 && <p className={poppins}>{shortDescription}</p>}
            <p className={`${views} ${poppins}`}><FaRegEye className={eye}/> {randomNumber} personas están viendo este producto</p>
            <div className={containerPay}>
                <div className={containerInput}>
                    <button onClick={handleClickMinus}><FaMinus /></button>
                    <button onClick={handleClickPlus}><FaPlus /></button>
                    <input
                        type='number'
                        min={1}
                        pattern='[0-9]*'
                        value={quantity}
                        onChange={handleChangeQuantity}
                        />
                </div>
                <button
                    className={buttonPay}
                    onClick={handleFinishPayment}
                    >
                    <span>COMPRAR AHORA</span>
                </button>
            </div>
            <p className={poppins}><span className={categoryContainer}>Categoría:</span> {category}</p>
            {//bulkPrice && renderTableBulkPrices()
            }
            <h3>¡Compra más, ahorra más!</h3>
            {//bulkPrice.map(({ min, max, discount }, index) => (
                // <span key={index}>
                //     Lleva {min || 1} y obtén {format_Price(discount)} de DCTO en c/u
                // </span>

                // <tr key={`price-${index}`}>
                //     <td>{min || 1}</td>
                //     <td>{max || 'Y más..'}</td>
                //     <td>
                //         {format_Price(price - discount)}
                //         c/u
                //     </td>
                // </tr>
            //))
            }
        </div>
    );
}

export { Details_Props };