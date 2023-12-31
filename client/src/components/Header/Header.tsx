import { Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { AiOutlineLogin } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";

import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { useCustomerContext } from "../../context/CustomerContext";
import { useCartContext } from "../../context/CartContext";
import { ICartItem } from "../../interfaces/interfaces";

import "./header.scss";

const Header = () => {
  const [numCartItems, setNumCartItems] = useState(0);
  const { user, logout, isModalOpen, toggleModal } = useCustomerContext();
  const { cartItems } = useCartContext();

  useEffect(() => {
    let cartQuantity = 0;
    cartItems.forEach((item: ICartItem) => (cartQuantity += item.quantity));
    setNumCartItems(cartQuantity);
  }, [cartItems]);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header>
        <Link to={"/"}>
          <p className='logo'>Reloj</p>
        </Link>
        <div>
          <Link to='/cart'>
            {numCartItems > 0 && (
              <p className='cart-items-number'>{numCartItems}</p>
            )}
            <Button
              Icon={BsCart2}
              disabled={false}
              type='button'
              className='btn-icon-secondary btn-cart'
            />
          </Link>
          {user ? (
            <>
              <Link to='/profile'>
                <Button
                  Icon={CgProfile}
                  disabled={false}
                  type='button'
                  className='btn-icon-secondary'
                />
              </Link>
              <Button
                Icon={BiLogOutCircle}
                disabled={false}
                type='button'
                onClick={handleLogout}
                className='btn-icon-secondary'
              />
            </>
          ) : (
            <Button
              Icon={AiOutlineLogin}
              onClick={toggleModal}
              disabled={false}
              type='button'
              className='btn-icon-secondary'
            />
          )}
        </div>
      </header>
      {isModalOpen && <Modal />}
    </>
  );
};

export default Header;
