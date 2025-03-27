import React, { useState, useEffect } from 'react';

import { FaEdit, FaTrash } from 'react-icons/fa';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { all, changeStatus, destroy, index } from '../../../Controllers/RejectController'; // Adjust the import path as necessary
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';
import DeleteConfirmationModal from '../../Home/Ui/DeleteConfirmationModal';
import { Link } from 'react-router-dom';

const List = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['rejects'],
        queryFn: () => index(JSON.parse(localStorage.getItem('user'))?.jwt)
    });
    const [isChangingStatus, setIsChangingStatus] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [toDelete, setToDelete] = useState(null);
    const queryClient = useQueryClient();

    const handleChangeStatus = async (slug) => {
        try {
            setIsChangingStatus(true);
            const res = await changeStatus(slug, JSON.parse(localStorage.getItem('user'))?.jwt);
            console.log(res);
            if(res.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({queryKey: ['rejects']});
                queryClient.invalidateQueries({queryKey: ['reject', slug]});
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsChangingStatus(false);
        }
    };

    const handleDeleteClick = (val) => {
        setToDelete(val);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            setIsDeleting(true);
            const res = await destroy(toDelete.slug, JSON.parse(localStorage.getItem('user'))?.jwt);
            if(res.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({queryKey: ['rejects']});
                setShowDeleteModal(false);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsDeleting(false);
            setToDelete(null);
        }
    };

    if(isLoading) return <Loading />;
    if(isError) return <Error />;

    return (
        <div className='container'>
            <div className="d-flex gap-2 justify-content-between align-items-center">
                <h1 className='text-success'>Reject List</h1>
                <Link to="create" className="btn btn-primary">Create Reject</Link>
            </div>
            <table className="table table-bordered table-striped table-hover table-responsive table-sm mt-4">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { data?.rejects && data.rejects.length > 0 && data.rejects.map((reject, index) => (
                        <tr key={reject.id}>
                            <td>{reject.id || index + 1}</td>
                            <td>{reject.name || 'N/A'}</td>
                            <td>{reject.type == 0 ? 'Project 🎦' : reject.type == 1 ? 'Job ⚒️' : 'Group'}</td>
                            <td onClick={() => handleChangeStatus(reject.slug)} disabled={isChangingStatus} style={{cursor: 'pointer'}}>
                                {reject.status == 1 
                                ? <span className="badge bg-success">Active</span>
                                : <span className="badge bg-danger">Inactive</span>}
                            </td>
                            <td>{new Date(reject.createdAt).toLocaleString() || 'N/A'}</td>
                            <td>{new Date(reject.updatedAt).toLocaleString() || 'N/A'}</td>
                            <td className='d-flex gap-2'>
                                <Link to={`/admin/content/rejects/edit/${reject.slug}`} className="btn btn-sm btn-primary">Edit ✏️</Link>
                                <button 
                                    onClick={() => handleDeleteClick(reject)}
                                    className="btn btn-sm btn-warning"
                                    disabled={isDeleting}
                                >
                                    Delete ❌
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <DeleteConfirmationModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                itemName={`the reject "${toDelete?.name}"`}
                isLoading={isDeleting}
                title="Delete reject"
                confirmText="Delete reject"
                cancelText="Cancel"
            />

        </div>
    );
};

export default List;