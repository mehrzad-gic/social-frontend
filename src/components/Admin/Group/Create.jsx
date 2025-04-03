import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../Home/Ui/Loading';
import { create } from '../../../Controllers/GroupController';
import { Link } from 'react-router-dom';
import FileInput from '../../Home/Ui/FileInput';

const Create = () => {

    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('user'))?.jwt;
    
    const {register, handleSubmit, setValue, formState: {errors}} = useForm();
    const [isCreating, setIsCreating] = useState(false);

    const onSubmit = async (data) => {
        try {
            setIsCreating(true);
            const response = await create(data, token);
            if(response.success) {
                toast.success(response.message);
                queryClient.invalidateQueries({queryKey: ['groups']});
                navigate('/admin/content/groups');
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setIsCreating(false);
        }
    }


    return (
        <div className='container'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <h1 className='text-success'>Create Group</h1>
                <Link to='/admin/content/groups' className='btn btn-secondary'>Back</Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='row'>

                <div className="mb-4 col-md-4">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name='name' id='name' className="form-control" {...register('name', {required: 'Name is required'})} />
                    {errors.name && <span className="text-danger">{errors.name.message}</span>}
                </div>

                <div className="mb-4 col-md-4">
                    <label htmlFor="slug" className="form-label">Slug</label>
                    <input type="text" name='slug' id='slug' className="form-control" {...register('slug', {required: 'Slug is required'})} />
                    {errors.slug && <span className="text-danger">{errors.slug.message}</span>}
                </div>

                <div className='mt-4 col-md-4'>
                    <label htmlFor="status" className="form-label">Status</label>
                    <select name='status' id='status' className='form-control' {...register('status', {required: 'Status is required', valueAsNumber: true})}>
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                    </select>
                    {errors.status && <span className="text-danger">{errors.status.message}</span>}
                </div>

                <div className='mt-4 col-md-4'>
                    <FileInput
                        name='img'
                        label='Image'
                        register={register}
                        setValue={setValue}
                        defaultValue={null}
                        errors={errors}
                    />
                </div>

                <div className='mt-4 col-md-4'>
                    <label htmlFor="type" className="form-label">Type</label>
                    <select name='type' id='type' className='form-control' {...register('type', {required: 'Type is required', valueAsNumber: true})}>
                        <option value={1}>Public</option>
                        <option value={0}>Private</option>
                    </select>
                    {errors.type && <span className="text-danger">{errors.type.message}</span>}
                </div>

                <div className="mb-4 col-md-12">
                    <label htmlFor="des" className="form-label">Description</label>
                    <textarea name='des' id='des' rows="5" className="form-control" {...register('des', {required: 'Description is required'})}></textarea>
                    {errors.des && <span className="text-danger">{errors.des.message}</span>}
                </div>

                <button type="submit" disabled={isCreating} className="btn btn-primary mt-3">{ isCreating ? 'Creating...' : 'Create' }</button>
            </form>
        </div>
    )
}

export default Create; 