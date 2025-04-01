import {BACKEND_URL} from './Config';

export const all = (token) => {
    return fetch(`${BACKEND_URL}/permissions/`,{
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
    return fetch(`${BACKEND_URL}/permissions/create`,{
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

export const update = (id,data,token) => {
    return fetch(`${BACKEND_URL}/permissions/update/${id}`,{
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

export const changeStatus = (id,token) => {
    return fetch(`${BACKEND_URL}/permissions/change-status/${id}`,{
        method: "PUT",
        headers: {
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())  
    .catch((err) => err);
}   

export const destroy = (id,token) => {
    return fetch(`${BACKEND_URL}/permissions/delete/${id}`,{
        method: "DELETE",
        headers: {
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .catch((err) => err);
}   

export const getPermission = (id, token) => {
    return fetch(`${BACKEND_URL}/permissions/show/${id}`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .catch((err) => err);
} 