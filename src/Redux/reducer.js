import * as actionTypes from './actions-type';

const initialState = {
    products: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        default:
            return state;
    };
};

export { reducer };