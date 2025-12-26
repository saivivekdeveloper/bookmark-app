import React, { useContext, useState } from "react";
import Logo from "../../assets/images/logo-light-theme.svg";
import HomeWhiteIcon from "../../assets/images/icon-white-home.svg";
import ArchivedWhiteIcon from "../../assets/images/icon-white-archive.svg";
import HomeFilledIcon from "../../assets/images/icon-home.svg";
import ArchivedFilledIcon from "../../assets/images/icon-archive.svg";
import { cn } from "../../lib/utils";
// import data from "../../data/data";
import Tags from "../../pages/Tags";
import { ApplicationContext } from "../context";
import darkLogo from '../../assets/images/logo-dark-theme.svg'
import darkHighlightedHome from '../../assets/images/dark-highlighted-home.svg'
import darkHome from "../../assets/images/dark-home.svg"
import darkHighlightedArchive  from '../../assets/images/dark-highlighted-archive.svg'
import darkArchive from '../../assets/images/dark-archive.svg'

function Sidebar() {
  const {
    handleActiveSidebar,
    handleResetTags,
    state: { isActiveSidebar, tagsChecked,data ,selectedTheme},
  } = useContext(ApplicationContext);

  const isTagsSelected = Object.values(tagsChecked).some((el) => el);

  function removeDuplicates(allTags) {
    // return [...new Set(allTags)];
    const newArray = [];
    allTags.forEach((tag) => {
      if (!newArray.includes(tag)) {
        newArray.push(tag);
      }
    });
    return newArray;
  }

  const allTags = data.bookmarks.flatMap((bookmark) => bookmark.tags);

  function occurencesOfEachCount() {
    const tagCount = {};
    for (let i = 0; i < allTags.length; i++) {
      const tag = allTags[i];
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    }
    return tagCount;
  }

  return (
    <aside className="h-screen w-78 p-5 dark:bg-neutral-dark-800 dark:border dark:border-r dark:border-[#004241]">
      {/* icon */}
      <div className="mb-5">
        <img src={selectedTheme==="dark"?darkLogo:Logo} alt="bookmark logo" />
      </div>

      {/* link to go to different pages */}
      <div className="flex flex-col gap-2 ">
        <div
          className={cn(
            "flex gap-2 items-center cursor-pointer py-2 px-3 transition-all duration-500 ease-in-out",
            isActiveSidebar === "home" && " bg-[#e8f0ef]  rounded-md dark:bg-neutral-dark-600 "
          )}
          onClick={() => handleActiveSidebar("home")}
        >
          {isActiveSidebar === "home" ? (
            <img
              src={selectedTheme==="dark"?darkHighlightedHome:HomeFilledIcon}
              alt="Home"
              className="w-5 h-5 object-contain"
            />
          ) : (
            <img
              src={selectedTheme==="dark"?darkHome:HomeWhiteIcon}
              alt="Home"
              className="w-5 h-5 object-contain"
            />
          )}
          <p className="text-base font-medium text-neutral-800 dark:text-white">Home</p>
        </div>
        <div
          className={cn(
            "flex gap-2 items-center cursor-pointer py-2 px-3 transition-all duration-500 ease-in-out",
            isActiveSidebar === "archived" && " bg-[#e8f0ef]  rounded-md dark:bg-neutral-dark-600 "
          )}
          onClick={() => handleActiveSidebar("archived")}
        >
          {isActiveSidebar === "archived" ? (
            <img
              src={selectedTheme==="dark"?darkHighlightedArchive:ArchivedFilledIcon}
              alt="Home"
              className="w-5 h-5 object-contain"
            />
          ) : (
            <img
              src={selectedTheme==="dark"?darkArchive:ArchivedWhiteIcon}
              alt="Home"
              className="w-5 h-5 object-contain"
            />
          )}
          <p className="text-base font-medium text-neutral-800 dark:text-white">Archived</p>
        </div>
      </div>

      {/* Tags.Section */}

      <section className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-[#4D4D4D] text-xs dark:text-[#ccd1d1] ">TAGS</h3>
          {isTagsSelected && (
            <p
              className="text-xs text-neutral-800  border-b border-neutral-500"
              onClick={handleResetTags}
            >
              Reset
            </p>
          )}
        </div>
        {removeDuplicates(allTags).length > 0 &&
          removeDuplicates(allTags).map((tag) => (
            <Tags key={tag} tagName={tag} tagCount={occurencesOfEachCount()} />
          ))}
      </section>
    </aside>
  );
}

export default Sidebar;
