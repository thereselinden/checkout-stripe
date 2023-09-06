import { ChangeEvent, FormEvent, useState } from 'react';
import InputField from './InputField';
import Button from './Button';

type Props = {
  toggleModal: () => void;
};

const LoginForm = ({ toggleModal }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('logged in');
    // create fetch and pass state as an object
  };

  return (
    <>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
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
          <Button text="Login" disabled={!email || !password} />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
