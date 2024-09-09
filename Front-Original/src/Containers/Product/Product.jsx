import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../../Redux/actions";
import { RESET_DETAILS } from "../../Redux/actions-type";
import { container, imgProduct, containerProps, detailsContainer, imgContainer, moreInfoContainer } from "./Product.module.css";
import { Loading } from "../Loading/Loading";
import { Details_Props } from "../Details Props/Details Props";
import { More_Info_Product } from "../More Info Product/More Info Product";

const Product = () => {
    const { id, slug } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetails(id, slug));
        return () => {
            dispatch({ type: RESET_DETAILS });
        };
    }, [id]);

    const { Data = [] } = useSelector(state => state.details) || [];

    const product = Data[0] || null;
    const reviews = product ? product.Reviews : [];

    const handleJsonParse = (bulkPrice) => {
        try {
            return JSON.parse(bulkPrice);
        } catch (error) {
            return null;
        };
    };

    return (
        <>
            {!product
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
                                    features={product.features}
                                    />
                            }
                        </div>
                    </div>
                    <div className={moreInfoContainer}>
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