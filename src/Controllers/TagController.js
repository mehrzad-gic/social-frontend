import {BACKEND_URL} from './Config';

export const all = (token) => {

    return fetch(`${BACKEND_URL}/tags`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .catch((err) => err);

}  