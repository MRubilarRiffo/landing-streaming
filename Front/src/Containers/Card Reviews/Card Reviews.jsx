import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsByProduct } from "../../Redux/actions";

const Card_Reviews = ({ productId }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getReviewsByProduct(productId));
    }, []);

    const reviews = useSelector(state => state.reviewProduct);

    console.log(reviews);
    return (
        <div>
        
        </div>
    );
};

export { Card_Reviews };