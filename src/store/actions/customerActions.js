import ecoAdminApi from '../../api/ecoAdminApi';
import { FETCH_ALL_CUSTOMERS_ERROR, FETCH_ALL_CUSTOMERS_PENDING, FETCH_ALL_CUSTOMERS_SUCCESS } from "../types/customer"


const fetchAllCustomersSuccessAction = (data) => {
    return {
        type: FETCH_ALL_CUSTOMERS_SUCCESS,
        payload: data
    }
}

const fetchAllCustomersPendingAction = () => {
    return {
        type: FETCH_ALL_CUSTOMERS_PENDING
    }
}

const fetchAllCustomersErrorAction = (error) => {
    return {
        type: FETCH_ALL_CUSTOMERS_ERROR,
        error: error
    }
}
   

export const fetchAllCustomersAction = () => async dispatch => {
    dispatch(fetchAllCustomersPendingAction());
    try {
        const response = await ecoAdminApi.get('/customer/');
        dispatch(fetchAllCustomersSuccessAction(response.data));
        return response.data;
    }catch(e) {
        const errorMessage = e.response?.data?.message ? e.response?.data?.message: 'Something went wrong';
        dispatch(fetchAllCustomersErrorAction(errorMessage));
    }
}
