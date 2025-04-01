import React, { useState, useEffect } from 'react';

const Error = ({message}) => {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);
    }, [message]);

    return (
        <div>
            <div className="container mt-5 mb-5">
            {open && (
                <div className="row">
                    <div className="col-md-12">
                        <div className="alert p-3 alert-danger alert-sm d-flex gap-2 align-items-center">
                            <button className='btn btn-sm btn-secondary' onClick={() => setOpen(false)}>✖️</button>
                            <h4>{message}</h4>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};

export default Error;
