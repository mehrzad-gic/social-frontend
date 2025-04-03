import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { update, show } from '../../../Controllers/GroupController';
import { Link } from 'react-router-dom';
import FileInput from '../../Home/Ui/FileInput';

const Edit = () => {

    const navigate = useNavigate();
    const {slug} = useParams();
    const token = JSON.parse(localStorage.getItem('user'))?.jwt;
    
    const {data, isLoading, isError} = useQuery({
        queryKey: ['group', slug],
        queryFn: () => show(slug, token)
    });
    
    const queryClient = useQueryClient();
    const {register, handleSubmit, setValue, formState: {errors}} = useForm();
    const [isUpdating, setIsUpdating] = useState(false);

    const onSubmit = async (data) => {
        try {
            setIsUpdating(true);
            const response = await update(slug, data, token);

            if(response.success) {
                toast.success(response.message);
                queryClient.invalidateQueries({queryKey: ['groups']});
                queryClient.invalidateQueries({queryKey: ['group', slug]});
                navigate('/admin/content/groups');
                toast.success(response.message);
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
                <h1 className='text-success'>Edit Group <span className='text-warning'>{`:/${data?.group?.name}`}</span></h1>
                <Link to='/admin/content/groups' className='btn btn-secondary'>Back</Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='row'>

                    <div className="mb-4 col-md-4">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input defaultValue={data?.group?.name} type="text" name='name' id='name' className="form-control" {...register('name', {required: 'Name is required'})} />
                        {errors.name && <span className="text-danger">{errors.name.message}</span>}
                    </div>

                    <div className="mb-4 col-md-4">
                        <label htmlFor="slug" className="form-label">Slug</label>
                        <input defaultValue={data?.group?.slug} type="text" name='slug' id='slug' className="form-control" {...register('slug', {required: 'Slug is required'})} />
                        {errors.slug && <span className="text-danger">{errors.slug.message}</span>}
                    </div>

                    <div className='mb-4 col-md-4'>
                        <label htmlFor="status" className="form-label">Status</label>
                        <select defaultValue={data?.group?.status} name='status' id='status' className='form-control' {...register('status', {required: 'Status is required', valueAsNumber: true})}>
                            <option selected={data?.group?.status == 1} value={1}>Active</option>
                            <option selected={data?.group?.status == 0} value={0}>Inactive</option>
                        </select>
                        {errors.status && <span className="text-danger">{errors.status.message}</span>}
                    </div>

                    <div className='mt-4 col-md-4'>
                        <FileInput
                            name='img'
                            label='Image'
                            register={register}
                            setValue={setValue}
                            defaultValue={data?.group?.img}
                            errors={errors}
                        />
                    </div>

                    <div className='mt-4 col-md-4'>
                        <label htmlFor="type" className="form-label">Type</label>
                        <select defaultValue={data?.group?.type} name='type' id='type' className='form-control' {...register('type', {required: 'Type is required', valueAsNumber: true})}>
                            <option selected={data?.group?.type == 1} value={1}>Public</option>
                            <option selected={data?.group?.type == 0} value={0}>Private</option>
                        </select>
                        {errors.type && <span className="text-danger">{errors.type.message}</span>}
                    </div>

                    <div className="mb-4 col-md-12">
                        <label htmlFor="des" className="form-label">Description</label>
                        <textarea defaultValue={data?.group?.des} name='des' id='des' rows="5" className="form-control" {...register('des', {required: 'Description is required'})}></textarea>
                        {errors.des && <span className="text-danger">{errors.des.message}</span>}
                    </div>
                    
                </div>

                <button type="submit" disabled={isUpdating} className="btn btn-primary mt-3">{ isUpdating ? 'Updating...' : 'Update' }</button>
           
            </form>
       
        </div>
    )
}

export default Edit; 