import { CREATE_CATEGORY_ERROR, CREATE_CATEGORY_PENDING, CREATE_CATEGORY_SUCCESS,  FETCH_ALL_CATEGORIES_ERROR, FETCH_ALL_CATEGORIES_PENDING, FETCH_ALL_CATEGORIES_SUCCESS } from "../types"

const initalCreateCategoryState = {
    pending: false,
    error: null,
    category: null,
}

export const createCategoryReducer = (state = initalCreateCategoryState, action) => {
    switch(action.type) {
        case CREATE_CATEGORY_SUCCESS:
            return { ...state, category: action.payload, pending: false, error: null};
        case CREATE_CATEGORY_PENDING:
            return { ...state, pending: true, category: null, error: null};
        case CREATE_CATEGORY_ERROR:
            return { ...state, error: action.error, pending: false, category: null}
        default:
            return state;
    }
}

const initialFetchAllCategoriesState = {
    pending: false,
    categories: [],
    error: null
};

export const fetchAllCategoriesReducer = (state = initialFetchAllCategoriesState, action) => {
    switch(action.type) {
        case FETCH_ALL_CATEGORIES_SUCCESS:
            return { ...state, pending: false, categories: action.payload, error: null};
        case FETCH_ALL_CATEGORIES_PENDING:
            return { ...state, pending: true, categories: [], error: null};
        case FETCH_ALL_CATEGORIES_ERROR:
            return { ...state, pending: false, categories: [], error: action.error};
        default:
            return state;
    }
} 
