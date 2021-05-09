import { ADD_PRODUCT_TO_STORE_ERROR, ADD_PRODUCT_TO_STORE_PENDING, ADD_PRODUCT_TO_STORE_SUCCESS, CREATE_STORE_ERROR, CREATE_STORE_PENDING, CREATE_STORE_SUCCESS, FETCH_ALL_AVAILABLE_STORE_PRODUCTS_BY_STORE_ID_ERROR, FETCH_ALL_AVAILABLE_STORE_PRODUCTS_BY_STORE_ID_PENDING, FETCH_ALL_AVAILABLE_STORE_PRODUCTS_BY_STORE_ID_SUCCESS, FETCH_ALL_STORES_ERROR, FETCH_ALL_STORES_PENDING, FETCH_ALL_STORES_SUCCESS, FETCH_ALL_STORE_PRODUCTS_BY_STORE_ID_ERROR, FETCH_ALL_STORE_PRODUCTS_BY_STORE_ID_PENDING, FETCH_ALL_STORE_PRODUCTS_BY_STORE_ID_SUCCESS, FETCH_STORE_BY_ID_ERROR, FETCH_STORE_BY_ID_PENDING, FETCH_STORE_BY_ID_SUCCESS } from "../types";


const fetchAllProductsInitialState = {
    stores: [],
    pending: false,
    error: null
};

export const fetchAllStoresReducer = (state = fetchAllProductsInitialState, action) => {
    switch(action.type) {
        case FETCH_ALL_STORES_SUCCESS:
            return { ...state, stores: action.payload, pending: false, error: null};
        case FETCH_ALL_STORES_PENDING:
            return { ...state, pending: true, stores: [], error: null};
        case FETCH_ALL_STORES_ERROR:
            return { ...state, error: action.error, pending: false, stores: []};
        default:
            return state;
    }
}

const initalCreateStoreState = {
    pending: false,
    error: null,
    store: null,
}

export const createStoreReducer = (state = initalCreateStoreState, action) => {
    switch(action.type) {
        case CREATE_STORE_SUCCESS:
            return { ...state, store: action.payload, pending: false, error: null};
        case CREATE_STORE_PENDING:
            return { ...state, pending: true, product: null, error: null};
        case CREATE_STORE_ERROR:
            return { ...state, error: action.error, pending: false, store: null}
        default:
            return state;
    }
}

const fetchStoreByidInitialState = {
    store: null,
    pending: false,
    error: null
};

export const fetchStoreByIdReducer = (state = fetchStoreByidInitialState, action) => {
    switch(action.type) {
        case FETCH_STORE_BY_ID_SUCCESS:
            return { ...state, store: action.payload, pending: false, error: null};
        case FETCH_STORE_BY_ID_PENDING:
            return { ...state, pending: true, store: null, error: null};
        case FETCH_STORE_BY_ID_ERROR:
            return { ...state, error: action.error, pending: false, store: null};
        default:
            return state;
    }
}

const fetchAllAvailableStoreProductsByStoreIdInitialState = {
    products: [],
    pending: false,
    error: null
};

export const fetchAllAvailableStoreProductsByStoreIdReducer = (state = fetchAllAvailableStoreProductsByStoreIdInitialState, action) => {
    switch(action.type) {
        case FETCH_ALL_AVAILABLE_STORE_PRODUCTS_BY_STORE_ID_SUCCESS:
            return { ...state, products: action.payload, pending: false, error: null};
        case FETCH_ALL_AVAILABLE_STORE_PRODUCTS_BY_STORE_ID_PENDING:
            return { ...state, pending: true, products: [], error: null};
        case FETCH_ALL_AVAILABLE_STORE_PRODUCTS_BY_STORE_ID_ERROR:
            return { ...state, error: action.error, pending: false, products: []};
        default:
            return state;
    }
}

const fetchAllStoreProductsByStoreIdInitialState = {
    products: [],
    pending: false,
    error: null
};

export const fetchAllStoreProductsByStoreIdReducer = (state = fetchAllStoreProductsByStoreIdInitialState, action) => {
    switch(action.type) {
        case FETCH_ALL_STORE_PRODUCTS_BY_STORE_ID_SUCCESS:
            return { ...state, products: action.payload, pending: false, error: null};
        case FETCH_ALL_STORE_PRODUCTS_BY_STORE_ID_PENDING:
            return { ...state, pending: true, products: [], error: null};
        case FETCH_ALL_STORE_PRODUCTS_BY_STORE_ID_ERROR:
            return { ...state, error: action.error, pending: false, products: null};
        default:
            return state;
    }
}

const addProductToStoreInitialState = {
    pending: false,
    error: null,
    storeProduct: null,
}

export const addProductToStoreReducer = (state = addProductToStoreInitialState, action) => {
    switch(action.type) {
        case ADD_PRODUCT_TO_STORE_SUCCESS:
            return { ...state, storeProduct: action.payload, pending: false, error: null};
        case ADD_PRODUCT_TO_STORE_PENDING:
            return { ...state, pending: true, storeProduct: null, error: null};
        case ADD_PRODUCT_TO_STORE_ERROR:
            return { ...state, error: action.error, pending: false, storeProduct: null}
        default:
            return state;
    }
}