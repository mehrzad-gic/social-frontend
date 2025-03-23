import React, { useRef, useState, useEffect } from "react";
import {useNavigate, Link, useParams } from "react-router-dom";
import { loginUser } from "../../../Controllers/AuthController";
import { loginSchema } from "../../../validations/AuthValidation";
import { setLocalStorage } from "../../../Helpers/Helpers";
import { toast } from 'react-toastify';
import { invalid_login, success_login } from "../../../Helpers/Messages";
import ErrorMessages from "../Ui/ErrorMessages"; // Import the ErrorMessages component
import Loading from "../Ui/Loading";
import { checkOTP, sendOTP } from "../../../Controllers/AuthController";


const CheckOtp = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({ code: '' });
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const icon = useRef(null);
    const [timer, setTimer] = useState(120);
    const { email } = useParams();
    const inputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);
            const res = await checkOTP({...form, email: email});
            console.log(res);
            if(res.success == true) {
                setLocalStorage('user', res.token, 2, res.user);
                toast.success(res.message);
                navigate('/');
            } else {
                toast.error(res.message);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    };

    const resendOtp = async () => {

        try {

            setLoading(true);
            setTimer(120);
            const formData = {
                ...form,
                email: email
            }
            const res = await sendOTP(formData);
            console.log(res);
            if(res.success) toast.success(res.message);
            else toast.error(res.message);
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    };


    useEffect(() => {

        const timerInterval = setInterval(() => setTimer(timer - 1), 1000); 
        return () => clearInterval(timerInterval);

    }, [timer]);

    return (

        <main>
            <div className="container">
                <div className="row justify-content-center align-items-center vh-100 py-5">
                    <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
                        <ErrorMessages errors={errors} /> {/* Use the ErrorMessages component */}
                        <div className="card card-body text-center p-4 p-sm-5">
                            <h1 className="mb-2">Check OTP</h1>

                            <form onSubmit={submitForm} className="mt-sm-4">
                                <div className="mb-3 input-group-lg">
                                    <input
                                        type="text"
                                        name="code"
                                        onChange={inputChange}
                                        value={form.code}
                                        className="form-control"
                                        placeholder="Enter your OTP"
                                        required
                                    />
                                </div>

                                <div className="d-grid">
                                    <button type="submit" disabled={loading} className="btn btn-lg btn-primary">{loading ? 'submitting...' : 'Check OTP'}</button>
                                </div>
                                <div className="d-flex justify-content-between flex-wrap">
                                    <p className="mb-0 mt-3">
                                        ©2024
                                        <Link className="me-2 ms-2" to={'../'}> Dev on Rails</Link>
                                        All rights reserved
                                    </p>
                                    {timer > 0 ? (
                                        <p className="mb-0 mt-3">
                                            Resend OTP in {timer}  seconds
                                        </p>
                                    ) : (
                                        <p className="mb-0 mt-3">
                                            <button className="btn btn-link" onClick={resendOtp}>
                                                {loading ? 'submitting...' : 'Resend OTP'}
                                            </button>
                                        </p>
                                    )} 
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    );

};

export default CheckOtp;