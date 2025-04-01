import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { all, changeStatus, destroy } from '../../../Controllers/UserController';
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';
import DeleteConfirmationModal from '../../Home/Ui/DeleteConfirmationModal';
import { Link } from 'react-router-dom';

const List = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['users'],
        queryFn: () => all(JSON.parse(localStorage.getItem('user'))?.jwt)
    });
    const [isChangingStatus, setIsChangingStatus] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const queryClient = useQueryClient();

    const handleChangeStatus = async (slug) => {
        try {
            setIsChangingStatus(true);
            const res = await changeStatus(slug, JSON.parse(localStorage.getItem('user'))?.jwt);
            if(res.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({queryKey: ['users']});
                queryClient.invalidateQueries({queryKey: ['user', slug]});
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsChangingStatus(false);
        }
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            setIsDeleting(true);
            const res = await destroy(userToDelete.slug, JSON.parse(localStorage.getItem('user'))?.jwt);
            if(res.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({queryKey: ['users']});
                setShowDeleteModal(false);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsDeleting(false);
            setUserToDelete(null);
        }
    };

    if(isLoading) return <Loading />;
    if(isError) return <Error />;

    return (
        <div className='container'>
            <div className="d-flex gap-2 justify-content-between align-items-center">
                <h1 className='text-success'>User List</h1>
                <Link to="create" className="btn btn-primary">Create User</Link>
            </div>
            <table className="table table-bordered table-striped table-hover table-responsive table-sm mt-4">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { data?.data && data.data.length > 0 && data.data.map((user, index) => (
                        <tr key={user.id}>
                            <td>{user.id || index + 1}</td>
                            <td>{user.name || 'N/A'}</td>
                            <td>{user.email || 'N/A'}</td>
                            <td>{user.role?.name || 'N/A'}</td>
                            <td onClick={() => handleChangeStatus(user.slug)} disabled={isChangingStatus} style={{cursor: 'pointer'}}>
                                {user.status == 1 
                                ? <span className="badge bg-success">Active</span>
                                : <span className="badge bg-danger">Inactive</span>}
                            </td>
                            <td>{new Date(user.createdAt).toLocaleString() || 'N/A'}</td>
                            <td>{new Date(user.updatedAt).toLocaleString() || 'N/A'}</td>
                            <td className='d-flex gap-2'>
                                <Link to={`/admin/security/users/edit/${user.slug}`} className="btn btn-sm btn-primary">Edit ✏️</Link>
                                <button 
                                    onClick={() => handleDeleteClick(user)}
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
                itemName={`the user "${userToDelete?.name}"`}
                isLoading={isDeleting}
                title="Delete User"
                confirmText="Delete User"
                cancelText="Cancel"
            />
        </div>
    );
};

export default List; 