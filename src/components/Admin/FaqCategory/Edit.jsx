import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { update, show } from '../../../Controllers/FaqCategoryController.js';
import { Link } from 'react-router-dom';


const Edit = () => {

    const navigate = useNavigate();
    const {slug} = useParams();
    const token = JSON.parse(localStorage.getItem('user'))?.jwt;
    
    const {data, isLoading, isError} = useQuery({
        queryKey: ['faqCategory', slug],
        queryFn: () => show(slug, token)
    });

    console.log(data);
    
    const queryClient = useQueryClient();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [isUpdating, setIsUpdating] = useState(false);

    const onSubmit = async (data) => {
        try {
            setIsUpdating(true);
            const response = await update(slug, data, token);

            if(response.success) {
                toast.success(response.message);
                queryClient.invalidateQueries({queryKey: ['faqCategories']});
                queryClient.invalidateQueries({queryKey: ['faqCategory', slug]});
                navigate('/admin/content/faq-categories');
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
                <h1 className='text-success'>Edit faqCategory <span className='text-warning'>{`:/${data?.faqCategory?.name}`}</span></h1>
                <Link to='/admin/content/faq-categories' className='btn btn-secondary'>Back</Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input defaultValue={data?.faqCategory?.name} type="text" className="form-control" {...register('name', {required: 'Name is required'})} />
                    {errors.name && <span className="text-danger">{errors.name.message}</span>}
                </div>
                <div className='mt-3'>
                    <label htmlFor="status" className="form-label">Status</label>
                    <select name='status' className='form-control' {...register('status', {required: 'Status is required', valueAsNumber: true})}>
                        <option selected={data?.faqCategory?.status === 1} value={1}>Active</option>
                        <option selected={data?.faqCategory?.status === 0} value={0}>Inactive</option>
                    </select>
                    {errors.status && <span className="text-danger">{errors.status.message}</span>}
                </div>
                <div className="mt-3">
                    <label htmlFor="des" className='form-label'>Description</label>
                    <textarea {...register('des',{required:true})} className='form-control' rows={5} name='des' id='des'>{data?.faqCategory.des}</textarea>
                </div>
                <button type="submit" disabled={isUpdating} className="btn btn-primary mt-3">{ isUpdating ? 'Updating...' : 'Update' }</button>
            </form>
        </div>
    )
}

export default Edit;
