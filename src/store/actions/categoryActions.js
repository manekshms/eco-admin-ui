import ecoAdminApi from '../../api/ecoAdminApi';
import { CREATE_CATEGORY_ERROR, CREATE_CATEGORY_PENDING, CREATE_CATEGORY_SUCCESS, FETCH_ALL_CATEGORIES_ERROR, FETCH_ALL_CATEGORIES_PENDING, FETCH_ALL_CATEGORIES_SUCCESS } from "../types"

const createCategorySuccessAction = (data) => {
    return {
        type: CREATE_CATEGORY_SUCCESS,
        payload: data,
    };
}

const createCategoryPendingAction = () => {
    return {
        type: CREATE_CATEGORY_PENDING
    };
}

const createCategoryErrorAction = (error) => {
    return {
        type: CREATE_CATEGORY_ERROR,
        error
    }
}

export const createCategoryAction = (data) => async dispatch => {
   dispatch(createCategoryPendingAction()); 
   try {
    const response = await ecoAdminApi.post('/category', data);
    dispatch(createCategorySuccessAction(response.data));
   }catch(e) {
    const errorMessage = e.response?.data?.message ? e.response?.data?.message: 'Something went wrong';
    dispatch(createCategoryErrorAction(errorMessage));
    throw e;
   }
}

const fetchAllCategoriesSuccessAction = (data) => {
    return {
        type: FETCH_ALL_CATEGORIES_SUCCESS,
        payload: data
    }
}

const fetchAllCategoriesPendingAction = () => {
    return {
        type: FETCH_ALL_CATEGORIES_PENDING
    }
}

const fetchAllCategoriesErrorAction = (error) => {
    return {
        type: FETCH_ALL_CATEGORIES_ERROR,
        error: error
    }
}
   

export const fetchAllCategoriesAction = () => async dispatch => {
    dispatch(fetchAllCategoriesPendingAction());
    try {
        const response = await ecoAdminApi.get('/category');
        dispatch(fetchAllCategoriesSuccessAction(response.data));
        return response.data;
    }catch(e) {
        const errorMessage = e.response?.data?.message ? e.response?.data?.message: 'Something went wrong';
        dispatch(fetchAllCategoriesErrorAction(errorMessage));
    }
}

