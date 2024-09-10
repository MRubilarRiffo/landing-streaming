import * as actionTypes from './actions-type';

const initialState = {
    products: [],
    productDetails: {},
    cartIds: [],
    cartProducts: [],
    temporalCart: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        case actionTypes.GET_PRODUCTS_BY_ID:
            return {
                ...state,
                productDetails: action.payload
            };
        case actionTypes.ADD_ID_PRODUCT_TO_CART:
            return {
                ...state,
                cartIds: [...state.cartIds, action.payload]
            };
        case actionTypes.ADD_PRODUCT_TO_TEMPORAL_CART:
            return {
                ...state,
                temporalCart: action.payload
            };
        default:
            return state;
    };
};

export default reducer;