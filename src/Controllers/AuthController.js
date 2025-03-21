import { BACKEND_URL } from './Config';

// Register User
export const register = (params) => {

    return fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    .then((response) => response.json())
    .catch((err) => err); 

};
 
// Login the user
export const loginUser = (params) => {

    return fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    .then((response) => response.json())
    .catch((err) => err);

};


// Forgot Password
export const forgotPassword = (params) => {

    return fetch(`${BACKEND_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    .then((response) => response.json())
    .catch((err) => err);

};

// Confirm Reset Password
export const confirmResetPassword = (params) => {

    return fetch(`${BACKEND_URL}/auth/confirm-reset-password`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    .then((response) => response.json())
    .catch((err) => err);

};


// Send OTP
export const sendOTP = (params) => {

    return fetch(`${BACKEND_URL}/auth/send-otp`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    .then((response) => response.json())
    .catch((err) => err);

};


// Check OTP
export const checkOTP = (params) => {

    return fetch(`${BACKEND_URL}/auth/check-otp`, {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    .then((response) => response.json())
    .catch((err) => err);

};

// Logout the user
export const logout = () => {

    localStorage.removeItem('user');
};


export const genToken = (token) => {

    return fetch(`${BACKEND_URL}/auth/generate-token`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(token)
    })
    .then((response) => response.json())
    .catch((err) => err);

};


export const verifyUser = (token) => {

    return fetch(`${BACKEND_URL}/auth/verify-token`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((response) => response.json())
    .catch((err) => err);

}


export const logoutUser = () => {
    try {
        localStorage.removeItem('user');
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};
