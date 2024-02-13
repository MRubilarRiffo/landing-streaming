import { useState } from 'react';
import { Card_Reviews } from '../Card Reviews/Card Reviews';
import { descriptionContainer, line, listMenu, list, listActive, optionContainer } from './More Info Product.module.css';

const More_Info_Product = ({ reviews, description, countReview }) => {
    const menu = [
        { option: 1, text: 'Descripción', state: description.length > 0 ? true : false },
        { option: 2, text: `Reviews (${countReview})`, state: countReview > 0 ? true : false }
    ];

    const [option, setOption] = useState(description.length > 0 ? 1 : 2);

    const handleClick = (value) => setOption(value);

    return (
        <div>
            <ul className={listMenu}>
                {menu.map((item, index) => (
                    item.state &&
                        <li
                            className={option === item.option ? listActive : list}
                            key={index}
                            onClick={() => handleClick(item.option)}
                            >
                            {item.text.toLocaleUpperCase()}
                        </li>
                ))}
            </ul>
            <div className={line}></div>

            <div className={optionContainer}>
                {option === 1
                    ? <p className={descriptionContainer}>{description}</p>
                    : <>
                        {reviews.length > 0 &&
                            <div>
                                {reviews.map((props, index) =>
                                    <Card_Reviews key={`review-${index}`} props={props} />
                                )}
                            </div>
                        }
                    </>


                }
                
            </div>
        </div>
    )
};

export { More_Info_Product };