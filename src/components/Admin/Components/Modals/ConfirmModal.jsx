import React from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const ConfirmModal = ({
  show,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to perform this action?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning'
}) => {
  if (!show) return null;

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <FaExclamationTriangle className="text-danger" />;
      case 'warning':
        return <FaExclamationTriangle className="text-warning" />;
      case 'info':
        return <FaExclamationTriangle className="text-info" />;
      default:
        return <FaExclamationTriangle className="text-primary" />;
    }
  };

  const getButtonClass = () => {
    switch (type) {
      case 'danger':
        return 'btn-danger';
      case 'warning':
        return 'btn-warning';
      case 'info':
        return 'btn-info';
      default:
        return 'btn-primary';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop show"
        style={{ opacity: 1 }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="modal fade show modal-dialog-centered"
        style={{ display: 'block' }}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title d-flex align-items-center">
                {getIcon()} <span className="ms-2">{title}</span>
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>

            {/* Body */}
            <div className="modal-body">
              <p className="mb-0">{message}</p>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                {cancelText}
              </button>
              <button
                type="button"
                className={`btn ${getButtonClass()}`}
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal; 