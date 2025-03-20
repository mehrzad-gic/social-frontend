import React, { useRef, useState, useEffect } from "react";
import {useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../../Controllers/AuthController";
import { loginSchema } from "../../../validations/AuthValidation";
import { setLocalStorage } from "../../../Helpers/Helpers";
import { toast } from 'react-toastify';
import { invalid_login, success_login } from "../../../Helpers/Messages";
import ErrorMessages from "../../Common/ErrorMessages"; // Import the ErrorMessages component
import Loading from "../Ui/Loading";

const CheckOtp = () => {

    const [form, setForm] = useState({ email: '', code: '' });
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const icon = useRef(null);
    const navigate = useNavigate();


    const inputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {

        e.preventDefault();
        setLoading(true); // Set loading to true

        try {

        } catch (error) {
            console.log(error);
        }

    };


    return (

        <main>
            <div className="container">
                <div className="row justify-content-center align-items-center vh-100 py-5">
                    <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
                        <ErrorMessages errors={errors} /> {/* Use the ErrorMessages component */}
                        <div className="card card-body text-center p-4 p-sm-5">
                            <h1 className="mb-2">Login</h1>
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
                                <div className="mb-3 position-relative">
                                    <div className="input-group input-group-lg">
                                        <input
                                            className="form-control"
                                            type={passwordType}
                                            name="password"
                                            onChange={inputChange}
                                            value={form.password}
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <span onClick={passwordHidden} className="input-group-text p-0">
                                            <i ref={icon} className="fa-solid fa-eye-slash p-2 cursor-pointer"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" disabled={loading} className="btn btn-lg btn-primary">{loading ? 'submitting...' : 'Check OTP'}</button>
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

export default CheckOtp;