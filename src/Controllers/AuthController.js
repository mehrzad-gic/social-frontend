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

const removeToken = () => {


};