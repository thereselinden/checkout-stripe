import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { ILoginForm, IUser } from '../interfaces/interfaces';

const defaultValue = {
  //registerCustomer:  () => {}
};

export const CustomerContext = createContext(null as any);

export const useCustomerContext = () => useContext(CustomerContext);

const CustomerContextProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const isAlreadyLoggedIn = async (): Promise<void> => {
      setIsLoading(true);
      setErrorMsg(null);
      try {
        const response = await fetch(
          'http://localhost:3000/api/customer/authorize',
          {
            credentials: 'include',
          }
        );
        const data = await response.json();
        if (response.ok) {
          setUser(data);
          setIsLoggedIn(true);
          setIsLoading(false);
        } else {
          setIsLoggedIn(false);
          setIsLoading(false);
        }
      } catch (err) {
        setErrorMsg((err as Error).message);
        setIsLoading(false);
      }
    };
    isAlreadyLoggedIn();
  }, []);

  const login = async (credentials: ILoginForm): Promise<void> => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch('http://localhost:3000/api/customer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include', // varför behöver jag denna?
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setIsLoggedIn(true);
        setErrorMsg(null);
      } else {
        setErrorMsg(data.message);
      }
      setIsLoading(false);
    } catch (err: any) {
      setErrorMsg((err as Error).message);
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch('http://localhost:3000/api/customer/logout', {
        method: 'POST',
        credentials: 'include', /// varför detta?
      });

      setUser(null);
      setIsLoggedIn(false);
      navigate('/');
    } catch (err) {
      console.log(err);
      console.log((err as Error).message);
    }
  };

  return (
    <CustomerContext.Provider
      value={{ login, isLoggedIn, errorMsg, isLoading, user, logout }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerContextProvider;
