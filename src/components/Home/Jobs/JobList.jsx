import { Link } from 'react-router-dom';
import { BACKEND_ROUTE } from '../../../Controllers/Config';

const JobList = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted">No jobs found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <div key={job.id} className="card mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5 className="card-title mb-1">
                  <Link to={`/jobs/${job.slug}`} className="text-decoration-none">
                    {job.title}
                  </Link>
                </h5>
                <h6 className="text-muted mb-2">{job.company}</h6>
                <div className="d-flex gap-3 mb-2">
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
                <p className="card-text text-truncate">{job.description}</p>
                <div className="d-flex gap-2">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="badge bg-light text-dark">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-end">
                <img
                  src={job.company_logo ? `${BACKEND_ROUTE}/${job.company_logo}` : '/assets/images/placeholder.jpg'}
                  alt={job.company}
                  className="rounded-circle"
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
                <div className="mt-2">
                  <Link to={`/jobs/${job.slug}`} className="btn btn-primary btn-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList; 