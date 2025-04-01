import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { update, getUser } from '../../../Controllers/UserController';
import { Link } from 'react-router-dom';

const Edit = () => {
    const navigate = useNavigate();
    const {slug} = useParams();
    const token = JSON.parse(localStorage.getItem('user'))?.jwt;
    
    const {data, isLoading, isError} = useQuery({
        queryKey: ['user', slug],
        queryFn: () => getUser(slug, token)
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
                queryClient.invalidateQueries({queryKey: ['users']});
                queryClient.invalidateQueries({queryKey: ['user', slug]});
                navigate('/admin/security/users');
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
                <h1 className='text-success'>Edit User <span className='text-warning'>{`:/${data?.data?.name}`}</span></h1>
                <Link to='/admin/users' className='btn btn-secondary'>Back</Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input defaultValue={data?.data?.name} type="text" className="form-control" {...register('name', {required: 'Name is required'})} />
                    {errors.name && <span className="text-danger">{errors.name.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input defaultValue={data?.data?.email} type="email" className="form-control" {...register('email', {required: 'Email is required'})} />
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password (Leave blank to keep current)</label>
                    <input type="password" className="form-control" {...register('password')} />
                    {errors.password && <span className="text-danger">{errors.password.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="role_id" className="form-label">Role</label>
                    <select defaultValue={data?.data?.role_id} className="form-control" {...register('role_id', {required: 'Role is required', valueAsNumber: true})}>
                        <option value="">Select Role</option>
                        <option value={1}>Admin</option>
                        <option value={2}>User</option>
                    </select>
                    {errors.role_id && <span className="text-danger">{errors.role_id.message}</span>}
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