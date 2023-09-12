import { ChangeEvent, useEffect, useState } from 'react';
import InputField from './InputField';
import Button from './Button';
import { useCustomerContext } from '../context/CustomerContext';
import { ILoginForm } from '../interfaces/interfaces';

type Props = {};

const LoginForm = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, errorMsg, isLoggedIn, toggleModal } = useCustomerContext();

  // useEffect(() => {
  //   if (isLoggedIn) toggleModal();
  // }, [isLoggedIn]);

  const handleLogin = () => {
    const user: ILoginForm = { email, password };
    login(user);
  };
  return (
    <>
      <h2>Log in</h2>
      <div>
        <InputField
          type="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
          placeholder="Enter your email"
        />
        <InputField
          type="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
          placeholder="Enter your password"
          autofocus={false}
        />
        <div>
          <Button
            text="Close"
            type="button"
            onClick={() => toggleModal()}
            disabled={false}
          />
          <Button
            text="Login"
            disabled={!email || !password}
            onClick={handleLogin}
          />
          {errorMsg && <p>{errorMsg}</p>}
        </div>
      </div>
    </>
  );
};

export default LoginForm;
