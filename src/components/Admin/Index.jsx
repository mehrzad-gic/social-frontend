import React from "react";
import { FaUsers, FaComments, FaHeart, FaBookmark, FaChartLine } from "react-icons/fa";

const AdminDashboard = () => {
  return (
      <div className="container-fluid">
        <div className="row">
          {/* Main Content */}
          <div className="col-12">
            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0">Dashboard Overview</h4>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
              <div className="col-sm-6 col-xl-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="avatar avatar-lg bg-primary bg-opacity-10 rounded">
                          <FaUsers className="text-primary fs-4" />
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6 className="card-title mb-1">Total Users</h6>
                        <h2 className="mb-0">2.4k</h2>
                        <small className="text-success">
                          <FaChartLine className="me-1" /> 12% increase
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="avatar avatar-lg bg-success bg-opacity-10 rounded">
                          <FaComments className="text-success fs-4" />
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6 className="card-title mb-1">Comments</h6>
                        <h2 className="mb-0">1.2k</h2>
                        <small className="text-success">
                          <FaChartLine className="me-1" /> 8% increase
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="avatar avatar-lg bg-warning bg-opacity-10 rounded">
                          <FaHeart className="text-warning fs-4" />
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6 className="card-title mb-1">Likes</h6>
                        <h2 className="mb-0">3.8k</h2>
                        <small className="text-success">
                          <FaChartLine className="me-1" /> 15% increase
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="avatar avatar-lg bg-info bg-opacity-10 rounded">
                          <FaBookmark className="text-info fs-4" />
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6 className="card-title mb-1">Saved Posts</h6>
                        <h2 className="mb-0">856</h2>
                        <small className="text-success">
                          <FaChartLine className="me-1" /> 5% increase
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="row g-4">
              {/* Activity Feed */}
              <div className="col-lg-8">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-transparent border-0">
                    <h5 className="card-title mb-0">Recent Activity</h5>
                  </div>
                  <div className="card-body">
                    <div className="activity-feed">
                      {/* Activity Item */}
                      <div className="d-flex mb-4">
                        <div className="flex-shrink-0">
                          <div className="avatar avatar-md rounded-circle bg-primary bg-opacity-10">
                            <FaUsers className="text-primary" />
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="mb-1">New User Registration</h6>
                          <p className="mb-0 text-muted">John Doe registered as a new user</p>
                          <small className="text-muted">2 hours ago</small>
                        </div>
                      </div>

                      {/* Activity Item */}
                      <div className="d-flex mb-4">
                        <div className="flex-shrink-0">
                          <div className="avatar avatar-md rounded-circle bg-success bg-opacity-10">
                            <FaComments className="text-success" />
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="mb-1">New Comment</h6>
                          <p className="mb-0 text-muted">Jane Smith commented on a post</p>
                          <small className="text-muted">4 hours ago</small>
                        </div>
                      </div>

                      {/* Activity Item */}
                      <div className="d-flex mb-4">
                        <div className="flex-shrink-0">
                          <div className="avatar avatar-md rounded-circle bg-warning bg-opacity-10">
                            <FaHeart className="text-warning" />
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="mb-1">New Like</h6>
                          <p className="mb-0 text-muted">Mike Johnson liked a post</p>
                          <small className="text-muted">6 hours ago</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Posts */}
              <div className="col-lg-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-transparent border-0">
                    <h5 className="card-title mb-0">Recent Posts</h5>
                  </div>
                  <div className="card-body">
                    <div className="recent-posts">
                      {/* Post Item */}
                      <div className="d-flex mb-3">
                        <img src="assets/images/post/01.jpg" className="rounded" width="60" height="60" alt="Post" />
                        <div className="ms-3">
                          <h6 className="mb-1">Beautiful Sunset</h6>
                          <small className="text-muted">2 hours ago</small>
                        </div>
                      </div>

                      {/* Post Item */}
                      <div className="d-flex mb-3">
                        <img src="assets/images/post/02.jpg" className="rounded" width="60" height="60" alt="Post" />
                        <div className="ms-3">
                          <h6 className="mb-1">City Life</h6>
                          <small className="text-muted">4 hours ago</small>
                        </div>
                      </div>

                      {/* Post Item */}
                      <div className="d-flex">
                        <img src="assets/images/post/03.jpg" className="rounded" width="60" height="60" alt="Post" />
                        <div className="ms-3">
                          <h6 className="mb-1">Nature Walk</h6>
                          <small className="text-muted">6 hours ago</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AdminDashboard;