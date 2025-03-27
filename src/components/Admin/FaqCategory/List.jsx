import React, { useState, useEffect } from 'react';

import { FaEdit, FaTrash } from 'react-icons/fa';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { changeStatus, destroy, index } from '../../../Controllers/FaqCategoryController.js'; // Adjust the import path as necessary
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';
import DeleteConfirmationModal from '../../Home/Ui/DeleteConfirmationModal';
import { Link } from 'react-router-dom';

const List = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['faqCategories'],
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
                queryClient.invalidateQueries({queryKey: ['faqCategories']});
                queryClient.invalidateQueries({queryKey: ['faqCategory', slug]});
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
                queryClient.invalidateQueries({queryKey: ['faqCategories']});
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
                <h1 className='text-success'>faqCategories List</h1>
                <Link to="create" className="btn btn-primary">Create faqCategory</Link>
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
                    { data?.faqCategories && data.faqCategories.length > 0 && data.faqCategories.map((faqCategory, index) => (
                        <tr key={faqCategory.id}>
                            <td>{faqCategory.id || index + 1}</td>
                            <td>{faqCategory.name || 'N/A'}</td>
                            <td>{faqCategory.slug || 'N/A'}</td>
                            <td onClick={() => handleChangeStatus(faqCategory.slug)} disabled={isChangingStatus} style={{cursor: 'pointer'}}>
                                {faqCategory.status == 1 
                                ? <span className="badge bg-success">Active</span>
                                : <span className="badge bg-danger">Inactive</span>}
                            </td>
                            <td>{new Date(faqCategory.createdAt).toLocaleString() || 'N/A'}</td>
                            <td>{new Date(faqCategory.updatedAt).toLocaleString() || 'N/A'}</td>
                            <td className='d-flex gap-2'>
                                <Link to={`/admin/content/faq-categories/edit/${faqCategory.slug}`} className="btn btn-sm btn-primary">Edit ✏️</Link>
                                <button 
                                    onClick={() => handleDeleteClick(faqCategory)}
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
                itemName={`the faqCategory "${toDelete?.name}"`}
                isLoading={isDeleting}
                title="Delete faqCategory"
                confirmText="Delete faqCategory"
                cancelText="Cancel"
            />

        </div>
    );
};

export default List;