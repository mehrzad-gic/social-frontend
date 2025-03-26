import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { BACKEND_ROUTE } from '../../../Controllers/Config';

const JobDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: job, isLoading, error } = useQuery({
    queryKey: ['job', slug],
    queryFn: async () => {
      const token = JSON.parse(localStorage.getItem("user"))?.jwt;
      // TODO: Implement actual API call
      // const response = await fetchJobDetails(token, slug);
      // return response;
    },
    onError: (error) => {
      toast.error('Failed to fetch job details');
      console.error('Error fetching job details:', error);
    }
  });

  if (isLoading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          Failed to load job details. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <h1 className="h3 mb-2">{job.title}</h1>
                  <h2 className="h5 text-muted mb-3">{job.company}</h2>
                  <div className="d-flex gap-3">
                    <span className="text-muted">
                      <i className="bi bi-geo-alt me-1"></i>
                      {job.location}
                    </span>
                    <span className="text-muted">
                      <i className="bi bi-briefcase me-1"></i>
                      {job.type}
                    </span>
                    <span className="text-muted">
                      <i className="bi bi-cash me-1"></i>
                      {job.salary}
                    </span>
                  </div>
                </div>
                <img
                  src={job.company_logo ? `${BACKEND_ROUTE}/${job.company_logo}` : '/assets/images/placeholder.jpg'}
                  alt={job.company}
                  className="rounded-circle"
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
              </div>

              <div className="mb-4">
                <h3 className="h5 mb-3">Job Description</h3>
                <p className="text-muted">{job.description}</p>
              </div>

              <div className="mb-4">
                <h3 className="h5 mb-3">Requirements</h3>
                <ul className="list-unstyled">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="h5 mb-3">Skills Required</h3>
                <div className="d-flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="badge bg-primary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="h5 mb-3">Benefits</h3>
                <ul className="list-unstyled">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="mb-2">
                      <i className="bi bi-star-fill text-warning me-2"></i>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h3 className="h5 mb-4">Quick Actions</h3>
              <button className="btn btn-primary w-100 mb-3">
                Apply Now
              </button>
              <button className="btn btn-outline-primary w-100 mb-3">
                Save Job
              </button>
              <button className="btn btn-outline-secondary w-100">
                Share Job
              </button>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-body">
              <h3 className="h5 mb-4">Company Information</h3>
              <p className="text-muted">{job.company_description}</p>
              <div className="d-grid">
                <button className="btn btn-outline-primary">
                  View Company Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail; 