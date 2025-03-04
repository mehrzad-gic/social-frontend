import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../../Controllers/AuthController";
import { registerSchema } from "../../../validations/AuthValidation";
import { login, setLocalStorage } from "../../../Helpers/Helpers";
import { toast } from 'react-toastify';
import { success_register, user_exists } from "../../../Helpers/Messages";

// Register Component
const Register = () => {

    const input = useRef(null);
    const icon = useRef(null);
    const [errors, setErrors] = useState(null);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const navigate = useNavigate();
    const [passwordType, setPasswordType] = useState('password');

    useEffect(() => {
        
        const checkLogin = async () => {
            try {
                const auth = await login(); // Ensure this function is defined and working
                if (auth) {
                    navigate("../"); // Redirect if already logged in
                    toast.info(user_exists);
                }
            } catch (error) {
                console.error("Login check failed:", error);
            }
        };

        checkLogin();

    }, [navigate]);

    const passwordHidden = () => {
        if (passwordType === 'password') {
            input.current.type = 'text';
            icon.current.className = 'fa-solid fa-eye cursor-pointer p-2 w-40px';
            setPasswordType('text');
        } else {
            input.current.type = 'password';
            icon.current.className = 'fa-solid fa-eye-slash cursor-pointer p-2 w-40px';
            setPasswordType('password');
        }
    };

    const inputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const submitForm = async (e) => {

        e.preventDefault();

        try {

            await registerSchema.validate(form, { abortEarly: false });
            
            const res = await register(form); // Await the register call

            console.log(res);
            
        } catch (error) {
            if (error.inner) {
                setErrors(error.inner);
            } else {
                setErrors(error.message);
                console.error(error.message);
            }
        }

        setTimeout(() => {
            setErrors(null);
        }, 4000);
    };

    return (
        <>
                <main>
                    <div className="container">
                        <div className="row justify-content-center align-items-center vh-100 py-5">
                            <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
                                {Array.isArray(errors) ? (
                                    errors.map((err, index) => (
                                        <div key={index} className="alert alert-danger">
                                            <i className="bi bi-exclamation-circle me-2"></i>
                                            {err.message}
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
                                <div className="card card-body text-center p-4 p-sm-5">
                                    <h1 className="mb-2">Register</h1>
                                    <p className="mb-0">
                                        You have an account?
                                        <Link to="/login"> Click here to Login</Link>
                                    </p>
                                    <form onSubmit={submitForm} className="mt-sm-4">
                                        <div className="mb-3 input-group-lg">
                                            <input
                                                type="text"
                                                name="name"
                                                onChange={inputChange}
                                                value={form.name}
                                                className="form-control"
                                                placeholder="Enter your Name"
                                            />
                                        </div>
                                        <div className="mb-3 input-group-lg">
                                            <input
                                                type="email"
                                                name="email"
                                                onChange={inputChange}
                                                value={form.email}
                                                className="form-control"
                                                placeholder="Enter email"
                                            />
                                        </div>
                                        <div className="mb-3 position-relative">
                                            <div className="input-group input-group-lg">
                                                <input
                                                    className="form-control"
                                                    type={passwordType}
                                                    name="password"
                                                    ref={input}
                                                    onChange={inputChange}
                                                    value={form.password}
                                                    placeholder="Enter new password"
                                                />
                                                <span onClick={passwordHidden} className="input-group-text p-0">
                                                    <i ref={icon} className="fa-solid fa-eye-slash cursor-pointer p-2 w-40px"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mb-3 input-group-lg">
                                            <input
                                                type="password"
                                                name="password_confirmation"
                                                onChange={inputChange}
                                                value={form.password_confirmation}
                                                className="form-control"
                                                placeholder="Password confirmation"
                                            />
                                        </div>
                                        <div className="mb-3 d-sm-flex justify-content-between">
                                            <div>
                                                <input type="checkbox" className="form-check-input" id="rememberCheck" />
                                                <label className="form-check-label ms-2" htmlFor="rememberCheck">
                                                    Remember me?
                                                </label>
                                            </div>
                                            <Link to="/forgot-password">Forgot password?</Link>
                                        </div>
                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-lg btn-primary">Register</button>
                                        </div>
                                        <p className="mb-0 mt-3">
                                            ©2024
                                            <Link to={'../'}>Dev on rails</Link>
                                            All rights reserved
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
  
   
        </>
    );
};

export default Register;
