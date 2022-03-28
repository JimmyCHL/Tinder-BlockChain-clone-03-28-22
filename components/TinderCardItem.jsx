import React, { useContext, useState } from 'react';
import { FaUndoAlt } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { AiFillStar } from 'react-icons/ai';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import TinderCard from 'react-tinder-card';
import { TinderContext } from '../context/TinderContex';
React.useLayoutEffect = React.useEffect;
const style = {
  tinderCardWrapper: `w-full h-full absolute`,
  wrapper: ` w-full h-full overflow-hidden bg-no-repeat bg-cover bg-center relative px-8 py-4`,
  space: `flex justify-between h-[190px] lg:h-3/4 items-end mb-6`,
  name: `flex text-white text-3xl font-extrabold items-center -mb-4`,
  age: `ml-4 font-semibold text-xl`,
  walletAddress: `font-bolder text-xl text-white mb-2`,
  reactionsContainer: `flex justify-between w-full px-2 gap-5`,
  buttonContainer: `h-16 w-16 rounded-full flex items-center justify-center cursor-pointer border-2`,
  buttonSymbol: `text-3xl`,
  backColors: `border-white text-white`,
  xColors: `border-red-500 text-red-500`,
  starColors: `border-blue-400 text-blue-400`,
  lightningColors: `border-purple-500 text-purple-500`,
};

const TinderCardItem = ({ card, index, canNotGoBack, entireReference }) => {
  const [render, setRender] = useState(true);
  // console.log(card.name, index);
  // console.log(canNotGoBack);
  const { handleRightSwipe, currentAccount, currentUserLikeList, currentUser } =
    useContext(TinderContext);

  const onSwipe = (direction) => {
    if (direction === 'right') {
      handleRightSwipe(card, currentAccount, currentUserLikeList, currentUser);
    }
  };

  //The goBack function would go back the card to the view, but the actual dom do not add back the card, so when you click card, the card would disappear again.
  const goBack = async () => {
    // console.log(index);
    // console.log(canNotGoBack);

    if (canNotGoBack) {
      setRender((prev) => !prev);
    } else {
      await entireReference[index + 1].current.restoreCard();
    }
  };

  return (
    <TinderCard
      ref={entireReference[index]}
      className={style.tinderCardWrapper}
      preventSwipe={['up', 'down']}
      onSwipe={onSwipe}
    >
      <div
        className={style.wrapper}
        style={{
          backgroundImage: `url(${card.imageUrl})`,
        }}
      >
        <div className={style.space}>
          <div className={style.name}>
            {card.name}
            <span className={style.age}>{card.age}</span>
          </div>
        </div>
        <div className={style.walletAddress}>
          {' '}
          {card.walletAddress.slice(0, 6)}...{card.walletAddress.slice(39)}
        </div>
        <div className={style.reactionsContainer}>
          <div className={`${style.backColors} ${style.buttonContainer}`}>
            <FaUndoAlt
              className={`${style.backColors} ${style.buttonSymbol}`}
              onClick={() => goBack()}
            />
          </div>
          <div className={`${style.xColors} ${style.buttonContainer}`}>
            <AiOutlineClose
              className={`${style.xColors} ${style.buttonSymbol}`}
            />
          </div>
          <div className={`${style.starColors} ${style.buttonContainer}`}>
            <AiFillStar
              className={`${style.starColors} ${style.buttonSymbol}`}
            />
          </div>
          <div className={`${style.lightningColors} ${style.buttonContainer}`}>
            <BsFillLightningChargeFill
              className={`${style.lightningColors} ${style.buttonSymbol}`}
            />
          </div>
        </div>
      </div>
    </TinderCard>
  );
};

export default TinderCardItem;
