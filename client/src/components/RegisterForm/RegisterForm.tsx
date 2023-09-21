import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../Button/Button";
import { IRegisterForm } from "../../interfaces/interfaces";
import { registerSchema } from "../../utils/validateSchema";
import useFetch from "../../hooks/useFetch";

type Props = {
  toggleShowLogin: () => void;
};

const RegisterForm = ({ toggleShowLogin }: Props) => {
  const url = import.meta.env.VITE_BASE_URL;
  const defaultValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };
  const { fetchData, isLoading, error: errorMsg } = useFetch<IRegisterForm>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    defaultValues,
    resolver: yupResolver(registerSchema),
  });

  const handleRegisterCustomer = async (
    formData: IRegisterForm
  ): Promise<void> => {
    const result = await fetchData(`${url}/api/customer/register`, {
      method: "POST",
      body: formData,
    });

    if (result) toggleShowLogin();
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type='text'
        placeholder='enter firstname'
        {...register("firstname")}
      />
      <p className='text-error'>{errors.firstname?.message}</p>

      <input
        type='text'
        placeholder='enter lastname'
        {...register("lastname")}
      />
      <p className='text-error'>{errors.lastname?.message}</p>

      <input type='email' placeholder='enter email' {...register("email")} />
      <p className='text-error'>{errors.email?.message}</p>

      <input
        type='password'
        placeholder='enter password'
        {...register("password")}
      />
      <p className='text-error'>{errors.password?.message}</p>

      {errorMsg && <p className='text-error'>{errorMsg}</p>}

      <Button
        text='Create Account'
        onClick={handleSubmit(handleRegisterCustomer)}
        disabled={false}
        className='btn-secondary btn-register'
      />

      {isLoading && <p>Loading....</p>}
    </div>
  );
};

export default RegisterForm;
