import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { create } from '../../../Controllers/RoleController';
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { all } from '../../../Controllers/PermissionController';

const Create = () => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const {data , isLoading: isPermissionsLoading , isError: isPermissionsError} = useQuery({
        queryKey: ['permissions'],
        queryFn: () => all(JSON.parse(localStorage.getItem('user')).jwt)
    });

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const token = JSON.parse(localStorage.getItem('user')).jwt;
            const response = await create(data,token);
            console.log(response);
            if(response.success) {
                toast.success('Role created successfully');
                queryClient.invalidateQueries({queryKey: ['roles']});
                navigate('/admin/users/roles');
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
    if(isPermissionsLoading) return <Loading />
    return (
        <div className='container'>
            {isError && <Error message={isError} />}
            {isPermissionsError && <Error message={isPermissionsError} />}
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <h1 className='text-success'>Create Role</h1>
                <Link to='/admin/users/roles' className='btn btn-secondary'>Back</Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" {...register('name', {required: 'Name is required'})} />
                    {errors.name && <span className="text-danger">{errors.name.message}</span>}
                </div>
                <div className='mt-4'>
                    <label htmlFor="status" className="form-label">Status</label>
                    <select name='status' className='form-control' {...register('status', {required: 'Status is required', valueAsNumber: true})}>
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                    </select>
                    {errors.status && <span className="text-danger">{errors.status.message}</span>}
                </div>
                <div className='mt-4'>
                    <label htmlFor="permissions" className="form-label">Permissions</label>
                    {/* multiple checkbox select */}
                    {data?.permissions && data?.permissions.length > 0 && (
                        <div className='d-flex flex-wrap gap-2'>
                            {data?.permissions.map((permission) => (
                                <div key={permission.id}>
                                    <input id={permission.id} {...register('permissions')} className='form-check-input' type="checkbox" name='permissions' value={permission.id} />
                                    <label htmlFor={permission.id} className='form-check-label ms-2'>{permission.name}</label>
                                </div>
                            ))}
                        </div>
                    )} 
                </div>
                <button type="submit" disabled={isLoading} className="btn btn-primary mt-3">{ isLoading ? 'Creating...' : 'Create' }</button>
            </form>
        </div>
    )
}

export default Create; 