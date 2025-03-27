import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { FaHome, FaUser, FaUsers, FaComments, FaCog, FaSignOutAlt, FaBars, FaTimes, FaBell, FaEnvelope, FaChevronDown, FaChevronRight, FaTachometerAlt, FaUserShield, FaDatabase, FaChartLine, FaCogs, FaUserCircle, FaBellSlash, FaSun, FaMoon, FaFileAlt, FaNewspaper, FaCommentDots, FaTags, FaFolder, FaImages, FaFileWord, FaUserPlus, FaUserCog, FaUserLock, FaChartPie, FaChartBar, FaFileArchive, FaWrench, FaShieldAlt, FaEnvelopeOpen, FaKey, FaWatchmanMonitoring, FaReact } from 'react-icons/fa';
import './AdminLayout.css';

const AdminLayout = () => {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('admin-theme') || 'light');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New User Registration', time: '5 minutes ago', read: false },
    { id: 2, title: 'System Update Available', time: '1 hour ago', read: false },
    { id: 3, title: 'Database Backup Complete', time: '2 hours ago', read: true }
  ]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Apply theme to the admin dashboard container
    const adminDashboard = document.querySelector('.admin-dashboard');
    if (adminDashboard) {
      adminDashboard.setAttribute('data-theme', theme);
      document.body.setAttribute('data-theme', theme);
    }
    localStorage.setItem('admin-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const toggleDropdown = (menuId) => {
    setActiveDropdown(activeDropdown === menuId ? null : menuId);
  };

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <FaTachometerAlt className='text-info' />,
      path: '/admin',
      subItems: []
    },
    {
      id: 'users',
      title: 'User Management',
      icon: <FaUserShield  className='text-success'/>,
      path: '/admin/users',
      subItems: [
        { 
          title: 'All Users', 
          path: '/admin/users',
          icon: <FaUsers />
        },
        { 
          title: 'Add User', 
          path: '/admin/users/add',
          icon: <FaUserPlus />
        },
        { 
          title: 'User Roles', 
          path: '/admin/users/roles',
          icon: <FaUserCog />
        },
        { 
          title: 'User Permissions', 
          path: '/admin/users/permissions',
          icon: <FaUserLock/>
        }
      ]
    },
    {
      id: 'content',
      title: 'Content',
      icon: <FaFileAlt className="text-success"/>,
      path: '/admin/content',
      subItems: [
        { 
          title: 'Posts', 
          path: '/admin/content/posts',
          icon: <FaNewspaper />
        },
        { 
          title: 'Comments', 
          path: '/admin/content/comments',
          icon: <FaCommentDots/>
        },
        { 
          title: 'Tags', 
          path: '/admin/content/tags',
          icon: <FaTags />
        },
        { 
          title: 'Categories', 
          path: '/admin/content/categories',
          icon: <FaFolder />
        },
        { 
          title: 'Media', 
          path: '/admin/content/media',
          icon: <FaImages />
        },
        { 
          title: 'Pages', 
          path: '/admin/content/pages',
          icon: <FaFileWord />
        },
        { 
          title: 'Reports', 
          path: '/admin/content/reports',
          icon: <FaReact />
        },
        { 
          title: 'Rejects', 
          path: '/admin/content/rejects',
          icon: <FaReact />
        },
        {
          title: 'FaqCategory', 
          path: '/admin/content/faq-categories',
          icon: <FaReact />
        }
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics',
      icon: <FaChartLine className='text-primary' />,
      path: '/admin/analytics',
      subItems: [
        { 
          title: 'Overview', 
          path: '/admin/analytics',
          icon: <FaChartPie />
        },
        { 
          title: 'User Analytics', 
          path: '/admin/analytics/users',
          icon: <FaChartBar />
        },
        { 
          title: 'Content Analytics', 
          path: '/admin/analytics/content',
          icon: <FaFileAlt />
        },
        { 
          title: 'Reports', 
          path: '/admin/analytics/reports',
          icon: <FaFileArchive />
        }
      ]
    },
    {
      id: 'database',
      title: 'Database',
      icon: <FaDatabase className='text-danger' />,
      path: '/admin/database',
      subItems: [
        { 
          title: 'Backups', 
          path: '/admin/database/backups',
          icon: <FaFileArchive />
        },
        { 
          title: 'Restore', 
          path: '/admin/database/restore',
          icon: <FaFileAlt />
        },
        { 
          title: 'Optimization', 
          path: '/admin/database/optimize',
          icon: <FaWrench />
        }
      ]
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <FaCogs className='text-warning' />,
      path: '/admin/settings',
      subItems: [
        { 
          title: 'General', 
          path: '/admin/settings',
          icon: <FaCog />
        },
        { 
          title: 'Security', 
          path: '/admin/settings/security',
          icon: <FaShieldAlt />
        },
        { 
          title: 'Email', 
          path: '/admin/settings/email',
          icon: <FaEnvelopeOpen />
        },
        { 
          title: 'API', 
          path: '/admin/settings/api',
          icon: <FaKey />
        }
      ]
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="admin-dashboard" data-theme={theme}>
      {/* Navbar */}
      <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container-fluid px-3">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-link text-decoration-none me-2 d-lg-none"
              onClick={toggleMobileSidebar}
              style={{ color: 'var(--admin-text-primary)' }}
            >
              {isMobileSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
            <button
              className="btn btn-link text-decoration-none me-2 d-none d-lg-block"
              onClick={toggleSidebar}
              style={{ color: 'var(--admin-text-primary)' }}
            >
              {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
            <Link className="navbar-brand" to="/admin">
              Admin Panel
            </Link>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? <FaMoon className="fs-5" /> : <FaSun className="fs-5" />}
            </button>
            <div className="dropdown">
              <button className="btn btn-link position-relative p-2" type="button" id="notificationsDropdown" data-bs-toggle="dropdown">
                <FaBell className="fs-5" />
                {unreadNotifications > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                <div className="p-3 border-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">Notifications</h6>
                    <button className="btn btn-link btn-sm text-decoration-none">Mark all as read</button>
                  </div>
                </div>
                <div className="notifications-list">
                  {notifications.map(notification => (
                    <div key={notification.id} className={`notification-item ${!notification.read ? 'unread' : ''}`}>
                      <div className="d-flex flex-column">
                        <h6 className="mb-1">{notification.title}</h6>
                        <small className="text-muted">{notification.time}</small>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 text-center border-top">
                  <Link to="/admin/notifications" className="btn btn-link btn-sm text-decoration-none">
                    View all notifications
                  </Link>
                </div>
              </div>
            </div>
            <div className="dropdown">
              <button className="btn btn-link d-flex align-items-center gap-2 p-2" type="button" id="userDropdown" data-bs-toggle="dropdown">
                <div className="avatar">
                  <FaUserCircle className="fs-4" />
                </div>
                <span className="d-none d-md-inline">Admin User</span>
                <FaChevronDown className="ms-1" />
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                <div className="p-3 border-bottom">
                  <div className="d-flex align-items-center gap-3">
                    <div className="avatar">
                      <FaUserCircle className="fs-1" />
                    </div>
                    <div>
                      <h6 className="mb-0">Admin User</h6>
                      <small className="text-muted">admin@example.com</small>
                    </div>
                  </div>
                </div>
                <Link to="/admin/profile" className="dropdown-item d-flex align-items-center gap-2">
                  <FaUser /> Profile
                </Link>
                <Link to="/admin/settings" className="dropdown-item d-flex align-items-center gap-2">
                  <FaCog /> Settings
                </Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item text-danger d-flex align-items-center gap-2" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''} ${isMobileSidebarOpen ? 'mobile-open' : ''}`}>
        <div className="p-3">
          <ul className="nav flex-column gap-1">
            {menuItems.map((item) => (
              <li className="nav-item" key={item.id}>
                {item.subItems.length > 0 ? (
                  <>
                    <button
                      className={`nav-link w-100 text-start d-flex align-items-center gap-2 ${activeDropdown === item.id ? 'active' : ''}`}
                      onClick={() => toggleDropdown(item.id)}
                    >
                      {item.icon}
                      {isSidebarOpen && (
                        <>
                          <span>{item.title}</span>
                          {activeDropdown === item.id ? (
                            <FaChevronDown className="ms-auto" />
                          ) : (
                            <FaChevronRight className="ms-auto" />
                          )}
                        </>
                      )}
                    </button>
                    {isSidebarOpen && activeDropdown === item.id && (
                      <ul className="nav flex-column ms-3 mt-1">
                        {item.subItems.map((subItem) => (
                          <li className="nav-item" key={subItem.path}>
                            <Link
                              className={`nav-link py-2 d-flex align-items-center gap-2 ${location.pathname === subItem.path ? 'active' : ''}`}
                              to={subItem.path}
                              onClick={() => setIsMobileSidebarOpen(false)}
                            >
                              {subItem.icon}
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    className={`nav-link d-flex align-items-center gap-2 ${location.pathname === item.path ? 'active' : ''}`}
                    to={item.path}
                    onClick={() => setIsMobileSidebarOpen(false)}
                  >
                    {item.icon}
                    {isSidebarOpen && <span>{item.title}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`admin-main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="container-fluid px-3 py-3">
          <div className="content-wrapper">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout; 