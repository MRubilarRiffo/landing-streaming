import axios from 'axios';
import * as actionTypes from './actions-type';

const API = 'http://localhost:3001/api';
// const API = 'https://api.innovoza.com/api';

export const getProducts = () => {
    return async function (dispatch) {
        const fields = 'id,name,salePrice,previousPrice,averageRating,category,image,slug'
        try {
            const response = await axios.get(`${API}/products?fields=${fields}`);
            return dispatch({ type: actionTypes.GET_PRODUCTS, payload: response.data });
        } catch (error) {
            console.log(error.response.data);
        };
    };
};

export const getDetails = (id, slug) => {
    return async function (dispatch) {
        try {
            const included = 'review'
            const response = await axios.get(`${API}/products?id=${id}&slug=${slug}&included=${included}`);
            console.log(response.data);
            return dispatch({ type: actionTypes.GET_DETAILS, payload: response.data });
        } catch (error) {
            console.log(error.response.data);
        };
    };
};

export const getReviewsByProduct = (productId) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${API}/reviews/${productId}`);
            return dispatch({ type: actionTypes.GET_REVIEWS_BY_PRODUCT, payload: response.data });
        } catch (error) {
            console.log(error.response.data);
        };
    };
};

export const submitPaymentForm = (formData) => {
    return async function (dispatch) {
        try {
            const response = await axios.post(`${API}/mercadopago/process_payment`, formData);

            return dispatch({ type: actionTypes.SUBMIT_PAYMENT_FORM_SUCCESS, payload: response.data });
        } catch (error) {
            console.log(error.response.data);
            return dispatch({ type: actionTypes.SUBMIT_PAYMENT_FORM_FAILURE, payload: error.response.data });
        }
    };
};

// export const addCart = (productId, quantity) => {
//     return async function (dispatch) {
//         try {
//             const response = await axios.post(`${API}/mercadopago/process_payment`, formData);

//             return dispatch({ type: actionTypes.SUBMIT_PAYMENT_FORM_SUCCESS, payload: response.data });
//         } catch (error) {
//             console.log(error.response.data);
//         }
//     };
// };