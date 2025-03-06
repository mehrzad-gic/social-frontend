import React from 'react';

const ErrorMessages = ({ errors }) => {
    if (!errors) return null;

    return (
        <>
            {Array.isArray(errors) ? (
                errors.map((err, index) => (
                    <div key={index} className="alert alert-danger">
                        <i className="bi bi-exclamation-circle me-2"></i>
                        {err}
                    </div>
                ))
            ) : typeof errors === "string" ? (
                <div className="alert alert-danger">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    {errors}
                </div>
            ) : typeof errors === 'object' && errors !== null ? (
                Object.keys(errors).map((key, index) => (
                    <div key={index} className="alert alert-danger">
                        <i className="bi bi-exclamation-circle me-2"></i>
                        {errors[key]}
                    </div>
                ))
            ) : null}
        </>
    );
};

export default ErrorMessages;