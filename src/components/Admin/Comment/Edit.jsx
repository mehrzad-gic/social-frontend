import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { update, getComment } from '../../../Controllers/CommentController';
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';
import { useQuery } from '@tanstack/react-query';
import { all as getAllPosts } from '../../../Controllers/PostController';

const Edit = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { slug } = useParams();

    const { data: commentData, isError: isCommentError } = useQuery({
        queryKey: ['comment', slug],
        queryFn: () => getComment(slug, JSON.parse(localStorage.getItem('user'))?.jwt)
    });

    const { data: postsData, isError: isPostsError } = useQuery({
        queryKey: ['posts'],
        queryFn: () => getAllPosts(JSON.parse(localStorage.getItem('user'))?.jwt)
    });

    React.useEffect(() => {
        if (commentData?.data) {
            setValue('content', commentData.data.content);
            setValue('post_id', commentData.data.post_id);
            setValue('status', commentData.data.status);
        }
    }, [commentData, setValue]);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const res = await update(slug, data, JSON.parse(localStorage.getItem('user'))?.jwt);
            if(res.success) {
                toast.success(res.message);
                navigate('/admin/content/comments');
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if(isLoading) return <Loading />;
    if(isCommentError || isPostsError) return <Error />;

    return (
        <div className='container'>
            <div className="d-flex gap-2 justify-content-between align-items-center">
                <h1 className='text-success'>Edit Comment</h1>
                <a href="/admin/content/comments" className="btn btn-primary">Back to Comments</a>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea
                        {...register('content', { required: 'Content is required' })}
                        className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                        id="content"
                        rows="4"
                    />
                    {errors.content && <div className="invalid-feedback">{errors.content.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="post_id" className="form-label">Post</label>
                    <select
                        {...register('post_id', { required: 'Post is required' })}
                        className={`form-control ${errors.post_id ? 'is-invalid' : ''}`}
                        id="post_id"
                    >
                        <option value="">Select a post</option>
                        {postsData?.data && postsData.data.map(post => (
                            <option key={post.id} value={post.id}>{post.title}</option>
                        ))}
                    </select>
                    {errors.post_id && <div className="invalid-feedback">{errors.post_id.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select
                        {...register('status', { required: 'Status is required' })}
                        className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                        id="status"
                    >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
                    {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
                </div>

                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update Comment'}
                </button>
            </form>
        </div>
    );
};

export default Edit; 