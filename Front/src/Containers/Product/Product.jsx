import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../../Redux/actions";
import { RESET_DETAILS } from "../../Redux/actions-type";
import { detailsContainer, imgContainer, propsContainer } from "./Product.module.css";
import { Loading } from "../Loading/Loading";
import { Details_Props } from "../Details Props/Details Props";
import { Card_Reviews } from "../Card Reviews/Card Reviews";

const Product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetails(id));
        return () => {
            dispatch({ type: RESET_DETAILS });
        };
    }, [id]);

    const product = useSelector(state => state.details);
    
    const handleJsonParse = (bulkPrice) => {
        try {
            return JSON.parse(bulkPrice);
        } catch (error) {
            return null
        };
    };

    return (
        <div>
            <div className={detailsContainer}>
                <div className={imgContainer}>
                    {product && product.image
                        ? <img src={product.image} alt='Imagen de producto' />
                        : <Loading />
                    }
                </div>
                <div className={propsContainer}>
                    {product && product.name &&
                        <Details_Props
                            name={product.name}
                            category={product.category}
                            price={product.priceOffert}
                            regularPrice={product.price}
                            description={product.description}
                            bulkPrice={handleJsonParse(product.bulkPrice)}
                            />
                    }
                </div>
            </div>
            <div>
                <Card_Reviews productId={id} />
            </div>
        </div>
    );
};

export { Product };