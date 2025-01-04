import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { BACKEND_ROUTE } from "../../../Controllers/Config";


// Index Sidebar
const Sidebar = () => {

    const [user,setUser] = useState({});

    useEffect(() => {  

        const storage = JSON.parse(localStorage.getItem('user'));
        
        setUser(storage.value.user)

    }, []); 


    return (

        <>
        <div className="col-lg-3">
            {/*Advanced filter responsive toggler START */}
            <div className="d-flex align-items-center d-lg-none">
            <button
                className="border-0 bg-transparent"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasSideNavbar"
                aria-controls="offcanvasSideNavbar"
            >
                <span className="btn btn-primary">
                <i className="fa-solid fa-sliders-h"></i>
                </span>
                <span className="h6 mb-0 fw-bold d-lg-none ms-2">My profile</span>
            </button>
            </div>
            {/*Advanced filter responsive toggler END */}

            {/*Navbar START*/}
            <nav className="navbar navbar-expand-lg mx-0">
            <div className="offcanvas offcanvas-start" id="offcanvasSideNavbar">
                {/*Offcanvas header */}
                <div className="offcanvas-header">
                <button
                    type="button"
                    className="btn-close text-reset ms-auto"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
                </div>

                {/*Offcanvas body */}
                <div className="offcanvas-body d-block px-2 px-lg-0">
                {/*Card START */}
                <div className="card overflow-hidden">
                    {/*Cover image */}
                    <div
                    className="h-50px"
                    style={{
                        backgroundImage: "url(assets/images/bg/01.jpg)",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}
                    ></div>
                    {/*Card body START */}
                    <div className="card-body pt-0">
                    <div className="text-center">
                        {/*Avatar */}
                        <div className="avatar avatar-lg mt-n5 mb-3">
                        <Link to="#!">
                            <img
                            className="avatar-img rounded border border-white border-3"
                            src={
                                user.img
                                ? `${BACKEND_ROUTE}/${user.img}`
                                : "assets/images/avatar/placeholder.jpg"
                            }
                            alt=""
                            ></img>
                        </Link>
                        </div>
                        {/*Info */}
                        <h5 className="mb-0">
                        <Link to="#!">{user.name}</Link>
                        </h5>
                        <small>{user.title ? user.tile : '-'}</small>

                        {/*User stat START */}
                        <div className="hstack gap-2 gap-xl-3 justify-content-center">
                        {/*User stat item */}
                        <div>
                        <h6 className="mb-0">{user.post_count}</h6>
                        <small>Post</small>
                        </div>
                        {/*Divider */}
                        <div className="vr"></div>
                        {/*User stat item */}
                        <div>
                            <h6 className="mb-0">{user.follower_count}</h6>
                            <small>Followers</small>
                        </div>
                        {/*Divider */}
                        <div className="vr"></div>
                        {/*User stat item */}
                        <div>
                        <h6 className="mb-0">{user.following_count}</h6>
                        <small>Following</small>
                        </div>
                        </div>
                        {/*User stat END */}
                    </div>

                    {/*Divider */}
                    <hr></hr>

                    {/*Side Nav START */}
                    <ul className="nav nav-link-secondary flex-column fw-bold gap-2">
                        <li className="nav-item">
                        <Link className="nav-link" to="my-profile.html">
                            <img
                            className="me-2 h-20px fa-fw"
                            src="assets/images/icon/home-outline-filled.svg"
                            alt=""
                            ></img>
                            <span>Feed </span>
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link
                            className="nav-link"
                            to="my-profile-connections.html"
                        >
                            <img
                            className="me-2 h-20px fa-fw"
                            src="assets/images/icon/person-outline-filled.svg"
                            alt=""
                            ></img>
                            <span>Connections </span>
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="blog.html">
                            <img
                            className="me-2 h-20px fa-fw"
                            src="assets/images/icon/earth-outline-filled.svg"
                            alt=""
                            ></img>
                            <span>Latest News </span>
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="events.html">
                            <img
                            className="me-2 h-20px fa-fw"
                            src="assets/images/icon/calendar-outline-filled.svg"
                            alt=""
                            ></img>
                            <span>Events </span>
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="groups.html">
                            <img
                            className="me-2 h-20px fa-fw"
                            src="assets/images/icon/chat-outline-filled.svg"
                            alt=""
                            ></img>
                            <span>Groups </span>
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="notifications.html">
                            <img
                            className="me-2 h-20px fa-fw"
                            src="assets/images/icon/notification-outlined-filled.svg"
                            alt=""
                            ></img>
                            <span>Notifications </span>
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="settings.html">
                            <img
                            className="me-2 h-20px fa-fw"
                            src="assets/images/icon/cog-outline-filled.svg"
                            alt=""
                            ></img>
                            <span>Settings </span>
                        </Link>
                        </li>
                    </ul>
                    {/*Side Nav END */}
                    </div>
                    {/*Card body END */}
                    {/*Card footer */}
                    <div className="card-footer text-center py-2">
                    <Link className="btn btn-link btn-sm" to="my-profile.html">
                        View Profile
                    </Link>
                    </div>
                </div>
                {/*Card END */}

                {/*Helper link START */}
                <ul className="nav small mt-4 justify-content-center lh-1">
                    <li className="nav-item">
                    <Link className="nav-link" to="my-profile-about.html">
                        About
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="settings.html">
                        Settings
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link
                        className="nav-link"
                        target="_blank"
                        to="https://support.webestica.com/login"
                    >
                        Support
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link
                        className="nav-link"
                        target="_blank"
                        to="docs/index.html"
                    >
                        Docs
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="help.html">
                        Help
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="privacy-and-terms.html">
                        Privacy & terms
                    </Link>
                    </li>
                </ul>
                {/*Helper link END */}
                {/*Copyright */}
                <p className="small text-center mt-1">
                    ©2024
                    <Link
                    className="text-reset"
                    target="_blank"
                    to="https://www.webestica.com/"
                    >
                    Webestica
                    </Link>
                </p>
                </div>
            </div>
            </nav>
            {/*Navbar END*/}
        </div>
        </>

    );

};

export default Sidebar;
