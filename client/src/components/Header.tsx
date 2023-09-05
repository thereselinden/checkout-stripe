import { Link } from 'react-router-dom';
import { BsCart2 } from 'react-icons/bs';
import { AiOutlineLogin } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { useState } from 'react';

type Props = {};

const Header = (props: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header>
      <Link to={'/'}>
        <h2>WebShop</h2>
      </Link>
      <div>
        <BsCart2 />
        {isLoggedIn ? <CgProfile /> : <AiOutlineLogin />}
      </div>
    </header>
  );
};

export default Header;
