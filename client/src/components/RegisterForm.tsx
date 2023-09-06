import { FormEvent, useState } from 'react';
import InputField from './InputField';
import Button from './Button';

type Props = {};

const RegisterForm = (props: Props) => {
  const [formFields, setFormFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleRegisterForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={e => handleRegisterForm(e)}>
      <label htmlFor="firstName">Firstname</label>
      <InputField
        type="text"
        required
        value={formFields.firstName}
        onChange={e =>
          setFormFields({ ...formFields, firstName: e.target.value })
        }
        name="firstName"
      />
      <label htmlFor="lastName">Lastname</label>
      <InputField
        type="text"
        required
        value={formFields.lastName}
        onChange={e =>
          setFormFields({ ...formFields, lastName: e.target.value })
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
      <Button text="Create Account" />
    </form>
  );
};

export default RegisterForm;
