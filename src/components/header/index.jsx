import React, { useContext, useEffect, useState } from "react";
import Search from "../search";
import AddIcon from "../../assets/images/icon-add.svg";
import AvatarIcon from "../../assets/images/image-avatar.webp";
import Modal from "../Modal";
import Dropdown from "../Dropdown";
import ThemeIcon from "../../assets/images/icon-theme.svg";
import DarkThemeIcon from "../../assets/images/icon-dark-theme.svg";
import LightThemeIcon from "../../assets/images/icon-light-theme.svg";
import { cn } from "../../lib/utils";
import SignOutIcon from "../../assets/images/icon-logout.svg";
import { ApplicationContext } from "../context";
import darkMoon from '../../assets/images/moon-icon.svg'
import darkSun from '../../assets/images/sun-icon.svg'

import darkpalette from '../../assets/images/palette.svg'

import darkLogout from '../../assets/images/logout.svg'

function Header({ enableAddBookmark }) {
  const [openProfile, setOpenProfile] = useState(false);
  const {state:{
    selectedTheme
  },setState} = useContext(ApplicationContext)

  function handleOpenProfile() {
    setOpenProfile(true);
  }

  function handleTheme(value){
    setState(prev=>({
      ...prev,
      selectedTheme:value
    }))
  }

  return (
    <>
      <header className="w-full h-19.5 border border-b border-neutral-300 bg-white py-4 px-8  flex justify-between  dark:border-neutral-dark-500 dark:bg-neutral-dark-800">
        <Search />
        <div className="flex gap-4 items-center">
          {/* button */}
          <div
            className=" cursor-pointer  rounded-lg py-3 px-4 bg-[#014745] border-2 border-transparent flex gap-2 items-center
        "
          >
            <img src={AddIcon} alt="add-icon" />
            <span className="text-white text-sm" onClick={enableAddBookmark}>
              {" "}
              Add Bookmark
            </span>
          </div>
          {/* icon */}
          <div className="rounded-full" onClick={handleOpenProfile}>
            <img src={AvatarIcon} alt="avatar" className="h-10 w-10" />
          </div>
        </div>
        <Dropdown
          isOpen={openProfile}
          onClose={() => setOpenProfile(null)}
          className="absolute right-5 p-4 min-w-72 top-18"
        >
          <section className="">
            <div className="flex gap-2 items-center mb-4">
              <div className="rounded-full" onClick={handleOpenProfile}>
                <img
                  src={AvatarIcon}
                  alt="avatar"
                  className="h-10 w-10 object-cover"
                />
              </div>
              <div className="flex flex-col gap-0.5 ">
                <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Emily Cart
                </p>
                <p className="text-sm font-medium text-neutral-800 dark:text-neutral-dark-100">
                  emily101@gmail.com
                </p>
              </div>
            </div>

            <div className="border-[#e9eaeb] border-b dark:border-neutral-dark-500"></div>

            <div className="flex items-center justify-between py-4">
              <div className="flex gap-2 items-center">
                <img
                  src={selectedTheme==="dark"?darkpalette:ThemeIcon}
                  alt="Theme"
                  className="w-4 h-4 object-cover"
                />
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-dark-100">Theme</p>
              </div>

              <div
                className="flex items-center shadow-[0_0_0_4px_#014745,0_0_0_2px_#fff,inset_0_0_0_1px_rgba(10,13,18,0.18)] bg-neutral-300 rounded-sm p-0.5 dark:bg-neutral-dark-600
              "
              >
                <div className="p-1 flex items-center gap-2 cursor-pointer">
                  <div
                    className={cn(
                      "py-1.5 px-2",
                      selectedTheme === "dark" &&
                        " rounded-sm bg-white flex items-center justify-center transition-all duration-500 ease-in-out dark:bg-neutral-dark-500"
                    )}
                    onClick={() => handleTheme("dark")}
                  >
                    <img src={selectedTheme==="dark"?darkMoon:DarkThemeIcon} alt="dark-theme-icon" />
                  </div>
                  <div
                    className={cn(
                      "py-1.5 px-2",
                      selectedTheme === "light" &&
                        " rounded-sm bg-white flex items-center justify-center transition-all duration-500 ease-in-out  dark:bg-neutral-dark-500"
                    )}
                    onClick={() => handleTheme("light")}
                  >
                    <img src={selectedTheme==="dark"?darkSun:LightThemeIcon} alt="light-theme-icon" />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-[#e9eaeb] border-b dark:border-neutral-dark-500"></div>
            <div className="flex gap-2 items-center py-4">
              <img
                src={selectedTheme==="dark"?darkLogout:SignOutIcon}
                alt="sign-out"
                className="w-4 h-4 object-cover"
              />
              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-dark-100">Logout</p>
            </div>
          </section>
        </Dropdown>
      </header>
    </>
  );
}

export default Header;
