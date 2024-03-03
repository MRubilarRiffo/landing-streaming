import { Star } from "../Star/Star";
import { FaCheckCircle } from "react-icons/fa";
import { card } from "./Card Reviews.module.css";

const Card_Reviews = ({ review }) => {
    return (
        <div className={card}>
            <div>
                <Star averageRating={review.rating}/>
            </div>
            <p>"{review.content}"</p>
            <p><FaCheckCircle /> Compra Verificada</p>
        </div>
    );
};

export { Card_Reviews };