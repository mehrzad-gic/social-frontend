const JobSearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-4">
      <div className="input-group">
        <span className="input-group-text bg-white border-end-0">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Search jobs by title, company, or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => setSearchQuery('')}
          >
            <i className="bi bi-x"></i>
          </button>
        )}
      </div>
      <div className="mt-2">
        <small className="text-muted">
          Try searching for: "Software Engineer", "Product Manager", "Data Scientist"
        </small>
      </div>
    </div>
  );
};

export default JobSearch; 