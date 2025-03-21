import React, { useRef, useState, useEffect } from "react";  
import { useNavigate, Link } from "react-router-dom";  
import { forgotPassword } from "../../../Controllers/AuthController";  
import { toast } from 'react-toastify';  
import { forgotPasswordSchema } from "../../../validations/AuthValidation";


const ForgotPassword = () => {  
    
    const [form, setForm] = useState({ email: '' });  
    const [loading, setLoading] = useState(false);  
    const navigate = useNavigate();  


    const inputChange = (e) => {  
        setForm({ ...form, [e.target.name]: e.target.value });  
    };  

    const submitForm = async (e) => { 

        e.preventDefault();  

        try {  

            setLoading(true);
            await forgotPasswordSchema.validate(form, { abortEarly: false });

            const res = await forgotPassword(form);

            if (res.success === false) toast.error(res.message);
            
            toast.success(res.message);

            navigate(`/check-forgot-password/${form.email}`);

        } catch (error) {  
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    };

    return (  
        <main>  
            <div className="container">  
                <div className="row justify-content-center align-items-center vh-100 py-5">  
                    <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">  

                        <div className="card card-body text-center p-4 p-sm-5">  
                            <h1 className="mb-2">Forgot Password</h1>  
                            <p className="mb-0">  
                                Don't have an account ?  
                                <Link to="/register"> Sign Up</Link>  
                            </p>  
                            <form onSubmit={submitForm} className="mt-sm-4">  
                                <div className="mb-3 input-group-lg">  
                                    <input   
                                        type="email"   
                                        name="email"   
                                        onChange={inputChange}   
                                        value={form.email}   
                                        className="form-control"   
                                        placeholder="Enter your Email Address"   
                                        required   
                                    />  
                                </div>  
                                <div className="d-grid">  
                                    <button type="submit" onClick={submitForm} disabled={loading}  className="btn btn-lg btn-primary">
                                        {loading ? 'submitting...' : 'Send Reset Password Email'}
                                    </button>  
                                </div>  
                                    <p className="mb-0 mt-3">  
                                    ©2024  
                                    <Link className="me-2 ms-2" to={'../'}> Dev on Rails</Link>  
                                    All rights reserved  
                                </p>  
                            </form>  
                        </div>  
                    </div>  
                </div>  
            </div>  
        </main>  
    );  
};  

export default ForgotPassword;