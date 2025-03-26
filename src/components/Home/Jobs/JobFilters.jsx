const JobFilters = ({ filters, setFilters }) => {
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="filters">
      {/* Location Filter */}
      <div className="mb-4">
        <label className="form-label">Location</label>
        <select
          className="form-select"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="remote">Remote</option>
          <option value="onsite">On-site</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>

      {/* Job Type Filter */}
      <div className="mb-4">
        <label className="form-label">Job Type</label>
        <select
          className="form-select"
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
        >
          <option value="">All Types</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
      </div>

      {/* Experience Level Filter */}
      <div className="mb-4">
        <label className="form-label">Experience Level</label>
        <select
          className="form-select"
          value={filters.experience}
          onChange={(e) => handleFilterChange('experience', e.target.value)}
        >
          <option value="">All Levels</option>
          <option value="entry">Entry Level</option>
          <option value="mid">Mid Level</option>
          <option value="senior">Senior Level</option>
          <option value="lead">Lead</option>
          <option value="manager">Manager</option>
        </select>
      </div>

      {/* Salary Range Filter */}
      <div className="mb-4">
        <label className="form-label">Salary Range</label>
        <select
          className="form-select"
          value={filters.salary}
          onChange={(e) => handleFilterChange('salary', e.target.value)}
        >
          <option value="">Any Salary</option>
          <option value="0-50000">$0 - $50,000</option>
          <option value="50000-100000">$50,000 - $100,000</option>
          <option value="100000-150000">$100,000 - $150,000</option>
          <option value="150000+">$150,000+</option>
        </select>
      </div>

      {/* Clear Filters Button */}
      <button
        className="btn btn-outline-primary w-100"
        onClick={() => setFilters({
          location: '',
          type: '',
          experience: '',
          salary: ''
        })}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default JobFilters; 