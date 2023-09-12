import { Route, Routes } from 'react-router-dom';
import StartPage from './pages/StartPage/StartPage';
import ConfirmationPage from './pages/ConfirmationPage/ConfirmationPage';
import Header from './components/Header/Header';
import CartPage from './pages/CartPage/CartPage';

import './styles/_base.scss';

type Props = {};

const App = (props: Props) => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
