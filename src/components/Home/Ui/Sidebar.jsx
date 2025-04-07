import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND_ROUTE } from '../../../Controllers/Config';

// Import all icons
import homeIcon from '../../../assets/images/icon/home-outline-filled.svg';
import personIcon from '../../../assets/images/icon/person-outline-filled.svg';
import newsIcon from '../../../assets/images/icon/earth-outline-filled.svg';
import eventsIcon from '../../../assets/images/icon/calendar-outline-filled.svg';
import groupsIcon from '../../../assets/images/icon/chat-outline-filled.svg';
import notificationsIcon from '../../../assets/images/icon/notification-outlined-filled.svg';
import settingsIcon from '../../../assets/images/icon/cog-outline-filled.svg';
import placeholderImage from '../../../assets/images/avatar/placeholder.jpg';
// import backgroundImage from '../../../assets/images/bg/01.jpg';

const Sidebar = () => {

  const user = JSON.parse(localStorage.getItem('user')).user;
  const userImg = JSON.parse(user.img)[0];
  const userImgBg = JSON.parse(user.img_bg)[0];

  const navItems = [
    { path: '/feed', icon: homeIcon, label: 'Feed' },
    { path: '/connections', icon: personIcon, label: 'Connections' },
    { path: '/news', icon: newsIcon, label: 'Latest News' },
    { path: '/events', icon: eventsIcon, label: 'Events' },
    { path: '/dashboard/groups', icon: groupsIcon, label: 'Groups' },
    { path: '/notifications', icon: notificationsIcon, label: 'Notifications' },
    { path: '/settings', icon: settingsIcon, label: 'Settings' }
  ];

  const helperLinks = [
    { path: '/about', label: 'About' },
    { path: '/settings', label: 'Settings' },
    { path: 'https://support.webestica.com/login', label: 'Support', external: true },
    { path: '/docs', label: 'Docs', external: true },
    { path: '/help', label: 'Help' },
    { path: '/privacy', label: 'Privacy & terms' }
  ];

  return (
    <div className="col-lg-3">
      {/* Mobile Toggler */}
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

      {/* Sidebar Navigation */}
      <nav className="navbar navbar-expand-lg mx-0">
        <div className="offcanvas offcanvas-start" id="offcanvasSideNavbar">
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close text-reset ms-auto"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body d-block px-2 px-lg-0">
            {/* Profile Card */}
            <div className="card overflow-hidden">
              <div
                className="h-100px"
                style={{
                  backgroundImage: `url(${userImgBg.secure_url ? userImgBg.secure_url : ''})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>

              <div className="card-body pt-0">
                <div className="text-center">
                  <div className="avatar avatar-lg mt-n5 mb-3">
                    <Link to="/profile">
                      <img
                        className="avatar-img rounded border border-white border-3"
                        src={userImg.secure_url ? `${userImg.secure_url}` : placeholderImage}
                        alt={user.name || 'User avatar'}
                      />
                    </Link>
                  </div>

                  <h5 className="mb-0">
                    <Link to="/profile">{user.name || 'Anonymous'}</Link>
                  </h5>
                  <small>{user.title || '-'}</small>
                  <p className="mt-3">{user.bio || ''}</p>

                  <div className="hstack gap-2 gap-xl-3 justify-content-center">
                    <div>
                      <h6 className="mb-0">{user.post_count || 0}</h6>
                      <small>Posts</small>
                    </div>
                    <div className="vr"></div>
                    <div>
                      <h6 className="mb-0">{user.follower_count || 0}</h6>
                      <small>Followers</small>
                    </div>
                    <div className="vr"></div>
                    <div>
                      <h6 className="mb-0">{user.following_count || 0}</h6>
                      <small>Following</small>
                    </div>
                  </div>
                </div>

                <hr />

                {/* Navigation Links */}
                <ul className="nav nav-link-secondary flex-column fw-bold gap-2">
                  {navItems.map((item, index) => (
                    <li className="nav-item" key={index}>
                      <Link className="nav-link" to={item.path}>
                        <img className="me-2 h-20px fa-fw" src={item.icon} alt="" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-footer text-center py-2">
                <Link className="btn btn-link btn-sm" to="/dashboard/info">
                  View Profile
                </Link>
              </div>
            </div>

            {/* Helper Links */}
            <ul className="nav small mt-4 justify-content-center lh-1">
              {helperLinks.map((link, index) => (
                <li className="nav-item" key={index}>
                  {link.external ? (
                    <a className="nav-link" href={link.path} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  ) : (
                    <Link className="nav-link" to={link.path}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <p className="small text-center mt-1">
              ©2024{' '}
              <a
                className="text-reset"
                href="https://www.webestica.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Webestica
              </a>
            </p>
            
          </div>

        </div>
      
      </nav>
    
    </div>
  );

};

export default Sidebar;