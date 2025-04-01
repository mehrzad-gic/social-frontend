import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { all, changeStatus, destroy } from '../../../Controllers/RoleController';
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';
import DeleteConfirmationModal from '../../Home/Ui/DeleteConfirmationModal';
import { Link } from 'react-router-dom';

const List = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['roles'],
        queryFn: () => all(JSON.parse(localStorage.getItem('user'))?.jwt)
    });
    const [isChangingStatus, setIsChangingStatus] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState(null);
    const queryClient = useQueryClient();

    const handleChangeStatus = async (slug) => {
        try {
            setIsChangingStatus(true);
            const res = await changeStatus(slug, JSON.parse(localStorage.getItem('user'))?.jwt);
            if(res.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({queryKey: ['roles']});
                queryClient.invalidateQueries({queryKey: ['role', slug]});
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsChangingStatus(false);
        }
    };

    const handleDeleteClick = (role) => {
        setRoleToDelete(role);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            setIsDeleting(true);
            const res = await destroy(roleToDelete.slug, JSON.parse(localStorage.getItem('user'))?.jwt);
            if(res.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({queryKey: ['roles']});
                setShowDeleteModal(false);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsDeleting(false);
            setRoleToDelete(null);
        }
    };

    if(isLoading) return <Loading />;
    if(isError) return <Error />;

    return (
        <div className='container'>
            <div className="d-flex gap-2 justify-content-between align-items-center">
                <h1 className='text-success'>Role List</h1>
                <Link to="create" className="btn btn-primary">Create Role</Link>
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
                    { data?.data && data.data.length > 0 && data.data.map((role, index) => (
                        <tr key={role.id}>
                            <td>{role.id || index + 1}</td>
                            <td>{role.name || 'N/A'}</td>
                            <td>{role.slug || 'N/A'}</td>
                            <td onClick={() => handleChangeStatus(role.slug)} disabled={isChangingStatus} style={{cursor: 'pointer'}}>
                                {role.status == 1 
                                ? <span className="badge bg-success">Active</span>
                                : <span className="badge bg-danger">Inactive</span>}
                            </td>
                            <td>{new Date(role.createdAt).toLocaleString() || 'N/A'}</td>
                            <td>{new Date(role.updatedAt).toLocaleString() || 'N/A'}</td>
                            <td className='d-flex gap-2'>
                                <Link to={`/admin/security/roles/edit/${role.slug}`} className="btn btn-sm btn-primary">Edit ✏️</Link>
                                <button 
                                    onClick={() => handleDeleteClick(role)}
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
                itemName={`the role "${roleToDelete?.name}"`}
                isLoading={isDeleting}
                title="Delete Role"
                confirmText="Delete Role"
                cancelText="Cancel"
            />
        </div>
    );
};

export default List; 