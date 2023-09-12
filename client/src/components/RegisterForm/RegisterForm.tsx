import { useState } from 'react';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import { IRegisterForm } from '../../interfaces/interfaces';

type Props = {
  toggleShowLogin: () => void;
};

const RegisterForm = ({ toggleShowLogin }: Props) => {
  const [formFields, setFormFields] = useState<IRegisterForm>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRegisterCustomer = async (): Promise<void> => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch(
        'http://localhost:3000/api/customer/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formFields),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setErrorMsg(null);
        toggleShowLogin();
      } else {
        setErrorMsg(data.message);
      }
      setIsLoading(false);
    } catch (err: any) {
      setErrorMsg((err as Error).message);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <label htmlFor="firstName">Firstname</label>
      <InputField
        type="text"
        required
        value={formFields.firstname}
        onChange={e =>
          setFormFields({ ...formFields, firstname: e.target.value })
        }
        name="firstName"
      />
      <label htmlFor="lastName">Lastname</label>
      <InputField
        type="text"
        required
        value={formFields.lastname}
        onChange={e =>
          setFormFields({ ...formFields, lastname: e.target.value })
        }
        name="lastName"
        autofocus={false}
      />
      <label htmlFor="email">Email</label>
      <InputField
        type="email"
        required
        value={formFields.email}
        onChange={e => setFormFields({ ...formFields, email: e.target.value })}
        name="email"
        autofocus={false}
      />
      <label htmlFor="password">Password</label>
      <InputField
        type="password"
        minLength={4}
        required
        value={formFields.password}
        onChange={e =>
          setFormFields({ ...formFields, password: e.target.value })
        }
        autofocus={false}
      />
      <Button
        text="Create Account"
        disabled={
          !formFields.firstname ||
          !formFields.lastname ||
          !formFields.email ||
          !formFields.password
        }
        onClick={handleRegisterCustomer}
      />
      {isLoading && <p>Loading....</p>}
      {errorMsg && <p>{errorMsg}</p>}
    </div>
  );
};

export default RegisterForm;
