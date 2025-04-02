import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { create } from '../../../Controllers/UserController';
import { all } from '../../../Controllers/RoleController';
import { Link } from 'react-router-dom';

const Edit = () => {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('user'))?.jwt;
    
    // roles
    const { data: roles, isLoading, isError} = useQuery({
        queryKey: ['roles'],
        queryFn: () => all(token)
    });
    
    const queryClient = useQueryClient();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [isUpdating, setIsUpdating] = useState(false);

    const onSubmit = async (data) => {
        try {
            setIsUpdating(true);
            console.log(data);
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
                <h1 className='text-success'>Create User</h1>
                <Link to='/admin/users' className='btn btn-secondary'>Back</Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='row'>

                    {/* name */}
                    <div className="col-md-6 mb-4">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input  type="text" className="form-control" {...register('name', {required: 'Name is required'})} />
                            {errors.name && <span className="text-danger">{errors.name.message}</span>}
                        </div>
                    </div>

                    {/* email */}
                    <div className="col-md-6 mb-4">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" {...register('email', {required: 'Email is required'})} />
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        </div>
                    </div>

                    {/* password(hidden | show) */}
                    <div className="col-md-6 mb-4">
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className='d-flex align-items-center gap-2 justify-content-between'>
                                <input type={showPassword ? 'text' : 'password'} className="form-control w-100 " {...register('password', {required: 'Password is required'})} />
                                <p className='btn btn-sm mt-2 btn-secondary' style={{cursor: 'pointer'}} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <i className='fa-solid fa-eye'></i> : <i className='fa-solid fa-eye-slash'></i>}</p>
                            </div>
                        </div>
                    </div>

                    {/* confirm(hidden | show) password */}
                    <div className="col-md-6 mb-4">
                        <div className="mb-3">
                            <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                            <div className='d-flex align-items-center gap-2 justify-content-between'>
                                <input type={showPassword ? 'text' : 'password'} className="form-control w-100 " {...register('confirm_password', {required: 'Confirm Password is required'})} />
                                <p className='btn btn-sm mt-2 btn-secondary' style={{cursor: 'pointer'}} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <i className='fa-solid fa-eye'></i> : <i className='fa-solid fa-eye-slash'></i>}</p>
                            </div>
                        </div>
                    </div>

                    {/* birth date */}
                    <div className="col-md-6 mb-4">
                        <label htmlFor="birthday" className="form-label">Birth Date</label>
                        <input type="date" className="form-control" {...register('birthday')}  />
                        {errors.birthday && <span className="text-danger">{errors.birthday.message}</span>}
                    </div>

                    {/* github */}
                    <div className="col-md-6 mb-4">
                        <label htmlFor="github" className="form-label">Github</label>
                        <input type="text" className="form-control" {...register('github')} />
                    </div>

                    {/* x */}
                    <div className="col-md-6 mb-4">
                        <label htmlFor="x" className="form-label">X</label>
                        <input type="text" className="form-control" {...register('x')} />
                    </div>

                    {/* status */}
                    <div className='col-md-6 mb-4'>
                        <label htmlFor="status" className="form-label">Status</label>
                        <select name='status' className='form-control' {...register('status', {required: 'Status is required', valueAsNumber: true})}>
                            <option value={1}>Active</option>
                            <option value={0}>Inactive</option>
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
                                <input type="checkbox" name='roles' value={role.id} />
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
                        <textarea className="form-control" {...register('bio')}></textarea>
                    </div>

                </div>

                <button type="submit" disabled={isUpdating} className="btn btn-primary mt-3">{ isUpdating ? 'Updating...' : 'Update' }</button>
            </form>
        </div>
    )
}

export default Edit; 