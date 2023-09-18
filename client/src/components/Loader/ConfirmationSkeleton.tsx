import Skeleton from "react-loading-skeleton";
import "./confirmationSkeleton.scss";

type Props = {};

const ConfirmationSkeleton = (props: Props) => {
  return (
    <div className='card confirmation-container'>
      <div className='order-information'>
        <h3>
          <Skeleton />
        </h3>
        <p>
          <Skeleton count={2} />
        </p>
      </div>

      <hr />
      <h5>
        <Skeleton />
      </h5>

      <article className='skeleton-card'>
        <div>
          <Skeleton width={100} height={100} />
        </div>
        <div className='order-summary'>
          <Skeleton count={3} width={"100%"} height={10} />
        </div>
      </article>
    </div>
  );
};

export default ConfirmationSkeleton;
