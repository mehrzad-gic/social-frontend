import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { create } from '../../../Controllers/CategoryPriceController';
import { getCategory } from '../../../Controllers/CategoryController';

const Create = () => {

    const { category } = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data) => create(category, data, JSON.parse(localStorage.getItem('user'))?.jwt),
        onSuccess: (res) => {
            if (res.success) {
                toast.success('Category Price created successfully');
                queryClient.invalidateQueries(['categoryPrices']);
                navigate(`/admin/content/category-prices/${category}`);
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


    return (
        <div className="container">
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <h1 className="text-success mb-3">Create Category Price</h1>
                <Link to={`/admin/content/category-prices/${category}`} className='btn btn-secondary'>Back</Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
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
                        {...register('max', { required: 'Max is required' })}
                    />
                    {errors.max && <span className="text-danger">{errors.max.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select
                        className="form-select"
                        id="status"
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

export default Create;
