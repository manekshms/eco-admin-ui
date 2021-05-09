import { FETCH_ALL_CUSTOMERS_ERROR, FETCH_ALL_CUSTOMERS_PENDING, FETCH_ALL_CUSTOMERS_SUCCESS } from "../types/customer";

const fetchAllCustomersInitialState = {
    customers: [],
    pending: false,
    error: null
};

export const fetchAllCustomersReducer = (state = fetchAllCustomersInitialState, action) => {
    switch(action.type) {
        case FETCH_ALL_CUSTOMERS_SUCCESS:
            return { ...state, customers: action.payload, pending: false, error: null};
        case FETCH_ALL_CUSTOMERS_PENDING:
            return { ...state, pending: true, customers: [], error: null};
        case FETCH_ALL_CUSTOMERS_ERROR:
            return { ...state, error: action.error, pending: false, customers: []};
        default:
            return state;
    }
}