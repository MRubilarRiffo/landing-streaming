import { card, containerImg, info } from './Card.module.css';
import { format_Price } from "../../Functions/Format Price";
import { useNavigate } from 'react-router-dom';
import { Star } from '../Star/Star';

const Card = ({ props }) => {
    const navigate = useNavigate();

    const handleClick = () => navigate(`/${props.slug}/${props.id}`, { state: props });

    console.log(props);

    return (
        <div>
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
                <div className={info}>
                    <div>
                        <Star averageRating={props.averageRating}/>
                    </div>
                    <p>{props.category}</p>
                    <h3>{props.name.toUpperCase()}</h3>
                    <div>
                        <span>{format_Price(props.priceOffert)}</span>
                        <span>{format_Price(props.price)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Card };