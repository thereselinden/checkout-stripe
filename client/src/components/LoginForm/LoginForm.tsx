import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '../Button/Button';
import { useCustomerContext } from '../../context/CustomerContext';
import { ILoginForm } from '../../interfaces/interfaces';
import { loginSchema } from '../../utils/validateSchema';

type Props = {};

const LoginForm = (props: Props) => {
  const defaultValue = {
    email: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: defaultValue,
    resolver: yupResolver(loginSchema),
  });

  const { login, errorMsg } = useCustomerContext();

  const handleLogin: SubmitHandler<ILoginForm> = data => {
    login(data);
  };
  return (
    <>
      <h2>Log in</h2>
      <input type="email" placeholder="enter email..." {...register('email')} />
      <p className="text-error">{errors.email?.message}</p>
      <input
        type="password"
        placeholder="enter password..."
        {...register('password')}
      />
      <p className="text-error">{errors.password?.message}</p>

      {errorMsg && <p className="text-error">{errorMsg}</p>}
      <Button
        type="submit"
        className="btn-secondary btn-login"
        text="Log in"
        disabled={false}
        onClick={handleSubmit(handleLogin)}
      />
    </>
  );
};

export default LoginForm;
