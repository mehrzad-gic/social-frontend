import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTags } from 'react-icons/fa';
import { create } from '../../../Controllers/TagController';
import Loading from '../../Home/Ui/Loading';
import Error from '../../Home/Ui/Error';

const Create = () => {
 
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    if(isLoading) return <Loading />
    if(isError) return <Error />

    return (
        <div>
            <h1>Create Tag</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" {...register('name')} />
                    {errors.name && <span className="text-danger">{errors.name.message}</span>}
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    )
}

export default Create;
