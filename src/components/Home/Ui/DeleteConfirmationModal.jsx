import React from 'react';

const DeleteConfirmationModal = ({ 
    show, 
    onClose, 
    onConfirm, 
    title = "Confirm Delete",
    itemName,
    isLoading = false,
    confirmText = "Delete",
    cancelText = "Cancel"
}) => {
    if (!show) return null;

    return (
        <>
            <div className={`modal fade ${show ? 'show' : ''}`} 
                 style={{display: show ? 'block' : 'none'}} 
                 tabIndex="-1" 
                 aria-labelledby="deleteModalLabel" 
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">{title}</h5>
                            <button 
                                type="button" 
                                className="btn-close" 
                                onClick={onClose}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete {itemName}?
                            This action cannot be undone.
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={onClose}
                                disabled={isLoading}
                            >
                                {cancelText}
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-danger" 
                                onClick={onConfirm}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Deleting...' : confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
};

export default DeleteConfirmationModal; 