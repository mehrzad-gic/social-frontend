import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTag, FaChartLine } from 'react-icons/fa';
import DataTable from '../Components/Tables/DataTable';
import AdminModal from '../Components/Modals/AdminModal';
import ConfirmModal from '../Components/Modals/ConfirmModal';
import StatsCard from '../Components/Cards/StatsCard';

const Tags = () => {
  // State management
  const [tags, setTags] = useState([
    { id: 1, name: 'Technology', posts: 45, followers: 1200, status: 'active' },
    { id: 2, name: 'Travel', posts: 32, followers: 850, status: 'active' },
    { id: 3, name: 'Food', posts: 28, followers: 650, status: 'inactive' },
    { id: 4, name: 'Fashion', posts: 56, followers: 2100, status: 'active' },
    { id: 5, name: 'Sports', posts: 41, followers: 980, status: 'active' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [loading, setLoading] = useState(false);

  // Handlers
  const handleSort = (field, direction) => {
    setSortField(field);
    setSortDirection(direction);
    // Implement sorting logic here
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Implement search logic here
  };

  const handleEdit = (tag) => {
    setSelectedTag(tag);
    setShowModal(true);
  };

  const handleDeleteClick = (tag) => {
    setSelectedTag(tag);
    setShowConfirmModal(true);
  };

  const handleDelete = () => {
    // Implement delete logic here
    setTags(tags.filter(tag => tag.id !== selectedTag.id));
  };

  const handleSubmit = (formData) => {
    if (selectedTag) {
      // Update existing tag
      setTags(tags.map(tag =>
        tag.id === selectedTag.id ? { ...tag, ...formData } : tag
      ));
    } else {
      // Create new tag
      const newTag = {
        id: tags.length + 1,
        ...formData,
        posts: 0,
        followers: 0,
      };
      setTags([...tags, newTag]);
    }
    setShowModal(false);
    setSelectedTag(null);
  };

  // Table columns configuration
  const columns = [
    { field: 'name', label: 'Name', sortable: true },
    { field: 'posts', label: 'Posts', sortable: true },
    { field: 'followers', label: 'Followers', sortable: true },
    {
      field: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <span className={`badge bg-${value === 'active' ? 'success' : 'danger'}`}>
          {value}
        </span>
      ),
    },
  ];

  // Table actions configuration
  const actions = [
    {
      icon: <FaEdit />,
      onClick: handleEdit,
      className: 'btn-outline-primary',
    },
    {
      icon: <FaTrash />,
      onClick: handleDeleteClick,
      className: 'btn-outline-danger',
    },
  ];

  // Stats data
  const stats = [
    {
      title: 'Total Tags',
      value: tags.length.toString(),
      icon: <FaTag className="fs-4" />,
      trend: 'increase',
      trendValue: 5,
      trendIcon: <FaChartLine />,
      color: 'primary',
    },
    {
      title: 'Active Tags',
      value: tags.filter(tag => tag.status === 'active').length.toString(),
      icon: <FaTag className="fs-4" />,
      trend: 'increase',
      trendValue: 3,
      trendIcon: <FaChartLine />,
      color: 'success',
    },
    {
      title: 'Total Posts',
      value: tags.reduce((sum, tag) => sum + tag.posts, 0).toString(),
      icon: <FaTag className="fs-4" />,
      trend: 'increase',
      trendValue: 8,
      trendIcon: <FaChartLine />,
      color: 'info',
    },
    {
      title: 'Total Followers',
      value: tags.reduce((sum, tag) => sum + tag.followers, 0).toString(),
      icon: <FaTag className="fs-4" />,
      trend: 'increase',
      trendValue: 12,
      trendIcon: <FaChartLine />,
      color: 'warning',
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          {/* Page Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">Tags Management</h4>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSelectedTag(null);
                setShowModal(true);
              }}
            >
              <FaPlus className="me-2" />
              Add New Tag
            </button>
          </div>

          {/* Stats Cards */}
          <div className="row g-4 mb-4">
            {stats.map((stat, index) => (
              <div key={index} className="col-sm-6 col-xl-3">
                <StatsCard {...stat} />
              </div>
            ))}
          </div>

          {/* Tags Table */}
          <DataTable
            columns={columns}
            data={tags}
            onSort={handleSort}
            onSearch={handleSearch}
            sortField={sortField}
            sortDirection={sortDirection}
            searchTerm={searchTerm}
            actions={actions}
            loading={loading}
          />
        </div>
      </div>

      {/* Add/Edit Tag Modal */}
      <AdminModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedTag(null);
        }}
        title={selectedTag ? 'Edit Tag' : 'Add New Tag'}
        size="md"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit({
            name: e.target.name.value,
            status: e.target.status.value,
          });
        }}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Tag Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              defaultValue={selectedTag?.name}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              className="form-select"
              id="status"
              name="status"
              defaultValue={selectedTag?.status || 'active'}
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="text-end">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={() => {
                setShowModal(false);
                setSelectedTag(null);
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {selectedTag ? 'Update Tag' : 'Create Tag'}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        show={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setSelectedTag(null);
        }}
        onConfirm={handleDelete}
        title="Delete Tag"
        message={`Are you sure you want to delete the tag "${selectedTag?.name}"?`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default Tags; 