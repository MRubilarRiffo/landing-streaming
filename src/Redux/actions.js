import axios from 'axios';
import * as actionTypes from './actions-type';


export const getProducts = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(
                `https://innovoza.com/wp-json/wc/v3/products`,
                {
                    params: {
                        consumer_key: 'ck_8f908729ecbec6940707951e473f475baa0d2d0d',
                        consumer_secret: 'cs_ec491fa0bfad42a0b887898caf367d8e77551aac',
                    },
                }
                );
            return dispatch({ type: actionTypes.GET_PRODUCTS, payload: response.data });
        } catch (error) {
            console.log(error.response.data);
        };
    };
}