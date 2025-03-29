import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { all, changeStatus, destroy } from '../../../Controllers/CategoryController';
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';
import DeleteConfirmationModal from '../../Home/Ui/DeleteConfirmationModal';
import { Link } from 'react-router-dom';

const List = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['categories'],
        queryFn: () => all(JSON.parse(localStorage.getItem('user'))?.jwt)
    });
    const [isChangingStatus, setIsChangingStatus] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const queryClient = useQueryClient();

    const handleChangeStatus = async (slug) => {
        try {
            setIsChangingStatus(true);
            const res = await changeStatus(slug, JSON.parse(localStorage.getItem('user'))?.jwt);            
            if(res.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({queryKey: ['categories']});
                queryClient.invalidateQueries({queryKey: ['category', slug]});
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsChangingStatus(false);
        }
    };

    const handleDeleteClick = (tag) => {
        setCategoryToDelete(tag);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            setIsDeleting(true);
            const res = await destroy(categoryToDelete.slug, JSON.parse(localStorage.getItem('user'))?.jwt);
            if(res.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({queryKey: ['categories']});
                setShowDeleteModal(false);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsDeleting(false);
            setCategoryToDelete(null);
        }
    };

    if(isLoading) return <Loading />;
    if(isError) return <Error />;

    return (
        <div className='container'>
            <div className="d-flex gap-2 justify-content-between align-items-center">
                <h1 className='text-success'>Category List</h1>
                <Link to="create" className="btn btn-primary">Create Category</Link>
            </div>
            <table className="table table-bordered table-striped table-hover table-responsive table-sm mt-4">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Icon</th>
                        <th>Slug</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { data?.categories && data.categories.length > 0 && data.categories.map((category, index) => (
                        <tr key={category.id}>
                            <td>{category.id || index + 1}</td>
                            <td>{category.name || 'N/A'}</td>
                            <td><i className={category.icon || ''}></i></td>
                            <td>
                                <Link to={`/admin/content/categories/view/${category.slug}`} className="underline text-decoration-none" style={{color: '#007bff'}}>
                                {category.slug || 'N/A'}
                                </Link>
                            </td>
                            <td onClick={() => handleChangeStatus(category.slug)} disabled={isChangingStatus} style={{cursor: 'pointer'}}>
                                {category.status == 1 
                                ? <span className="badge bg-success">Active</span>
                                : <span className="badge bg-danger">Inactive</span>}
                            </td>
                            <td>{new Date(category.createdAt).toLocaleString() || 'N/A'}</td>
                            <td>{new Date(category.updatedAt).toLocaleString() || 'N/A'}</td>
                            <td className='d-flex gap-2'>
                                <Link to={`/admin/content/categories/edit/${category.slug}`} className="btn btn-sm btn-primary">Edit ✏️</Link>
                                <button 
                                    onClick={() => handleDeleteClick(category)}
                                    className="btn btn-sm btn-warning"
                                    disabled={isDeleting}
                                >
                                    Delete ❌
                                </button>
                                <Link to={`/admin/content/category-prices/${category.slug}`} className="btn btn-sm btn-secondary">
                                    {/* This button will take to Category Price List */}
                                    Prices 💰
                                </Link>                                 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <DeleteConfirmationModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                itemName={`the category "${categoryToDelete?.name}"`}
                isLoading={isDeleting}
                title="Delete Category"
                confirmText="Delete Category"
                cancelText="Cancel"
            />

        </div>
    );
};

export default List;