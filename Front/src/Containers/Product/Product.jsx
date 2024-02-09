import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails, getReviewsByProduct } from "../../Redux/actions";
import { RESET_DETAILS, RESET_REVIEWS_BY_PRODUCT } from "../../Redux/actions-type";
import { imgProduct, containerProps, detailsContainer, imgContainer, containerCard } from "./Product.module.css";
import { Loading } from "../Loading/Loading";
import { Details_Props } from "../Details Props/Details Props";
import { Card_Reviews } from "../Card Reviews/Card Reviews";

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
    const reviews = useSelector(state => state.reviewProduct);
    
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
                : <div>
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
                    <h2>Reviews</h2>
                    <div>
                        {reviews?.length > 0 &&
                            <div className={containerCard}>
                                {reviews.map((props, index) => 
                                    <Card_Reviews key={`review-${index}`} props={props} />
                                )}
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    );
};

export { Product };