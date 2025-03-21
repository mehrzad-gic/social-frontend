import React from 'react'
import { useNavigate, Link ,useParams } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { checkOTPForgotPasswordSchema } from '../../../validations/AuthValidation.js'
import { confirmResetPassword } from '../../../Controllers/AuthController.js'  


export default function CheckOtpForgotPassword() {

    const navigate = useNavigate();
    const [form, setForm] = useState({ token: '', password: '', password_confirmation: '' });
    const [loading, setLoading] = useState(false);
    const { email } = useParams();
    const inputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const submitForm = async (e) => {

        e.preventDefault();
    
        try {

            setLoading(true);

            await checkOTPForgotPasswordSchema.validate(form, { abortEarly: false });

            const res = await confirmResetPassword({...form, email: email});

            console.log(res);

            if (res.success == true) {
                toast.success(res.message);
                navigate('/login');
            } else {
                toast.error(res.message);
            }

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
                            <h1 className="mb-2">Reset Password</h1>
                            <p className="mb-0">
                                Don't have an account ?
                                <Link to="/register"> Sign Up</Link>
                            </p>
                            <form onSubmit={submitForm} className="mt-sm-4">

                                {/* Code Input */}
                                <div className="mb-3 input-group-lg">
                                    <input 
                                        type="text" 
                                        name="token" 
                                        onChange={inputChange} 
                                        value={form.token} 
                                        className="form-control" 
                                        placeholder="Enter the OTP Code"
                                        required
                                    />
                                </div>
                                {/* Password Input */}
                                <div className="mb-3 input-group-lg">
                                    <input 
                                        type="password" 
                                        name="password"
                                        onChange={inputChange}
                                        value={form.password}
                                        className="form-control"
                                        placeholder="Enter your new password"
                                        required
                                    />
                                </div>
                                {/* Password Confirmation Input */}
                                <div className="mb-3 input-group-lg">
                                    <input 
                                        type="password" 
                                        name="password_confirmation"
                                        onChange={inputChange}
                                        value={form.password_confirmation}
                                        className="form-control"
                                        placeholder="Confirm your new password"
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" disabled={loading} className="btn btn-lg btn-primary">Reset Password</button>
                                </div>
                                <p className="mt-3 mb-0">
                                    <Link to="/login">Back to Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
