import "./loadingSpinner.scss";

const LoadingSpinner = () => {
  return (
    <div className='spinner-container'>
      <div className='spinner-circle-border'>
        <div className='spinner-circle-core'></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
