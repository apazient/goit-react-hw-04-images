import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
const Modal = ({ children, closeModal }) => {
  const onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  useEffect(() => {
    const handleKeyDown = e => {
      console.log(e.key);
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // as componentWillUnmount()
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  return createPortal(
    <div className={style.overlay} onClick={onBackdropClick}>
      <div className={style.modal}>{children} </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  closeModal: PropTypes.func,
};
export default Modal;
