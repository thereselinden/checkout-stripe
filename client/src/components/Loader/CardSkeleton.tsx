import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./cardSkeleton.scss";

type Props = {
  cards: number;
};
const CardSkeleton = ({ cards }: Props) => {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((_: undefined, index: number) => (
          <article
            key={index}
            className='card skeleton-card col-6-xs col-4-md col-3-xl'
          >
            <div className='product-img'>
              <Skeleton style={{ height: "100%" }} />
            </div>

            <div className='card-body'>
              <h4 className='card-title'>
                <Skeleton containerClassName='flex-1' />
              </h4>

              <button className='skeleton-btn'>
                <Skeleton height={15} />
              </button>
            </div>
          </article>
        ))}

      {/* <div>
      <div>
        <Skeleton circle width={40} height={40} />
      </div>
      <div>
        <Skeleton count={4} style={{ marginBottom: ".6rem" }} />
      </div>
    </div> */}
    </>
  );
};

export default CardSkeleton;
