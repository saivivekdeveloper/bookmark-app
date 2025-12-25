import React, { useState } from "react";
import Search from "../search";
import AddIcon from "../../assets/images/icon-add.svg";
import AvatarIcon from "../../assets/images/image-avatar.webp";
import Modal from "../Modal";

function Header({enableAddBookmark}) {
  return (
    <>
    <header className="w-full h-19.5 border border-b border-neutral-300 bg-white py-4 px-8  flex justify-between">
      <Search />
      <div className="flex gap-4 items-center">
        {/* button */}
        <div
          className=" cursor-pointer  rounded-lg py-3 px-4 bg-[#014745] border-2 border-transparent flex gap-2 items-center
        "
        >
          <img src={AddIcon} alt="add-icon" />
          <span className="text-white text-sm " onClick={enableAddBookmark}> Add Bookmark</span>
        </div>
        {/* icon */}
        <div className="rounded-full">
          <img src={AvatarIcon} alt="avatar" className="h-10 w-10" />
        </div>
      </div>
    </header>
  </>
  );
}

export default Header;
