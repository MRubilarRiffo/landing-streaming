import axios from 'axios';
import * as actionTypes from './actions-type';

const API = 'http://localhost:3001/api';

export const getProducts = () => {
    return async function (dispatch) {
        const fields = 'id,name,salePrice,previousPrice,averageRating,category,slug,features';
        try {
            const response = await axios({
                method: 'GET',
                url: `${API}/products?fields=${fields}`,
            });

            return dispatch({ type: actionTypes.GET_PRODUCTS, payload: response.data });
        } catch (error) {
            console.log(error.response.data);
        };
    };
};

export const getProductById = (productId) => {
    return async function (dispatch) {
        const fields = 'id,name,salePrice,previousPrice,averageRating,category,slug,description,features';
        try {
            const response = await axios({
                method: 'GET',
                url: `${API}/products/${productId}?fields=${fields}`,
            });

            return dispatch({ type: actionTypes.GET_PRODUCTS_BY_ID, payload: response.data });
        } catch (error) {
            console.log(error.response.data);
        };
    };
};

export const clearProductDetails = () => {
    return (dispatch) => {
        return dispatch({ type: actionTypes.GET_PRODUCTS_BY_ID, payload: {} });
    };
};

export const addIdProductToCart = (productId) => {
    return (dispatch) => {
        return dispatch({ type: actionTypes.ADD_ID_PRODUCT_TO_CART, payload: productId });
    };
};
