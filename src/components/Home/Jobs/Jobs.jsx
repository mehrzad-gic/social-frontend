import { useState } from 'react';
import JobList from './JobList';
import JobFilters from './JobFilters';
import JobSearch from './JobSearch';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const Jobs = () => {
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    experience: '',
    salary: ''
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Fetch jobs using React Query
  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['jobs', filters, searchQuery],
    queryFn: async () => {
      const token = JSON.parse(localStorage.getItem("user"))?.jwt;
      // TODO: Implement actual API call
      // const response = await fetchJobs(token, filters, searchQuery);
      // return response;
    },
    onError: (error) => {
      toast.error('Failed to fetch jobs');
      console.error('Error fetching jobs:', error);
    }
  });

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Sidebar - Filters */}
        <div className="col-lg-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Filters</h5>
              <JobFilters filters={filters} setFilters={setFilters} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-9">
          <div className="card">
            <div className="card-body">
              <JobSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              
              {isLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="alert alert-danger">
                  Failed to load jobs. Please try again later.
                </div>
              ) : (
                <JobList jobs={jobs} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs; 