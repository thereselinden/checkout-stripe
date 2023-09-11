import { Route, Routes } from 'react-router-dom';
import StartPage from './pages/StartPage';
import ConfirmationPage from './pages/ConfirmationPage';
import Header from './components/Header';
import CartPage from './pages/CartPage';
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
