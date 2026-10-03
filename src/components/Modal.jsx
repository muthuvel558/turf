import React, { useEffect } from 'react';

export default function Modal({
  isOpen = true,
  onClose,
  title,
  subtitle,
  maxWidth = '520px',
  children,
  footer,
  showCloseBtn = true
}) {
  // Handle Escape key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    // Lock page scroll behind modal
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-container" 
        style={{ maxWidth }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        {(title || showCloseBtn) && (
          <div className="modal-header">
            <div className="modal-header-info">
              {title && <h3 className="modal-title">{title}</h3>}
              {subtitle && <span className="modal-subtitle">{subtitle}</span>}
            </div>
            {showCloseBtn && (
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={onClose}
                aria-label="Close modal"
              >
                &times;
              </button>
            )}
          </div>
        )}

        {/* Modal Body / Content */}
        <div className="modal-body">
          {children}
        </div>

        {/* Modal Footer */}
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// Checkmark Animated Icon
export function SuccessCheckmark() {
  return (
    <div className="success-icon-wrapper">
      <svg className="success-checkmark-svg" viewBox="0 0 24 24">
        <path d="M5 12l5 5L20 7" />
      </svg>
    </div>
  );
}
