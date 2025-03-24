import {BACKEND_URL} from './Config';

export const all = (token) => {

    return fetch(`${BACKEND_URL}/tags/`,{
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

    return fetch(`${BACKEND_URL}/tags/create`,{
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

    return fetch(`${BACKEND_URL}/tags/update/${slug}`,{
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

    return fetch(`${BACKEND_URL}/tags/change-status/${slug}`,{
        method: "PATCH",
        headers: {
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())  
    .catch((err) => err);

}   


export const destroy = (slug,token) => {

    return fetch(`${BACKEND_URL}/tags/delete/${slug}`,{
        method: "DELETE",
        headers: {
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .catch((err) => err);

}   