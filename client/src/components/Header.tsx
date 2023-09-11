import { Link } from 'react-router-dom';
import { BsCart2 } from 'react-icons/bs';
import { AiOutlineLogin } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { useCallback, useEffect, useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { useCustomerContext } from '../context/CustomerContext';
import { useCartContext } from '../context/CartContext';
import { ICartItem } from '../interfaces/interfaces';

type Props = {};

const Header = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numCartItems, setNumCartItems] = useState(0);
  const { isLoggedIn, logout } = useCustomerContext();
  const { cartItems } = useCartContext();

  useEffect(() => {
    let cartQuantity = 0;
    cartItems.forEach((item: ICartItem) => (cartQuantity += item.quantity));
    setNumCartItems(cartQuantity);
  }, [cartItems]);

  const toggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header>
        <Link to={'/'}>
          <h2>WebShop</h2>
        </Link>
        <div>
          <p className="number-cart-items">
            {numCartItems > 0 && numCartItems}
          </p>
          <Button Icon={BsCart2} disabled={false} type="button" />

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
