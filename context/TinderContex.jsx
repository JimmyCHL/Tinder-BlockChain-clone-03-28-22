import { useState, createContext, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { useMoralis } from 'react-moralis';

export const TinderContext = createContext();

export const TinderProvider = ({ children }) => {
  const { authenticate, isAuthenticated, user, Moralis, logout } = useMoralis();
  const [cardsData, setCardsData] = useState([]);
  const [currentAccount, setCurrentAccount] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [currentUserLikeList, setCurrentUserLikeList] = useState([]);
  console.log(cardsData);

  console.log(currentUserLikeList);

  useEffect(() => {
    (async () => {
      await checkWalletConnection();

      if (isAuthenticated) {
        requestUsersData(user.get('ethAddress'));
        requestCurrentUserData(user.get('ethAddress'));
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const checkWalletConnection = async () => {
    if (isAuthenticated) {
      const address = await user.get('ethAddress');
      setCurrentAccount(address);
      requestToCreateUserProfile(address, faker.name.findName());
    } else {
      setCurrentAccount('');
    }
  };

  const connectWallet = async () => {
    if (!isAuthenticated) {
      try {
        await authenticate({
          signingMessage: 'Log in using Moralis',
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const disconnectWallet = async () => {
    await logout();
    setCurrentAccount('');
  };

  const handleRightSwipe = async (
    card,
    currentUserAddress,
    currentUserLikeList,
    currentUser
  ) => {
    const cardUserSaved = false;
    console.log(currentUserLikeList);

    await currentUserLikeList.forEach((user) => {
      if (user._ref === card.walletAddress) {
        cardUserSaved = true;
      }
    });
    console.log(cardUserSaved);

    if (cardUserSaved) return;

    const likeData = {
      likedUser: card.walletAddress,
      currentUser: currentUserAddress,
    };
    console.log(likeData);

    try {
      await fetch('api/saveLike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(likeData),
      });

      const response = await fetch('/api/checkMatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(likeData),
      });

      const responseData = await response.json();
      // console.log(responseData);
      const matchStatus = responseData.data.isMatch;

      if (matchStatus) {
        // console.log('match');
        const mintData = {
          walletAddresses: [card.walletAddress, currentUserAddress],
          names: [card.name, currentUser.name],
        };

        // console.log(mintData);

        await fetch('/api/mintMatchNFT', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mintData),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // create profile in sanity for a user
  const requestToCreateUserProfile = async (walletAddress, name) => {
    try {
      await fetch(`/api/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userWalletAddress: walletAddress,
          name: name,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  //get current user data from sanity
  const requestCurrentUserData = async (walletAddress) => {
    try {
      const response = await fetch(
        `/api/fetchCurrentUser?activeAccount=${walletAddress}`
      );
      const data = await response.json();
      // console.log(data);
      setCurrentUser(data.data);
      setCurrentUserLikeList(data.data.likes);
    } catch (error) {
      console.log(error);
    }
  };

  //get all users data from sanity except current user
  const requestUsersData = async (activeAccount) => {
    try {
      const response = await fetch(
        `/api/fetchUsers?activeAccount=${activeAccount}`
      );
      const data = await response.json();

      setCardsData(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TinderContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        currentAccount,
        currentUser,
        cardsData,
        handleRightSwipe,
        currentUserLikeList,
      }}
    >
      {children}
    </TinderContext.Provider>
  );
};
