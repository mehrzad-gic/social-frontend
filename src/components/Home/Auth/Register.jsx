import React, { useRef, useState } from "react";
import { useNavigate, Link, useLoaderData, redirect } from "react-router-dom";
import { register } from "../../../Controllers/AuthController";
import { registerSchema } from "../../../validations/AuthValidation";
import { toast } from 'react-toastify';
import { success_register } from "../../../Helpers/Messages";
import Loading from "../Ui/Loading"; // Import the Loading component
import { login } from "../../../Helpers/Helpers";
import ErrorMessages from "../../Common/ErrorMessages"; // Import the ErrorMessages component

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
    const [loading, setLoading] = useState(false); // Add loading state

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
        setLoading(true); // Set loading to true

        try {
            await registerSchema.validate(form, { abortEarly: false });
            const res = await register(form); // Await the register call
            if (res.success) {
                toast.success(success_register);
                navigate("/login");
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            if (error.inner) {
                setErrors(error.inner);
            } else {
                setErrors(error.message);
                console.error(error.message);
            }
        } finally {
            setLoading(false); // Set loading to false
        }

        setTimeout(() => {
            setErrors(null);
        }, 4000);
    };

    if (loading) {
        return <Loading />; // Show loading indicator
    }

    return (
        <>
            <main>
                <div className="container">
                    <div className="row justify-content-center align-items-center vh-100 py-5">
                        <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
                            <ErrorMessages errors={errors} /> {/* Use the ErrorMessages component */}
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

export const authLoader = async () => {
  const auth = await login();
  if (auth) {
    toast.info("You are already logged in.");
    return redirect("/");
  }
  return null;
};

export default Register;