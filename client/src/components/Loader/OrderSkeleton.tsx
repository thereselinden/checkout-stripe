import Skeleton from "react-loading-skeleton";

type Props = {};

const OrderSkeleton = (props: Props) => {
  return (
    <>
      <h2>
        <Skeleton />
      </h2>
      <h3>
        <Skeleton />
      </h3>

      {Array(2)
        .fill(0)
        .map((_, i) => (
          <section key={i} className='list'>
            <div>
              <Skeleton count={2} />
            </div>
            <Skeleton />
          </section>
        ))}
    </>
  );
};

export default OrderSkeleton;
