import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';

import './notFoundPage.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleBackHome = () => {
    navigate('/');
  };
  return (
    <section className="not-found-container">
      <div>
        <h1>404</h1>
        <p>Page not found</p>
      </div>
      <Button
        text="Continue browsing"
        className="btn-secondary"
        disabled={false}
        onClick={handleBackHome}
      />
    </section>
  );
};

export default NotFoundPage;
