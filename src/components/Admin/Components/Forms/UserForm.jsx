import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaUserTag } from 'react-icons/fa';

const UserForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    email: '',
    password: '',
    role: 'user',
    status: 'active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
      <div className="row g-3">
        {/* Name Field */}
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Full Name</label>
          <div className="input-group">
            <span className="input-group-text">
              <FaUser className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email Address</label>
          <div className="input-group">
            <span className="input-group-text">
              <FaEnvelope className="text-muted" />
            </span>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email address"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-group">
            <span className="input-group-text">
              <FaLock className="text-muted" />
            </span>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!initialData}
              placeholder="Enter password"
            />
          </div>
        </div>

        {/* Role Field */}
        <div className="col-md-6">
          <label htmlFor="role" className="form-label">Role</label>
          <div className="input-group">
            <span className="input-group-text">
              <FaUserTag className="text-muted" />
            </span>
            <select
              className="form-select"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>
        </div>

        {/* Status Field */}
        <div className="col-md-6">
          <label htmlFor="status" className="form-label">Status</label>
          <div className="input-group">
            <span className="input-group-text">
              <FaUser className="text-muted" />
            </span>
            <select
              className="form-select"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            {initialData ? 'Update User' : 'Create User'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm; 