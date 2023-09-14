import { Route, Routes } from 'react-router-dom';
import StartPage from './pages/StartPage/StartPage';
import ConfirmationPage from './pages/ConfirmationPage/ConfirmationPage';
import Header from './components/Header/Header';
import CartPage from './pages/CartPage/CartPage';

import './styles/main.scss';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProtectedRoute from './utils/ProtectedRoute';

type Props = {};

const App = (props: Props) => {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
