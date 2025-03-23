import React from 'react';
import { FaSort, FaSortUp, FaSortDown, FaSearch } from 'react-icons/fa';

const DataTable = ({
  columns,
  data,
  onSort,
  onSearch,
  onRowClick,
  sortField,
  sortDirection,
  searchTerm,
  actions,
  loading = false
}) => {
  const handleSort = (field) => {
    if (onSort) {
      const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
      onSort(field, direction);
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="ms-1" />;
    return sortDirection === 'asc' ? <FaSortUp className="ms-1" /> : <FaSortDown className="ms-1" />;
  };

  return (
    <div className="card border-0 shadow-sm">
      {/* Search Bar */}
      {onSearch && (
        <div className="card-header bg-transparent border-0">
          <div className="input-group">
            <span className="input-group-text">
              <FaSearch className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.field}
                  className={`cursor-pointer ${column.sortable ? 'cursor-pointer' : ''}`}
                  onClick={() => column.sortable && handleSort(column.field)}
                >
                  {column.label}
                  {column.sortable && getSortIcon(column.field)}
                </th>
              ))}
              {actions && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-4">
                  No data found
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={index}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={onRowClick ? 'cursor-pointer' : ''}
                >
                  {columns.map((column) => (
                    <td key={column.field}>
                      {column.render ? column.render(row[column.field], row) : row[column.field]}
                    </td>
                  ))}
                  {actions && (
                    <td>
                      <div className="btn-group">
                        {actions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            className={`btn btn-sm ${action.className || 'btn-outline-primary'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              action.onClick(row);
                            }}
                          >
                            {action.icon}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable; 