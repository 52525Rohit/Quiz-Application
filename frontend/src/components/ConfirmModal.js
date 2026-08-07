import React from 'react';

export default function ConfirmModal({ open, title, message, onConfirm, onCancel, confirmLabel = 'Delete', cancelLabel = 'Cancel' }) {
  if (!open) return null;

  return (
    <div className='modal-overlay' onClick={onCancel}>
      <div className='modal-box' onClick={(e) => e.stopPropagation()}>
        {title && <h3 className='modal-title'>{title}</h3>}
        <p className='modal-message'>{message}</p>
        <div className='modal-actions'>
          <button className='btn modal-btn-cancel' onClick={onCancel}>{cancelLabel}</button>
          <button className='btn modal-btn-confirm' onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
