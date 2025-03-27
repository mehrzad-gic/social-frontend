
import {BACKEND_URL} from './Config';

export const index = (token) => {

    return fetch(`${BACKEND_URL}/faq-categories/`,{
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

    return fetch(`${BACKEND_URL}/faq-categories/create`,{
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

    return fetch(`${BACKEND_URL}/faq-categories/update/${slug}`,{
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

    return fetch(`${BACKEND_URL}/faq-categories/change-status/${slug}`,{
        method: "PUT",
        headers: {
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())  
    .catch((err) => err);

}   


export const destroy = (slug,token) => {

    return fetch(`${BACKEND_URL}/faq-categories/delete/${slug}`,{
        method: "DELETE",
        headers: {
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .catch((err) => err);  

}   


export const show = (slug, token) => {
    return fetch(`${BACKEND_URL}/faq-categories/show/${slug}`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .catch((err) => err);
}