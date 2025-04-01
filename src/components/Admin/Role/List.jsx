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

    console.log(data);
    const handleChangeStatus = async (id) => {
        try {
            setIsChangingStatus(true);
            const res = await changeStatus(id, JSON.parse(localStorage.getItem('user'))?.jwt);
            if(res.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({queryKey: ['roles']});
                queryClient.invalidateQueries({queryKey: ['role', id]});
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
            const res = await destroy(roleToDelete.id, JSON.parse(localStorage.getItem('user'))?.jwt);
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
                        <th>Status</th>
                        <th>Permissions</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { data?.roles && data.roles.length > 0 ? data.roles.map((role, index) => (
                        <tr key={role.id}>
                            <td>{role.id || index + 1}</td>
                            <td>{role.name || 'N/A'}</td>
                            <td onClick={() => handleChangeStatus(role.id)} disabled={isChangingStatus} style={{cursor: 'pointer'}}>
                                {role.status == 1 
                                ? <span className="badge bg-success">Active</span>
                                : <span className="badge bg-danger">Inactive</span>}
                            </td>
                            <td>{role?.permissions && role?.permissions.length > 0 ? role?.permissions.map((permission, index) => (
                                <span key={permission.id} className="badge bg-primary">{permission.name}</span>
                            )) : 'N/A'}</td>
                            <td>{new Date(role.createdAt).toLocaleString() || 'N/A'}</td>
                            <td>{new Date(role.updatedAt).toLocaleString() || 'N/A'}</td>
                            <td className='d-flex gap-2'>
                                <Link to={`/admin/users/roles/edit/${role.id}`} className="btn btn-sm btn-primary">Edit ✏️</Link>
                                <button 
                                    onClick={() => handleDeleteClick(role)}
                                    className="btn btn-sm btn-warning"
                                    disabled={isDeleting}
                                    style={{cursor: 'pointer'}}
                                >
                                    Delete ❌
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="7" className="text-center">No roles found</td>
                        </tr>
                    )}
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