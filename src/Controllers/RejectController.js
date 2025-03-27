import { BACKEND_URL } from "./Config" 

const index = (token) => {

    return fetch(`${BACKEND_URL}/rejects/`,{
        method: "GET",
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }).then(response => response.json())
    .catch(err => console.error(err))

} 


const show = (slug,token) => {
    return fetch(`${BACKEND_URL}/rejects/show/${slug}`,{
        method: "GET",
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }).then(response => response.json())
    .catch(err => console.error(err))
}


const create = (report,token) => {
    return fetch(`${BACKEND_URL}/rejects/create/`,{
        method: "POST",
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(report)
    }).then(response => response.json())
    .catch(err => console.error(err))
}


const update = (slug, report,token) => {
    return fetch(`${BACKEND_URL}/rejects/update/${slug}`,{
        method: "PUT",
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(report)
    }).then(response => response.json())
    .catch(err => console.error(err))
}


const destroy = (slug,token) => {
    return fetch(`${BACKEND_URL}/rejects/delete/${slug}`,{
        method: "DELETE",
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }).then(response => response.json())
    .catch(err => console.error(err))
}


const changeStatus = (slug,token) => {
    return fetch(`${BACKEND_URL}/rejects/change-status/${slug}`,{
        method: "PUT",
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }).then(response => response.json())
    .catch(err => console.error(err))
}

export { index, show, create, update, destroy, changeStatus };