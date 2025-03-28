import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { index, changeStatus, destroy } from '../../../Controllers/FaqController';
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';
import DeleteConfirmationModal from '../../Home/Ui/DeleteConfirmationModal';

const List = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['faqs'],
        queryFn: () => index(JSON.parse(localStorage.getItem('user'))?.jwt),
    });
    const [isChangingStatus, setIsChangingStatus] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [toDelete, setToDelete] = useState(null);
    const queryClient = useQueryClient();

    const handleChangeStatus = async (id) => {
        try {
            setIsChangingStatus(true);
            const res = await changeStatus(id, JSON.parse(localStorage.getItem('user'))?.jwt);
            if (res.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({ queryKey: ['faqs'] });
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsChangingStatus(false);
        }
    };

    const handleDeleteClick = (faq) => {
        setToDelete(faq);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            setIsDeleting(true);
            const res = await destroy(toDelete.slug, JSON.parse(localStorage.getItem('user'))?.jwt);
            if (res.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({ queryKey: ['faqs'] });
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

    if (isLoading) return <Loading />;
    if (isError) return <Error />;

    return (
        <div className="container">
            <div className="d-flex gap-2 justify-content-between align-items-center">
                <h1 className="text-success">FAQs List</h1>
                <Link to="create" className="btn btn-primary">Create FAQ</Link>
            </div>
            <table className="table table-bordered table-striped table-hover table-responsive table-sm mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Question</th>
                        <th>slug</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.faqs && data.faqs.length > 0 && data.faqs.map((faq, index) => (
                        <tr key={faq.id}>
                            <td>{faq.id || index + 1}</td>
                            <td>{faq.name || 'N/A'}</td>
                            <td>{faq.slug || 'N/A'}</td>
                            <td onClick={() => handleChangeStatus(faq.slug)} style={{ cursor: 'pointer' }}>
                                {faq.status === 1
                                    ? <span className="badge bg-success">Active</span>
                                    : <span className="badge bg-danger">Inactive</span>}
                            </td>
                            <td>{new Date(faq.createdAt).toLocaleString() || 'N/A'}</td>
                            <td>{new Date(faq.updatedAt).toLocaleString() || 'N/A'}</td>
                            <td className="d-flex gap-2">
                                <Link to={`edit/${faq.slug}`} className="btn btn-sm btn-primary">Edit ✏️</Link>
                                <button
                                    onClick={() => handleDeleteClick(faq)}
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
                itemName={`the FAQ "${toDelete?.question}"`}
                isLoading={isDeleting}
                title="Delete FAQ"
                confirmText="Delete FAQ"
                cancelText="Cancel"
            />
        </div>
    );
};

export default List;
