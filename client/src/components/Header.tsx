import { Link } from 'react-router-dom';
import { BsCart2 } from 'react-icons/bs';
import { AiOutlineLogin } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { useCallback, useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { useCustomerContext } from '../context/CustomerContext';

type Props = {};

const Header = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn, logout } = useCustomerContext();

  const toggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const handleLogout = () => {
    logout();
  };

  const handleCart = () => {};
  return (
    <>
      <header>
        <Link to={'/'}>
          <h2>WebShop</h2>
        </Link>
        <div>
          <Button
            Icon={BsCart2}
            disabled={false}
            onClick={handleCart}
            type="button"
          />

          {isLoggedIn ? (
            <>
              <Button Icon={CgProfile} disabled={false} type="button" />
              <Button
                Icon={BiLogOutCircle}
                disabled={false}
                type="button"
                onClick={handleLogout}
              />
            </>
          ) : (
            <Button
              Icon={AiOutlineLogin}
              onClick={toggleModal}
              disabled={false}
              type="button"
            />
          )}
        </div>
      </header>
      {isModalOpen && <Modal toggleModal={toggleModal} />}
    </>
  );
};

export default Header;
