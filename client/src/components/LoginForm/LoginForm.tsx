import { ChangeEvent, useState } from 'react';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import { useCustomerContext } from '../../context/CustomerContext';
import { ILoginForm } from '../../interfaces/interfaces';

type Props = {};

const LoginForm = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, errorMsg } = useCustomerContext();

  const handleLogin = () => {
    const user: ILoginForm = { email, password };
    login(user);
  };
  return (
    <>
      <h2>Log in</h2>
      <InputField
        type="email"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        required
        placeholder="Enter email..."
      />
      <InputField
        type="password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        required
        placeholder="Enter password..."
        autofocus={false}
      />
      {errorMsg && <p className="text-error">{errorMsg}</p>}
      <Button
        text="Login"
        disabled={!email || !password}
        onClick={handleLogin}
        className="btn-secondary btn-login"
      />
    </>
  );
};

export default LoginForm;
