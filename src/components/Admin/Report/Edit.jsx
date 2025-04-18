import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { update, show } from '../../../Controllers/ReportController.js';
import { Link } from 'react-router-dom';


const Edit = () => {
    const navigate = useNavigate();
    const {slug} = useParams();
    const token = JSON.parse(localStorage.getItem('user'))?.jwt;
    
    const {data, isLoading, isError} = useQuery({
        queryKey: ['report', slug],
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
                queryClient.invalidateQueries({queryKey: ['reports']});
                queryClient.invalidateQueries({queryKey: ['report', slug]});
                navigate('/admin/content/reports');
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
                <h1 className='text-success'>Edit report <span className='text-warning'>{`:/${data?.report?.name}`}</span></h1>
                <Link to='/admin/content/reports' className='btn btn-secondary'>Back</Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input defaultValue={data?.report?.name} type="text" className="form-control" {...register('name', {required: 'Name is required'})} />
                    {errors.name && <span className="text-danger">{errors.name.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Rete</label>
                    <input defaultValue={data?.report?.rate} type="number" className="form-control" {...register('rate', {required: 'rate is required', valueAsNumber: true})} />
                    {errors.rate && <span className="text-danger">{errors.rate.message}</span>}
                </div>
                <div className='mt-3'>
                    <label htmlFor="status" className="form-label">Status</label>
                    <select name='status' className='form-control' {...register('status', {required: 'Status is required', valueAsNumber: true})}>
                        <option selected={data?.report?.status === 1} value={1}>Active</option>
                        <option selected={data?.report?.status === 0} value={0}>Inactive</option>
                    </select>
                    {errors.status && <span className="text-danger">{errors.status.message}</span>}
                </div>
                <button type="submit" disabled={isUpdating} className="btn btn-primary mt-3">{ isUpdating ? 'Updating...' : 'Update' }</button>
            </form>
        </div>
    )
}

export default Edit;
