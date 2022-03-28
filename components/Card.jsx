import React, {
  useContext,
  useState,
  createRef,
  useEffect,
  useMemo,
} from 'react';
import { SiTinder } from 'react-icons/si';
import CardHeader from './CardHeader';
import CardFooter from './CardFooter';
import TinderCardItem from './TinderCardItem';
import { TinderContext } from '../context/TinderContex';

const style = {
  wrapper: `h-[30rem] w-[20rem] lg:h-[45rem] lg:w-[27rem]  flex flex-col rounded-lg overflow-hidden`,
  cardMain: `w-full flex-1 relative flex flex-col justify-center items-center bg-gray-500`,
  noMoreWrapper: `flex flex-col justify-center items-center absolute`,
  tinderLogo: `text-5xl text-red-500 mb-4`,
  noMoreText: `text-xl text-white`,
  swipesContainer: `w-full h-full overflow-hidden absolute`,
};

const Card = () => {
  const { cardsData } = useContext(TinderContext);

  const childRefs = useMemo(
    () =>
      Array(cardsData.length)
        .fill(0)
        .map((i) => React.createRef()),
    [cardsData]
  );

  return (
    <div className={style.wrapper}>
      <CardHeader />
      <div className={style.cardMain}>
        <div className={style.noMoreWrapper}>
          <SiTinder className={style.tinderLogo} />
          <div className={style.noMoreText}>
            No More Profiles in your Location...
          </div>
        </div>
        <div className={style.swipesContainer}>
          {cardsData.map((card, index) => (
            <TinderCardItem
              card={card}
              key={index}
              entireReference={childRefs}
              index={index}
              canNotGoBack={index === cardsData.length - 1}
            />
          ))}
        </div>
      </div>
      <CardFooter />
    </div>
  );
};

export default Card;
