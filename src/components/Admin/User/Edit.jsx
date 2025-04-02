import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { update, show } from '../../../Controllers/UserController';
import { all } from '../../../Controllers/RoleController';
import { Link } from 'react-router-dom';

const Edit = () => {

    const navigate = useNavigate();
    const {slug} = useParams();
    const token = JSON.parse(localStorage.getItem('user'))?.jwt;
    
    const {data, isLoading, isError} = useQuery({
        queryKey: ['user', slug],
        queryFn: () => show(slug, token)
    });

    // roles
    const {data: roles, isLoading: rolesLoading, isError: rolesError} = useQuery({
        queryKey: ['roles'],
        queryFn: () => all(token)
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
                navigate('/admin/users');
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
                <h1 className='text-success'>Edit User <span className='text-warning'>{`:/${data?.user?.name}`}</span></h1>
                <Link to='/admin/users' className='btn btn-secondary'>Back</Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='row'>

                    {/* name */}
                    <div className="col-md-6 mb-4">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input  defaultValue={data?.user?.name} type="text" className="form-control" {...register('name', {required: 'Name is required'})} />
                            {errors.name && <span className="text-danger">{errors.name.message}</span>}
                        </div>
                    </div>

                    {/* email */}
                    <div className="col-md-6 mb-4">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input disabled defaultValue={data?.user?.email} type="email" className="form-control bg-dark text-white" {...register('email', {required: 'Email is required'})} />
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        </div>
                    </div>

                    {/* birth date */}
                    <div className="col-md-6 mb-4">
                        <label htmlFor="birthday" className="form-label">Birth Date</label>
                        <input type="date" className="form-control" {...register('birthday')}  />
                        <span className='mt-2 text-secondary'>{`current: ${data?.user?.birthday ? new Date(data?.user?.birthday).toLocaleDateString() : ''}`}</span>
                        {errors.birthday && <span className="text-danger">{errors.birthday.message}</span>}
                    </div>

                    {/* github */}
                    <div className="col-md-6 mb-4">
                        <label htmlFor="github" className="form-label">Github</label>
                        <input defaultValue={data?.user?.github} type="text" className="form-control" {...register('github')} />
                    </div>

                    {/* x */}
                    <div className="col-md-6 mb-4">
                        <label htmlFor="x" className="form-label">X</label>
                        <input defaultValue={data?.user?.x} type="text" className="form-control" {...register('x')} />
                    </div>

                    {/* status */}
                    <div className='col-md-6 mb-4'>
                        <label htmlFor="status" className="form-label">Status</label>
                        <select defaultValue={data?.user?.status} name='status' className='form-control' {...register('status', {required: 'Status is required', valueAsNumber: true})}>
                            <option selected={data?.user?.status === 1} value={1}>Active</option>
                            <option selected={data?.user?.status === 0} value={0}>Inactive</option>
                        </select>
                        {errors.status && <span className="text-danger">{errors.status.message}</span>}
                    </div>

                    {/* roles */}
                    <div className="col-md-12 mb-4">
                        <label htmlFor="role_id" className="form-label">Role</label>
                        {/* check boxes */}
                        <div className='d-flex flex-wrap gap-2'>
                            {roles?.roles?.map((role) => (
                                <div key={role.id}>
                                <input type="checkbox" name='roles' checked={data?.user?.roles?.includes(role.id)} value={role.id} />
                                <label htmlFor={role.id} className='ms-2 text-capitalize'>{role.name}</label>
                                </div>
                            ))}
                        </div>
                        {errors.role_id && <span className="text-danger">{errors.role_id.message}</span>}
                    </div>

                    {/* img */}
                    <div className="col-md-6 mb-4">
                        <label htmlFor="img" className="form-label">Image</label>
                        <input type="file" className="form-control" {...register('img')} />
                    </div>

                    {/* img_bg */}
                    <div className="col-md-6 mb-4">
                        <label htmlFor="img_bg" className="form-label">Image Background</label>
                        <input type="file" className="form-control" {...register('img_bg')} />

                    </div>

                    {/* bio */}
                    <div className="col-md-12 mb-4">
                        <label htmlFor="bio" className="form-label">Bio</label>
                        <textarea className="form-control" {...register('bio')}>{data?.user?.bio}</textarea>
                    </div>

                </div>

                <button type="submit" disabled={isUpdating} className="btn btn-primary mt-3">{ isUpdating ? 'Updating...' : 'Update' }</button>
            </form>
        </div>
    )
}

export default Edit; 