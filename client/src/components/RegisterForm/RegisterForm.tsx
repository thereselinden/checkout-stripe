import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import { IRegisterForm } from '../../interfaces/interfaces';
import { registerSchema } from '../../utils/validateSchema';

type Props = {
  toggleShowLogin: () => void;
};

const RegisterForm = ({ toggleShowLogin }: Props) => {
  const defaultValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  };
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    defaultValues,
    resolver: yupResolver(registerSchema),
  });

  const handleRegisterCustomer: SubmitHandler<IRegisterForm> = async (
    formData
  ): Promise<void> => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch(
        'http://localhost:3000/api/customer/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
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
      <h2>Register</h2>
      <input
        type="text"
        placeholder="enter firstname"
        {...register('firstname')}
      />
      <p className="text-error">{errors.firstname?.message}</p>

      <input
        type="text"
        placeholder="enter lastname"
        {...register('lastname')}
      />
      <p className="text-error">{errors.lastname?.message}</p>

      <input type="email" placeholder="enter email" {...register('email')} />
      <p className="text-error">{errors.email?.message}</p>

      <input
        type="password"
        placeholder="enter password"
        {...register('password')}
      />
      <p className="text-error">{errors.password?.message}</p>

      {errorMsg && <p className="text-error">{errorMsg}</p>}

      <Button
        text="Create Account"
        onClick={handleSubmit(handleRegisterCustomer)}
        disabled={false}
        className="btn-secondary btn-register"
      />

      {isLoading && <p>Loading....</p>}
    </div>
  );
};

export default RegisterForm;
