import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createPost } from '../../../Controllers/PostController';
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const Create = () => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const token = JSON.parse(localStorage.getItem('user')).jwt;
            const response = await createPost(data,token);
            
            if(response.success) {
                toast.success('Post created successfully');
                queryClient.invalidateQueries({queryKey: ['posts']});
                navigate('/admin/content/posts');
            } else {
                setIsError(response.message);
            }
        } catch (error) {
            console.log(error);
            setIsError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    if(isLoading) return <Loading />
    if(isError) return <Error message={isError} />

    return (
        <div className='container'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <h1 className='text-success'>Create Post</h1>
                <Link to='/admin/content/posts' className='btn btn-secondary'>Back</Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" {...register('title', {required: 'Title is required'})} />
                    {errors.title && <span className="text-danger">{errors.title.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea className="form-control" rows="5" {...register('content', {required: 'Content is required'})}></textarea>
                    {errors.content && <span className="text-danger">{errors.content.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="category_id" className="form-label">Category</label>
                    <select className="form-control" {...register('category_id', {required: 'Category is required', valueAsNumber: true})}>
                        <option value="">Select Category</option>
                        <option value={1}>Technology</option>
                        <option value={2}>Business</option>
                        <option value={3}>Sports</option>
                    </select>
                    {errors.category_id && <span className="text-danger">{errors.category_id.message}</span>}
                </div>
                <div className='mt-3'>
                    <label htmlFor="status" className="form-label">Status</label>
                    <select name='status' className='form-control' {...register('status', {required: 'Status is required', valueAsNumber: true})}>
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                    </select>
                    {errors.status && <span className="text-danger">{errors.status.message}</span>}
                </div>
                <button type="submit" disabled={isLoading} className="btn btn-primary mt-3">{ isLoading ? 'Creating...' : 'Create' }</button>
            </form>
        </div>
    )
}

export default Create; 