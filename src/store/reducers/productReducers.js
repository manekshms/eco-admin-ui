import { CREATE_PRODUCT_ERROR, CREATE_PRODUCT_PENDING, CREATE_PRODUCT_SCCCESS, FETCH_ALL_PRODUCTS_ERROR, FETCH_ALL_PRODUCTS_PENDING, FETCH_ALL_PRODUCTS_SUCCESS } from "../types";

const fetchAllProductsInitialState = {
    products: [],
    pending: false,
    error: null
};

export const fetchAllProductsReducer = (state = fetchAllProductsInitialState, action) => {
    switch(action.type) {
        case FETCH_ALL_PRODUCTS_SUCCESS:
            return { ...state, products: action.payload, pending: false, error: null};
        case FETCH_ALL_PRODUCTS_PENDING:
            return { ...state, pending: true, products: [], error: null};
        case FETCH_ALL_PRODUCTS_ERROR:
            return { ...state, error: action.error, pending: false, products: []};
        default:
            return state;
    }
}

const initalCreateProductState = {
    pending: false,
    error: null,
    product: null,
}

export const createProductReducer = (state = initalCreateProductState, action) => {
    switch(action.type) {
        case CREATE_PRODUCT_SCCCESS:
            return { ...state, product: action.payload, pending: false, error: null};
        case CREATE_PRODUCT_PENDING:
            return { ...state, pending: true, product: null, error: null};
        case CREATE_PRODUCT_ERROR:
            return { ...state, error: action.error, pending: false, product: null}
        default:
            return state;
    }
}