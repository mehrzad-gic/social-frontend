// src/components/Home/Ui/FileInput.jsx
import React, { useState, useEffect } from 'react';

const FileInput = ({ 
    label, 
    name, 
    register, 
    setValue, 
    errors, 
    defaultImage, 
    accept = "image/*",
    showDefault = true
}) => {

    const [preview, setPreview] = useState(null);


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValue(name, file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveFile = () => {
        setValue(name, null);
        setPreview(null);
    }

    return (
        <div className='mb-3'>
            <label htmlFor={name} className='form-label'>{label}</label>
            <input type='file' accept={accept} onChange={handleFileChange} className='form-control' />
            <div className='mt-2 row'>
                {showDefault ? (<>
                <div className='col-md-6'>
                    {defaultImage && <img src={defaultImage} alt={label} style={{ maxHeight: '200px', objectFit: 'cover' , height: '200px', width: '100%', filter: preview ? 'blur(10px)' : 'none' }} className='img-thumbnail' />}
                </div>
                <div className='col-md-6'>
                    {preview && (
                        <>
                            <img src={preview} alt={label} style={{ maxHeight: '200px', objectFit: 'cover' , height: '200px', width: '100%' }} className='img-thumbnail' />
                            {/* remove button */}
                            <p className='btn btn-secondary btn-sm mt-1' onClick={() => handleRemoveFile()}>❌</p>
                        </>
                    )}

                </div>
                </>
                ) : (
                    <div className='col-md-12'>
                        {preview && <img src={preview} alt={label} style={{ maxHeight: '200px', objectFit: 'cover' , height: '200px', width: '100%' }} className='img-thumbnail' />}
                    </div>
                )}
            </div>
            {errors[name] && <div className='text-danger'>{errors[name].message}</div>}
        </div>
    );
};

export default FileInput;