import * as actionTypes from './actions-type';

const initialState = {
    products: [],
    details: null,
    reviewProduct: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        case actionTypes.GET_DETAILS:
            return {
                ...state,
                details: action.payload
            };
        case actionTypes.RESET_DETAILS:
            return {
                ...state,
                details: []
            };
        case actionTypes.GET_REVIEWS_BY_PRODUCT:
            return {
                ...state,
                reviewProduct: action.payload
            };
        case actionTypes.RESET_REVIEWS_BY_PRODUCT:
            return {
                ...state,
                reviewProduct: []
            };
        default:
            return state;
    };
};

export { reducer };