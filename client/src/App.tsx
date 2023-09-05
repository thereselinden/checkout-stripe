import { Route, Routes } from 'react-router-dom';
import StartPage from './pages/StartPage';
import ConfirmationPage from './pages/ConfirmationPage';
import Header from './components/Header';
type Props = {};

const App = (props: Props) => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
