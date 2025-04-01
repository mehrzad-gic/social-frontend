import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { all, changeStatus, destroy } from '../../../Controllers/PostController';
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';
import DeleteConfirmationModal from '../../Home/Ui/DeleteConfirmationModal';
import { Link } from 'react-router-dom';

const List = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['posts'],
        queryFn: () => all(JSON.parse(localStorage.getItem('user'))?.jwt)
    });
    const [isChangingStatus, setIsChangingStatus] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const queryClient = useQueryClient();

    const handleChangeStatus = async (slug) => {
        try {
            setIsChangingStatus(true);
            const res = await changeStatus(slug, JSON.parse(localStorage.getItem('user'))?.jwt);
            if(res.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({queryKey: ['posts']});
                queryClient.invalidateQueries({queryKey: ['post', slug]});
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsChangingStatus(false);
        }
    };

    const handleDeleteClick = (post) => {
        setPostToDelete(post);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            setIsDeleting(true);
            const res = await destroy(postToDelete.slug, JSON.parse(localStorage.getItem('user'))?.jwt);
            if(res.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({queryKey: ['posts']});
                setShowDeleteModal(false);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsDeleting(false);
            setPostToDelete(null);
        }
    };

    if(isLoading) return <Loading />;
    if(isError) return <Error />;

    return (
        <div className='container'>
            <div className="d-flex gap-2 justify-content-between align-items-center">
                <h1 className='text-success'>Post List</h1>
                <Link to="create" className="btn btn-primary">Create Post</Link>
            </div>
            <table className="table table-bordered table-striped table-hover table-responsive table-sm mt-4">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { data?.data && data.data.length > 0 && data.data.map((post, index) => (
                        <tr key={post.id}>
                            <td>{post.id || index + 1}</td>
                            <td>{post.title || 'N/A'}</td>
                            <td>{post.author?.name || 'N/A'}</td>
                            <td>{post.category?.name || 'N/A'}</td>
                            <td onClick={() => handleChangeStatus(post.slug)} disabled={isChangingStatus} style={{cursor: 'pointer'}}>
                                {post.status == 1 
                                ? <span className="badge bg-success">Active</span>
                                : <span className="badge bg-danger">Inactive</span>}
                            </td>
                            <td>{new Date(post.createdAt).toLocaleString() || 'N/A'}</td>
                            <td>{new Date(post.updatedAt).toLocaleString() || 'N/A'}</td>
                            <td className='d-flex gap-2'>
                                <Link to={`/admin/content/posts/edit/${post.slug}`} className="btn btn-sm btn-primary">Edit ✏️</Link>
                                <button 
                                    onClick={() => handleDeleteClick(post)}
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
                itemName={`the post "${postToDelete?.title}"`}
                isLoading={isDeleting}
                title="Delete Post"
                confirmText="Delete Post"
                cancelText="Cancel"
            />
        </div>
    );
};

export default List; 