import React, { useContext } from 'react';
import Image from 'next/image';
import fire from '../assets/fire.png';
import { TinderContext } from '../context/TinderContex';

const style = {
  wrapper: `relative py-6 text-white mb-10 flex w-screen items-center px-4 justify-between`,
  main: `flex items-center gap-4`,
  tinderText: `text-xl sm:text-3xl lg:text-5xl font-semibold mr-8 cursor-pointer pointer-events-none`,
  leftMenu: `hidden gap-8 text-lg xl:flex`,
  menuItem: `cursor-pointer hover:text-red-400 duration-300 hover:scale-110`,
  rightMenu: `flex gap-3 items-center pr-0 lg:pr-4 `,
  currentAccount: `pointer-events-none px-2 py-1 border border-gray-500 rounded-full flex items-center`,
  accountAddress: `ml-2`,
  authButton: `absolute right-0 left-0 mx-auto top-[110px] max-w-[20rem] sm:static sm:w-auto bg-white font-bold text-red-500 px-6 py-3 items-center xl:ml-4 rounded-lg hover:bg-red-500 duration-300 hover:text-white`,
};

const Header = () => {
  const { connectWallet, currentAccount, disconnectWallet } =
    useContext(TinderContext);

  return (
    <div
      className={`${style.wrapper} ${
        currentAccount ? 'bg-gray-900' : 'bg-transparent'
      }`}
    >
      <div className={style.main}>
        <Image src={fire} alt="fire" height={45} width={45} />
        <h1 className={style.tinderText}>tinder</h1>

        <div className={style.leftMenu}>
          <div className={style.menuItem}>Products</div>
          <div className={style.menuItem}>Learn</div>
          <div className={style.menuItem}>Safety</div>
          <div className={style.menuItem}>Support</div>
          <div className={style.menuItem}>Download</div>
        </div>
      </div>
      <div className={style.rightMenu}>
        <div className=" hidden pointer-events-none lg:block">ENGLISH</div>
        <div className="pointer-events-none lg:hidden">ENG</div>

        {currentAccount ? (
          <>
            <div className={style.currentAccount}>
              <Image
                src={
                  'https://moralis.io/wp-content/uploads/2021/05/moralisWhiteLogo.svg'
                }
                alt="moralis"
                height={20}
                width={20}
              />
              <span className={style.accountAddress}>
                {currentAccount.slice(0, 6)}...{currentAccount.slice(39)}
              </span>
            </div>
            <button
              className={style.authButton}
              onClick={() => disconnectWallet()}
            >
              Logout
            </button>
          </>
        ) : (
          <button className={style.authButton} onClick={() => connectWallet()}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
