import axios from 'axios';
import * as actionTypes from './actions-type';

const API = 'http://localhost:3001/api';

export const getProducts = () => {
    return async function (dispatch) {
        const fields = 'id,name,price,priceOffert,averageRating,category,slug,description,shortDescription';
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