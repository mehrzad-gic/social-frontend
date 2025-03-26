import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { BACKEND_ROUTE } from '../../../Controllers/Config';

const MyApplications = () => {
  const { data: applications, isLoading, error } = useQuery({
    queryKey: ['myApplications'],
    queryFn: async () => {
      const token = JSON.parse(localStorage.getItem("user"))?.jwt;
      // TODO: Implement actual API call
      // const response = await fetchMyApplications(token);
      // return response;
    },
    onError: (error) => {
      toast.error('Failed to fetch applications');
      console.error('Error fetching applications:', error);
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

  if (error || !applications) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          Failed to load applications. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">My Job Applications</h2>
              
              {applications.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">You haven't applied for any jobs yet.</p>
                  <a href="/jobs" className="btn btn-primary">
                    Browse Jobs
                  </a>
                </div>
              ) : (
                <div className="applications-list">
                  {applications.map((application) => (
                    <div key={application.id} className="card mb-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h5 className="card-title mb-1">
                              <a href={`/jobs/${application.job.slug}`} className="text-decoration-none">
                                {application.job.title}
                              </a>
                            </h5>
                            <h6 className="text-muted mb-2">{application.job.company}</h6>
                            <div className="d-flex gap-3 mb-2">
                              <span className="text-muted">
                                <i className="bi bi-geo-alt me-1"></i>
                                {application.job.location}
                              </span>
                              <span className="text-muted">
                                <i className="bi bi-briefcase me-1"></i>
                                {application.job.type}
                              </span>
                              <span className="text-muted">
                                <i className="bi bi-cash me-1"></i>
                                {application.job.salary}
                              </span>
                            </div>
                          </div>
                          <div className="text-end">
                            <img
                              src={application.job.company_logo ? `${BACKEND_ROUTE}/${application.job.company_logo}` : '/assets/images/placeholder.jpg'}
                              alt={application.job.company}
                              className="rounded-circle mb-2"
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            />
                            <div>
                              <span className={`badge bg-${getStatusColor(application.status)}`}>
                                {application.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3">
                          <h6 className="mb-2">Application Details</h6>
                          <p className="mb-2">
                            <strong>Applied:</strong> {new Date(application.created_at).toLocaleDateString()}
                          </p>
                          {application.cover_letter && (
                            <div className="mb-2">
                              <strong>Cover Letter:</strong>
                              <p className="text-muted">{application.cover_letter}</p>
                            </div>
                          )}
                          {application.resume && (
                            <div>
                              <strong>Resume:</strong>
                              <a
                                href={`${BACKEND_ROUTE}/${application.resume}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ms-2"
                              >
                                View Resume
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'warning';
    case 'reviewed':
      return 'info';
    case 'interview':
      return 'primary';
    case 'accepted':
      return 'success';
    case 'rejected':
      return 'danger';
    default:
      return 'secondary';
  }
};

export default MyApplications; 