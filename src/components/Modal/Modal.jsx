import { useEffect } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // block the scroll
    }

    return () => {
      document.body.style.overflow = 'auto'; // reenable the scroll
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => { //close from outer click
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
