import { Route, Routes } from "react-router-dom";

import StartPage from "./pages/StartPage/StartPage";
import ConfirmationPage from "./pages/ConfirmationPage/ConfirmationPage";
import Header from "./components/Header/Header";
import CartPage from "./pages/CartPage/CartPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProtectedRoute from "./utils/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

import "./styles/main.scss";
import { SkeletonTheme } from "react-loading-skeleton";

const App = () => {
  return (
    <SkeletonTheme>
      <Header />
      <main className='container'>
        <Routes>
          <Route path='/' element={<StartPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path='/confirmation' element={<ConfirmationPage />} />
          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </SkeletonTheme>
  );
};

export default App;
