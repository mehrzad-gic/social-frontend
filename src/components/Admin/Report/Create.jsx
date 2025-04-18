import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTags } from 'react-icons/fa';
import { create } from '../../../Controllers/ReportController';
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

        console.log(data);

        try {

            setIsLoading(true);
            const token = JSON.parse(localStorage.getItem('user')).jwt;
            const response = await create(data,token);
            console.log(response);
            
            if(response.success) {
                toast.success('Report created successfully');
                queryClient.invalidateQueries({queryKey: ['reports']});
                navigate('/admin/content/reports');
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
                <h1 className='text-success'>Create Report</h1>
                <Link to='/admin/content/tags' className='btn btn-secondary'>Back</Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" {...register('name', {required: 'Name is required'})} />
                    {errors.name && <span className="text-danger">{errors.name.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Rete</label>
                    <input type="number" className="form-control" {...register('rate', {required: 'rate is required', valueAsNumber: true})} />
                    {errors.rate && <span className="text-danger">{errors.rate.message}</span>}
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
