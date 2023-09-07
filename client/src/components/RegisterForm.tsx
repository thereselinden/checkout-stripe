import { FormEvent, useEffect, useState } from 'react';
import InputField from './InputField';
import Button from './Button';
import { useCustomerContext } from '../context/CustomerContext';
import { IRegisterForm } from '../interfaces/interfaces';

type Props = {
  toggleModal: () => void;
  toggleShowLogin: () => void;
};

const RegisterForm = ({ toggleModal, toggleShowLogin }: Props) => {
  const [formFields, setFormFields] = useState<IRegisterForm>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const { registerCustomer, registerSuccess } = useCustomerContext();

  // TODO Har redan lagt toggleModal i useCallback, men verkar inte känna av det
  useEffect(() => {
    if (registerSuccess) toggleModal();
  }, [registerSuccess]);

  const handleRegisterForm = () => {
    registerCustomer(formFields);
    toggleShowLogin();
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
        onClick={handleRegisterForm}
      />
    </div>
  );
};

export default RegisterForm;
