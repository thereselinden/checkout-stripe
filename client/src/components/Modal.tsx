import { MouseEvent, useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

type Props = {
  toggleModal: () => void;
};

const Modal = ({ toggleModal }: Props) => {
  const [showLogIn, setShowLogin] = useState(true);

  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
  };

  const toggleShowLogIn = () => {
    setShowLogin(!showLogIn);
  };

  return (
    <div className="modal-background" onClick={e => handleBackgroundClick(e)}>
      <div className="modal-wrapper">
        {showLogIn ? <LoginForm toggleModal={toggleModal} /> : <RegisterForm />}

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
  );
};

export default Modal;
