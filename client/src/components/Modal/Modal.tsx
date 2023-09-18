import { MouseEvent, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

import './modal.scss';
import Button from '../Button/Button';
import { useCustomerContext } from '../../context/CustomerContext';

const Modal = () => {
  const [showLogIn, setShowLogin] = useState(true);
  const { toggleModal } = useCustomerContext();

  const handleBackgroundClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    if (e.target === e.currentTarget) toggleModal();
  };

  const toggleShowLogIn = () => {
    setShowLogin(!showLogIn);
  };

  return (
    <div className="modal-background" onClick={e => handleBackgroundClick(e)}>
      <div className="modal-wrapper">
        <Button
          Icon={AiOutlineClose}
          disabled={false}
          className="btn-icon-secondary btn-align-top"
          type="button"
          onClick={() => toggleModal()}
        />
        <div className="modal-form">
          {showLogIn ? (
            <LoginForm />
          ) : (
            <RegisterForm toggleShowLogin={toggleShowLogIn} />
          )}

          {showLogIn ? (
            <a href="#" onClick={toggleShowLogIn}>
              Register an account
            </a>
          ) : (
            <a href="#" onClick={toggleShowLogIn}>
              Do you already have an account? Log in!
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
