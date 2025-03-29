import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { create } from '../../../Controllers/FaqController';
import { index as fetchFaqCategories } from '../../../Controllers/FaqCategoryController';

const Create = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: faqCategories, isLoading: isLoadingCategories } = useQuery({
        queryKey: ['faqCategories'],
        queryFn: () => fetchFaqCategories(JSON.parse(localStorage.getItem('user'))?.jwt),
    });

    const mutation = useMutation({
        mutationFn: (data) => create(data, JSON.parse(localStorage.getItem('user'))?.jwt),
        onSuccess: (res) => {
            
            if (res.success) {
                toast.success('FAQ created successfully');
                queryClient.invalidateQueries(['faqs']);
                navigate('/admin/content/faqs');
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

    if (isLoadingCategories) return <p>Loading categories...</p>;

    return (
        <div className="container">
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <h1 className="text-success mb-3">Create FAQ</h1>
                <Link to='/admin/content/faqs' className='btn btn-secondary'>Back</Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="question" className="form-label">Question</label>
                    <input
                        type="text"
                        className="form-control"
                        id="question"
                        {...register('name', { required: 'Question is required' })}
                    />
                    {errors.question && <span className="text-danger">{errors.question.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="category_id" className="form-label">Category</label>
                    <select
                        className="form-select"
                        id="category_id"
                        {...register('category_id', { required: 'Category is required' })}
                    >
                        <option value="">Select a category</option>
                        {faqCategories?.faqCategories?.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.category_id && <span className="text-danger">{errors.category_id.message}</span>}
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
                <div className="mb-3">
                    <label htmlFor="answer" className="form-label">Answer</label>
                    <textarea
                        className="form-control"
                        rows={4}
                        id="answer"
                        {...register('answer', { required: 'Answer is required' })}
                    />
                    {errors.answer && <span className="text-danger">{errors.answer.message}</span>}
                </div>
                <button type="submit" className="btn btn-primary btn-sm" disabled={mutation.isLoading}>
                    {mutation.isLoading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default Create;
