import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { seccionReview, views, eye, containerDetails, containerPay, containerInput, containerPrices, buttonPay, tablePrices } from './Details Props.module.css';
import { format_Price } from '../../Functions/Format Price';
import { getRandomNumber } from '../../Functions/Random Number';
import { FaRegEye, FaMinus, FaPlus } from "react-icons/fa";
import { Star } from '../Star/Star';

const Details_Props = ({ name, category, price, regularPrice, description, bulkPrice, averageRating, countReview }) => {
    const [quantity, setQuantity] = useState(1);

    const handleChangeQuantity = ({ target: { value } }) => {
        let parsedValue = parseInt(value, 10) || 1;
        parsedValue = Math.max(parsedValue, 1);
        setQuantity(parsedValue);
    };

    const handleClickMore = () => setQuantity(quantity + 1);
    const handleClickLess = () => (quantity > 1) && setQuantity(quantity - 1);

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
                <span>( {countReview} opininiones de clientes )</span>
            </div>
            <h2>{name.toUpperCase()}</h2>
            <div className={containerPrices}>
                <span>{format_Price(variablePrice || price) + " c/u"}</span>
                <span>{format_Price(regularPrice)}</span>
            </div>
            <p>Categoría: {category}</p>
            <p className={views}><FaRegEye className={eye}/> {randomNumber} personas están viendo este producto</p>
            <div className={containerPay}>
                <div className={containerInput}>
                    <button onClick={handleClickLess}><FaMinus /></button>
                    <button onClick={handleClickMore}><FaPlus /></button>
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
            <hr />
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