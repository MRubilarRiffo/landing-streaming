import { cloneElement } from "react";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline  } from "react-icons/io";
import { containerStar } from "./Star.module.css";

const Star = ({ averageRating }) => {
    const roundDecimals = (num) => {
        return Math.floor(num);
    };

    const star = {
        filled: <IoIosStar />,
        half: <IoIosStarHalf />,
        outline: <IoIosStarOutline />
    }

    const generateRepresentation = (value) => {
        const roundValue = roundDecimals(value);

        if (roundValue === 0 || roundValue === 5) {
            return roundValue === 0
                ? Array(5).fill(star.outline).map((element, index) => cloneElement(element, { key: index }))
                : Array(5).fill(star.filled).map((element, index) => cloneElement(element, { key: index }));
        } else {
            const wholePart = Array(roundValue).fill(star.filled);
            const decimalPart = star.half;
            const remainingPart = Array(5 - roundValue - (roundValue == averageRating ? 0 : 1)).fill(star.outline);

            return roundValue == averageRating
                ? [...wholePart, ...remainingPart].map((element, index) => cloneElement(element, { key: index }))
                : [...wholePart, decimalPart, ...remainingPart].map((element, index) => cloneElement(element, { key: index }));
        };
    };
    
    const representation = generateRepresentation(averageRating);

    return (
        <div className={containerStar} >
            {representation}
        </div>
    );
};

export { Star };