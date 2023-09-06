import { Link } from 'react-router-dom';
import { BsCart2 } from 'react-icons/bs';
import { AiOutlineLogin } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';

type Props = {};

const Header = (props: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
            <Button Icon={CgProfile} disabled={false} type="button" />
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
