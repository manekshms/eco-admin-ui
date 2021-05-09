import ecoAdminApi from '../../api/ecoAdminApi';
import { AUTH_LOGIN_ERROR, AUTH_LOGIN_PENDING, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT } from '../types';

const loginErrorAction = (error) => {
   return {
       type: AUTH_LOGIN_ERROR,
       error
   } 
}

const loginPendingAction = () => {
    return {
        type: AUTH_LOGIN_PENDING
    }
}

const loginSuccessAction = (data) => {
    return {
        type: AUTH_LOGIN_SUCCESS,
        payload: {
            user: data.user,
            token: data.token
        }
    }
}

export const loginAction = (data) => async dispatch => {
    dispatch(loginPendingAction());
    try {
        const response = await ecoAdminApi.post('/auth/login', data);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        dispatch(loginSuccessAction({user: response.data.user, token: response.data.token}));
        return response.data;
    }catch(e) {
        const error = e.response.data ? e.response.data.message : 'Something went wrong';
        dispatch(loginErrorAction(error));
        throw e;
    }
}

export const logoutAction = () => dispatch => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return dispatch({ type: AUTH_LOGOUT });
}