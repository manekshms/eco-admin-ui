import jwtDecode from 'jwt-decode';
import { AUTH_LOGIN_ERROR, AUTH_LOGIN_PENDING, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT } from "../types";

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");
const isLoggedIn = (token) => {
    if(!token) {
        return false;
    }
    const decodedTotken = jwtDecode(token);
    if(decodedTotken.exp * 1000 < (new Date()).getTime()) {
        return false;
    }
    return true;
};

const initialLoginState = {
    isLoggedIn: isLoggedIn(token),
    pending: false,
    user: isLoggedIn(token)? user: null,
    token: isLoggedIn(token)? token : null,
}

export const loginReducer = (state = initialLoginState, action) => {
    switch(action.type) {
        case AUTH_LOGIN_SUCCESS:
            return { ...state, isLoggedIn: true, token: action.payload.token, user: action.payload.user, pending: false, error: null};
        case AUTH_LOGIN_PENDING:
            return { ...state, isLoggedIn: false, pending: true, error: null, user: null, token: null};
        case AUTH_LOGIN_ERROR:
            return { ...state, isLoggedIn: false, error: action.error, pending: false, user: null, token: null };
        case AUTH_LOGOUT:
            return { ...state, isLoggedIn: false, user: null, token: null, pending: false, error: null};
        default:
            return state;
    }
}