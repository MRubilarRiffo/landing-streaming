import axios from 'axios';
import * as actionTypes from './actions-type';

const API = 'http://localhost:3001/api/'

export const getProducts = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${API}/products`);
            return dispatch({ type: actionTypes.GET_PRODUCTS, payload: response.data });
        } catch (error) {
            console.log(error.response.data);
        };
    };
};

export const getDetails = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${API}/products/${id}`);
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