import * as actionTypes from './actions-type';

const initialState = {
    products: [],
    details: null,
    reviewProduct: [],
    submit_payment_form_succes: null,
    submit_payment_form_failure: null,
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
        case actionTypes.SUBMIT_PAYMENT_FORM_SUCCESS:
            return {
                ...state,
                submit_payment_form_succes: action.payload
            };
        case actionTypes.SUBMIT_PAYMENT_FORM_FAILURE:
            return {
                ...state,
                submit_payment_form_failure: action.payload
            };
        default:
            return state;
    };
};

export { reducer };