import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

const CreateJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    requirements: [''],
    skills: [''],
    benefits: [''],
    company_logo: null,
    company_description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (e, index, field) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        company_logo: file
      }));
    }
  };

  const createJobMutation = useMutation({
    mutationFn: async (jobData) => {
      const token = JSON.parse(localStorage.getItem("user"))?.jwt;
      // TODO: Implement actual API call
      // return await createJob(token, jobData);
    },
    onSuccess: () => {
      toast.success('Job posted successfully!');
      navigate('/jobs');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to post job');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createJobMutation.mutateAsync(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Post a New Job</h2>
              <form onSubmit={handleSubmit}>
                {/* Basic Information */}
                <div className="mb-4">
                  <h3 className="h5 mb-3">Basic Information</h3>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Job Title</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Company Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Job Type</label>
                      <select
                        className="form-select"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Salary Range</label>
                      <input
                        type="text"
                        className="form-control"
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                        placeholder="e.g., $50,000 - $100,000"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Company Logo</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Job Description */}
                <div className="mb-4">
                  <h3 className="h5 mb-3">Job Description</h3>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Requirements */}
                <div className="mb-4">
                  <h3 className="h5 mb-3">Requirements</h3>
                  {formData.requirements.map((req, index) => (
                    <div key={index} className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        value={req}
                        onChange={(e) => handleArrayInputChange(e, index, 'requirements')}
                        placeholder="Enter requirement"
                      />
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => removeArrayItem('requirements', index)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => addArrayItem('requirements')}
                  >
                    Add Requirement
                  </button>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <h3 className="h5 mb-3">Required Skills</h3>
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        value={skill}
                        onChange={(e) => handleArrayInputChange(e, index, 'skills')}
                        placeholder="Enter skill"
                      />
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => removeArrayItem('skills', index)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => addArrayItem('skills')}
                  >
                    Add Skill
                  </button>
                </div>

                {/* Benefits */}
                <div className="mb-4">
                  <h3 className="h5 mb-3">Benefits</h3>
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        value={benefit}
                        onChange={(e) => handleArrayInputChange(e, index, 'benefits')}
                        placeholder="Enter benefit"
                      />
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => removeArrayItem('benefits', index)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => addArrayItem('benefits')}
                  >
                    Add Benefit
                  </button>
                </div>

                {/* Company Description */}
                <div className="mb-4">
                  <h3 className="h5 mb-3">Company Description</h3>
                  <textarea
                    className="form-control"
                    name="company_description"
                    rows="4"
                    value={formData.company_description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : null}
                    Post Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJob; 