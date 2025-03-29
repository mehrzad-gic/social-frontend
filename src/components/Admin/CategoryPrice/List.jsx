import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { index, changeStatus, destroy } from '../../../Controllers/CategoryPriceController.js'; // Adjust the import path as necessary
import { getCategory } from '../../../Controllers/CategoryController.js'; // Adjust the import path as necessary
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';
import DeleteConfirmationModal from '../../Home/Ui/DeleteConfirmationModal';

const List = () => {

    const { category } = useParams(); 

    const jwt = JSON.parse(localStorage.getItem('user'))?.jwt;

    const { data: categoryDTO, isLoading: isLoadingCategory, isError: isErrorCategory } = useQuery({
        queryKey: ['category', category],
        queryFn: () => getCategory(category, jwt),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const { data, isLoading, isError } = useQuery({
        queryKey: ['categoryPrices'], // Include `category` in the query key
        queryFn: () => index(category, jwt), // Use `category` directly instead of `categoryDTO?.slug`
        enabled: !!category, // Ensure the query runs only when `category` is available
    });
    console.log(data);
    

    const [isChangingStatus, setIsChangingStatus] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [toDelete, setToDelete] = useState(null);
    const queryClient = useQueryClient();

    const handleChangeStatus = async (id) => { // Use `id` directly
        try {
            setIsChangingStatus(true);
            const res = await changeStatus(id, jwt);
            if (res.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({ queryKey: ['categoryPrices'] });
                queryClient.invalidateQueries({ queryKey: ['categoryPrice', id] });
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsChangingStatus(false);
        }
    };

    const handleDeleteClick = (categoryPrices) => {
        setToDelete(categoryPrices);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => { // Use `toDelete.id` directly
        try {
            setIsDeleting(true);
            const res = await destroy(toDelete.id, jwt);
            if (res.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({ queryKey: ['categoryPrices'] });
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

    if (isLoading || isLoadingCategory) return <Loading />;
    if (isError || isErrorCategory) return <Error />;

    return (
        <div className="container">
            <div className="d-flex gap-2 justify-content-between align-items-center">
                <h1 className="text-success">CategoryPrices List</h1>
                <Link to={`/admin/content/category-prices/create/${category}`} className="btn btn-primary">Create CategoryPrice</Link>
            </div>
            <table className="table table-bordered table-striped table-hover table-responsive table-sm mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>name</th>
                        <th>min</th>
                        <th>max</th>
                        <th>category</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.categoryPrices && data.categoryPrices.length > 0 ? (
                        data.categoryPrices.map((categoryPrice, index) => (
                            <tr key={categoryPrice.id}>
                                <td>{categoryPrice.id || index + 1}</td>
                                <td>{categoryPrice.name || 'N/A'}</td>
                                <td>{categoryPrice.min || 'N/A'}</td>
                                <td>{categoryPrice.max || 'N/A'}</td>
                                <td>
                                    <Link to={`/admin/content/categories/show/${category}`} style={{ textDecoration: 'none', color: 'blue' }}>
                                        {categoryPrice?.Category?.name || 'N/A'}
                                    </Link>
                                </td>
                                <td onClick={() => handleChangeStatus(categoryPrice.id)} style={{ cursor: 'pointer' }}>
                                    {categoryPrice.status === 1
                                        ? <span className="badge bg-success">Active</span>
                                        : <span className="badge bg-danger">Inactive</span>}
                                </td>
                                <td>{new Date(categoryPrice.createdAt).toLocaleString() || 'N/A'}</td>
                                <td>{new Date(categoryPrice.updatedAt).toLocaleString() || 'N/A'}</td>
                                <td className="d-flex gap-2">
                                    <Link to={`/admin/content/category-prices/edit/${category}/${categoryPrice.id}`} className="btn btn-sm btn-primary">Edit ✏️</Link>
                                    <button
                                        onClick={() => handleDeleteClick(categoryPrice)}
                                        className="btn btn-sm btn-warning"
                                        disabled={isDeleting}
                                    >
                                        Delete ❌
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center">No records found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <DeleteConfirmationModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                itemName="the categoryPrice "
                isLoading={isDeleting}
                title="Delete categoryPrice"
                confirmText="Delete categoryPrice"
                cancelText="Cancel"
            />
        </div>
    );
};

export default List;
