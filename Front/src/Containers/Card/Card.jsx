import { card, containerImg, info } from './Card.module.css';
import { Details_Product } from '../Details Product/Details Product';
import { useState } from 'react';
import { format_Price } from "../../Functions/Format Price";

const Card = ({ props }) => {
    const [onDetails, setOnDetails] = useState(false);

    const handleClick = () => setOnDetails(!onDetails);

    return (
        <div>
            {onDetails && <Details_Product props={props} setOnDetails={setOnDetails}/>}

            <div
                className={card}
                onClick={handleClick}
                >
                <div className={containerImg}>
                    <img
                        src={props.images[0].src}
                        alt='Imagen de producto'
                    />
                </div>
                <div className={info}>
                    <p>{props.categories[0].name}</p>
                    <h3>{props.name.toUpperCase()}</h3>
                    <div>
                        <span>{format_Price(props.price)}</span>
                        <span>{format_Price(props.regular_price)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Card };