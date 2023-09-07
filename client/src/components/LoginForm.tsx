import { ChangeEvent, useState } from 'react';
import InputField from './InputField';
import Button from './Button';

type Props = {
  toggleModal: () => void;
};

const LoginForm = ({ toggleModal }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (): Promise<void> => {
    console.log('logged in');
    // create fetch and pass state as an object
    try {
      const user = {
        email,
        password,
      };

      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
        credentials: 'include', // varför behöver jag denna?
      });

      const data = await response.json();
      console.log('login fetch ', data);
    } catch (err) {
      console.log(err);
    }
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
        </div>
      </div>
    </>
  );
};

export default LoginForm;
