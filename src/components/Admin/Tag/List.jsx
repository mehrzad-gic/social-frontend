import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { all } from '../../../Controllers/TagController';
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';
import { Link } from 'react-router-dom';

const List = () => {

    const {data, isLoading, isError} = useQuery({
        queryKey: ['tags'],
        queryFn: () => all(JSON.parse(localStorage.getItem('user'))?.jwt)
    })

    if(isLoading) return <Loading />
    if(isError) return <Error />

    return (
        <div>
            <div className="d-flex gap-2 justify-content-between align-items-center">
                <h1 className='text-success'>Tag List</h1>
                <Link to="/admin/tag/create" className="btn btn-primary">Create Tag</Link>
            </div>
            <table className="table table-bordered table-striped table-hover table-responsive table-sm mt-4">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                    { data.length > 0 && data.map((tag, index) => (
                        <tr key={tag.id}>
                            <td>{tag.id || index + 1}</td>
                            <td>{tag.name || 'N/A'}</td>
                            <td>{tag.slug || 'N/A'}</td>
                            <td>{tag.status==1 ? <span className="badge bg-success">Active</span> : <span className="badge bg-danger">Inactive</span>}</td>
                            <td>{tag.created_at || 'N/A'}</td>
                            <td>{tag.updated_at || 'N/A'}</td>
                            <td>
                                <Link to={`/admin/tag/edit/${tag.id}`} className="btn btn-primary">Edit</Link>
                                <button className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default List;