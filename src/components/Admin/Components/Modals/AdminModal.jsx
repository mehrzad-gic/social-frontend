import React from 'react';
import { FaTimes } from 'react-icons/fa';

const AdminModal = ({
  show,
  onClose,
  title,
  children,
  size = 'md',
  footer,
  closeButton = true,
  backdrop = true,
  centered = true
}) => {
  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      {backdrop && (
        <div
          className="modal-backdrop show"
          style={{ opacity: 1 }}
          onClick={onClose}
        />
      )}

      {/* Modal */}
      <div
        className={`modal fade show ${centered ? 'modal-dialog-centered' : ''}`}
        style={{ display: 'block' }}
        tabIndex="-1"
      >
        <div className={`modal-dialog modal-${size}`}>
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              {closeButton && (
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Body */}
            <div className="modal-body">{children}</div>

            {/* Footer */}
            {footer && <div className="modal-footer">{footer}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminModal; 