import Sidebar from '../Admin/Ui/Sidebar';
import Navbar from '../Admin/Ui/Navbar';
import Footer from '../Admin/Ui/Footer';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { auth_403 } from "../../Helpers/Messages";
import { useNavigate } from 'react-router-dom';
import { login } from "../../Helpers/Helpers";

// Admin Layout Component
const AdminLayout = () => {


    const navigate = useNavigate();

    useEffect(() => {

        const auth = login();

        console.log(auth);

        if(!auth) {
            
            navigate("../");

            // show user_exists message if user exists
            toast.error(auth_403);
        }

    }, []);    



    return (
    
        <>

        <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
         
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="#">Company name</a>

            <ul className="navbar-nav flex-row d-md-none">
                <li className="nav-item text-nowrap">
                <button className="nav-link px-3 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSearch" aria-controls="navbarSearch" aria-expanded="false" aria-label="Toggle search">
                </button>
                </li>
                <li className="nav-item text-nowrap">
                <button className="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                </button>
                </li>
            </ul>

            <div id="navbarSearch" className="navbar-search w-100 collapse">
                <input className="form-control w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search"></input>
            </div>

        </header> 


        <div className="container-fluid">

            <div className="row">

                <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
              
                    <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                       
                        <div className="offcanvas-header">
                       
                        <h5 className="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
                       
                        </div>
                      
                        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2 active" aria-current="page" href="#">
                                <i className='bi bi-alt text-primary me-1'></i>
                                Dashboard
                            </a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                Orders
                            </a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                Products
                            </a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                Customers
                            </a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                Reports
                            </a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                Integrations
                            </a>
                            </li>
                        </ul>

                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                            <span>Saved reports</span>
                            <a className="link-secondary" href="#" aria-label="Add a new report">
                            </a>
                        </h6>
                        <ul className="nav flex-column mb-auto">
                            <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                Current month
                            </a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                Last quarter
                            </a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                Social engagement
                            </a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                Year-end sale
                            </a>
                            </li>
                        </ul>

                        <hr className="my-3"></hr>

                        <ul className="nav flex-column mb-auto">
                            <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                Settings
                            </a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                Sign out
                            </a>
                            </li>
                        </ul>
                        </div>

                    </div>

                </div>

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Dashboard</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                        <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                    </div>
                    <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">
                        This week
                    </button>
                    </div>
                </div>

                <canvas className="my-4 w-100" id="myChart" width="900" height="380"></canvas>

                <h2>Section title</h2>
                <div className="table-responsive small">
                    <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Header</th>
                        <th scope="col">Header</th>
                        <th scope="col">Header</th>
                        <th scope="col">Header</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1,001</td>
                        <td>random</td>
                        <td>data</td>
                        <td>placeholder</td>
                        <td>text</td>
                        </tr>
                        <tr>
                        <td>1,002</td>
                        <td>placeholder</td>
                        <td>irrelevant</td>
                        <td>visual</td>
                        <td>layout</td>
                        </tr>
                        <tr>
                        <td>1,003</td>
                        <td>data</td>
                        <td>rich</td>
                        <td>dashboard</td>
                        <td>tabular</td>
                        </tr>
                        <tr>
                        <td>1,003</td>
                        <td>information</td>
                        <td>placeholder</td>
                        <td>illustrative</td>
                        <td>data</td>
                        </tr>
                        <tr>
                        <td>1,004</td>
                        <td>text</td>
                        <td>random</td>
                        <td>layout</td>
                        <td>dashboard</td>
                        </tr>
                        <tr>
                        <td>1,005</td>
                        <td>dashboard</td>
                        <td>irrelevant</td>
                        <td>text</td>
                        <td>placeholder</td>
                        </tr>
                        <tr>
                        <td>1,006</td>
                        <td>dashboard</td>
                        <td>illustrative</td>
                        <td>rich</td>
                        <td>data</td>
                        </tr>
                        <tr>
                        <td>1,007</td>
                        <td>placeholder</td>
                        <td>tabular</td>
                        <td>information</td>
                        <td>irrelevant</td>
                        </tr>
                        <tr>
                        <td>1,008</td>
                        <td>random</td>
                        <td>data</td>
                        <td>placeholder</td>
                        <td>text</td>
                        </tr>
                        <tr>
                        <td>1,009</td>
                        <td>placeholder</td>
                        <td>irrelevant</td>
                        <td>visual</td>
                        <td>layout</td>
                        </tr>
                        <tr>
                        <td>1,010</td>
                        <td>data</td>
                        <td>rich</td>
                        <td>dashboard</td>
                        <td>tabular</td>
                        </tr>
                        <tr>
                        <td>1,011</td>
                        <td>information</td>
                        <td>placeholder</td>
                        <td>illustrative</td>
                        <td>data</td>
                        </tr>
                        <tr>
                        <td>1,012</td>
                        <td>text</td>
                        <td>placeholder</td>
                        <td>layout</td>
                        <td>dashboard</td>
                        </tr>
                        <tr>
                        <td>1,013</td>
                        <td>dashboard</td>
                        <td>irrelevant</td>
                        <td>text</td>
                        <td>visual</td>
                        </tr>
                        <tr>
                        <td>1,014</td>
                        <td>dashboard</td>
                        <td>illustrative</td>
                        <td>rich</td>
                        <td>data</td>
                        </tr>
                        <tr>
                        <td>1,015</td>
                        <td>random</td>
                        <td>tabular</td>
                        <td>information</td>
                        <td>text</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </main>

            </div>

        </div>

        </>
    
    )

};

export default AdminLayout;