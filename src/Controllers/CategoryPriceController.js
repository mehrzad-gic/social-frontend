import {BACKEND_URL} from './Config';

export const index = (category,token) => {

    return fetch(`${BACKEND_URL}/category-prices/${category}`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .catch((err) => err);

}  


export const create = (category,data,token) => {

    return fetch(`${BACKEND_URL}/category-prices/create/${category}`,{
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


export const update = (id, data, token) => { // Use `id` instead of `slug`
    return fetch(`${BACKEND_URL}/category-prices/update/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .catch((err) => err);
};

 
export const changeStatus = (slug,token) => {

    return fetch(`${BACKEND_URL}/category-prices/change-status/${slug}`,{
        method: "PUT",
        headers: {
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())  
    .catch((err) => err);

}   


export const destroy = (slug,token) => {

    return fetch(`${BACKEND_URL}/category-prices/delete/${slug}`,{
        method: "DELETE",
        headers: {
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .catch((err) => err);  

}   


export const show = (id, token) => { // Use `id` instead of `slug`
    return fetch(`${BACKEND_URL}/category-prices/show/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .catch((err) => err);
};