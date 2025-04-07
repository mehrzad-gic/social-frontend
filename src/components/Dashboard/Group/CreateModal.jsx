import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { create } from '../../../Controllers/GroupController';
import { useQueryClient } from '@tanstack/react-query';
import FileInput from '../../Home/Ui/FileInput';
import { useOutletContext } from 'react-router-dom'
const CreateModal = () => {

    const queryClient = useQueryClient();
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const [isCreating, setIsCreating] = useState(false);
    const {token} = useOutletContext();
    
    // Initialize Bootstrap modal
    useEffect(() => {
        // Make sure Bootstrap is available
        if (window.bootstrap) {
            const modalElement = document.getElementById('modalCreateGroup');
            if (modalElement) {
                new window.bootstrap.Modal(modalElement);
            }
        }
    }, []);
    
    const onSubmit = async (data) => {
        try {
            setIsCreating(true);
            const response = await create(data, token);
            if(response.success) {
                toast.success(response.message);
                
                // More robust query invalidation
                try {
                    // First invalidate the query
                    await queryClient.invalidateQueries({queryKey: ['groups']});
                    
                    // Then force a refetch to ensure the data is updated
                    await queryClient.refetchQueries({queryKey: ['groups']});
                    
                    console.log('Query invalidated and refetched successfully');
                } catch (queryError) {
                    console.error('Error invalidating query:', queryError);
                }
                
                // Reset form
                reset();
                // Close modal after successful creation
                handleCloseModal();
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

    const handleCloseModal = () => {
        const modalElement = document.getElementById('modalCreateGroup');
        if (modalElement) {
            // Use Bootstrap's modal API to properly close the modal
            const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) {
                modalInstance.hide();
            } else {
                // Fallback if modal instance not found
                modalElement.classList.remove('show');
                modalElement.style.display = 'none';
                document.body.classList.remove('modal-open');
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) {
                    backdrop.remove();
                }
            }
        }
    }
    

    return (
        <div
            className="modal fade"
            id="modalCreateGroup"
            tabIndex="-1"
            aria-labelledby="modalLabelCreateGroup"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalLabelCreateGroup">
                            Create Group
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="modal-body">
                        <form id="createGroupForm" onSubmit={handleSubmit(onSubmit)} className="row g-4">
                            <div className="col-12">
                                <label className="form-label">Group Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter group name"
                                    {...register('name', { required: 'Name is required' })}
                                />
                                {errors.name && <span className="text-danger">{errors.name.message}</span>}
                            </div>

                            {/* slug */}
                            <div className="col-12">
                                <label className="form-label">Slug</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter group slug"
                                    {...register('slug', { maxLength: { value: 255, message: 'Slug must be less than 255 characters' } })}
                                />
                                {errors.slug && <span className="text-danger">{errors.slug.message}</span>}
                            </div>

                            {/* description */}
                            <div className="col-12">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    placeholder="Enter group description"
                                    {...register('des', { required: 'Description is required' })}
                                ></textarea>
                                {errors.des && <span className="text-danger">{errors.des.message}</span>}
                            </div>

                            <div className="col-12">
                                <label className="form-label">Group Type</label>
                                <select
                                    className="form-select"
                                    {...register('type', { required: 'Type is required', valueAsNumber: true })}
                                >
                                    <option value={1}>Public</option>
                                    <option value={0}>Private</option>
                                </select>
                                {errors.type && <span className="text-danger">{errors.type.message}</span>}
                            </div>

                            <div className="col-12">
                                <FileInput
                                    name='img'
                                    label='Group Image'
                                    register={register}
                                    setValue={setValue}
                                    errors={errors}
                                    showDefault={false}
                                />
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button
                          className="btn btn-danger-soft"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            form="createGroupForm"
                            className="btn btn-success-soft"
                            disabled={isCreating}
                        >
                            {isCreating ? 'Creating...' : 'Create Group'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateModal; 