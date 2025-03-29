import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { show, update } from '../../../Controllers/CategoryPriceController';

const Edit = () => {

    const { category, id } = useParams(); // Use `id` parameter
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ['categoryPrice', id], // Use `id` for query key
        queryFn: () => show(id, JSON.parse(localStorage.getItem('user'))?.jwt), // Use `id` for fetching
    });


    const mutation = useMutation({
        mutationFn: (data) => update(id, data, JSON.parse(localStorage.getItem('user'))?.jwt), // Use `id` for updating
        onSuccess: (res) => {
            if (res.success) {
                toast.success('Category Price updated successfully');
                queryClient.invalidateQueries(['categoryPrices']);
                queryClient.invalidateQueries(['categoryPrice', id]);
                navigate(`/admin/content/category-prices/${category}`); // Navigate back to the category
            } else {
                toast.error(res.message);
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="container">
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <h1 className="text-success mb-3">Edit Category Price</h1>
                <Link to={`/admin/content/category-prices/${category}`} className='btn btn-secondary'>Back</Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        defaultValue={data?.categoryPrice?.name}
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <span className="text-danger">{errors.name.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="min" className="form-label">Min</label>
                    <input
                        type="number"
                        className="form-control"
                        id="min"
                        defaultValue={data?.categoryPrice?.min}
                        {...register('min', { required: 'Min is required' })}
                    />
                    {errors.min && <span className="text-danger">{errors.min.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="max" className="form-label">Max</label>
                    <input
                        type="number"
                        className="form-control"
                        id="max"
                        defaultValue={data?.categoryPrice?.max}
                        {...register('max', { required: 'Max is required' })}
                    />
                    {errors.max && <span className="text-danger">{errors.max.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select
                        className="form-select"
                        id="status"
                        defaultValue={data?.categoryPrice?.status || ''}
                        {...register('status', { required: 'Status is required' })}
                    >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
                    {errors.status && <span className="text-danger">{errors.status.message}</span>}
                </div>
                <button type="submit" className="btn btn-primary btn-sm" disabled={mutation.isLoading}>
                    {mutation.isLoading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default Edit;
