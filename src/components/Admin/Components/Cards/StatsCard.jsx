import React from 'react';

const StatsCard = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  trendIcon,
  color = 'primary',
  loading = false
}) => {
  const getColorClass = () => {
    switch (color) {
      case 'success':
        return 'bg-success bg-opacity-10 text-success';
      case 'warning':
        return 'bg-warning bg-opacity-10 text-warning';
      case 'danger':
        return 'bg-danger bg-opacity-10 text-danger';
      case 'info':
        return 'bg-info bg-opacity-10 text-info';
      default:
        return 'bg-primary bg-opacity-10 text-primary';
    }
  };

  const getTrendColorClass = () => {
    if (trendValue > 0) return 'text-success';
    if (trendValue < 0) return 'text-danger';
    return 'text-secondary';
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className="flex-shrink-0">
            <div className={`avatar avatar-lg rounded ${getColorClass()}`}>
              {icon}
            </div>
          </div>
          <div className="flex-grow-1 ms-3">
            <h6 className="card-title mb-1">{title}</h6>
            {loading ? (
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                <h2 className="mb-0">{value}</h2>
                {trend && (
                  <small className={getTrendColorClass()}>
                    {trendIcon} {Math.abs(trendValue)}% {trend}
                  </small>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard; 