import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { all, changeStatus, destroy } from '../../../Controllers/CommentController';
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';
import DeleteConfirmationModal from '../../Home/Ui/DeleteConfirmationModal';
import { Link } from 'react-router-dom';

const List = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['comments'],
        queryFn: () => all(JSON.parse(localStorage.getItem('user'))?.jwt)
    });
    const [isChangingStatus, setIsChangingStatus] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const queryClient = useQueryClient();

    const handleChangeStatus = async (slug) => {
        try {
            setIsChangingStatus(true);
            const res = await changeStatus(slug, JSON.parse(localStorage.getItem('user'))?.jwt);
            if(res.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({queryKey: ['comments']});
                queryClient.invalidateQueries({queryKey: ['comment', slug]});
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsChangingStatus(false);
        }
    };

    const handleDeleteClick = (comment) => {
        setCommentToDelete(comment);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            setIsDeleting(true);
            const res = await destroy(commentToDelete.slug, JSON.parse(localStorage.getItem('user'))?.jwt);
            if(res.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({queryKey: ['comments']});
                setShowDeleteModal(false);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsDeleting(false);
            setCommentToDelete(null);
        }
    };

    if(isLoading) return <Loading />;
    if(isError) return <Error />;

    return (
        <div className='container'>
            <div className="d-flex gap-2 justify-content-between align-items-center">
                <h1 className='text-success'>Comment List</h1>
                <Link to="create" className="btn btn-primary">Create Comment</Link>
            </div>
            <table className="table table-bordered table-striped table-hover table-responsive table-sm mt-4">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Content</th>
                        <th>Author</th>
                        <th>Post</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { data?.data && data.data.length > 0 && data.data.map((comment, index) => (
                        <tr key={comment.id}>
                            <td>{comment.id || index + 1}</td>
                            <td>{comment.content || 'N/A'}</td>
                            <td>{comment.author?.name || 'N/A'}</td>
                            <td>{comment.post?.title || 'N/A'}</td>
                            <td onClick={() => handleChangeStatus(comment.slug)} disabled={isChangingStatus} style={{cursor: 'pointer'}}>
                                {comment.status == 1 
                                ? <span className="badge bg-success">Active</span>
                                : <span className="badge bg-danger">Inactive</span>}
                            </td>
                            <td>{new Date(comment.createdAt).toLocaleString() || 'N/A'}</td>
                            <td>{new Date(comment.updatedAt).toLocaleString() || 'N/A'}</td>
                            <td className='d-flex gap-2'>
                                <Link to={`/admin/content/comments/edit/${comment.slug}`} className="btn btn-sm btn-primary">Edit ✏️</Link>
                                <button 
                                    onClick={() => handleDeleteClick(comment)}
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
                itemName={`the comment "${commentToDelete?.content}"`}
                isLoading={isDeleting}
                title="Delete Comment"
                confirmText="Delete Comment"
                cancelText="Cancel"
            />
        </div>
    );
};

export default List; 