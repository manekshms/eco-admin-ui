import ecoAdminApi from '../../api/ecoAdminApi';
import { CREATE_CATEGORY_SUCCESS, CREATE_PRODUCT_ERROR, CREATE_PRODUCT_PENDING, FETCH_ALL_PRODUCTS_ERROR, FETCH_ALL_PRODUCTS_PENDING, FETCH_ALL_PRODUCTS_SUCCESS } from "../types"

const fetchAllProductsSuccessAction = (data) => {
    return {
        type: FETCH_ALL_PRODUCTS_SUCCESS,
        payload: data
    }
}

const fetchAllProductsPendingAction = () => {
    return {
        type: FETCH_ALL_PRODUCTS_PENDING
    }
}

const fetchAllProductsErrorAction = (error) => {
    return {
        type: FETCH_ALL_PRODUCTS_ERROR,
        error: error
    }
}
   

export const fetchAllProductsAction = () => async dispatch => {
    dispatch(fetchAllProductsPendingAction());
    try {
        const response = await ecoAdminApi.get('/product');
        dispatch(fetchAllProductsSuccessAction(response.data));
        return response.data;
    }catch(e) {
        const errorMessage = e.response?.data?.message ? e.response?.data?.message: 'Something went wrong';
        dispatch(fetchAllProductsErrorAction(errorMessage));
    }
}

const createProductSuccessAction = (data) => {
    return {
        type: CREATE_CATEGORY_SUCCESS,
        payload: data,
    };
}

const createProductPendingAction = () => {
    return {
        type: CREATE_PRODUCT_PENDING
    };
}

const createProductErrorAction = (error) => {
    return {
        type: CREATE_PRODUCT_ERROR,
        error
    }
}

export const createProductAction = (data) => async dispatch => {
   dispatch(createProductPendingAction()); 
   try {
    const response = await ecoAdminApi.post('/product', data);
    dispatch(createProductSuccessAction(response.data));
   }catch(e) {
    const errorMessage = e.response?.data?.message ? e.response?.data?.message: 'Something went wrong';
    dispatch(createProductErrorAction(errorMessage));
    throw e;
   }
}