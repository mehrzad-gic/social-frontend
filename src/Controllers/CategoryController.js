
import {BACKEND_URL} from './Config';

export const all = (token) => {

    return fetch(`${BACKEND_URL}/categories/`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .catch((err) => err);

}  


export const create = (data,token) => {

    return fetch(`${BACKEND_URL}/categories/create`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .catch((err) => err);
}  


export const update = (slug,data,token) => {

    return fetch(`${BACKEND_URL}/categories/update/${slug}`,{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .catch((err) => err);

}

 
export const changeStatus = (slug,token) => {

    return fetch(`${BACKEND_URL}/categories/change-status/${slug}`,{
        method: "PUT",
        headers: {
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())  
    .catch((err) => err);

}   


export const destroy = (slug,token) => {

    return fetch(`${BACKEND_URL}/categories/delete/${slug}`,{
        method: "DELETE",
        headers: {
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .catch((err) => err); 

}   


export const getCategory = (slug, token) => {
    return fetch(`${BACKEND_URL}/categories/show/${slug}`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .catch((err) => err);
}