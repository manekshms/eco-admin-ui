import { combineReducers } from 'redux';
import { loginReducer } from './authReducers';
import { createCategoryReducer, fetchAllCategoriesReducer } from './categoryReducer';
import { fetchAllCustomersReducer } from './customerReducers';
import { fetchAllProductsReducer, createProductReducer } from './productReducers';
import { addProductToStoreReducer, createStoreReducer, fetchAllAvailableStoreProductsByStoreIdReducer, fetchAllStoreProductsByStoreIdReducer, fetchAllStoresReducer, fetchStoreByIdReducer } from './storeReducers';

export default combineReducers({
    auth: loginReducer,

    // categories
    fetchAllCategories: fetchAllCategoriesReducer,
    createCategory: createCategoryReducer,

    // customers
    fetchAllCustomers: fetchAllCustomersReducer,

    // products
    fetchAllProducts: fetchAllProductsReducer,
    createProduct: createProductReducer,

    // stores
    fetchAllStores: fetchAllStoresReducer,
    createStore: createStoreReducer,
    fetchStoreById: fetchStoreByIdReducer,
    fetchAllAvailableStoreProductsByStoreId: fetchAllAvailableStoreProductsByStoreIdReducer,
    fetchAllStoreProductsByStoreId: fetchAllStoreProductsByStoreIdReducer,
    addProductToStore: addProductToStoreReducer
});