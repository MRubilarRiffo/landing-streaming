import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails, getReviewsByProduct } from "../../Redux/actions";
import { RESET_DETAILS, RESET_REVIEWS_BY_PRODUCT } from "../../Redux/actions-type";
import { container, imgProduct, containerProps, detailsContainer, imgContainer } from "./Product.module.css";
import { Loading } from "../Loading/Loading";
import { Details_Props } from "../Details Props/Details Props";
import { More_Info_Product } from "../More Info Product/More Info Product";

const Product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetails(id));
        dispatch(getReviewsByProduct(id));
        return () => {
            dispatch({ type: RESET_DETAILS });
            dispatch({ type: RESET_REVIEWS_BY_PRODUCT });
        };
    }, [id]);

    const product = useSelector(state => state.details) || {};
    const reviews = useSelector(state => state.reviewProduct) || [];
    
    const handleJsonParse = (bulkPrice) => {
        try {
            return JSON.parse(bulkPrice);
        } catch (error) {
            return null
        };
    };

    return (
        <>
            {Object.keys(product).length === 0
                ? <Loading />
                : <div className={container}>
                    <div className={detailsContainer}>
                        <div className={imgContainer}>
                            {product && product.image
                                ? <img className={imgProduct} src={product.image} alt='Imagen de producto' />
                                : <Loading />
                            }
                        </div>
                        <div className={containerProps}>
                            {product && product.name &&
                                <Details_Props
                                    name={product.name}
                                    category={product.category}
                                    price={product.priceOffert}
                                    regularPrice={product.price}
                                    description={product.description}
                                    bulkPrice={handleJsonParse(product.bulkPrice)}
                                    averageRating={product.averageRating}
                                    countReview={reviews.length}
                                    shortDescription={product.shortDescription}
                                    />
                            }
                        </div>
                    </div>
                    <div className={detailsContainer}>
                        <More_Info_Product
                            reviews={reviews}
                            description={product.description}
                            countReview={reviews.length}
                            />
                    </div>
                </div>
                
            }
        </>
    );
};

export { Product };