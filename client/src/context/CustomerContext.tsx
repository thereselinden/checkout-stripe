import { PropsWithChildren, createContext, useContext, useState } from 'react';

import { IRegisterForm } from '../interfaces/interfaces';

const defaultValue = {
  //registerCustomer:  () => {}
};

export const CustomerContext = createContext(null as any);

export const useCustomerContext = () => useContext(CustomerContext);

const CustomerContextProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const registerCustomer = async (customer: IRegisterForm): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });
      const data = await response.json();
      if (data) {
        setRegisterSuccess(true);
        setIsLoading(false);
        setErrorMsg(null);
      }
    } catch (err) {
      console.log(err);
      setErrorMsg('Registration failed');
      setIsLoading(false);
    }
  };

  return (
    <CustomerContext.Provider
      value={{ registerCustomer, isLoading, errorMsg, registerSuccess }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerContextProvider;
