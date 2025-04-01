import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { update, show } from '../../../Controllers/PostController';
import { Link } from 'react-router-dom';

const Edit = () => {
    const navigate = useNavigate();
    const {slug} = useParams();
    const token = JSON.parse(localStorage.getItem('user'))?.jwt;
    
    const {data, isLoading, isError} = useQuery({
        queryKey: ['post', slug],
        queryFn: () => show(slug, token)
    });
    
    const queryClient = useQueryClient();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [isUpdating, setIsUpdating] = useState(false);

    const onSubmit = async (data) => {
        try {
            setIsUpdating(true);
            const response = await update(slug, data, token);

            if(response.success) {
                toast.success(response.message);
                queryClient.invalidateQueries({queryKey: ['posts']});
                queryClient.invalidateQueries({queryKey: ['post', slug]});
                navigate('/admin/content/posts');
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setIsUpdating(false);
        }
    }

    if(isLoading) return <Loading />
    if(isError) return <Error message={isError} />

    return (
        <div className='container'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <h1 className='text-success'>Edit Post <span className='text-warning'>{`:/${data?.data?.title}`}</span></h1>
                <Link to='/admin/content/posts' className='btn btn-secondary'>Back</Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input defaultValue={data?.data?.title} type="text" className="form-control" {...register('title', {required: 'Title is required'})} />
                    {errors.title && <span className="text-danger">{errors.title.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea defaultValue={data?.data?.content} className="form-control" rows="5" {...register('content', {required: 'Content is required'})}></textarea>
                    {errors.content && <span className="text-danger">{errors.content.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="category_id" className="form-label">Category</label>
                    <select defaultValue={data?.data?.category_id} className="form-control" {...register('category_id', {required: 'Category is required', valueAsNumber: true})}>
                        <option value="">Select Category</option>
                        <option value={1}>Technology</option>
                        <option value={2}>Business</option>
                        <option value={3}>Sports</option>
                    </select>
                    {errors.category_id && <span className="text-danger">{errors.category_id.message}</span>}
                </div>
                <div className='mt-3'>
                    <label htmlFor="status" className="form-label">Status</label>
                    <select defaultValue={data?.data?.status} name='status' className='form-control' {...register('status', {required: 'Status is required', valueAsNumber: true})}>
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                    </select>
                    {errors.status && <span className="text-danger">{errors.status.message}</span>}
                </div>
                <button type="submit" disabled={isUpdating} className="btn btn-primary mt-3">{ isUpdating ? 'Updating...' : 'Update' }</button>
            </form>
        </div>
    )
}

export default Edit; 