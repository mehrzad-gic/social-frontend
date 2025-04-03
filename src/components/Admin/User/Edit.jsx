import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { update, show } from '../../../Controllers/UserController';
import { all } from '../../../Controllers/RoleController';
import { Link } from 'react-router-dom';
import { schema } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import FileInput from '../../Home/Ui/FileInput';
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';

const Edit = () => {

    const navigate = useNavigate();
    const { slug } = useParams();
    const token = JSON.parse(localStorage.getItem('user'))?.jwt;
    const queryClient = useQueryClient();
    
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);

    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        setValue 
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            title: '',
            birthday: '',
            github: '',
            x: '',
            status: 1,
            bio: '',
            roles: [],
            img: null,
            img_bg: null
        }
    });

    const { data: userData, isLoading, isError } = useQuery({
        queryKey: ['user', slug],
        queryFn: () => show(slug, token)
    });

    const { data: rolesData } = useQuery({
        queryKey: ['roles'],
        queryFn: () => all(token)
    });

    useEffect(() => {
        if (userData?.user) {
            const user = userData.user;
            setValue('name', user.name);
            setValue('title', user.title);
            setValue('birthday', user.birthday ? new Date(user.birthday).toISOString().split('T')[0] : '');
            setValue('github', user.github || '');
            setValue('x', user.x || '');
            setValue('status', user.status);
            setValue('bio', user.bio || '');
            
            if (user.roles) {
                const roleIds = user.roles.map(role => Number(role));
                setSelectedRoles(roleIds);
                setValue('roles', roleIds);
            }
        }
    }, [userData, setValue]);

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

    const onSubmit = async (data) => {
        try {
            setIsUpdating(true);
            
            console.log('Form data before submission:', {
                ...data,
                img: data.img ? `File: ${data.img.name}` : 'No file',
                img_bg: data.img_bg ? `File: ${data.img_bg.name}` : 'No file',
                roles: data.roles
            });

            const response = await update(slug, data, token);

            if (response.success) {
                toast.success(response.message);
                queryClient.invalidateQueries({ queryKey: ['users'] });
                queryClient.invalidateQueries({ queryKey: ['user', slug] });
                navigate('/admin/users');
            } else {
                toast.error(response.message || 'Failed to update user');
            }
        } catch (error) {
            toast.error(error.message || 'An error occurred');
            console.error('Update error:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) return <Loading />;
    if (isError) return <Error message={isError} />;

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-success">
                    Edit User <span className="text-warning">{`:/${userData?.user?.name}`}</span>
                </h1>
                <Link to="/admin/users" className="btn btn-secondary">Back</Link>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input 
                            type="text" 
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                            {...register('name')} 
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input 
                            type="text" 
                            className={`form-control ${errors.title ? 'is-invalid' : ''}`} 
                            {...register('title')} 
                        />
                        {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="slug" className="form-label">Slug</label>
                        <input 
                            type="text" 
                            className="form-control bg-dark text-white" 
                            value={userData?.user?.slug || ''} 
                            disabled 
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control bg-dark text-white" 
                            value={userData?.user?.email || ''} 
                            disabled 
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="birthday" className="form-label">Birth Date</label>
                        <input 
                            type="date" 
                            className={`form-control ${errors.birthday ? 'is-invalid' : ''}`} 
                            {...register('birthday')} 
                        />
                        {userData?.user?.birthday && (
                            <div className="form-text">
                                Current: {new Date(userData.user.birthday).toLocaleDateString()}
                            </div>
                        )}
                        {errors.birthday && <div className="invalid-feedback">{errors.birthday.message}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="github" className="form-label">Github</label>
                        <input 
                            type="text" 
                            className={`form-control ${errors.github ? 'is-invalid' : ''}`} 
                            {...register('github')} 
                        />
                        {errors.github && <div className="invalid-feedback">{errors.github.message}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="x" className="form-label">X</label>
                        <input 
                            type="text" 
                            className={`form-control ${errors.x ? 'is-invalid' : ''}`} 
                            {...register('x')} 
                        />
                        {errors.x && <div className="invalid-feedback">{errors.x.message}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select 
                            className={`form-control ${errors.status ? 'is-invalid' : ''}`} 
                            {...register('status', { valueAsNumber: true })}
                        >
                            <option value={1}>Active</option>
                            <option value={0}>Inactive</option>
                        </select>
                        {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
                    </div>

                    <div className="col-md-12 mb-3">
                        <label className="form-label">Roles</label>
                        <div className="d-flex flex-wrap gap-2">
                            {rolesData?.roles?.map((role) => (
                                <div key={role.id} className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`role-${role.id}`}
                                        value={role.id}
                                        checked={selectedRoles.includes(Number(role.id))}
                                        onChange={() => handleRoleChange(role.id)}
                                    />
                                    <label 
                                        htmlFor={`role-${role.id}`} 
                                        className="form-check-label text-capitalize"
                                    >
                                        {role.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {errors.roles && <div className="text-danger">{errors.roles.message}</div>}
                    </div>

                    <div className="col-md-6">
                        <FileInput
                            label="Image"
                            name="img"
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            defaultImage={userData?.user?.img ? JSON.parse(userData.user.img)[0].url : null}
                        />
                    </div>
                    <div className="col-md-6">
                        <FileInput
                            label="Background Image"
                            name="img_bg"
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            defaultImage={userData?.user?.img_bg ? JSON.parse(userData.user.img_bg)[0].url : null}
                        />
                    </div>

                    <div className="col-md-12 mb-3">
                        <label htmlFor="bio" className="form-label">Bio</label>
                        <textarea 
                            className={`form-control ${errors.bio ? 'is-invalid' : ''}`} 
                            rows="4"
                            {...register('bio')} 
                        />
                        {errors.bio && <div className="invalid-feedback">{errors.bio.message}</div>}
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={isUpdating} 
                    className="btn btn-primary mt-3"
                >
                    {isUpdating ? 'Updating...' : 'Update'}
                </button>
            </form>
        </div>
    );
};

export default Edit;