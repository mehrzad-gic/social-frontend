import React, { useRef, useState, useEffect } from "react";  
import { useNavigate, Link } from "react-router-dom";  
import { loginUser } from "../../../Controllers/AuthController";  
import { loginSchema } from "../../../validations/AuthValidation";  
import { login, setLocalStorage } from "../../../Helpers/Helpers";  
import { toast } from 'react-toastify';  
import { invalid_login, success_login } from "../../../Helpers/Messages";  
import ThemeSwitcher from "../../Layouts/ThemeSwitcher";


const Login = () => {  
    
    const [form, setForm] = useState({ email: '', password: '' });  
    const [errors, setErrors] = useState(null);  
    const [loading, setLoading] = useState(true);  
    const [passwordType, setPasswordType] = useState('password');  
    const icon = useRef(null);  
    const navigate = useNavigate();  

    useEffect(() => {  
        
        const checkLogin = async () => {  
        
            const isLoggedIn = await login(); // Assume this checks if the user is logged in  
        
            setLoading(false);  
            
            if (isLoggedIn) {  
                navigate("../");  
                toast.info("You are already logged in.");  
            }  
        
        };  

        checkLogin();  

    }, [navigate]);  

    const passwordHidden = () => {  
        setPasswordType(prevType => prevType === 'password' ? 'text' : 'password');  
        icon.current.className = passwordType === 'password'   
            ? 'fa-solid fa-eye cursor-pointer p-2'  
            : 'fa-solid fa-eye-slash cursor-pointer p-2';  
    };  

    const inputChange = (e) => {  
        setForm({ ...form, [e.target.name]: e.target.value });  
    };  

    const submitForm = async (e) => {  

        e.preventDefault();  

        try {  
        
            await loginSchema.validate(form, { abortEarly: false });  
            console.log(form);

            const res = await loginUser(form);  

            console.log(res);
            
            if (res.res === 'error') {  
                toast.error(invalid_login);  
            } else {                  
                setLocalStorage("user", res.data, 21);  
                navigate('../');  
                toast.success(success_login);  
            }  
        
        } catch (error) {  
        
            if (error.inner) {  
                setErrors(error.inner);  
            } else {  
                setErrors(error.message);  
            }  
        
        }  

        setTimeout(() => {  
            setErrors(null);  
        }, 4000);  
    };  

    if (loading) return null; // Render nothing or a loading spinner while loading  

    return (  
        <main>  
            <ThemeSwitcher />
            <div className="container">  
                <div className="row justify-content-center align-items-center vh-100 py-5">  
                    <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">  
                        {errors && Array.isArray(errors) ? (  
                            errors.map((err, index) => (  
                                <div key={index} className="alert alert-danger">  
                                    <i className="bi bi-exclamation-circle me-2"></i>  
                                    {err.message}  
                                </div>  
                            ))  
                        ) : (  
                            errors && (  
                                <div className="alert alert-danger">  
                                    <i className="bi bi-exclamation-circle me-2"></i>  
                                    {errors}  
                                </div>  
                            )  
                        )}  
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
                                    <button type="submit" className="btn btn-lg btn-primary">Login</button>  
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

export default Login;