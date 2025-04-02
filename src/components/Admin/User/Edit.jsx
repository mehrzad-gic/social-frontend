import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { update, show } from '../../../Controllers/UserController';
import { all } from '../../../Controllers/RoleController';
import { Link } from 'react-router-dom';
import { schema } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';

const Edit = () => {

    const navigate = useNavigate();
    const {slug} = useParams();
    const token = JSON.parse(localStorage.getItem('user'))?.jwt;
    const [previewImg, setPreviewImg] = useState(null);
    const [previewImgBg, setPreviewImgBg] = useState(null);
    
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
    const {register, handleSubmit, formState: {errors}, setValue, watch} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: data?.user?.name,
            email: data?.user?.email,
            title: data?.user?.title,
            birthday: data?.user?.birthday,
            github: data?.user?.github,
            x: data?.user?.x,
            img: data?.user?.img,
            img_bg: data?.user?.img_bg,
            bio: data?.user?.bio || '',
            roles: data?.user?.roles || [],
            status: data?.user?.status || 1
        }
    });

    const [selectedRoles, setSelectedRoles] = useState([]);

    // Update selected roles when data changes
    useEffect(() => {
        if (data?.user?.roles) {
            setSelectedRoles(data.user.roles.map(role => Number(role)));
        }
    }, [data]);

    const handleRoleChange = (roleId) => {
        const numRoleId = Number(roleId);
        setSelectedRoles(prev => {
            const newRoles = prev.includes(numRoleId) 
                ? prev.filter(id => id !== numRoleId)
                : [...prev, numRoleId];
            setValue('roles', newRoles);
            return newRoles;
        });
    };

    const [isUpdating, setIsUpdating] = useState(false);

    const onSubmit = async (formData) => {
        try {
            setIsUpdating(true);
            console.log('Form Data:', formData);
            
            // Ensure roles is an array of numbers
            const processedData = {
                ...formData,
                roles: selectedRoles
            };

            console.log('Processed Data:', processedData);
            const response = await update(slug, processedData, token);
            console.log('Response:', response);

            if(response.success) {
                toast.success(response.message);
                queryClient.invalidateQueries({queryKey: ['users']});
                queryClient.invalidateQueries({queryKey: ['user', slug]});
                navigate('/admin/users');
            } else {
                toast.error(response.message || 'Failed to update user');
            }
        } catch (error) {
            console.error('Update Error:', error);
            toast.error(error.message || 'An error occurred while updating the user');
        } finally {
            setIsUpdating(false);
        }
    }

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            setValue(fieldName, file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setValue(fieldName, e.target.result);
                if (fieldName === 'img') {
                    setPreviewImg(e.target.result);
                } else if (fieldName === 'img_bg') {
                    setPreviewImgBg(e.target.result);
                }
            }
            reader.readAsDataURL(file);
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
                            <input  type="text" className="form-control" {...register('name',  { value: data?.user?.name, required: 'Name is required'})} />
                            {errors.name && <span className="text-danger">{errors.name.message}</span>}
                        </div>
                    </div>

                    {/* email */}
                    <div className="col-md-6 mb-4">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input disabled type="email" className="form-control bg-dark text-white" {...register('email', { value: data?.user?.email, required: 'Email is required'})} />
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        </div>
                    </div>

                    {/* title */}
                    <div className="col-md-12 mb-4">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" {...register('title', { value: data?.user?.title, required: 'Title is required'})} />
                        {errors.title && <span className="text-danger">{errors.title.message}</span>}
                    </div>

                    {/* birth date */}
                    <div className="col-md-6 mb-4">
                        <label htmlFor="birthday" className="form-label">Birth Date</label>
                        <input type="date" className="form-control" {...register('birthday', { value: data?.user?.birthday})}  />
                        <span className='mt-2 text-secondary'>{`current: ${data?.user?.birthday ? new Date(data?.user?.birthday).toLocaleDateString() : ''}`}</span>
                        {errors.birthday && <span className="text-danger">{errors.birthday.message}</span>}
                    </div>

                    {/* github */}
                    <div className="col-md-6 mb-4">
                        <label htmlFor="github" className="form-label">Github</label>
                        <input type="text" className="form-control" {...register('github', { value: data?.user?.github})} />
                    </div>

                    {/* x */}
                    <div className="col-md-6 mb-4">
                        <label htmlFor="x" className="form-label">X</label>
                        <input type="text" className="form-control" {...register('x', { value: data?.user?.x})} />
                    </div>

                    {/* status */}
                    <div className='col-md-6 mb-4'>
                        <label htmlFor="status" className="form-label">Status</label>
                        <select name='status' className='form-control' {...register('status', { valueAsNumber: true})}>
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
                                    <input 
                                        type="checkbox" 
                                        checked={selectedRoles.includes(Number(role.id))}
                                        onChange={() => handleRoleChange(role.id)}
                                        id={role.id} 
                                        value={role.id} 
                                    />
                                    <label htmlFor={role.id} className='ms-2 text-capitalize'>{role.name}</label>
                                </div>
                            ))}
                        </div>
                        {errors.roles && <span className="text-danger">{errors.roles.message}</span>}
                    </div>

                    {/* img */}
                    <div className="col-md-6 mb-4">
                        <label htmlFor="img" className="form-label">Image</label>
                        <input type="file" className="form-control" onChange={(e) => handleFileChange(e, 'img')} />
                        <div className="row">
                            <div className="col-md-6">
                                {data?.user?.img ? (
                                    <img src={JSON.parse(data?.user?.img)[0].url} alt="default" className='img-fluid mt-2 rounded w-100' style={{filter: `${previewImg ? 'blur(7px)' : ''}`}} />
                                ) : (
                                    <p className='text-center text-secondary'>No image</p>
                                )}
                            </div>
                            <div className="col-md-6">
                                {
                                    previewImg && (
                                        <img src={previewImg} alt="preview" className='img-fluid mt-2 rounded w-100' />
                                    ) 
                                }
                            </div>
                        </div>
                    </div>

                    {/* img_bg */}
                    <div className="col-md-6 mb-4">
                        <label htmlFor="img_bg" className="form-label">Image Background</label>
                        <input type="file" className="form-control" onChange={(e) => handleFileChange(e, 'img_bg')} />
                        <div className="row">
                            <div className="col-md-6">
                                {data?.user?.img_bg ? (
                                    <img src={JSON.parse(data?.user?.img_bg)[0].url} style={{filter: `${previewImgBg ? 'blur(7px)' : ''}`}} alt="default" className='img-fluid mt-2 rounded w-100' />
                                ) : (
                                    <p className='text-center text-secondary'>No image</p>
                                )}
                            </div>
                            <div className="col-md-6">
                                {
                                    previewImgBg && (
                                        <img src={previewImgBg} alt="preview" className='img-fluid mt-2 rounded w-100' />
                                    )
                                }
                            </div>
                        </div>
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