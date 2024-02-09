import { Star } from "../Star/Star";
import { FaCheckCircle } from "react-icons/fa";
import { card } from "./Card Reviews.module.css";

const Card_Reviews = ({ props }) => {
    return (
        <div className={card}>
            <div>
                <Star averageRating={props.rating}/>
            </div>
            <p>"{props.content}"</p>
            <p><FaCheckCircle /> Compra Verificada</p>
        </div>
    );
};

export { Card_Reviews };