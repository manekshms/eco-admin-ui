import ecoAdminApi from '../../api/ecoAdminApi';

import { CREATE_STORE_ERROR, CREATE_STORE_PENDING, CREATE_STORE_SUCCESS, FETCH_ALL_STORES_ERROR, FETCH_ALL_STORES_PENDING, FETCH_ALL_STORES_SUCCESS, FETCH_STORE_BY_ID_ERROR, FETCH_STORE_BY_ID_PENDING, FETCH_STORE_BY_ID_SUCCESS } from "../types"

const fetchAllStoresSuccessAction = (data) => {
    return {
        type: FETCH_ALL_STORES_SUCCESS,
        payload: data
    }
}

const fetchAllStoresPendingAction = () => {
    return {
        type: FETCH_ALL_STORES_PENDING
    }
}

const fetchAllStoresErrorAction = (error) => {
    return {
        type: FETCH_ALL_STORES_ERROR,
        error: error
    }
}
   

export const fetchAllStoresAction = () => async dispatch => {
    dispatch(fetchAllStoresPendingAction());
    try {
        const response = await ecoAdminApi.get('/store');
        dispatch(fetchAllStoresSuccessAction(response.data));
        return response.data;
    }catch(e) {
        const errorMessage = e.response?.data?.message ? e.response?.data?.message: 'Something went wrong';
        dispatch(fetchAllStoresErrorAction(errorMessage));
    }
}

const createStoreSuccessAction = (data) => {
    return {
        type: CREATE_STORE_SUCCESS,
        payload: data,
    };
}

const createStorePendingAction = () => {
    return {
        type: CREATE_STORE_PENDING
    };
}

const createStoreErrorAction = (error) => {
    return {
        type: CREATE_STORE_ERROR,
        error
    }
}

export const createStoreAction = (data) => async dispatch => {
   dispatch(createStorePendingAction()); 
   try {
    const response = await ecoAdminApi.post('/store', data);
    dispatch(createStoreSuccessAction(response.data));
   }catch(e) {
    const errorMessage = e.response?.data?.message ? e.response?.data?.message: 'Something went wrong';
    dispatch(createStoreErrorAction(errorMessage));
    throw e;
   }
}

const fetchStoreByIdSuccessAction = (data) => {
    return {
        type: FETCH_STORE_BY_ID_SUCCESS,
        payload: data
    }
}

const fetchStoreByIdPendingAction = () => {
    return {
        type: FETCH_STORE_BY_ID_PENDING
    }
}

const fetchStoreByIdErrorAction = (error) => {
    return {
        type: FETCH_STORE_BY_ID_ERROR,
        error: error
    }
}
   

export const fetchStoreByIdAction = (id) => async dispatch => {
    dispatch(fetchStoreByIdPendingAction());
    try {
        const response = await ecoAdminApi.get(`/store/${id}`);
        dispatch(fetchStoreByIdSuccessAction(response.data));
        return response.data;
    }catch(e) {
        const errorMessage = e.response?.data?.message ? e.response?.data?.message: 'Something went wrong';
        dispatch(fetchStoreByIdErrorAction(errorMessage));
    }
}