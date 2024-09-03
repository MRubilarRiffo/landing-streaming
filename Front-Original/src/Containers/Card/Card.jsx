import { card, containerImg, info, line, containerCategory, containerPrice } from './Card.module.css';
import { format_Price } from "../../Functions/Format Price";
import { useNavigate } from 'react-router-dom';
import { Star } from '../Star/Star';

const Card = ({ props }) => {
    const navigate = useNavigate();

    const handleClick = () => navigate(`/${props.slug}/${props.id}`, { state: props });

    return (
        <div
            className={card}
            onClick={handleClick}
            >
            <div className={containerImg}>
                <img
                    src={props.image}
                    alt='Imagen de producto'
                />
            </div>
            <div className={line}></div>
            <div className={info}>
                <div>
                    <h3>{props.name}</h3>
                    <p className={containerCategory}>{props.category}</p>
                    <div>
                        <Star averageRating={props.averageRating}/>
                    </div>
                </div>
                <div className={containerPrice}>
                    <span>{format_Price(props.priceOffert)}</span>
                    <span>{format_Price(props.price)}</span>
                </div>
            </div>
        </div>
    );
};

export { Card };